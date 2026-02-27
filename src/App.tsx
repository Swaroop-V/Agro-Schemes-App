import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { isFirebaseConfigured } from './firebase';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

// Admin Pages
import { AdminDashboard } from './pages/admin/Dashboard';
import { ManageCrops } from './pages/admin/ManageCrops';
import { ManageSchemes } from './pages/admin/ManageSchemes';
import { SchemeRequests } from './pages/admin/SchemeRequests';

// User Pages
import { UserDashboard } from './pages/user/Dashboard';
import { Crops } from './pages/user/Crops';
import { Schemes } from './pages/user/Schemes';
import { MyApplications } from './pages/user/MyApplications';

export default function App() {
  if (!isFirebaseConfigured) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl w-full border border-red-200">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Firebase Configuration Missing</h1>
          <p className="text-gray-700 mb-4">
            The application cannot start because the Firebase environment variables are not set.
          </p>
          <p className="text-gray-700 mb-4">
            Please add the following variables to your environment/secrets:
          </p>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1 mb-6 font-mono">
            <li>VITE_FIREBASE_API_KEY</li>
            <li>VITE_FIREBASE_AUTH_DOMAIN</li>
            <li>VITE_FIREBASE_PROJECT_ID</li>
            <li>VITE_FIREBASE_STORAGE_BUCKET</li>
            <li>VITE_FIREBASE_MESSAGING_SENDER_ID</li>
            <li>VITE_FIREBASE_APP_ID</li>
          </ul>
          <p className="text-sm text-gray-500">
            Check the <code>.env.example</code> file for reference.
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 font-sans">
          <Navbar />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/crops" element={<ProtectedRoute allowedRole="admin"><ManageCrops /></ProtectedRoute>} />
              <Route path="/admin/schemes" element={<ProtectedRoute allowedRole="admin"><ManageSchemes /></ProtectedRoute>} />
              <Route path="/admin/requests" element={<ProtectedRoute allowedRole="admin"><SchemeRequests /></ProtectedRoute>} />

              {/* User Routes */}
              <Route path="/user" element={<ProtectedRoute allowedRole="user"><UserDashboard /></ProtectedRoute>} />
              <Route path="/user/crops" element={<ProtectedRoute allowedRole="user"><Crops /></ProtectedRoute>} />
              <Route path="/user/schemes" element={<ProtectedRoute allowedRole="user"><Schemes /></ProtectedRoute>} />
              <Route path="/user/applications" element={<ProtectedRoute allowedRole="user"><MyApplications /></ProtectedRoute>} />
            </Routes>
          </main>
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}
