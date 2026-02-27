import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Users, Sprout, HandCoins, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    users: 0,
    crops: 0,
    schemes: 0,
    requests: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersSnap = await getDocs(collection(db, 'users'));
        const cropsSnap = await getDocs(collection(db, 'crops'));
        const schemesSnap = await getDocs(collection(db, 'schemes'));
        const requestsSnap = await getDocs(collection(db, 'applications'));

        setStats({
          users: usersSnap.size,
          crops: cropsSnap.size,
          schemes: schemesSnap.size,
          requests: requestsSnap.size
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading dashboard...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center">
          <div className="bg-blue-100 p-4 rounded-lg mr-4">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Farmers</p>
            <p className="text-2xl font-bold text-gray-900">{stats.users}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center">
          <div className="bg-emerald-100 p-4 rounded-lg mr-4">
            <Sprout className="h-8 w-8 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Crop Details</p>
            <p className="text-2xl font-bold text-gray-900">{stats.crops}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center">
          <div className="bg-purple-100 p-4 rounded-lg mr-4">
            <HandCoins className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Govt Schemes</p>
            <p className="text-2xl font-bold text-gray-900">{stats.schemes}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center">
          <div className="bg-orange-100 p-4 rounded-lg mr-4">
            <FileText className="h-8 w-8 text-orange-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Scheme Requests</p>
            <p className="text-2xl font-bold text-gray-900">{stats.requests}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/crops" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
          <Sprout className="h-12 w-12 text-emerald-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Manage Crops</h2>
          <p className="text-gray-500 text-sm">Add, edit, or remove crop details, pesticide, and insecticide information.</p>
        </Link>
        
        <Link to="/admin/schemes" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
          <HandCoins className="h-12 w-12 text-purple-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Manage Schemes</h2>
          <p className="text-gray-500 text-sm">Post and update government aided schemes available for farmers.</p>
        </Link>
        
        <Link to="/admin/requests" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
          <FileText className="h-12 w-12 text-orange-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Scheme Requests</h2>
          <p className="text-gray-500 text-sm">Review, approve, or reject scheme applications submitted by farmers.</p>
        </Link>
      </div>
    </div>
  );
};
