"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, BookOpen, Calendar, Star, FileText, Video } from "lucide-react"
import Link from "next/link"

export function SearchPanel() {
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isSearching, setIsSearching] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem("recent-searches")
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
  }, [])

  // Save search to recent searches
  const saveSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return

    const updatedSearches = [searchQuery, ...recentSearches.filter((s) => s !== searchQuery)].slice(0, 5)

    setRecentSearches(updatedSearches)
    localStorage.setItem("recent-searches", JSON.stringify(updatedSearches))
  }

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("recent-searches")
  }

  // Mock search results
  const searchResults = {
    mentors: [
      {
        id: "mentor_1",
        name: "Sarah Johnson",
        role: "Creative Director",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
        specialties: ["Design", "Streetwear"],
      },
      {
        id: "mentor_2",
        name: "Michael Chen",
        role: "Design Lead",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
        specialties: ["Production", "Materials"],
      },
    ],
    resources: [
      {
        id: "resource_1",
        title: "Fashion Design Fundamentals Guide",
        type: "PDF",
        category: "Design",
      },
      {
        id: "resource_2",
        title: "Streetwear Design Workshop",
        type: "Video",
        category: "Design",
      },
    ],
    sessions: [
      {
        id: "session_1",
        title: "PORTFOLIO REVIEW",
        date: "Today, 2:00 PM",
        mentor: "Sarah Johnson",
      },
      {
        id: "session_2",
        title: "CAREER GUIDANCE",
        date: "Tomorrow, 11:00 AM",
        mentor: "Michael Chen",
      },
    ],
  }

  // Filter results based on search query
  const filteredResults = {
    mentors: query
      ? searchResults.mentors.filter(
          (mentor) =>
            mentor.name.toLowerCase().includes(query.toLowerCase()) ||
            mentor.role.toLowerCase().includes(query.toLowerCase()) ||
            mentor.specialties.some((s) => s.toLowerCase().includes(query.toLowerCase())),
        )
      : [],
    resources: query
      ? searchResults.resources.filter(
          (resource) =>
            resource.title.toLowerCase().includes(query.toLowerCase()) ||
            resource.type.toLowerCase().includes(query.toLowerCase()) ||
            resource.category.toLowerCase().includes(query.toLowerCase()),
        )
      : [],
    sessions: query
      ? searchResults.sessions.filter(
          (session) =>
            session.title.toLowerCase().includes(query.toLowerCase()) ||
            session.mentor.toLowerCase().includes(query.toLowerCase()),
        )
      : [],
  }

  // Get all results for "all" tab
  const allResults = [
    ...filteredResults.mentors.map((item) => ({ ...item, type: "mentor" })),
    ...filteredResults.resources.map((item) => ({ ...item, type: "resource" })),
    ...filteredResults.sessions.map((item) => ({ ...item, type: "session" })),
  ]

  // Handle search
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsSearching(true)

    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false)
      saveSearch(query)
    }, 500)
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search mentors, resources, sessions..."
            className="w-full p-2 border border-black rounded-md mb-4"
            autoFocus
          />
        </form>

        {!query && recentSearches.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Recent Searches</h3>
              <Button variant="ghost" size="sm" onClick={clearRecentSearches}>
                Clear
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="border-gray-200"
                  onClick={() => setQuery(search)}
                >
                  {search}
                </Button>
              ))}
            </div>
          </div>
        )}

        {query && (
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start p-0 h-auto bg-transparent overflow-x-auto flex-nowrap border-b border-gray-200 mb-4">
              <TabsTrigger
                value="all"
                className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
                  activeTab === "all" ? "border-black text-black" : "border-transparent text-gray-500"
                }`}
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="mentors"
                className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
                  activeTab === "mentors" ? "border-black text-black" : "border-transparent text-gray-500"
                }`}
              >
                Mentors
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
                  activeTab === "resources" ? "border-black text-black" : "border-transparent text-gray-500"
                }`}
              >
                Resources
              </TabsTrigger>
              <TabsTrigger
                value="sessions"
                className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
                  activeTab === "sessions" ? "border-black text-black" : "border-transparent text-gray-500"
                }`}
              >
                Sessions
              </TabsTrigger>
            </TabsList>

            {isSearching ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="h-8 w-8 border-2 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500">Searching...</p>
              </div>
            ) : (
              <>
                <TabsContent value="all" className="mt-0 space-y-4">
                  {allResults.length > 0 ? (
                    allResults.map((result, index) => {
                      if (result.type === "mentor") {
                        const mentor = result as (typeof searchResults.mentors)[0] & { type: string }
                        return (
                          <Link href={`/dashboard/mentors/${mentor.id}`} key={`${mentor.type}-${mentor.id}`}>
                            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-md hover:border-black">
                              <Avatar className="h-10 w-10 border border-gray-200">
                                <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                                <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <h3 className="font-medium">{mentor.name}</h3>
                                  <div className="flex items-center">
                                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm ml-1">{mentor.rating}</span>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600">{mentor.role}</p>
                              </div>
                              <Badge className="bg-gray-100 text-gray-800">Mentor</Badge>
                            </div>
                          </Link>
                        )
                      } else if (result.type === "resource") {
                        const resource = result as (typeof searchResults.resources)[0] & { type: string }
                        return (
                          <Link href="/dashboard/resources" key={`${resource.type}-${resource.id}`}>
                            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-md hover:border-black">
                              <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                                {resource.type === "PDF" ? (
                                  <FileText className="h-5 w-5 text-red-500" />
                                ) : (
                                  <Video className="h-5 w-5 text-blue-500" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium">{resource.title}</h3>
                                <p className="text-sm text-gray-600">
                                  {resource.category} • {resource.type}
                                </p>
                              </div>
                              <Badge className="bg-gray-100 text-gray-800">Resource</Badge>
                            </div>
                          </Link>
                        )
                      } else {
                        const session = result as (typeof searchResults.sessions)[0] & { type: string }
                        return (
                          <Link href={`/dashboard/sessions/${session.id}`} key={`${session.type}-${session.id}`}>
                            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-md hover:border-black">
                              <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                                <Calendar className="h-5 w-5 text-black" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium">{session.title}</h3>
                                <p className="text-sm text-gray-600">
                                  {session.date} • {session.mentor}
                                </p>
                              </div>
                              <Badge className="bg-gray-100 text-gray-800">Session</Badge>
                            </div>
                          </Link>
                        )
                      }
                    })
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <Search className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">No results found</h3>
                      <p className="text-gray-500 text-center max-w-xs">We couldn't find any results for "{query}"</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="mentors" className="mt-0 space-y-4">
                  {filteredResults.mentors.length > 0 ? (
                    filteredResults.mentors.map((mentor) => (
                      <Link href={`/dashboard/mentors/${mentor.id}`} key={mentor.id}>
                        <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-md hover:border-black">
                          <Avatar className="h-10 w-10 border border-gray-200">
                            <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                            <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
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
                      </Link>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <Users className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">No mentors found</h3>
                      <p className="text-gray-500 text-center max-w-xs">
                        We couldn't find any mentors matching "{query}"
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="resources" className="mt-0 space-y-4">
                  {filteredResults.resources.length > 0 ? (
                    filteredResults.resources.map((resource) => (
                      <Link href="/dashboard/resources" key={resource.id}>
                        <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-md hover:border-black">
                          <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                            {resource.type === "PDF" ? (
                              <FileText className="h-5 w-5 text-red-500" />
                            ) : (
                              <Video className="h-5 w-5 text-blue-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{resource.title}</h3>
                            <p className="text-sm text-gray-600">
                              {resource.category} • {resource.type}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <BookOpen className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">No resources found</h3>
                      <p className="text-gray-500 text-center max-w-xs">
                        We couldn't find any resources matching "{query}"
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="sessions" className="mt-0 space-y-4">
                  {filteredResults.sessions.length > 0 ? (
                    filteredResults.sessions.map((session) => (
                      <Link href={`/dashboard/sessions/${session.id}`} key={session.id}>
                        <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-md hover:border-black">
                          <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-black" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{session.title}</h3>
                            <p className="text-sm text-gray-600">
                              {session.date} • {session.mentor}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <Calendar className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">No sessions found</h3>
                      <p className="text-gray-500 text-center max-w-xs">
                        We couldn't find any sessions matching "{query}"
                      </p>
                    </div>
                  )}
                </TabsContent>
              </>
            )}
          </Tabs>
        )}

        {!query && !recentSearches.length && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-1">Search for anything</h3>
            <p className="text-gray-500 text-center max-w-xs">Find mentors, resources, sessions, and more</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Helper component for Search icon
const Search = ({ className }: { className?: string }) => {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
