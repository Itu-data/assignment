"use client"

export default function InstituteDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Institute Dashboard</h1>
      <div className="grid gap-6">
        <div className="border p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Quick Actions</h2>
          <div className="grid gap-2">
            <button className="bg-blue-500 text-white p-2 rounded">
              Add Faculty
            </button>
            <button className="bg-green-500 text-white p-2 rounded">
              Manage Courses
            </button>
            <button className="bg-yellow-500 text-white p-2 rounded">
              View Applications
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 