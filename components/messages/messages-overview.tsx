"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function MessagesOverview() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data
  const conversations = [
    {
      id: "conv_1",
      name: "Sarah Johnson",
      role: "Creative Director",
      avatar: "/placeholder.svg?height=48&width=48",
      lastMessage: "Let's discuss your portfolio next week",
      time: "2m ago",
      unread: true,
    },
    {
      id: "conv_2",
      name: "Michael Chen",
      role: "Design Lead",
      avatar: "/placeholder.svg?height=48&width=48",
      lastMessage: "Thanks for the feedback on my designs",
      time: "1h ago",
      unread: false,
    },
    {
      id: "conv_3",
      name: "Emma Thompson",
      role: "Fashion Designer",
      avatar: "/placeholder.svg?height=48&width=48",
      lastMessage: "Looking forward to our next session",
      time: "2d ago",
      unread: false,
    },
    {
      id: "conv_4",
      name: "David Rodriguez",
      role: "Technical Designer",
      avatar: "/placeholder.svg?height=48&width=48",
      lastMessage: "I've shared some resources with you",
      time: "3d ago",
      unread: false,
    },
    {
      id: "conv_5",
      name: "Aisha Patel",
      role: "Marketing Director",
      avatar: "/placeholder.svg?height=48&width=48",
      lastMessage: "Can we reschedule our session?",
      time: "1w ago",
      unread: false,
    },
  ]

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">"MESSAGES"</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-black text-white hover:bg-gray-800">
              <Plus className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>"NEW MESSAGE"</DialogTitle>
              <DialogDescription>Start a conversation with a mentor or mentee.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Select Recipient</h3>
                <Input placeholder="Search by name..." className="border-black" />
                <div className="h-64 overflow-y-auto border rounded-md p-2 space-y-2">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-black">
                        <Image src={conv.avatar || "/placeholder.svg"} alt={conv.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium">{conv.name}</p>
                        <p className="text-xs text-gray-600">{conv.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Message</h3>
                <textarea
                  className="w-full min-h-[100px] p-2 border border-black rounded-md"
                  placeholder="Type your message here..."
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="bg-black text-white hover:bg-gray-800">Send Message</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search conversations..."
          className="pl-10 border-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conv) => (
            <Link key={conv.id} href={`/dashboard/messages/${conv.id}`}>
              <Card
                className={`border-2 ${conv.unread ? "border-black bg-gray-50" : "border-gray-200"} hover:border-black transition-colors`}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="relative">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-black flex-shrink-0">
                      <Image src={conv.avatar || "/placeholder.svg"} alt={conv.name} fill className="object-cover" />
                    </div>
                    {conv.unread && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FFA500] rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-medium truncate">{conv.name}</h3>
                      <span className="text-xs text-gray-500 flex-shrink-0">{conv.time}</span>
                    </div>
                    <p className="text-xs text-gray-600">{conv.role}</p>
                    <p className={`text-sm truncate ${conv.unread ? "font-medium" : "text-gray-600"}`}>
                      {conv.lastMessage}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-lg font-medium mb-2">No conversations found</h3>
            <p className="text-gray-500">Try adjusting your search or start a new conversation</p>
          </div>
        )}
      </div>
    </div>
  )
}
