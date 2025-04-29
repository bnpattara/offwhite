"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight, Star, BookOpen, BarChart3, ChevronRight, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider"

export function MenteeDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const upcomingSessions = [
    {
      id: "session_1",
      title: "PORTFOLIO REVIEW",
      mentor: "Sarah Johnson",
      mentorRole: "Creative Director",
      mentorAvatar: "/placeholder.svg?height=40&width=40",
      date: "Today",
      time: "2:00 PM",
      duration: 30,
    },
    {
      id: "session_2",
      title: "CAREER GUIDANCE",
      mentor: "Michael Chen",
      mentorRole: "Design Lead",
      mentorAvatar: "/placeholder.svg?height=40&width=40",
      date: "Tomorrow",
      time: "11:00 AM",
      duration: 45,
    },
  ]

  const learningPaths = [
    {
      id: "path_1",
      title: "FASHION DESIGN FUNDAMENTALS",
      progress: 60,
      modules: 10,
      completedModules: 6,
    },
    {
      id: "path_2",
      title: "ADVANCED STREETWEAR CONCEPTS",
      progress: 25,
      modules: 8,
      completedModules: 2,
    },
  ]

  const recentResources = [
    {
      id: "resource_1",
      title: "Sustainable Materials Guide",
      type: "PDF",
      addedBy: "Sarah Johnson",
      date: "2 days ago",
    },
    {
      id: "resource_2",
      title: "Color Theory Masterclass",
      type: "Video",
      addedBy: "Michael Chen",
      date: "1 week ago",
    },
  ]

  const featuredMentors = [
    {
      id: "mentor_1",
      name: "Sarah Johnson",
      role: "Creative Director",
      avatar: "/placeholder.svg?height=64&width=64",
      rating: 4.9,
      specialties: ["Design", "Branding"],
    },
    {
      id: "mentor_2",
      name: "Michael Chen",
      role: "Design Lead",
      avatar: "/placeholder.svg?height=64&width=64",
      rating: 4.8,
      specialties: ["Streetwear", "Production"],
    },
    {
      id: "mentor_3",
      name: "Emma Thompson",
      role: "Fashion Designer",
      avatar: "/placeholder.svg?height=64&width=64",
      rating: 4.7,
      specialties: ["Textiles", "Sustainability"],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">"DASHBOARD"</h1>
          <p className="text-gray-500">Welcome back, {user?.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-black">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Session
          </Button>
          <Button className="bg-black text-white hover:bg-gray-800">
            <Video className="mr-2 h-4 w-4" />
            Join Next Session
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
            value="progress"
            className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
              activeTab === "progress" ? "border-black text-black" : "border-transparent text-gray-500"
            }`}
          >
            Progress
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
                          src={session.mentorAvatar || "/placeholder.svg"}
                          alt={session.mentor}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{session.mentor}</p>
                        <p className="text-xs text-gray-600">{session.mentorRole}</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" className="border-black text-xs h-8">
                        Reschedule
                      </Button>
                      <Link href={`/dashboard/video-call/${session.id}`}>
                        <Button className="bg-black text-white hover:bg-gray-800 text-xs h-8">Join Call</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Learning Paths */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold tracking-tight">"LEARNING PATHS"</h2>
              <Link href="/dashboard/progress">
                <Button variant="link" className="text-black p-0 h-auto">
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningPaths.map((path) => (
                <Card key={path.id} className="border-2 border-black overflow-hidden">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">"{path.title}"</h3>
                      <Badge className="bg-[#FFA500] hover:bg-[#FF8C00] text-black">In Progress</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} className="h-2" />
                      <p className="text-xs text-gray-600">
                        {path.completedModules} of {path.modules} modules completed
                      </p>
                    </div>
                    <Button className="w-full bg-black text-white hover:bg-gray-800 gap-2">
                      <BookOpen size={16} />
                      Continue Learning
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Featured Mentors */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold tracking-tight">"FEATURED MENTORS"</h2>
              <Link href="/dashboard/mentors">
                <Button variant="link" className="text-black p-0 h-auto">
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredMentors.map((mentor) => (
                <Card key={mentor.id} className="border-2 border-black overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden border border-black flex-shrink-0">
                        <Image
                          src={mentor.avatar || "/placeholder.svg"}
                          alt={mentor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{mentor.name}</h3>
                          <div className="flex items-center">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-sm ml-1">{mentor.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{mentor.role}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {mentor.specialties.map((specialty) => (
                            <Badge key={specialty} variant="outline" className="text-xs border-black">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link href={`/dashboard/mentors/${mentor.id}`}>
                        <Button className="w-full bg-black text-white hover:bg-gray-800 text-xs h-8">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-2 border-black">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">"COMPLETED SESSIONS"</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-xs text-gray-500 mt-1">+3 from last month</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-black">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">"LEARNING HOURS"</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24.5</div>
                <p className="text-xs text-gray-500 mt-1">+5.5 from last month</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-black">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">"ACHIEVEMENTS"</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">7</div>
                <p className="text-xs text-gray-500 mt-1">+2 new achievements</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Progress */}
          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle>"LEARNING PROGRESS"</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {learningPaths.map((path) => (
                  <div key={path.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">"{path.title}"</h3>
                      <span className="text-sm">{path.progress}%</span>
                    </div>
                    <Progress value={path.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>
                        {path.completedModules} of {path.modules} modules
                      </span>
                      <Link href="/dashboard/progress">
                        <Button variant="link" className="text-black p-0 h-auto text-xs">
                          View details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skills Assessment */}
          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle>"SKILLS ASSESSMENT"</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { skill: "Design Fundamentals", level: 75 },
                  { skill: "Streetwear Concepts", level: 60 },
                  { skill: "Material Knowledge", level: 45 },
                  { skill: "Technical Drawing", level: 80 },
                  { skill: "Brand Development", level: 50 },
                ].map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.skill}</span>
                      <span className="text-sm">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6 bg-black text-white hover:bg-gray-800">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Full Assessment
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          {/* Recent Resources */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold tracking-tight">"RECENT RESOURCES"</h2>
              <Link href="/dashboard/resources">
                <Button variant="link" className="text-black p-0 h-auto">
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentResources.map((resource) => (
                <Card key={resource.id} className="border-2 border-black">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div className="space-y-1">
                      <h3 className="font-medium">{resource.title}</h3>
                      <p className="text-sm text-gray-600">
                        Added by {resource.addedBy} • {resource.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-black">
                        {resource.type}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Resource Categories */}
          <section>
            <h2 className="text-xl font-semibold tracking-tight mb-4">"RESOURCE CATEGORIES"</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: "Design Tutorials", count: 24, icon: "🎨" },
                { title: "Industry Insights", count: 18, icon: "📊" },
                { title: "Technical Guides", count: 32, icon: "📝" },
                { title: "Case Studies", count: 15, icon: "📚" },
                { title: "Templates", count: 9, icon: "📋" },
                { title: "Inspiration", count: 27, icon: "✨" },
              ].map((category, index) => (
                <Card key={index} className="border-2 border-black hover:bg-gray-50 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="text-3xl">{category.icon}</div>
                    <div>
                      <h3 className="font-medium">{category.title}</h3>
                      <p className="text-sm text-gray-600">{category.count} resources</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Recommended Resources */}
          <section>
            <h2 className="text-xl font-semibold tracking-tight mb-4">"RECOMMENDED FOR YOU"</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Sustainable Fashion Design Principles",
                  description: "Learn how to incorporate sustainability into your design process.",
                  type: "Course",
                  duration: "3 hours",
                },
                {
                  title: "Streetwear Trends 2025",
                  description: "Explore the upcoming trends in streetwear fashion.",
                  type: "Report",
                  duration: "45 min read",
                },
              ].map((resource, index) => (
                <Card key={index} className="border-2 border-black overflow-hidden">
                  <div className="h-40 bg-gray-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-gray-400" />
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{resource.title}</h3>
                      <Badge variant="outline" className="border-black">
                        {resource.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs text-gray-500">{resource.duration}</span>
                      <Button variant="ghost" size="sm" className="h-8 gap-1">
                        View Resource
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  )
}
