"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function ProfileSettings() {
  const [name, setName] = useState("YOUR NAME")
  const [email, setEmail] = useState("email@example.com")
  const [bio, setBio] = useState("Fashion Design Student")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted", { name, email, bio })
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 space-y-4">
        <Card className="border border-black">
          <CardHeader>
            <CardTitle>"PROFILE INFORMATION"</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="secondary" size="sm">
                  Change Avatar
                </Button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">"NAME"</Label>
                  <Input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-black"
                  />
                </div>
                <div>
                  <Label htmlFor="email">"EMAIL"</Label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-black"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="bio">"BIO"</Label>
                <Input id="bio" value={bio} onChange={(e) => setBio(e.target.value)} className="border-black" />
              </div>
              <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border border-black">
          <CardHeader>
            <CardTitle>"ACCOUNT SETTINGS"</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Button variant="outline" className="border-black">
                Change Password
              </Button>
            </div>
            <div>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
