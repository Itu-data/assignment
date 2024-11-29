'use client';
import { useState } from 'react';
import StudentDashboard from '@/components/dashboards/StudentDashboard';
import SimpleLogin from '@/components/SimpleLogin';
import { SharedStateProvider } from '@/context/SharedStateContext';
import { UIProvider } from '@/context/UIContext';

export default function StudentPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (email: string, password: string) => {
    // Simple login - no validation
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <SimpleLogin role="Student" onLogin={handleLogin} />;
  }

  return (
    <UIProvider>
      <SharedStateProvider>
        <StudentDashboard />
      </SharedStateProvider>
    </UIProvider>
  );
} 