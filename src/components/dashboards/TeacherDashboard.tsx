'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TeacherDashboard() {
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
              <h1 className="text-xl font-bold text-gray-900">Institute Dashboard</h1>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/teacher/profile')}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Faculty Management */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Faculty Management</h2>
            <div className="space-y-4">
              <button
                onClick={() => router.push('/teacher/faculty/add')}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <h3 className="font-medium text-blue-600">Add Faculty</h3>
                <p className="text-sm text-gray-500">Create new faculty</p>
              </button>

              <button
                onClick={() => router.push('/teacher/courses/add')}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <h3 className="font-medium text-green-600">Add Course</h3>
                <p className="text-sm text-gray-500">Add course to faculty</p>
              </button>
            </div>
          </div>

          {/* Application Management */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Application Management</h2>
            <div className="space-y-4">
              <button
                onClick={() => router.push('/teacher/applications')}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <h3 className="font-medium text-purple-600">View Applications</h3>
                <p className="text-sm text-gray-500">Review student applications</p>
              </button>

              <button
                onClick={() => router.push('/teacher/admissions/publish')}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <h3 className="font-medium text-yellow-600">Publish Admission</h3>
                <p className="text-sm text-gray-500">Create new admission announcement</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 