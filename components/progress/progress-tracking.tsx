"use client"

import { useState } from "react"
import {
  BarChart3,
  TrendingUp,
  Award,
  Calendar,
  Clock,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/auth-provider"

export function ProgressTracking() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [timeframe, setTimeframe] = useState("month")

  // Mock data for learning paths
  const learningPaths = [
    {
      id: "path_1",
      title: "FASHION DESIGN FUNDAMENTALS",
      progress: 60,
      modules: 10,
      completedModules: 6,
      startDate: "Jan 15, 2025",
      estimatedCompletion: "Apr 15, 2025",
      mentor: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "path_2",
      title: "ADVANCED STREETWEAR CONCEPTS",
      progress: 25,
      modules: 8,
      completedModules: 2,
      startDate: "Feb 10, 2025",
      estimatedCompletion: "May 10, 2025",
      mentor: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "path_3",
      title: "SUSTAINABLE FASHION INNOVATION",
      progress: 0,
      modules: 12,
      completedModules: 0,
      startDate: "Not started",
      estimatedCompletion: "TBD",
      mentor: {
        name: "Emma Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
  ]

  // Mock data for completed sessions
  const completedSessions = [
    {
      id: "session_1",
      title: "PORTFOLIO REVIEW",
      mentor: "Sarah Johnson",
      date: "Mar 15, 2025",
      duration: 30,
      learningPath: "FASHION DESIGN FUNDAMENTALS",
      skills: ["Portfolio Presentation", "Visual Hierarchy"],
    },
    {
      id: "session_2",
      title: "DESIGN CRITIQUE",
      mentor: "Michael Chen",
      date: "Mar 10, 2025",
      duration: 45,
      learningPath: "ADVANCED STREETWEAR CONCEPTS",
      skills: ["Design Principles", "Trend Analysis"],
    },
    {
      id: "session_3",
      title: "CAREER GUIDANCE",
      mentor: "Emma Thompson",
      date: "Mar 5, 2025",
      duration: 60,
      learningPath: "FASHION DESIGN FUNDAMENTALS",
      skills: ["Industry Knowledge", "Networking"],
    },
    {
      id: "session_4",
      title: "TECHNICAL DRAWING REVIEW",
      mentor: "David Rodriguez",
      date: "Feb 28, 2025",
      duration: 45,
      learningPath: "FASHION DESIGN FUNDAMENTALS",
      skills: ["Technical Drawing", "Specifications"],
    },
  ]

  // Mock data for skills assessment
  const skillsAssessment = [
    { skill: "Design Fundamentals", level: 75, growth: 15 },
    { skill: "Streetwear Concepts", level: 60, growth: 10 },
    { skill: "Material Knowledge", level: 45, growth: 5 },
    { skill: "Technical Drawing", level: 80, growth: 20 },
    { skill: "Brand Development", level: 50, growth: 8 },
    { skill: "Sustainable Practices", level: 35, growth: 12 },
    { skill: "Digital Design Tools", level: 65, growth: 15 },
    { skill: "Fashion Marketing", level: 40, growth: 5 },
  ]

  // Mock data for achievements
  const achievements = [
    {
      id: "achievement_1",
      title: "First Session Completed",
      description: "Completed your first mentorship session",
      date: "Jan 20, 2025",
      icon: "🏆",
      unlocked: true,
    },
    {
      id: "achievement_2",
      title: "Learning Path Pioneer",
      description: "Started your first learning path",
      date: "Jan 15, 2025",
      icon: "🚀",
      unlocked: true,
    },
    {
      id: "achievement_3",
      title: "Skill Master",
      description: "Reached 75% proficiency in a skill",
      date: "Mar 5, 2025",
      icon: "⭐",
      unlocked: true,
    },
    {
      id: "achievement_4",
      title: "Consistent Learner",
      description: "Completed 5 sessions in a month",
      date: "Not unlocked",
      icon: "📚",
      unlocked: false,
    },
    {
      id: "achievement_5",
      title: "Feedback Champion",
      description: "Implemented feedback from 3 different mentors",
      date: "Not unlocked",
      icon: "🔄",
      unlocked: false,
    },
    {
      id: "achievement_6",
      title: "Module Master",
      description: "Completed all modules in a learning path",
      date: "Not unlocked",
      icon: "🎓",
      unlocked: false,
    },
  ]

  // Mock data for activity
  const activityData = [
    {
      id: "activity_1",
      type: "session",
      title: "Completed a session with Sarah Johnson",
      description: "PORTFOLIO REVIEW",
      date: "Mar 15, 2025",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: "activity_2",
      type: "module",
      title: "Completed a module",
      description: "Color Theory Fundamentals",
      date: "Mar 12, 2025",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      id: "activity_3",
      type: "achievement",
      title: "Unlocked an achievement",
      description: "Skill Master",
      date: "Mar 5, 2025",
      icon: <Award className="h-4 w-4" />,
    },
    {
      id: "activity_4",
      type: "session",
      title: "Completed a session with Michael Chen",
      description: "DESIGN CRITIQUE",
      date: "Mar 10, 2025",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: "activity_5",
      type: "resource",
      title: "Accessed a resource",
      description: "Fashion Design Fundamentals Guide",
      date: "Mar 8, 2025",
      icon: <FileText className="h-4 w-4" />,
    },
  ]

  // Calculate overall progress
  const overallProgress = Math.round(
    learningPaths.reduce((acc, path) => acc + path.progress, 0) /
      learningPaths.filter((path) => path.progress > 0).length,
  )

  // Calculate total learning hours
  const totalLearningHours = completedSessions.reduce((acc, session) => acc + session.duration, 0) / 60

  // Calculate unlocked achievements percentage
  const achievementsPercentage = Math.round((achievements.filter((a) => a.unlocked).length / achievements.length) * 100)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">"PROGRESS TRACKING"</h1>
          <p className="text-gray-500">Track your growth and development</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[150px] border-black">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-black text-white hover:bg-gray-800">
            <BarChart3 className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Progress Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2 border-black">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Overall Progress</p>
                <div className="text-3xl font-bold">{overallProgress}%</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-black" />
              </div>
            </div>
            <Progress value={overallProgress} className="h-2 mt-4" />
          </CardContent>
        </Card>

        <Card className="border-2 border-black">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Learning Hours</p>
                <div className="text-3xl font-bold">{totalLearningHours}</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-black" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">{completedSessions.length} sessions completed</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-black">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Achievements</p>
                <div className="text-3xl font-bold">
                  {achievements.filter((a) => a.unlocked).length}/{achievements.length}
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Award className="h-6 w-6 text-black" />
              </div>
            </div>
            <Progress value={achievementsPercentage} className="h-2 mt-4" />
          </CardContent>
        </Card>
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
            value="learning-paths"
            className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
              activeTab === "learning-paths" ? "border-black text-black" : "border-transparent text-gray-500"
            }`}
          >
            Learning Paths
          </TabsTrigger>
          <TabsTrigger
            value="skills"
            className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
              activeTab === "skills" ? "border-black text-black" : "border-transparent text-gray-500"
            }`}
          >
            Skills
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
              activeTab === "achievements" ? "border-black text-black" : "border-transparent text-gray-500"
            }`}
          >
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Current Learning Path */}
          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle>"CURRENT LEARNING PATH"</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">{learningPaths[0].title}</h3>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border border-black">
                      <AvatarImage src={learningPaths[0].mentor.avatar} alt={learningPaths[0].mentor.name} />
                      <AvatarFallback>{learningPaths[0].mentor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <p>Mentor: {learningPaths[0].mentor.name}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Started:</span>
                    <span className="font-medium">{learningPaths[0].startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. Completion:</span>
                    <span className="font-medium">{learningPaths[0].estimatedCompletion}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{learningPaths[0].progress}%</span>
                </div>
                <Progress value={learningPaths[0].progress} className="h-2" />
                <p className="text-sm text-gray-500">
                  {learningPaths[0].completedModules} of {learningPaths[0].modules} modules completed
                </p>
              </div>

              <div className="pt-2">
                <h4 className="text-sm font-medium mb-3">Recent Modules</h4>
                <div className="space-y-2">
                  {[
                    { title: "Design Principles", completed: true, date: "Mar 10, 2025" },
                    { title: "Color Theory", completed: true, date: "Mar 5, 2025" },
                    { title: "Composition Basics", completed: false, date: "In progress" },
                  ].map((module, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border border-gray-200 rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-5 w-5 rounded-full flex items-center justify-center ${
                            module.completed ? "bg-black text-white" : "bg-gray-100"
                          }`}
                        >
                          {module.completed ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : (
                            <Clock className="h-3 w-3 text-gray-500" />
                          )}
                        </div>
                        <span className={`text-sm ${module.completed ? "font-medium" : ""}`}>{module.title}</span>
                      </div>
                      <span className="text-xs text-gray-500">{module.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button className="bg-black text-white hover:bg-gray-800">
                  Continue Learning
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-2 border-black">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>"RECENT ACTIVITY"</CardTitle>
              <Button variant="link" className="text-black p-0 h-auto">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityData.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-sm font-medium">{activity.title}</h4>
                        <span className="text-xs text-gray-500">{activity.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skills Snapshot */}
          <Card className="border-2 border-black">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>"SKILLS SNAPSHOT"</CardTitle>
              <Button variant="link" className="text-black p-0 h-auto" onClick={() => setActiveTab("skills")}>
                View All Skills
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skillsAssessment.slice(0, 4).map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{skill.skill}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{skill.level}%</span>
                        {skill.growth > 0 && (
                          <Badge className="bg-green-100 text-green-800 text-xs">+{skill.growth}%</Badge>
                        )}
                      </div>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning-paths" className="space-y-6">
          {/* All Learning Paths */}
          <div className="space-y-4">
            {learningPaths.map((path) => (
              <Card key={path.id} className="border-2 border-black">
                <CardContent className="p-6 space-y-4">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium">{path.title}</h3>
                        {path.progress === 0 ? (
                          <Badge variant="outline" className="border-gray-300 text-gray-500">
                            Not Started
                          </Badge>
                        ) : path.progress === 100 ? (
                          <Badge className="bg-green-500 text-white">Completed</Badge>
                        ) : (
                          <Badge className="bg-[#FFA500] text-black">In Progress</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border border-black">
                          <AvatarImage src={path.mentor.avatar} alt={path.mentor.name} />
                          <AvatarFallback>{path.mentor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <p>Mentor: {path.mentor.name}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Started:</span>
                        <span className="font-medium">{path.startDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Est. Completion:</span>
                        <span className="font-medium">{path.estimatedCompletion}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{path.progress}%</span>
                    </div>
                    <Progress value={path.progress} className="h-2" />
                    <p className="text-sm text-gray-500">
                      {path.completedModules} of {path.modules} modules completed
                    </p>
                  </div>

                  <div className="flex justify-end pt-2">
                    {path.progress === 0 ? (
                      <Button className="bg-black text-white hover:bg-gray-800">
                        Start Learning
                        <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Button>
                    ) : path.progress === 100 ? (
                      <Button variant="outline" className="border-black">
                        View Certificate
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button className="bg-black text-white hover:bg-gray-800">
                        Continue Learning
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recommended Paths */}
          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle>"RECOMMENDED LEARNING PATHS"</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "FASHION MARKETING ESSENTIALS",
                    description: "Learn the fundamentals of marketing for fashion brands and products.",
                    modules: 8,
                    mentor: "Aisha Patel",
                    mentorAvatar: "/placeholder.svg?height=40&width=40",
                  },
                  {
                    title: "TECHNICAL PRODUCTION MASTERY",
                    description: "Master the technical aspects of fashion production and manufacturing.",
                    modules: 10,
                    mentor: "David Rodriguez",
                    mentorAvatar: "/placeholder.svg?height=40&width=40",
                  },
                ].map((path, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-md">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">{path.title}</h3>
                        <p className="text-sm text-gray-600">{path.description}</p>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-6 w-6 border border-gray-200">
                            <AvatarImage src={path.mentorAvatar} alt={path.mentor} />
                            <AvatarFallback>{path.mentor.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="text-xs text-gray-500">
                            <p>Mentor: {path.mentor}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <Badge variant="outline" className="border-gray-300 text-gray-500">
                          {path.modules} modules
                        </Badge>
                        <Button variant="outline" className="border-black mt-2">
                          View Path
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          {/* Skills Assessment */}
          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle>"SKILLS ASSESSMENT"</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillsAssessment.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.skill}</span>
                      <div className="flex items-center gap-1">
                        <span>{skill.level}%</span>
                        {skill.growth > 0 && (
                          <Badge className="bg-green-100 text-green-800 text-xs">+{skill.growth}%</Badge>
                        )}
                      </div>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Beginner</span>
                      <span>Intermediate</span>
                      <span>Advanced</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-medium mb-4">Skill Development Over Time</h3>
                <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                  <BarChart3 className="h-12 w-12 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 text-center mt-4">Chart showing your skill development over time</p>
              </div>
            </CardContent>
          </Card>

          {/* Skill Recommendations */}
          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle>"SKILL DEVELOPMENT RECOMMENDATIONS"</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    skill: "Sustainable Practices",
                    recommendation:
                      "Focus on improving your knowledge of sustainable materials and production methods.",
                    resources: ["Sustainable Fashion Practices PDF", "Eco-friendly Materials Workshop"],
                  },
                  {
                    skill: "Fashion Marketing",
                    recommendation: "Develop your understanding of digital marketing strategies for fashion brands.",
                    resources: ["Fashion Marketing Strategy Template", "Digital Brand Presence Workshop"],
                  },
                  {
                    skill: "Material Knowledge",
                    recommendation: "Expand your familiarity with different fabric types and their applications.",
                    resources: ["Material Selection Checklist", "Fabric Properties Guide"],
                  },
                ].map((item, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-md">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">{item.skill}</h3>
                        <p className="text-sm text-gray-600">{item.recommendation}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.resources.map((resource, i) => (
                            <Badge key={i} variant="outline" className="border-black">
                              {resource}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button variant="outline" className="border-black">
                          View Resources
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mentor Feedback */}
          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle>"MENTOR FEEDBACK"</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    mentor: "Sarah Johnson",
                    mentorAvatar: "/placeholder.svg?height=40&width=40",
                    date: "Mar 15, 2025",
                    feedback:
                      "Your design fundamentals are strong, but I recommend focusing more on visual hierarchy and composition in your portfolio pieces.",
                    skills: ["Design Fundamentals", "Portfolio Presentation"],
                  },
                  {
                    mentor: "Michael Chen",
                    mentorAvatar: "/placeholder.svg?height=40&width=40",
                    date: "Mar 10, 2025",
                    feedback:
                      "You've shown great progress in understanding streetwear concepts. Continue exploring innovative materials and construction techniques.",
                    skills: ["Streetwear Concepts", "Material Knowledge"],
                  },
                ].map((feedback, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-md">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 border border-black">
                        <AvatarImage src={feedback.mentorAvatar} alt={feedback.mentor} />
                        <AvatarFallback>{feedback.mentor.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-medium">{feedback.mentor}</h3>
                          <span className="text-xs text-gray-500">{feedback.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{feedback.feedback}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {feedback.skills.map((skill, i) => (
                            <Badge key={i} variant="outline" className="border-gray-300">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          {/* Achievements Grid */}
          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle>"ACHIEVEMENTS"</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 border-2 rounded-md flex flex-col items-center text-center ${
                      achievement.unlocked ? "border-black" : "border-gray-200 opacity-50"
                    }`}
                  >
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h3 className="font-medium">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 mb-3">{achievement.description}</p>
                    <Badge className={achievement.unlocked ? "bg-[#FFA500] text-black" : "bg-gray-200 text-gray-500"}>
                      {achievement.unlocked ? "Unlocked" : "Locked"}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-2">{achievement.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievement Progress */}
          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle>"ACHIEVEMENT PROGRESS"</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Overall Completion</h3>
                  <span>{achievementsPercentage}%</span>
                </div>
                <Progress value={achievementsPercentage} className="h-2" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Recently Unlocked</h3>
                    <div className="space-y-2">
                      {achievements
                        .filter((a) => a.unlocked)
                        .slice(0, 3)
                        .map((achievement, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 border border-gray-200 rounded-md">
                            <div className="text-xl">{achievement.icon}</div>
                            <div>
                              <p className="text-sm font-medium">{achievement.title}</p>
                              <p className="text-xs text-gray-500">{achievement.date}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Next Achievements</h3>
                    <div className="space-y-2">
                      {achievements
                        .filter((a) => !a.unlocked)
                        .slice(0, 3)
                        .map((achievement, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 border border-gray-200 rounded-md">
                            <div className="text-xl opacity-50">{achievement.icon}</div>
                            <div>
                              <p className="text-sm font-medium">{achievement.title}</p>
                              <p className="text-xs text-gray-500">{achievement.description}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certificates */}
          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle>"CERTIFICATES"</CardTitle>
            </CardHeader>
            <CardContent>
              {/* If user has certificates */}
              {false ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{/* Certificate items would go here */}</div>
              ) : (
                <div className="text-center py-12">
                  <Award className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No certificates yet</h3>
                  <p className="text-gray-500 mb-4">Complete a learning path to earn your first certificate</p>
                  <Button className="bg-black text-white hover:bg-gray-800">
                    View Learning Paths
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper component for FileText icon
const FileText = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  )
}
