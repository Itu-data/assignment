'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST'
      });
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Student Dashboard</h1>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-4">
              {/* Apply Button */}

              {/* View Admissions Button */}
              

              {/* Profile Button */}
              <button
                onClick={() => router.push('/student/profile')}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md 
                hover:bg-purple-700 transition-colors duration-200"
              >
                Profile
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md 
                hover:bg-red-700 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Overview */}
        
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/student/apply')}
              className="p-4 text-left hover:bg-gray-50 rounded-lg border border-gray-200"
            >
              <h4 className="font-medium text-gray-900">New Application</h4>
              <p className="text-sm text-gray-500">Start a new application</p>
            </button>
            <button
              onClick={() => router.push('/student/admissions')}
              className="p-4 text-left hover:bg-gray-50 rounded-lg border border-gray-200"
            >
              <h4 className="font-medium text-gray-900">Check Admissions</h4>
              <p className="text-sm text-gray-500">View available admissions</p>
            </button>
            <button
              onClick={() => router.push('/student/profile')}
              className="p-4 text-left hover:bg-gray-50 rounded-lg border border-gray-200"
            >
              <h4 className="font-medium text-gray-900">Update Profile</h4>
              <p className="text-sm text-gray-500">Complete your profile</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 