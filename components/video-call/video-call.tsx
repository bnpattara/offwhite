"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  Share2,
  Users,
  MoreVertical,
  ChevronLeft,
  Maximize,
  MinusCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider"

export function VideoCall({ id }: { id: string }) {
  const { user } = useAuth()
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [chatMessage, setChatMessage] = useState("")

  // Mock data for the session
  const session = {
    id,
    title: "PORTFOLIO REVIEW",
    startTime: "2:00 PM",
    duration: 30,
    participant: {
      id: "participant_1",
      name: "Sarah Johnson",
      role: "Creative Director",
      avatar: "/placeholder.svg?height=48&width=48",
    },
    agenda: [
      "Review current portfolio pieces",
      "Discuss areas for improvement",
      "Identify next steps and action items",
    ],
    chat: [
      {
        id: "chat_1",
        sender: "Sarah Johnson",
        message: "Hi there! Let's start by looking at your most recent projects.",
        time: "2:02 PM",
      },
      {
        id: "chat_2",
        sender: user?.name || "You",
        message: "Sounds good! I've prepared a few pieces to show you.",
        time: "2:03 PM",
      },
    ],
  }

  // Handle chat message submission
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (chatMessage.trim() === "") return

    // In a real app, this would send the message to an API
    console.log("Sending chat message:", chatMessage)

    // Clear the input
    setChatMessage("")
  }

  // Toggle fullscreen
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log(`Error attempting to enable full-screen mode: ${err.message}`)
      })
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullScreen(!isFullScreen)
  }

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-bold tracking-tight">"{session.title}"</h1>
          <Badge className="bg-[#FFA500] text-black ml-2">{session.duration} min</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleFullScreen}>
            <Maximize className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Main video area */}
        <div className="flex-1 p-4 flex flex-col">
          <div className="relative flex-1 bg-gray-900 rounded-lg overflow-hidden">
            {/* Participant video (large) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-opacity-20 text-6xl font-bold">{session.participant.name.charAt(0)}</div>
            </div>

            {/* User video (small) */}
            <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white shadow-lg">
              {isVideoOn ? (
                <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                  <div className="text-white text-opacity-20 text-2xl font-bold">{user?.name?.charAt(0) || "Y"}</div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                  <VideoOff className="h-8 w-8 text-white opacity-50" />
                </div>
              )}
            </div>

            {/* Participant name */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black bg-opacity-50 rounded-full px-3 py-1">
              <div className="relative">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={session.participant.avatar} alt={session.participant.name} />
                  <AvatarFallback>{session.participant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-green-500 border border-black"></div>
              </div>
              <span className="text-xs text-white">{session.participant.name}</span>
            </div>

            {/* Call duration */}
            <div className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full px-3 py-1">
              <span className="text-xs text-white">00:12:34</span>
            </div>
          </div>

          {/* Call controls */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full h-12 w-12 ${isMuted ? "bg-red-100 border-red-500 text-red-500" : "border-black"}`}
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full h-12 w-12 ${!isVideoOn ? "bg-red-100 border-red-500 text-red-500" : "border-black"}`}
              onClick={() => setIsVideoOn(!isVideoOn)}
            >
              {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-black">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-black">
              <Users className="h-5 w-5" />
            </Button>
            <Button className="rounded-full h-12 w-12 bg-red-500 hover:bg-red-600 text-white">
              <PhoneOff className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col">
          <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-2 bg-transparent border-b border-gray-200 rounded-none p-0 h-auto">
              <TabsTrigger
                value="chat"
                className={`rounded-none border-b-2 py-3 ${
                  activeTab === "chat" ? "border-black text-black" : "border-transparent text-gray-500"
                }`}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger
                value="agenda"
                className={`rounded-none border-b-2 py-3 ${
                  activeTab === "agenda" ? "border-black text-black" : "border-transparent text-gray-500"
                }`}
              >
                <FileText className="h-4 w-4 mr-2" />
                Agenda
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="flex-1 flex flex-col p-0 data-[state=active]:flex">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {session.chat.map((message) => (
                  <div key={message.id} className="flex flex-col">
                    <div className="flex items-start gap-2">
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarImage
                          src={message.sender === user?.name ? user?.avatar : session.participant.avatar}
                          alt={message.sender}
                        />
                        <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline">
                          <span className="font-medium text-sm">{message.sender}</span>
                          <span className="text-xs text-gray-500">{message.time}</span>
                        </div>
                        <p className="text-sm">{message.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                  />
                  <Button
                    type="submit"
                    className="bg-black text-white hover:bg-gray-800"
                    disabled={chatMessage.trim() === ""}
                  >
                    Send
                  </Button>
                </form>
              </div>
            </TabsContent>

            <TabsContent
              value="agenda"
              className="flex-1 overflow-y-auto p-4 space-y-4 data-[state=active]:flex flex-col"
            >
              <Card className="border-2 border-black">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">"SESSION AGENDA"</h3>
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
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">"NOTES"</h3>
                  <textarea
                    className="w-full min-h-[200px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Take notes during your session..."
                  />
                </CardContent>
              </Card>

              <Card className="border-2 border-black">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">"ACTION ITEMS"</h3>
                  <div className="space-y-2">
                    {[
                      { text: "Update portfolio with new projects", completed: false },
                      { text: "Refine typography in case studies", completed: false },
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
                    <div className="flex items-center gap-2 mt-2">
                      <MinusCircle className="h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Add a new action item..."
                        className="flex-1 border-none p-0 focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
