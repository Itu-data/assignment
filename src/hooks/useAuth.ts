'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [showRegisterPrompt, setShowRegisterPrompt] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        setIsAuthenticated(response.ok);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const requireAuth = (callback?: () => void) => {
    if (isAuthenticated === false) {
      setShowRegisterPrompt(true);
      return false;
    }
    if (callback && isAuthenticated) {
      callback();
    }
    return true;
  };

  return {
    isAuthenticated,
    showRegisterPrompt,
    setShowRegisterPrompt,
    requireAuth
  };
} 