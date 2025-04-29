"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CalendarIcon, Clock, ChevronLeft, ChevronRight, Plus, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function SessionsCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState<"calendar" | "list">("calendar")

  // Mock data for sessions
  const sessions = [
    {
      id: "session_1",
      title: "PORTFOLIO REVIEW",
      mentor: {
        name: "Sarah Johnson",
        role: "Creative Director",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: new Date(),
      time: "2:00 PM",
      duration: 30,
      status: "upcoming",
    },
    {
      id: "session_2",
      title: "CAREER GUIDANCE",
      mentor: {
        name: "Michael Chen",
        role: "Design Lead",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: new Date(Date.now() + 86400000), // Tomorrow
      time: "11:00 AM",
      duration: 45,
      status: "upcoming",
    },
    {
      id: "session_3",
      title: "DESIGN CRITIQUE",
      mentor: {
        name: "Emma Thompson",
        role: "Fashion Designer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: new Date(Date.now() - 172800000), // 2 days ago
      time: "3:30 PM",
      duration: 60,
      status: "completed",
    },
  ]

  // Filter sessions for the selected date
  const filteredSessions = sessions.filter((session) => {
    if (!date) return false

    return (
      session.date.getDate() === date.getDate() &&
      session.date.getMonth() === date.getMonth() &&
      session.date.getFullYear() === date.getFullYear()
    )
  })

  // Get all upcoming sessions
  const upcomingSessions = sessions
    .filter((session) => session.status === "upcoming")
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  // Get all completed sessions
  const completedSessions = sessions
    .filter((session) => session.status === "completed")
    .sort((a, b) => b.date.getTime() - a.date.getTime())

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">"SESSIONS"</h1>
          <p className="text-gray-500">Manage your mentorship sessions</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex border border-black rounded-md overflow-hidden">
            <Button
              variant="ghost"
              className={`rounded-none h-9 px-3 ${view === "calendar" ? "bg-black text-white" : ""}`}
              onClick={() => setView("calendar")}
            >
              Calendar
            </Button>
            <Button
              variant="ghost"
              className={`rounded-none h-9 px-3 ${view === "list" ? "bg-black text-white" : ""}`}
              onClick={() => setView("list")}
            >
              List
            </Button>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Plus className="mr-2 h-4 w-4" />
                Book Session
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>"BOOK A SESSION"</DialogTitle>
                <DialogDescription>Select a mentor, date, and time to schedule your session.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <h3 className="font-medium">Select Mentor</h3>
                  <Select>
                    <SelectTrigger className="border-black">
                      <SelectValue placeholder="Choose a mentor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="michael">Michael Chen</SelectItem>
                      <SelectItem value="emma">Emma Thompson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <h3 className="font-medium">Select Session Type</h3>
                  <Select>
                    <SelectTrigger className="border-black">
                      <SelectValue placeholder="Choose session type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="portfolio">Portfolio Review (30 min)</SelectItem>
                      <SelectItem value="career">Career Guidance (45 min)</SelectItem>
                      <SelectItem value="design">Design Critique (60 min)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <h3 className="font-medium">Select Date</h3>
                  <Calendar mode="single" selected={date} onSelect={setDate} className="border rounded-md" />
                </div>
                <div className="grid gap-2">
                  <h3 className="font-medium">Select Time</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"].map((time, index) => (
                      <div
                        key={index}
                        className="p-2 border border-gray-200 rounded-md text-center cursor-pointer hover:border-black"
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-black text-white hover:bg-gray-800">Confirm Booking</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {view === "calendar" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 border-black md:col-span-1">
            <CardContent className="p-4">
              <Calendar mode="single" selected={date} onSelect={setDate} className="mx-auto" />

              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="font-medium mb-2">Sessions for {formatDate(date || new Date())}</h3>
                {filteredSessions.length > 0 ? (
                  <div className="space-y-3">
                    {filteredSessions.map((session) => (
                      <div key={session.id} className="flex items-center gap-2 p-2 border border-gray-200 rounded-md">
                        <div className="h-2 w-2 rounded-full bg-black"></div>
                        <span className="text-sm">
                          {session.time} - {session.title}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No sessions scheduled for this day.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-black md:col-span-2">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <h2 className="font-medium">{formatDate(date || new Date())}</h2>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-black">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Session
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    {/* Same content as the Book Session dialog */}
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {filteredSessions.length > 0 ? (
                  filteredSessions.map((session) => (
                    <Link key={session.id} href={`/dashboard/sessions/${session.id}`}>
                      <Card className="border border-gray-200 hover:border-black transition-colors">
                        <CardContent className="p-4 flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            <div className="text-sm font-medium">{session.time}</div>
                            <div className="text-xs text-gray-500">{session.duration} min</div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium">"{session.title}"</h3>
                              <Badge
                                className={
                                  session.status === "upcoming" ? "bg-[#FFA500] text-black" : "bg-green-500 text-white"
                                }
                              >
                                {session.status === "upcoming" ? "Upcoming" : "Completed"}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="relative w-6 h-6 rounded-full overflow-hidden border border-black">
                                <Image
                                  src={session.mentor.avatar || "/placeholder.svg"}
                                  alt={session.mentor.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-sm">{session.mentor.name}</p>
                                <p className="text-xs text-gray-500">{session.mentor.role}</p>
                              </div>
                            </div>
                          </div>
                          {session.status === "upcoming" && (
                            <Button className="bg-black text-white hover:bg-gray-800">
                              <Video className="mr-2 h-4 w-4" />
                              Join
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No sessions scheduled</h3>
                    <p className="text-gray-500 mb-4">You don't have any sessions scheduled for this day.</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-black text-white hover:bg-gray-800">
                          <Plus className="mr-2 h-4 w-4" />
                          Book a Session
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        {/* Same content as the Book Session dialog */}
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold tracking-tight mb-4">"UPCOMING SESSIONS"</h2>
            {upcomingSessions.length > 0 ? (
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <Link key={session.id} href={`/dashboard/sessions/${session.id}`}>
                    <Card className="border-2 border-black">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex flex-col items-center p-3 bg-gray-100 rounded-md">
                            <CalendarIcon className="h-5 w-5 mb-1" />
                            <div className="text-sm font-medium">{session.date.getDate()}</div>
                            <div className="text-xs">{session.date.toLocaleString("default", { month: "short" })}</div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium">"{session.title}"</h3>
                              <Badge className="bg-[#FFA500] text-black">{session.duration} min</Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{session.time}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-3">
                              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-black">
                                <Image
                                  src={session.mentor.avatar || "/placeholder.svg"}
                                  alt={session.mentor.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{session.mentor.name}</p>
                                <p className="text-xs text-gray-500">{session.mentor.role}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button className="bg-black text-white hover:bg-gray-800">
                              <Video className="mr-2 h-4 w-4" />
                              Join
                            </Button>
                            <Button variant="outline" className="border-black">
                              Reschedule
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="border-2 border-black">
                <CardContent className="p-6 text-center">
                  <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No upcoming sessions</h3>
                  <p className="text-gray-500 mb-4">You don't have any sessions scheduled.</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-black text-white hover:bg-gray-800">
                        <Plus className="mr-2 h-4 w-4" />
                        Book a Session
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      {/* Same content as the Book Session dialog */}
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight mb-4">"COMPLETED SESSIONS"</h2>
            {completedSessions.length > 0 ? (
              <div className="space-y-4">
                {completedSessions.map((session) => (
                  <Link key={session.id} href={`/dashboard/sessions/${session.id}`}>
                    <Card className="border border-gray-200 hover:border-black transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex flex-col items-center p-3 bg-gray-100 rounded-md">
                            <CalendarIcon className="h-5 w-5 mb-1" />
                            <div className="text-sm font-medium">{session.date.getDate()}</div>
                            <div className="text-xs">{session.date.toLocaleString("default", { month: "short" })}</div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium">"{session.title}"</h3>
                              <Badge className="bg-green-500 text-white">Completed</Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{session.time}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-3">
                              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-black">
                                <Image
                                  src={session.mentor.avatar || "/placeholder.svg"}
                                  alt={session.mentor.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{session.mentor.name}</p>
                                <p className="text-xs text-gray-500">{session.mentor.role}</p>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" className="border-black">
                            View Notes
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="border border-gray-200">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-medium mb-2">No completed sessions</h3>
                  <p className="text-gray-500">You haven't completed any sessions yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
