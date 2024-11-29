'use client';
import { useState } from 'react';
import RoleSelector from './RoleSelector';
import NotificationCenter from './NotificationCenter';
import { Role } from '@/types/roles';

interface LayoutProps {
  children: React.ReactNode;
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  isLoggedIn: boolean;
}

export default function Layout({ children, currentRole, onRoleChange, isLoggedIn }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-8">Welcome to Academic Portal</h1>
          <h2 className="text-xl font-semibold text-center mb-6">Select Your Role</h2>
          <RoleSelector 
            currentRole={currentRole} 
            onRoleChange={(role) => {
              onRoleChange(role);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="ml-4 font-semibold text-xl text-gray-800">
                Academic Portal
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationCenter role={currentRole} />
              <button 
                onClick={() => setShowRoleSelector(true)}
                className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                {currentRole[0].toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar - Only shown when hamburger is clicked */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-20" onClick={() => setIsSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div 
            className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg pt-16"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Links</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center space-x-2">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Dashboard</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center space-x-2">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Profile</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center space-x-2">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Calendar</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center space-x-2">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>Resources</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Role Selector Modal */}
      {showRoleSelector && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowRoleSelector(false)}
        >
          <div 
            className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full m-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Switch Role</h2>
              <button 
                onClick={() => setShowRoleSelector(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <RoleSelector 
              currentRole={currentRole} 
              onRoleChange={(role) => {
                onRoleChange(role);
                setShowRoleSelector(false);
              }} 
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-16">
        <div className={`transition-all duration-300 ease-in-out p-8`}>
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 