"use client"

export default function StudentDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
      <div className="grid gap-6">
        <div className="border p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Quick Actions</h2>
          <div className="grid gap-2">
            <button className="bg-blue-500 text-white p-2 rounded">
              Apply for Courses
            </button>
            <button className="bg-green-500 text-white p-2 rounded">
              View Applications
            </button>
            <button className="bg-purple-500 text-white p-2 rounded">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 