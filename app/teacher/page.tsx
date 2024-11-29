'use client';
import { useState } from 'react';
import TeacherDashboard from '@/components/dashboards/TeacherDashboard';
import SimpleLogin from '@/components/SimpleLogin';
import { SharedStateProvider } from '@/context/SharedStateContext';
import { UIProvider } from '@/context/UIContext';

export default function TeacherPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (email: string, password: string) => {
    // Simple login - no validation
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <SimpleLogin role="Teacher" onLogin={handleLogin} />;
  }

  return (
    <UIProvider>
      <SharedStateProvider>
        <TeacherDashboard />
      </SharedStateProvider>
    </UIProvider>
  );
} 