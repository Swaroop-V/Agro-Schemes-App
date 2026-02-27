import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShieldCheck, TrendingUp, HandCoins } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-emerald-50">
      {/* Hero Section */}
      <div className="bg-emerald-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sprout className="h-20 w-20 mx-auto text-emerald-400 mb-6" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Welcome to AgroSchemesApp
          </h1>
          <p className="text-xl text-emerald-200 max-w-2xl mx-auto mb-8">
            Empowering farmers with comprehensive crop information, pesticide guidance, and access to government aided schemes.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/register" className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors shadow-lg">
              Get Started
            </Link>
            <Link to="/login" className="bg-transparent border-2 border-emerald-500 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How We Help Farmers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md border border-emerald-100 flex flex-col items-center text-center">
            <div className="bg-emerald-100 p-4 rounded-full mb-4">
              <Sprout className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Crop Details</h3>
            <p className="text-gray-600">
              Get extensive instructions on which crops to plant during which seasons and which are most suited to your location.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-emerald-100 flex flex-col items-center text-center">
            <div className="bg-emerald-100 p-4 rounded-full mb-4">
              <ShieldCheck className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Pesticide Info</h3>
            <p className="text-gray-600">
              Access complete pesticide and insecticide information to protect your crops effectively and safely.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-emerald-100 flex flex-col items-center text-center">
            <div className="bg-emerald-100 p-4 rounded-full mb-4">
              <HandCoins className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Govt Schemes</h3>
            <p className="text-gray-600">
              Stay up to date on financial information and apply for government aided schemes directly through the app.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
