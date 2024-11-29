'use client';
import { useState } from 'react';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
import SimpleLogin from '@/components/SimpleLogin';
import { SharedStateProvider } from '@/context/SharedStateContext';
import { UIProvider } from '@/context/UIContext';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (email: string, password: string) => {
    // Simple login - no validation
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <SimpleLogin role="Admin" onLogin={handleLogin} />;
  }

  return (
    <UIProvider>
      <SharedStateProvider>
        <AdminDashboard />
      </SharedStateProvider>
    </UIProvider>
  );
} 