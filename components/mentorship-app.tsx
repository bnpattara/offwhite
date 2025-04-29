"use client"

import { useState, useEffect, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HomeScreen } from "@/components/home-screen"
import { MentorsScreen } from "@/components/mentors-screen"
import { MessagesScreen } from "@/components/messages-screen"
import { ProfileScreen } from "@/components/profile-screen"
import { ResourceLibrary } from "@/components/resources/resource-library"
import { SessionsCalendar } from "@/components/sessions/sessions-calendar"
import { ProgressTracking } from "@/components/progress/progress-tracking"
import { NotificationsPanel } from "@/components/notifications-panel"
import { SearchPanel } from "@/components/search-panel"
import { OnboardingFlow } from "@/components/onboarding-flow"
import { AppSettings } from "@/components/app-settings"
import {
  Home,
  Users,
  MessageSquare,
  User,
  Calendar,
  BookOpen,
  BarChart3,
  Menu,
  Bell,
  Search,
  Settings,
  ArrowLeft,
  Sun,
  Moon,
  WifiOff,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import { useTheme } from "@/components/theme-provider"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export function MentorshipApp() {
  const [activeTab, setActiveTab] = useState("home")
  const [isMobile, setIsMobile] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(3)
  const [isInstalled, setIsInstalled] = useState(false)
  const deferredPromptRef = useRef<any>(null)

  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Check online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      toast({
        title: "You're back online",
        description: "Your changes will now be synchronized",
      })
    }

    const handleOffline = () => {
      setIsOnline(false)
      toast({
        title: "You're offline",
        description: "Some features may be limited",
        variant: "destructive",
      })
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [toast])

  // Handle deep linking
  useEffect(() => {
    const section = searchParams.get("section")
    if (section && ["home", "mentors", "messages", "sessions", "resources", "progress", "profile"].includes(section)) {
      setActiveTab(section)
    }
  }, [searchParams])

  // Handle PWA installation
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      deferredPromptRef.current = e
      setIsInstalled(false)
    })

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true)
      toast({
        title: "App installed",
        description: "OFF-WHITE Mentorship has been added to your home screen",
      })
    })

    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
    }
  }, [toast])

  // Check if user needs onboarding
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem("onboarding-completed")
    if (!hasCompletedOnboarding && user) {
      setShowOnboarding(true)
    }
  }, [user])

  const handleInstallClick = () => {
    if (deferredPromptRef.current) {
      deferredPromptRef.current.prompt()

      deferredPromptRef.current.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === "accepted") {
          toast({
            title: "Installing app",
            description: "OFF-WHITE Mentorship is being added to your home screen",
          })
        }
        deferredPromptRef.current = null
      })
    }
  }

  const completeOnboarding = () => {
    localStorage.setItem("onboarding-completed", "true")
    setShowOnboarding(false)
    toast({
      title: "Welcome to OFF-WHITE Mentorship",
      description: "Your mentorship journey begins now",
    })
  }

  const markAllNotificationsAsRead = () => {
    setUnreadNotifications(0)
    toast({
      title: "Notifications cleared",
      description: "All notifications have been marked as read",
    })
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      {/* Offline Banner */}
      {!isOnline && (
        <div className="bg-yellow-500 text-black px-4 py-2 flex items-center justify-center">
          <WifiOff className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">You're offline. Some features may be limited.</span>
        </div>
      )}

      {/* Header */}
      {showSearch ? (
        <header className="border-b border-black p-4 flex items-center bg-white z-10">
          <Button variant="ghost" size="icon" onClick={() => setShowSearch(false)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <input
            type="text"
            placeholder="Search mentors, resources, sessions..."
            className="flex-1 ml-2 p-2 border-none outline-none"
            autoFocus
          />
        </header>
      ) : showNotifications ? (
        <header className="border-b border-black p-4 flex items-center bg-white z-10">
          <Button variant="ghost" size="icon" onClick={() => setShowNotifications(false)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold tracking-tighter ml-2">"NOTIFICATIONS"</h1>
          <Button variant="ghost" size="sm" className="ml-auto" onClick={markAllNotificationsAsRead}>
            Mark all as read
          </Button>
        </header>
      ) : showSettings ? (
        <header className="border-b border-black p-4 flex items-center bg-white z-10">
          <Button variant="ghost" size="icon" onClick={() => setShowSettings(false)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold tracking-tighter ml-2">"SETTINGS"</h1>
        </header>
      ) : (
        <header className="border-b border-black p-4 flex justify-between items-center bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 border border-black"></div>
            <h1 className="text-lg font-bold tracking-tighter">"OFF-WHITE MENTORSHIP"</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)}>
              <Search className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" className="relative" onClick={() => setShowNotifications(true)}>
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-[#FFA500] text-black text-xs">
                  {unreadNotifications}
                </Badge>
              )}
            </Button>

            {!isMobile && (
              <>
                <Button variant="ghost" size="icon" onClick={() => setShowSettings(true)}>
                  <Settings className="h-5 w-5" />
                </Button>

                <Avatar className="h-8 w-8 border border-black cursor-pointer" onClick={() => setShowSettings(true)}>
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </>
            )}

            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="border-l border-black">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 p-4 border-b border-gray-200">
                      <Avatar className="h-10 w-10 border border-black">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                        <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user?.name || "User Name"}</p>
                        <p className="text-xs text-gray-500">{user?.role || "mentee"}</p>
                      </div>
                    </div>

                    <div className="flex-1 py-4">
                      <div className="space-y-1">
                        <SheetClose asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => setShowSettings(true)}
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                          </Button>
                        </SheetClose>

                        <SheetClose asChild>
                          <Link href="/dashboard">
                            <Button variant="ghost" className="w-full justify-start">
                              Dashboard
                            </Button>
                          </Link>
                        </SheetClose>

                        <SheetClose asChild>
                          <Link href="/dashboard/profile">
                            <Button variant="ghost" className="w-full justify-start">
                              Profile Settings
                            </Button>
                          </Link>
                        </SheetClose>

                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        >
                          {theme === "dark" ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                          {theme === "dark" ? "Light Mode" : "Dark Mode"}
                        </Button>

                        {!isInstalled && (
                          <Button variant="ghost" className="w-full justify-start" onClick={handleInstallClick}>
                            Install App
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 p-4">
                      <Button variant="outline" className="w-full border-black" onClick={logout}>
                        Logout
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </header>
      )}

      {/* Main Content */}
      {showOnboarding ? (
        <OnboardingFlow onComplete={completeOnboarding} />
      ) : showNotifications ? (
        <NotificationsPanel />
      ) : showSearch ? (
        <SearchPanel />
      ) : showSettings ? (
        <AppSettings />
      ) : (
        <Tabs defaultValue="home" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsContent value="home" className="flex-1 p-0 data-[state=active]:flex overflow-auto">
            <HomeScreen />
          </TabsContent>

          <TabsContent value="mentors" className="flex-1 p-0 data-[state=active]:flex overflow-auto">
            <MentorsScreen />
          </TabsContent>

          <TabsContent value="messages" className="flex-1 p-0 data-[state=active]:flex overflow-auto">
            <MessagesScreen />
          </TabsContent>

          <TabsContent value="sessions" className="flex-1 p-0 data-[state=active]:flex overflow-auto">
            <SessionsCalendar />
          </TabsContent>

          <TabsContent value="resources" className="flex-1 p-0 data-[state=active]:flex overflow-auto">
            <ResourceLibrary />
          </TabsContent>

          <TabsContent value="progress" className="flex-1 p-0 data-[state=active]:flex overflow-auto">
            <ProgressTracking />
          </TabsContent>

          <TabsContent value="profile" className="flex-1 p-0 data-[state=active]:flex overflow-auto">
            <ProfileScreen />
          </TabsContent>

          {/* Bottom Navigation */}
          <TabsList className="grid grid-cols-5 bg-white border-t border-black h-16 rounded-none">
            <TabsTrigger
              value="home"
              className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none"
            >
              <div className="flex flex-col items-center gap-1">
                <Home size={20} />
                <span className="text-xs">"HOME"</span>
              </div>
            </TabsTrigger>

            <TabsTrigger
              value="mentors"
              className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none"
            >
              <div className="flex flex-col items-center gap-1">
                <Users size={20} />
                <span className="text-xs">"MENTORS"</span>
              </div>
            </TabsTrigger>

            <TabsTrigger
              value="sessions"
              className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none"
            >
              <div className="flex flex-col items-center gap-1">
                <Calendar size={20} />
                <span className="text-xs">"SESSIONS"</span>
              </div>
            </TabsTrigger>

            <TabsTrigger
              value="messages"
              className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none"
            >
              <div className="flex flex-col items-center gap-1">
                <MessageSquare size={20} />
                <span className="text-xs">"MESSAGES"</span>
              </div>
            </TabsTrigger>

            {isMobile ? (
              <TabsTrigger
                value="more"
                onClick={() => {
                  const moreButton = document.querySelector('[data-more-trigger="true"]') as HTMLButtonElement
                  if (moreButton) moreButton.click()
                }}
                className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none"
              >
                <div className="flex flex-col items-center gap-1">
                  <Menu size={20} />
                  <span className="text-xs">"MORE"</span>
                </div>
              </TabsTrigger>
            ) : (
              <TabsTrigger
                value="profile"
                className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none"
              >
                <div className="flex flex-col items-center gap-1">
                  <User size={20} />
                  <span className="text-xs">"PROFILE"</span>
                </div>
              </TabsTrigger>
            )}
          </TabsList>
        </Tabs>
      )}

      {/* Hidden More Menu Trigger */}
      <Sheet>
        <SheetTrigger data-more-trigger="true" className="hidden"></SheetTrigger>
        <SheetContent side="bottom" className="h-[60vh] border-t border-black rounded-t-xl">
          <div className="grid grid-cols-3 gap-4 pt-6">
            <SheetClose asChild>
              <Button
                variant="ghost"
                className="flex flex-col items-center h-auto py-4 gap-2"
                onClick={() => setActiveTab("resources")}
              >
                <BookOpen size={24} />
                <span className="text-xs">"RESOURCES"</span>
              </Button>
            </SheetClose>

            <SheetClose asChild>
              <Button
                variant="ghost"
                className="flex flex-col items-center h-auto py-4 gap-2"
                onClick={() => setActiveTab("progress")}
              >
                <BarChart3 size={24} />
                <span className="text-xs">"PROGRESS"</span>
              </Button>
            </SheetClose>

            <SheetClose asChild>
              <Button
                variant="ghost"
                className="flex flex-col items-center h-auto py-4 gap-2"
                onClick={() => setActiveTab("profile")}
              >
                <User size={24} />
                <span className="text-xs">"PROFILE"</span>
              </Button>
            </SheetClose>

            <SheetClose asChild>
              <Button
                variant="ghost"
                className="flex flex-col items-center h-auto py-4 gap-2 col-span-3"
                onClick={() => setShowSettings(true)}
              >
                <Settings size={24} />
                <span className="text-xs">"SETTINGS"</span>
              </Button>
            </SheetClose>

            <SheetClose asChild>
              <Link href="/dashboard" className="col-span-3">
                <Button variant="outline" className="w-full border-black">
                  Go to Dashboard
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Button variant="outline" className="w-full border-black col-span-3" onClick={logout}>
                Logout
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
