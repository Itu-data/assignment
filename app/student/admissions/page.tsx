'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Admission {
  id: string;
  course_name: string;
  faculty_name: string;
  start_date: string;
  end_date: string;
  capacity: number;
  requirements: string;
  description: string;
  status: string;
}

export default function StudentAdmissionsPage() {
  const router = useRouter();
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      const response = await fetch('/api/student/admissions/list');
      if (!response.ok) throw new Error('Failed to fetch admissions');
      const data = await response.json();
      setAdmissions(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Available Admissions</h1>
          <button
            onClick={() => router.push('/student/dashboard')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Back to Dashboard
          </button>
        </div>

        {admissions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-gray-500">No admissions available at the moment</p>
          </div>
        ) : (
          <div className="space-y-6">
            {admissions.map((admission) => (
              <div key={admission.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{admission.course_name}</h2>
                      <p className="mt-1 text-sm text-gray-500">Faculty: {admission.faculty_name}</p>
                    </div>
                    <span className="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                      {admission.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Application Period</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {new Date(admission.start_date).toLocaleDateString()} - 
                        {new Date(admission.end_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Available Seats</h3>
                      <p className="mt-1 text-sm text-gray-500">{admission.capacity}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700">Requirements</h3>
                    <p className="mt-1 text-sm text-gray-500">{admission.requirements}</p>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700">Description</h3>
                    <p className="mt-1 text-sm text-gray-500">{admission.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 