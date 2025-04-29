"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Moon, Sun, Globe, Lock, LogOut, Trash2, Download, HelpCircle, Info, Wifi, WifiOff } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function AppSettings() {
  const { theme, setTheme } = useTheme()
  const { logout, user } = useAuth()
  const { toast } = useToast()

  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [sessionReminders, setSessionReminders] = useState(true)
  const [dataUsage, setDataUsage] = useState<"wifi-only" | "always">("wifi-only")
  const [language, setLanguage] = useState("english")
  const [offlineMode, setOfflineMode] = useState(false)
  const [isClearing, setIsClearing] = useState(false)

  const clearAppData = () => {
    setIsClearing(true)

    // Simulate clearing app data
    setTimeout(() => {
      localStorage.clear()
      setIsClearing(false)
      toast({
        title: "App data cleared",
        description: "All cached data has been removed",
      })
    }, 1500)
  }

  const toggleOfflineMode = () => {
    setOfflineMode(!offlineMode)
    toast({
      title: offlineMode ? "Online mode activated" : "Offline mode activated",
      description: offlineMode ? "You're now connected to the internet" : "App will work without internet connection",
    })
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 space-y-6">
        <Card className="border-2 border-black">
          <CardHeader>
            <CardTitle>"ACCOUNT"</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{user?.name || "User Name"}</h3>
                <p className="text-sm text-gray-500">{user?.email || "user@example.com"}</p>
              </div>
              <Button variant="outline" className="border-black" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>

            <div className="pt-2">
              <Button variant="link" className="p-0 h-auto text-sm text-black">
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-black">
          <CardHeader>
            <CardTitle>"APPEARANCE"</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <Label htmlFor="theme-mode">Dark Mode</Label>
              </div>
              <Switch
                id="theme-mode"
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language" className="border-black">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="japanese">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-black">
          <CardHeader>
            <CardTitle>"NOTIFICATIONS"</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <Label htmlFor="notifications">Push Notifications</Label>
              </div>
              <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
                disabled={!notificationsEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="session-reminders">Session Reminders</Label>
              <Switch
                id="session-reminders"
                checked={sessionReminders}
                onCheckedChange={setSessionReminders}
                disabled={!notificationsEnabled}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-black">
          <CardHeader>
            <CardTitle>"DATA & STORAGE"</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="data-usage">Data Usage</Label>
              <Select value={dataUsage} onValueChange={(value: "wifi-only" | "always") => setDataUsage(value)}>
                <SelectTrigger id="data-usage" className="border-black">
                  <SelectValue placeholder="Select data usage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wifi-only">
                    <div className="flex items-center">
                      <Wifi className="mr-2 h-4 w-4" />
                      Wi-Fi Only
                    </div>
                  </SelectItem>
                  <SelectItem value="always">
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4" />
                      Always
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {offlineMode ? <WifiOff className="h-5 w-5" /> : <Wifi className="h-5 w-5" />}
                <Label htmlFor="offline-mode">Offline Mode</Label>
              </div>
              <Switch id="offline-mode" checked={offlineMode} onCheckedChange={toggleOfflineMode} />
            </div>

            <div className="pt-2 space-y-2">
              <Button variant="outline" className="w-full border-black" onClick={clearAppData} disabled={isClearing}>
                {isClearing ? (
                  <>
                    <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                    Clearing...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear App Data
                  </>
                )}
              </Button>

              <Button variant="outline" className="w-full border-black">
                <Download className="mr-2 h-4 w-4" />
                Download My Data
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-black">
          <CardHeader>
            <CardTitle>"PRIVACY & SECURITY"</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full border-black">
              <Lock className="mr-2 h-4 w-4" />
              Change Password
            </Button>

            <Button variant="outline" className="w-full border-black">
              Privacy Settings
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full border-red-300 text-red-500 hover:text-red-600 hover:border-red-500"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your data from
                    our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-500 hover:bg-red-600">Delete Account</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        <Card className="border-2 border-black">
          <CardHeader>
            <CardTitle>"HELP & SUPPORT"</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full border-black">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help Center
            </Button>

            <Button variant="outline" className="w-full border-black">
              Contact Support
            </Button>

            <Button variant="outline" className="w-full border-black">
              <Info className="mr-2 h-4 w-4" />
              About
            </Button>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-gray-500 py-4">
          <p>OFF-WHITE Mentorship App</p>
          <p>Version 1.0.0</p>
        </div>
      </div>
    </div>
  )
}
