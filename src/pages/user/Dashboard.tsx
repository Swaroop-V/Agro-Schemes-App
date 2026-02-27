import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { Sprout, HandCoins, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UserDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    crops: 0,
    schemes: 0,
    myApplications: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!currentUser) return;
      
      try {
        const cropsSnap = await getDocs(collection(db, 'crops'));
        const schemesSnap = await getDocs(collection(db, 'schemes'));
        
        const appsQuery = query(collection(db, 'applications'), where('userId', '==', currentUser.uid));
        const appsSnap = await getDocs(appsQuery);

        setStats({
          crops: cropsSnap.size,
          schemes: schemesSnap.size,
          myApplications: appsSnap.size
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [currentUser]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading dashboard...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Farmer Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center">
          <div className="bg-emerald-100 p-4 rounded-lg mr-4">
            <Sprout className="h-8 w-8 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Available Crops Info</p>
            <p className="text-2xl font-bold text-gray-900">{stats.crops}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center">
          <div className="bg-purple-100 p-4 rounded-lg mr-4">
            <HandCoins className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Available Schemes</p>
            <p className="text-2xl font-bold text-gray-900">{stats.schemes}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center">
          <div className="bg-blue-100 p-4 rounded-lg mr-4">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">My Applications</p>
            <p className="text-2xl font-bold text-gray-900">{stats.myApplications}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/user/crops" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
          <Sprout className="h-12 w-12 text-emerald-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">View Crops</h2>
          <p className="text-gray-500 text-sm">Browse detailed information about various crops, suitable seasons, and locations.</p>
        </Link>
        
        <Link to="/user/schemes" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
          <HandCoins className="h-12 w-12 text-purple-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Govt Schemes</h2>
          <p className="text-gray-500 text-sm">Explore and apply for government aided agricultural schemes and financial aid.</p>
        </Link>
        
        <Link to="/user/applications" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
          <FileText className="h-12 w-12 text-blue-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">My Applications</h2>
          <p className="text-gray-500 text-sm">Track the status of your submitted scheme applications.</p>
        </Link>
      </div>
    </div>
  );
};
