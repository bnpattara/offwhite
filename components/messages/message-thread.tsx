"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, Send, Paperclip, ImageIcon, Video, File, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"

export function MessageThread({ id }: { id: string }) {
  const { user } = useAuth()
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock data for the conversation
  const conversation = {
    id,
    contact: {
      id: "contact_1",
      name: "Sarah Johnson",
      role: "Creative Director",
      avatar: "/placeholder.svg?height=48&width=48",
      status: "online",
      lastActive: "Active now",
    },
    messages: [
      {
        id: "msg_1",
        sender: "contact",
        text: "Hi there! I've reviewed your portfolio and I have some feedback for you.",
        time: "10:30 AM",
        date: "Today",
      },
      {
        id: "msg_2",
        sender: "user",
        text: "That's great! I'm looking forward to hearing your thoughts.",
        time: "10:32 AM",
        date: "Today",
      },
      {
        id: "msg_3",
        sender: "contact",
        text: "Your design concepts are strong, but I think we could improve the presentation. Would you be available for a call to discuss this in more detail?",
        time: "10:35 AM",
        date: "Today",
      },
      {
        id: "msg_4",
        sender: "user",
        text: "I'm free tomorrow afternoon if that works for you.",
        time: "10:38 AM",
        date: "Today",
      },
      {
        id: "msg_5",
        sender: "contact",
        text: "Perfect. Let's schedule a call for tomorrow at 2 PM. I'll send you a calendar invite.",
        time: "10:40 AM",
        date: "Today",
      },
      {
        id: "msg_6",
        sender: "contact",
        text: "In the meantime, could you take a look at these reference materials? They might help you understand the direction I'm thinking of.",
        time: "10:42 AM",
        date: "Today",
      },
      {
        id: "msg_7",
        sender: "contact",
        text: "I've attached a PDF with some examples.",
        time: "10:43 AM",
        date: "Today",
        attachment: {
          type: "pdf",
          name: "design_references.pdf",
          size: "2.4 MB",
        },
      },
      {
        id: "msg_8",
        sender: "user",
        text: "Thanks for sharing! I'll review these before our call tomorrow.",
        time: "10:45 AM",
        date: "Today",
      },
    ],
  }

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation.messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === "") return

    // In a real app, this would send the message to an API
    console.log("Sending message:", newMessage)

    // Clear the input
    setNewMessage("")
  }

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-200">
        <Link href="/dashboard/messages">
          <Button variant="ghost" size="icon" className="mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-black">
            <AvatarImage src={conversation.contact.avatar} alt={conversation.contact.name} />
            <AvatarFallback>{conversation.contact.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-medium">{conversation.contact.name}</h2>
              {conversation.contact.status === "online" && <Badge className="bg-green-500 h-2 w-2 rounded-full p-0" />}
            </div>
            <p className="text-xs text-gray-500">{conversation.contact.role}</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-black">
            <Video className="mr-2 h-4 w-4" />
            Call
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[70%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
              {message.sender !== "user" && (
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="h-6 w-6 border border-black">
                    <AvatarImage src={conversation.contact.avatar} alt={conversation.contact.name} />
                    <AvatarFallback>{conversation.contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
              )}
              <div
                className={`rounded-lg px-4 py-2 ${
                  message.sender === "user" ? "bg-black text-white" : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                {message.attachment && (
                  <div
                    className={`mt-2 p-2 rounded flex items-center gap-2 ${
                      message.sender === "user" ? "bg-gray-800" : "bg-white border border-gray-200"
                    }`}
                  >
                    <File className="h-5 w-5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{message.attachment.name}</p>
                      <p className="text-xs opacity-70">{message.attachment.size}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 px-2">
                      Download
                    </Button>
                  </div>
                )}
              </div>
              {message.sender === "user" && (
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon" className="rounded-full">
            <Paperclip className="h-5 w-5" />
          </Button>
          <div className="relative flex-1">
            <Input
              placeholder="Type your message..."
              className="pr-10 border-black"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                <ImageIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button
            type="submit"
            className="bg-black text-white hover:bg-gray-800 rounded-full h-10 w-10 p-0"
            disabled={newMessage.trim() === ""}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
