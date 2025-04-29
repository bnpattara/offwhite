"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Filter, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function MentorsDirectory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Mock data
  const mentors = [
    {
      id: "mentor_1",
      name: "Sarah Johnson",
      role: "Creative Director at Studio XYZ",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.9,
      specialties: ["Design", "Streetwear", "Branding"],
      availability: "Available this week",
      bio: "15+ years of experience in fashion design with a focus on streetwear and urban aesthetics.",
    },
    {
      id: "mentor_2",
      name: "Michael Chen",
      role: "Design Lead at Fashion Forward",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.8,
      specialties: ["Production", "Materials", "Sustainability"],
      availability: "Limited availability",
      bio: "Specializing in sustainable fashion production and innovative materials.",
    },
    {
      id: "mentor_3",
      name: "Emma Thompson",
      role: "Fashion Designer & Entrepreneur",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.7,
      specialties: ["Business", "Marketing", "Branding"],
      availability: "Available next week",
      bio: "Founded two successful fashion brands and mentored over 50 emerging designers.",
    },
    {
      id: "mentor_4",
      name: "David Rodriguez",
      role: "Technical Designer at Urban Collective",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.9,
      specialties: ["Technical Design", "Production", "Manufacturing"],
      availability: "Available this week",
      bio: "Expert in technical design and manufacturing processes for streetwear and athleisure.",
    },
    {
      id: "mentor_5",
      name: "Aisha Patel",
      role: "Fashion Marketing Director",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.8,
      specialties: ["Marketing", "Digital Strategy", "Branding"],
      availability: "Limited availability",
      bio: "Specializing in digital marketing strategies for fashion brands and designers.",
    },
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "design", label: "Design" },
    { value: "production", label: "Production" },
    { value: "business", label: "Business" },
    { value: "marketing", label: "Marketing" },
    { value: "technical", label: "Technical" },
  ]

  // Filter mentors based on search query and selected category
  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      searchQuery === "" ||
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory =
      selectedCategory === "all" ||
      mentor.specialties.some((s) => s.toLowerCase().includes(selectedCategory.toLowerCase()))

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">"FIND A MENTOR"</h1>
        <p className="text-gray-500">Connect with industry professionals for personalized guidance</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by name, role, or specialty..."
            className="pl-10 border-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[200px] border-black">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" className="border-black md:hidden">
          <Filter size={18} />
        </Button>
      </div>

      <div className="hidden md:flex gap-2 overflow-x-auto pb-2">
        {["All", "Design", "Production", "Business", "Marketing", "Technical"].map((category) => (
          <Badge
            key={category}
            variant={
              category.toLowerCase() === selectedCategory || (category === "All" && selectedCategory === "all")
                ? "default"
                : "outline"
            }
            className={
              category.toLowerCase() === selectedCategory || (category === "All" && selectedCategory === "all")
                ? "bg-black text-white cursor-pointer"
                : "border-black text-black cursor-pointer"
            }
            onClick={() => setSelectedCategory(category.toLowerCase())}
          >
            {category}
          </Badge>
        ))}
      </div>

      <div className="space-y-4">
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor) => (
            <Card key={mentor.id} className="border-2 border-black">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative w-24 h-24 rounded-md overflow-hidden border-2 border-black flex-shrink-0 mx-auto md:mx-0">
                    <Image src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                        <h2 className="text-xl font-bold">{mentor.name}</h2>
                        <div className="flex items-center">
                          <Star size={16} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-sm ml-1 font-medium">{mentor.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600">{mentor.role}</p>
                    </div>
                    <p className="text-sm">{mentor.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {mentor.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline" className="border-black">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <Badge className="bg-[#FFA500] text-black">{mentor.availability}</Badge>
                      <div className="flex gap-2">
                        <Link href={`/dashboard/messages/${mentor.id}`}>
                          <Button variant="outline" className="border-black">
                            Message
                          </Button>
                        </Link>
                        <Link href={`/dashboard/mentors/${mentor.id}`}>
                          <Button className="bg-black text-white hover:bg-gray-800">View Profile</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium mb-2">No mentors found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
