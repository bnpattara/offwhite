"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight, Users, MessageSquare, ChevronRight, Video, Upload, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider"

export function MentorDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const upcomingSessions = [
    {
      id: "session_1",
      title: "PORTFOLIO REVIEW",
      mentee: "Alex Johnson",
      menteeRole: "Fashion Design Student",
      menteeAvatar: "/placeholder.svg?height=40&width=40",
      date: "Today",
      time: "2:00 PM",
      duration: 30,
    },
    {
      id: "session_2",
      title: "CAREER GUIDANCE",
      mentee: "Jamie Smith",
      menteeRole: "Design Student",
      menteeAvatar: "/placeholder.svg?height=40&width=40",
      date: "Tomorrow",
      time: "11:00 AM",
      duration: 45,
    },
  ]

  const mentees = [
    {
      id: "mentee_1",
      name: "Alex Johnson",
      role: "Fashion Design Student",
      avatar: "/placeholder.svg?height=64&width=64",
      progress: 60,
      lastSession: "2 days ago",
    },
    {
      id: "mentee_2",
      name: "Jamie Smith",
      role: "Design Student",
      avatar: "/placeholder.svg?height=64&width=64",
      progress: 45,
      lastSession: "1 week ago",
    },
    {
      id: "mentee_3",
      name: "Taylor Wilson",
      role: "Fashion Marketing Student",
      avatar: "/placeholder.svg?height=64&width=64",
      progress: 75,
      lastSession: "3 days ago",
    },
  ]

  const recentMessages = [
    {
      id: "message_1",
      from: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      message: "Thank you for the feedback on my portfolio!",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: "message_2",
      from: "Jamie Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      message: "Looking forward to our session tomorrow",
      time: "Yesterday",
      unread: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">"MENTOR DASHBOARD"</h1>
          <p className="text-gray-500">Welcome back, {user?.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-black">
            <Upload className="mr-2 h-4 w-4" />
            Upload Resource
          </Button>
          <Button className="bg-black text-white hover:bg-gray-800">
            <Video className="mr-2 h-4 w-4" />
            Start Session
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-transparent border-b border-gray-200 rounded-none p-0 h-auto">
          <TabsTrigger
            value="overview"
            className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
              activeTab === "overview" ? "border-black text-black" : "border-transparent text-gray-500"
            }`}
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="mentees"
            className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
              activeTab === "mentees" ? "border-black text-black" : "border-transparent text-gray-500"
            }`}
          >
            Mentees
          </TabsTrigger>
          <TabsTrigger
            value="resources"
            className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
              activeTab === "resources" ? "border-black text-black" : "border-transparent text-gray-500"
            }`}
          >
            Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-2 border-black">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">"TOTAL MENTEES"</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-xs text-gray-500 mt-1">+2 this month</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-black">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">"SESSIONS COMPLETED"</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">48</div>
                <p className="text-xs text-gray-500 mt-1">+5 this month</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-black">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">"HOURS MENTORED"</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">36.5</div>
                <p className="text-xs text-gray-500 mt-1">+4.5 this month</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-black">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">"AVERAGE RATING"</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4.9</div>
                <p className="text-xs text-gray-500 mt-1">From 32 reviews</p>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Sessions */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold tracking-tight">"UPCOMING SESSIONS"</h2>
              <Link href="/dashboard/sessions">
                <Button variant="link" className="text-black p-0 h-auto">
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingSessions.map((session) => (
                <Card key={session.id} className="border-2 border-black overflow-hidden">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          <span className="text-sm text-gray-600">
                            {session.date}, {session.time}
                          </span>
                        </div>
                        <h3 className="font-medium">"{session.title}"</h3>
                      </div>
                      <Badge className="bg-[#FFA500] hover:bg-[#FF8C00] text-black">{session.duration} min</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-black">
                        <Image
                          src={session.menteeAvatar || "/placeholder.svg"}
                          alt={session.mentee}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{session.mentee}</p>
                        <p className="text-xs text-gray-600">{session.menteeRole}</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" className="border-black text-xs h-8">
                        Reschedule
                      </Button>
                      <Link href={`/dashboard/video-call/${session.id}`}>
                        <Button className="bg-black text-white hover:bg-gray-800 text-xs h-8">Start Call</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Recent Messages */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold tracking-tight">"RECENT MESSAGES"</h2>
              <Link href="/dashboard/messages">
                <Button variant="link" className="text-black p-0 h-auto">
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <Card className="border-2 border-black">
              <CardContent className="p-4 divide-y">
                {recentMessages.map((message) => (
                  <div key={message.id} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-black">
                          <Image
                            src={message.avatar || "/placeholder.svg"}
                            alt={message.from}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        {message.unread && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FFA500] rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-medium truncate">{message.from}</h3>
                          <span className="text-xs text-gray-500 flex-shrink-0">{message.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{message.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <div className="p-4 border-t border-gray-200">
                <Link href="/dashboard/messages">
                  <Button className="w-full bg-black text-white hover:bg-gray-800">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    View All Messages
                  </Button>
                </Link>
              </div>
            </Card>
          </section>

          {/* Mentee Progress */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold tracking-tight">"MENTEE PROGRESS"</h2>
              <Link href="/dashboard/mentees">
                <Button variant="link" className="text-black p-0 h-auto">
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <Card className="border-2 border-black">
              <CardContent className="p-4">
                <div className="space-y-6">
                  {mentees.slice(0, 3).map((mentee) => (
                    <div key={mentee.id} className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-black flex-shrink-0">
                        <Image
                          src={mentee.avatar || "/placeholder.svg"}
                          alt={mentee.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-medium truncate">{mentee.name}</h3>
                          <span className="text-xs text-gray-500">Last session: {mentee.lastSession}</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{mentee.role}</p>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-black rounded-full" style={{ width: `${mentee.progress}%` }}></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>Overall progress</span>
                          <span>{mentee.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <div className="p-4 border-t border-gray-200">
                <Link href="/dashboard/mentees">
                  <Button className="w-full bg-black text-white hover:bg-gray-800">
                    <Users className="mr-2 h-4 w-4" />
                    View All Mentees
                  </Button>
                </Link>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="mentees" className="space-y-6">
          {/* Mentees List */}
          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle>"MY MENTEES"</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mentees.map((mentee) => (
                  <div
                    key={mentee.id}
                    className="flex items-start gap-4 pb-6 border-b border-gray-200 last:border-0 last:pb-0"
                  >
                    <div className="relative w-16 h-16 rounded-md overflow-hidden border border-black flex-shrink-0">
                      <Image
                        src={mentee.avatar || "/placeholder.svg"}
                        alt={mentee.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-medium">{mentee.name}</h3>
                        <span className="text-xs text-gray-500">Last session: {mentee.lastSession}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{mentee.role}</p>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-black rounded-full" style={{ width: `${mentee.progress}%` }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1 mb-3">
                        <span>Overall progress</span>
                        <span>{mentee.progress}%</span>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/dashboard/messages/${mentee.id}`}>
                          <Button variant="outline" size="sm" className="h-8 border-black">
                            <MessageSquare className="mr-2 h-3 w-3" />
                            Message
                          </Button>
                        </Link>
                        <Link href={`/dashboard/sessions/schedule?mentee=${mentee.id}`}>
                          <Button variant="outline" size="sm" className="h-8 border-black">
                            <Calendar className="mr-2 h-3 w-3" />
                            Schedule
                          </Button>
                        </Link>
                        <Link href={`/dashboard/mentees/${mentee.id}`}>
                          <Button size="sm" className="h-8 bg-black text-white hover:bg-gray-800">
                            View Profile
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mentee Analytics */}
          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle>"MENTEE ANALYTICS"</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md mb-4">
                <BarChart3 className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 text-center">
                Detailed analytics about your mentees' progress and engagement.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          {/* My Resources */}
          <Card className="border-2 border-black">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>"MY RESOURCES"</CardTitle>
                <Button className="bg-black text-white hover:bg-gray-800">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Fashion Design Fundamentals Guide",
                    type: "PDF",
                    size: "2.4 MB",
                    uploaded: "2 weeks ago",
                    shared: 8,
                  },
                  {
                    title: "Streetwear Design Workshop",
                    type: "Video",
                    size: "156 MB",
                    uploaded: "1 month ago",
                    shared: 12,
                  },
                  {
                    title: "Material Selection Checklist",
                    type: "Document",
                    size: "540 KB",
                    uploaded: "3 days ago",
                    shared: 5,
                  },
                ].map((resource, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border border-gray-200 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                        {resource.type === "PDF" && <span className="text-red-500 font-bold">PDF</span>}
                        {resource.type === "Video" && <span className="text-blue-500 font-bold">VID</span>}
                        {resource.type === "Document" && <span className="text-green-500 font-bold">DOC</span>}
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{resource.title}</h3>
                        <p className="text-xs text-gray-500">
                          {resource.type} • {resource.size} • Uploaded {resource.uploaded}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-black">
                        Shared with {resource.shared}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resource Sharing */}
          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle>"SHARE WITH MENTEES"</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mentees.map((mentee) => (
                  <div
                    key={mentee.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-black">
                        <Image
                          src={mentee.avatar || "/placeholder.svg"}
                          alt={mentee.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{mentee.name}</h3>
                        <p className="text-xs text-gray-600">{mentee.role}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="border-black">
                      Share Resources
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
