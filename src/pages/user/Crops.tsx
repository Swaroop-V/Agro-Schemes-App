import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Sprout, MapPin, Calendar, ShieldAlert, Info } from 'lucide-react';

interface Crop {
  id: string;
  name: string;
  season: string;
  location: string;
  pesticides: string;
  description: string;
}

export const Crops: React.FC = () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'crops'));
        const cropsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Crop[];
        setCrops(cropsData);
      } catch (error) {
        console.error("Error fetching crops:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  const filteredCrops = crops.filter(crop => 
    crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crop.season.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crop.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Sprout className="w-8 h-8 text-emerald-600 mr-3" />
          Crop Information
        </h1>
        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Search crops, season, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading crop details...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200">
              No crops found matching your search.
            </div>
          ) : (
            filteredCrops.map((crop) => (
              <div key={crop.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-emerald-600 px-6 py-4">
                  <h2 className="text-xl font-bold text-white">{crop.name}</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Season</p>
                      <p className="text-sm text-gray-600">{crop.season}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Suitable Location/Soil</p>
                      <p className="text-sm text-gray-600">{crop.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <ShieldAlert className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Pesticides & Insecticides</p>
                      <p className="text-sm text-gray-600">{crop.pesticides}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start pt-4 border-t border-gray-100">
                    <Info className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Description</p>
                      <p className="text-sm text-gray-600">{crop.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
