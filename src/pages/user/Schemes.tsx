import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { HandCoins, Calendar, Building, CheckCircle } from 'lucide-react';

interface Scheme {
  id: string;
  title: string;
  provider: string;
  eligibility: string;
  benefits: string;
  deadline: string;
}

export const Schemes: React.FC = () => {
  const { currentUser } = useAuth();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [appliedSchemes, setAppliedSchemes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchemesAndApplications = async () => {
      if (!currentUser) return;

      try {
        // Fetch all schemes
        const schemesSnap = await getDocs(collection(db, 'schemes'));
        const schemesData = schemesSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Scheme[];
        setSchemes(schemesData);

        // Fetch user's applications to disable apply button for already applied schemes
        const appsQuery = query(collection(db, 'applications'), where('userId', '==', currentUser.uid));
        const appsSnap = await getDocs(appsQuery);
        const appliedIds = new Set(appsSnap.docs.map(doc => doc.data().schemeId));
        setAppliedSchemes(appliedIds);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemesAndApplications();
  }, [currentUser]);

  const handleApply = async (scheme: Scheme) => {
    if (!currentUser) return;
    
    setApplyingId(scheme.id);
    try {
      await addDoc(collection(db, 'applications'), {
        schemeId: scheme.id,
        schemeTitle: scheme.title,
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Farmer',
        userEmail: currentUser.email,
        status: 'pending',
        appliedAt: new Date().toISOString(),
        notes: ''
      });
      
      toast.success(`Successfully applied for ${scheme.title}`);
      setAppliedSchemes(prev => new Set(prev).add(scheme.id));
    } catch (error) {
      console.error("Error applying for scheme:", error);
      toast.error("Failed to apply. Please try again.");
    } finally {
      setApplyingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <HandCoins className="w-8 h-8 text-purple-600 mr-3" />
        Government Schemes
      </h1>

      {loading ? (
        <div className="text-center py-12">Loading schemes...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {schemes.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200">
              No government schemes available at the moment.
            </div>
          ) : (
            schemes.map((scheme) => (
              <div key={scheme.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                <div className="bg-purple-600 px-6 py-4">
                  <h2 className="text-xl font-bold text-white">{scheme.title}</h2>
                </div>
                <div className="p-6 flex-grow space-y-4">
                  <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <Building className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="font-medium mr-2">Provider:</span> {scheme.provider}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <Calendar className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="font-medium mr-2">Deadline:</span> {new Date(scheme.deadline).toLocaleDateString()}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Eligibility Criteria</h3>
                    <p className="text-sm text-gray-600 bg-purple-50 p-3 rounded-lg border border-purple-100">{scheme.eligibility}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Benefits</h3>
                    <p className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg border border-green-100">{scheme.benefits}</p>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  {appliedSchemes.has(scheme.id) ? (
                    <button
                      disabled
                      className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-700 bg-green-100 cursor-not-allowed"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Applied
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApply(scheme)}
                      disabled={applyingId === scheme.id}
                      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${applyingId === scheme.id ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {applyingId === scheme.id ? 'Applying...' : 'Apply Now'}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
