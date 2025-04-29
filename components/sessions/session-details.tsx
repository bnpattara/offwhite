"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Clock, Calendar, Video, MessageSquare, FileText, Download, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function SessionDetails({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState("details")

  // Mock data for a session
  const session = {
    id,
    title: "PORTFOLIO REVIEW",
    status: "upcoming", // or "completed"
    date: new Date(),
    time: "2:00 PM",
    duration: 30,
    mentor: {
      id: "mentor_1",
      name: "Sarah Johnson",
      role: "Creative Director",
      avatar: "/placeholder.svg?height=48&width=48",
    },
    agenda: [
      "Review current portfolio pieces",
      "Discuss areas for improvement",
      "Identify next steps and action items",
    ],
    notes:
      "During our session, we'll focus on strengthening your portfolio presentation. Please have your latest work ready to share. We'll discuss composition, typography, and overall narrative flow.",
    resources: [
      {
        name: "Portfolio Guidelines.pdf",
        type: "PDF",
        size: "2.4 MB",
      },
      {
        name: "Design References.zip",
        type: "ZIP",
        size: "15.7 MB",
      },
    ],
    feedback: (session) =>
      session.status === "completed"
        ? {
            rating: 5,
            comment:
              "Sarah provided excellent feedback on my portfolio. Her insights were practical and immediately actionable. I now have a clear direction for improving my work.",
          }
        : null,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/sessions">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Session Details</h1>
      </div>

      <Card className="border-2 border-black">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold">"{session.title}"</h2>
                <div className="flex items-center gap-3 mt-1">
                  <Badge
                    className={session.status === "upcoming" ? "bg-[#FFA500] text-black" : "bg-green-500 text-white"}
                  >
                    {session.status === "upcoming" ? "Upcoming" : "Completed"}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {session.duration} minutes
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  {session.date.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  {session.time}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-black">
                  <AvatarImage src={session.mentor.avatar} alt={session.mentor.name} />
                  <AvatarFallback>{session.mentor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{session.mentor.name}</p>
                  <p className="text-sm text-gray-600">{session.mentor.role}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {session.status === "upcoming" ? (
                <>
                  <Link href={`/dashboard/video-call/${session.id}`}>
                    <Button className="w-full bg-black text-white hover:bg-gray-800">
                      <Video className="mr-2 h-4 w-4" />
                      Join Session
                    </Button>
                  </Link>
                  <Link href={`/dashboard/messages/${session.mentor.id}`}>
                    <Button variant="outline" className="w-full border-black">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message Mentor
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full border-black text-red-500 hover:text-red-600 hover:border-red-500"
                  >
                    Cancel Session
                  </Button>
                </>
              ) : (
                <>
                  <Button className="w-full bg-black text-white hover:bg-gray-800">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Another Session
                  </Button>
                  <Link href={`/dashboard/messages/${session.mentor.id}`}>
                    <Button variant="outline" className="w-full border-black">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message Mentor
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-transparent border-b border-gray-200 rounded-none p-0 h-auto">
          <TabsTrigger
            value="details"
            className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
              activeTab === "details" ? "border-black text-black" : "border-transparent text-gray-500"
            }`}
          >
            Details
          </TabsTrigger>
          <TabsTrigger
            value="resources"
            className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
              activeTab === "resources" ? "border-black text-black" : "border-transparent text-gray-500"
            }`}
          >
            Resources
          </TabsTrigger>
          {session.status === "completed" && (
            <TabsTrigger
              value="feedback"
              className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
                activeTab === "feedback" ? "border-black text-black" : "border-transparent text-gray-500"
              }`}
            >
              Feedback
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle>"AGENDA"</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {session.agenda.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                      {index + 1}
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle>"SESSION NOTES"</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{session.notes}</p>

              {session.status === "completed" && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="font-medium mb-2">Action Items</h3>
                  <div className="space-y-2">
                    {[
                      { text: "Update portfolio with new projects", completed: false },
                      { text: "Refine typography in case studies", completed: false },
                      { text: "Add more process documentation", completed: false },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <span className={item.completed ? "line-through text-gray-500" : ""}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {session.status === "upcoming" && (
            <Card className="border-2 border-black">
              <CardHeader>
                <CardTitle>"PREPARATION"</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium">Have Your Portfolio Ready</h3>
                      <p className="text-sm text-gray-600">
                        Prepare your latest work to share during the session. Make sure all files are accessible and
                        organized.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium">List Your Questions</h3>
                      <p className="text-sm text-gray-600">
                        Prepare specific questions or areas you'd like feedback on to make the most of your session
                        time.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium">Test Your Equipment</h3>
                      <p className="text-sm text-gray-600">
                        Make sure your camera, microphone, and internet connection are working properly before the
                        session.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle>"SESSION RESOURCES"</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {session.resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{resource.name}</h4>
                        <p className="text-xs text-gray-500">
                          {resource.type} • {resource.size}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-black">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>

              {session.resources.length === 0 && (
                <div className="text-center py-6">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No resources yet</h3>
                  <p className="text-gray-500">Your mentor hasn't shared any resources for this session yet.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle>"RECOMMENDED RESOURCES"</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    name: "Portfolio Design Best Practices",
                    type: "Article",
                    source: "Design Weekly",
                  },
                  {
                    name: "Creative Direction Masterclass",
                    type: "Video",
                    source: "Design Academy",
                  },
                ].map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{resource.name}</h4>
                        <p className="text-xs text-gray-500">
                          {resource.type} • {resource.source}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {session.status === "completed" && (
          <TabsContent value="feedback" className="space-y-6">
            <Card className="border-2 border-black">
              <CardHeader>
                <CardTitle>"YOUR FEEDBACK"</CardTitle>
              </CardHeader>
              <CardContent>
                {session.feedback ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={20}
                            className={
                              star <= session.feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{session.feedback.rating}/5</span>
                    </div>
                    <p className="italic">"{session.feedback.comment}"</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-600 mb-4">Please rate your session with {session.mentor.name}:</p>
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} className="text-gray-300 hover:text-yellow-400">
                          <Star size={24} />
                        </button>
                      ))}
                    </div>
                    <textarea
                      className="w-full min-h-[100px] p-3 border border-black rounded-md"
                      placeholder="Share your thoughts about this session..."
                    />
                    <Button className="bg-black text-white hover:bg-gray-800">Submit Feedback</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-2 border-black">
              <CardHeader>
                <CardTitle>"SESSION SUMMARY"</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    During this session, we reviewed your current portfolio and identified several areas for
                    improvement:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Strengthen the visual hierarchy in your case studies</li>
                    <li>Add more process documentation to showcase your thinking</li>
                    <li>Refine typography choices for better readability</li>
                    <li>Consider a more cohesive color palette across projects</li>
                  </ul>
                  <p>
                    We agreed that you'll implement these changes and schedule a follow-up session in two weeks to
                    review your progress.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
