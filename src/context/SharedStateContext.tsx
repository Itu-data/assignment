'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Notification {
  id: string;
  from: string;
  to: string;
  title: string;
  message: string;
  type: 'application' | 'admission' | 'system' | 'message';
  status: 'unread' | 'read';
  timestamp: Date;
  data?: any;
}

interface SharedStateContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'status'>) => void;
  markNotificationAsRead: (id: string) => void;
  getNotificationsForRole: (role: string) => Notification[];
  sendMessageToRole: (from: string, to: string, title: string, message: string, data?: any) => void;
}

const SharedStateContext = createContext<SharedStateContextType | undefined>(undefined);

export function SharedStateProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'status'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      status: 'unread'
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, status: 'read' } : notif
      )
    );
  };

  const getNotificationsForRole = (role: string) => {
    return notifications.filter(notif => notif.to === role);
  };

  const sendMessageToRole = (
    from: string,
    to: string,
    title: string,
    message: string,
    data?: any
  ) => {
    addNotification({
      from,
      to,
      title,
      message,
      type: 'message',
      data
    });
  };

  return (
    <SharedStateContext.Provider
      value={{
        notifications,
        addNotification,
        markNotificationAsRead,
        getNotificationsForRole,
        sendMessageToRole
      }}
    >
      {children}
    </SharedStateContext.Provider>
  );
}

export function useSharedState() {
  const context = useContext(SharedStateContext);
  if (context === undefined) {
    throw new Error('useSharedState must be used within a SharedStateProvider');
  }
  return context;
} 