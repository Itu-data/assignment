"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function RoleSelector() {
  const router = useRouter()
  const [role, setRole] = useState("student")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Directly route to the appropriate dashboard based on role
    switch(role) {
      case "admin":
        router.push("/admin/dashboard")
        break
      case "institute":
        router.push("/institute/dashboard")
        break
      case "student":
        router.push("/student/dashboard")
        break
      default:
        router.push("/")
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Select your role to continue
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Choose Role</Label>
          <RadioGroup
            defaultValue="student"
            value={role}
            onValueChange={setRole}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100">
              <RadioGroupItem value="student" id="student" />
              <Label htmlFor="student" className="flex-grow cursor-pointer">Student</Label>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100">
              <RadioGroupItem value="institute" id="institute" />
              <Label htmlFor="institute" className="flex-grow cursor-pointer">Institute</Label>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100">
              <RadioGroupItem value="admin" id="admin" />
              <Label htmlFor="admin" className="flex-grow cursor-pointer">Admin</Label>
            </div>
          </RadioGroup>
        </div>
        <Button type="submit" className="w-full">
          Continue to Dashboard
        </Button>
      </form>
    </div>
  )
} 