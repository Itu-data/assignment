'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

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
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin/profile')}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md 
                hover:bg-blue-700 transition-colors duration-200"
              >
                Profile
              </button>

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
        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Institution Management */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Institution Management</h2>
            <div className="space-y-4">
              <button
                onClick={() => router.push('/admin/institutions/add')}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <h3 className="font-medium text-blue-600">Add Institution</h3>
                <p className="text-sm text-gray-500">Add new learning institution</p>
              </button>

              <button
                onClick={() => router.push('/admin/faculties/add')}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <h3 className="font-medium text-green-600">Add Faculty</h3>
                <p className="text-sm text-gray-500">Create new faculty</p>
              </button>

              <button
                onClick={() => router.push('/admin/courses/add')}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <h3 className="font-medium text-purple-600">Add Course</h3>
                <p className="text-sm text-gray-500">Add course to faculty</p>
              </button>

              {/* <button
                onClick={() => router.push('/admin/institutions/manage')}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <h3 className="font-medium text-red-600">Manage Institutions</h3>
                <p className="text-sm text-gray-500">View, edit or delete institutions and courses</p>
              </button> */}
            </div>
          </div>

          {/* Admissions Management */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Admissions Management</h2>
            <div className="space-y-4">
              <button
                onClick={() => router.push('/admin/admissions/publish')}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <h3 className="font-medium text-blue-600">Publish Admission</h3>
                <p className="text-sm text-gray-500">Create new admission announcement</p>
              </button>

              <button
                onClick={() => router.push('/admin/admissions')}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <h3 className="font-medium text-green-600">View Admissions</h3>
                <p className="text-sm text-gray-500">Manage published admissions</p>
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
} 