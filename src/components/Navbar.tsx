import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { Sprout, LogOut, User as UserIcon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="bg-emerald-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-emerald-300" />
              <span className="font-bold text-xl tracking-tight">AgroSchemes</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                {userRole === 'admin' ? (
                  <>
                    <Link to="/admin" className="hover:text-emerald-200 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                    <Link to="/admin/crops" className="hover:text-emerald-200 px-3 py-2 rounded-md text-sm font-medium">Manage Crops</Link>
                    <Link to="/admin/schemes" className="hover:text-emerald-200 px-3 py-2 rounded-md text-sm font-medium">Manage Schemes</Link>
                    <Link to="/admin/requests" className="hover:text-emerald-200 px-3 py-2 rounded-md text-sm font-medium">Scheme Requests</Link>
                  </>
                ) : (
                  <>
                    <Link to="/user" className="hover:text-emerald-200 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                    <Link to="/user/crops" className="hover:text-emerald-200 px-3 py-2 rounded-md text-sm font-medium">Crops</Link>
                    <Link to="/user/schemes" className="hover:text-emerald-200 px-3 py-2 rounded-md text-sm font-medium">Schemes</Link>
                    <Link to="/user/applications" className="hover:text-emerald-200 px-3 py-2 rounded-md text-sm font-medium">My Applications</Link>
                  </>
                )}
                <div className="flex items-center space-x-2 ml-4 border-l border-emerald-600 pl-4">
                  <span className="text-sm text-emerald-200 flex items-center">
                    <UserIcon className="w-4 h-4 mr-1" />
                    {currentUser.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-sm font-medium text-emerald-100 hover:text-white bg-emerald-800 hover:bg-emerald-900 px-3 py-2 rounded-md transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-emerald-200 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                <Link to="/register" className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-md text-sm font-medium transition-colors">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
