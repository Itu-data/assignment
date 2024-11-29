'use client';
import { Role } from '@/types/roles';

interface RoleSelectorProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
}

export default function RoleSelector({ currentRole, onRoleChange }: RoleSelectorProps) {
  const roles: { type: Role; icon: JSX.Element; description: string }[] = [
    {
      type: 'student',
      description: 'Apply for programs and track your applications',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      type: 'teacher',
      description: 'Manage faculties and review applications',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
    },
    {
      type: 'admin',
      description: 'Manage institutions and system settings',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const handleRoleClick = async (role: Role) => {
    try {
      // Add visual feedback
      const button = document.querySelector(`[data-role="${role}"]`);
      if (button) {
        button.classList.add('scale-95');
      }

      // Call the onRoleChange prop
      onRoleChange(role);

      // Remove the visual feedback after a short delay
      setTimeout(() => {
        if (button) {
          button.classList.remove('scale-95');
        }
      }, 150);

    } catch (error) {
      console.error('Error selecting role:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {roles.map(({ type, icon, description }) => (
        <button
          key={type}
          data-role={type}
          onClick={() => handleRoleClick(type)}
          className={`
            flex items-center space-x-4 p-4 rounded-lg transition-all duration-200
            bg-white text-gray-700 hover:bg-gray-50 hover:shadow border
            transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500
          `}
        >
          <div className="p-2 rounded-full bg-gray-100">
            {icon}
          </div>
          <div className="flex flex-col items-start">
            <span className="text-lg font-medium capitalize">{type}</span>
            <span className="text-sm text-gray-500">{description}</span>
          </div>
        </button>
      ))}
    </div>
  );
} 