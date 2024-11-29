"use client"

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-6">
        <div className="border p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Quick Actions</h2>
          <div className="grid gap-2">
            <button className="bg-blue-500 text-white p-2 rounded">
              Add Institution
            </button>
            <button className="bg-green-500 text-white p-2 rounded">
              Manage Faculties
            </button>
            <button className="bg-purple-500 text-white p-2 rounded">
              Publish Admissions
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 