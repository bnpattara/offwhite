"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, MessageSquare, BookOpen, Award, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function NotificationsPanel() {
  const [activeTab, setActiveTab] = useState("all")

  // Mock notifications data
  const notifications = [
    {
      id: "notif_1",
      type: "session",
      title: "Upcoming Session",
      message: "Your portfolio review session with Sarah Johnson starts in 30 minutes",
      time: "30 minutes ago",
      read: false,
      icon: <Calendar className="h-5 w-5" />,
      action: "Join Now",
      actionLink: "/dashboard/video-call/session_1",
    },
    {
      id: "notif_2",
      type: "message",
      title: "New Message",
      message: "Michael Chen sent you a message about your recent project",
      time: "2 hours ago",
      read: false,
      icon: <MessageSquare className="h-5 w-5" />,
      action: "Reply",
      actionLink: "/dashboard/messages/conv_2",
    },
    {
      id: "notif_3",
      type: "resource",
      title: "New Resource",
      message: "Sarah Johnson shared a new resource: 'Fashion Design Fundamentals Guide'",
      time: "Yesterday",
      read: true,
      icon: <BookOpen className="h-5 w-5" />,
      action: "View",
      actionLink: "/dashboard/resources",
    },
    {
      id: "notif_4",
      type: "achievement",
      title: "Achievement Unlocked",
      message: "Congratulations! You've unlocked the 'First Session Completed' achievement",
      time: "2 days ago",
      read: true,
      icon: <Award className="h-5 w-5" />,
      action: "View",
      actionLink: "/dashboard/progress?tab=achievements",
    },
    {
      id: "notif_5",
      type: "reminder",
      title: "Session Reminder",
      message: "Don't forget your upcoming session with Emma Thompson tomorrow at 3:00 PM",
      time: "2 days ago",
      read: true,
      icon: <Clock className="h-5 w-5" />,
      action: "Add to Calendar",
      actionLink: "#",
    },
  ]

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  const markAsRead = (id: string) => {
    // In a real app, this would call an API to mark the notification as read
    console.log(`Marking notification ${id} as read`)
  }

  return (
    <div className="flex-1 overflow-auto">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
          <TabsList className="w-full justify-start p-0 h-auto bg-transparent overflow-x-auto flex-nowrap">
            <TabsTrigger
              value="all"
              className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
                activeTab === "all" ? "border-black text-black" : "border-transparent text-gray-500"
              }`}
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
                activeTab === "unread" ? "border-black text-black" : "border-transparent text-gray-500"
              }`}
            >
              Unread
            </TabsTrigger>
            <TabsTrigger
              value="session"
              className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
                activeTab === "session" ? "border-black text-black" : "border-transparent text-gray-500"
              }`}
            >
              Sessions
            </TabsTrigger>
            <TabsTrigger
              value="message"
              className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
                activeTab === "message" ? "border-black text-black" : "border-transparent text-gray-500"
              }`}
            >
              Messages
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="divide-y">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 ${notification.read ? "" : "bg-gray-50"}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        notification.read ? "bg-gray-100" : "bg-black text-white"
                      }`}
                    >
                      {notification.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{notification.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        </div>
                        {!notification.read && <div className="h-2 w-2 rounded-full bg-[#FFA500]"></div>}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">{notification.time}</span>
                        <Button variant="outline" size="sm" className="h-8 border-black">
                          {notification.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Bell className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-1">No notifications</h3>
                <p className="text-gray-500 text-center max-w-xs">
                  You don't have any {activeTab === "all" ? "" : activeTab} notifications at the moment
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="unread" className="mt-0">
          {/* Same content structure as "all" tab */}
          <div className="divide-y">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div key={notification.id} className="p-4 bg-gray-50" onClick={() => markAsRead(notification.id)}>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center">
                      {notification.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{notification.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        </div>
                        <div className="h-2 w-2 rounded-full bg-[#FFA500]"></div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">{notification.time}</span>
                        <Button variant="outline" size="sm" className="h-8 border-black">
                          {notification.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Bell className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-1">No unread notifications</h3>
                <p className="text-gray-500 text-center max-w-xs">You've read all your notifications</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="session" className="mt-0">
          {/* Session-specific notifications */}
          <div className="divide-y">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 ${notification.read ? "" : "bg-gray-50"}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        notification.read ? "bg-gray-100" : "bg-black text-white"
                      }`}
                    >
                      {notification.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{notification.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        </div>
                        {!notification.read && <div className="h-2 w-2 rounded-full bg-[#FFA500]"></div>}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">{notification.time}</span>
                        <Button variant="outline" size="sm" className="h-8 border-black">
                          {notification.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-1">No session notifications</h3>
                <p className="text-gray-500 text-center max-w-xs">
                  You don't have any session notifications at the moment
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="message" className="mt-0">
          {/* Message-specific notifications */}
          <div className="divide-y">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 ${notification.read ? "" : "bg-gray-50"}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        notification.read ? "bg-gray-100" : "bg-black text-white"
                      }`}
                    >
                      {notification.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{notification.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        </div>
                        {!notification.read && <div className="h-2 w-2 rounded-full bg-[#FFA500]"></div>}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">{notification.time}</span>
                        <Button variant="outline" size="sm" className="h-8 border-black">
                          {notification.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-1">No message notifications</h3>
                <p className="text-gray-500 text-center max-w-xs">
                  You don't have any message notifications at the moment
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper component for Bell icon
const Bell = ({ className }: { className?: string }) => {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}
