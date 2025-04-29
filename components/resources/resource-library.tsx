"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Download, BookOpen, FileText, Video, Folder, Plus, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAuth } from "@/components/auth-provider"

export function ResourceLibrary() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  // Mock data for resources
  const resources = [
    {
      id: "resource_1",
      title: "Fashion Design Fundamentals Guide",
      description:
        "A comprehensive guide to the basics of fashion design, covering principles, techniques, and industry standards.",
      type: "PDF",
      category: "Design",
      size: "2.4 MB",
      addedBy: "Sarah Johnson",
      addedByAvatar: "/placeholder.svg?height=40&width=40",
      date: "2 weeks ago",
      saved: true,
      featured: true,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "resource_2",
      title: "Streetwear Design Workshop",
      description: "Video recording of a workshop on contemporary streetwear design trends and techniques.",
      type: "Video",
      category: "Design",
      size: "156 MB",
      addedBy: "Michael Chen",
      addedByAvatar: "/placeholder.svg?height=40&width=40",
      date: "1 month ago",
      saved: false,
      featured: true,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "resource_3",
      title: "Material Selection Checklist",
      description: "A practical checklist for selecting appropriate materials for different fashion applications.",
      type: "Document",
      category: "Production",
      size: "540 KB",
      addedBy: "Emma Thompson",
      addedByAvatar: "/placeholder.svg?height=40&width=40",
      date: "3 days ago",
      saved: true,
      featured: false,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "resource_4",
      title: "Fashion Marketing Strategy Template",
      description: "A template for developing comprehensive marketing strategies for fashion brands and products.",
      type: "Template",
      category: "Marketing",
      size: "1.2 MB",
      addedBy: "David Rodriguez",
      addedByAvatar: "/placeholder.svg?height=40&width=40",
      date: "1 week ago",
      saved: false,
      featured: false,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "resource_5",
      title: "Sustainable Fashion Practices",
      description:
        "An overview of sustainable practices in the fashion industry, with case studies and implementation guides.",
      type: "PDF",
      category: "Sustainability",
      size: "3.7 MB",
      addedBy: "Aisha Patel",
      addedByAvatar: "/placeholder.svg?height=40&width=40",
      date: "2 days ago",
      saved: false,
      featured: true,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "resource_6",
      title: "Technical Drawing for Fashion",
      description: "A guide to creating technical drawings and specifications for fashion design.",
      type: "Tutorial",
      category: "Technical",
      size: "85 MB",
      addedBy: "Sarah Johnson",
      addedByAvatar: "/placeholder.svg?height=40&width=40",
      date: "3 weeks ago",
      saved: true,
      featured: false,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
  ]

  // Filter resources based on search query, category, type, and active tab
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      searchQuery === "" ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === "all" || resource.category.toLowerCase() === selectedCategory.toLowerCase()

    const matchesType = selectedType === "all" || resource.type.toLowerCase() === selectedType.toLowerCase()

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "saved" && resource.saved) ||
      (activeTab === "featured" && resource.featured)

    return matchesSearch && matchesCategory && matchesType && matchesTab
  })

  // Get all categories from resources
  const categories = ["all", ...new Set(resources.map((resource) => resource.category.toLowerCase()))]

  // Get all types from resources
  const types = ["all", ...new Set(resources.map((resource) => resource.type.toLowerCase()))]

  // Function to get icon based on resource type
  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText className="h-6 w-6 text-red-500" />
      case "video":
        return <Video className="h-6 w-6 text-blue-500" />
      case "document":
        return <FileText className="h-6 w-6 text-green-500" />
      case "template":
        return <Folder className="h-6 w-6 text-yellow-500" />
      case "tutorial":
        return <BookOpen className="h-6 w-6 text-purple-500" />
      default:
        return <FileText className="h-6 w-6 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">"RESOURCE LIBRARY"</h1>
          <p className="text-gray-500">Access learning materials and industry resources</p>
        </div>
        {user?.role === "mentor" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Plus className="mr-2 h-4 w-4" />
                Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>"ADD RESOURCE"</DialogTitle>
                <DialogDescription>Share a resource with your mentees or the entire community.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input id="title" placeholder="Enter resource title" className="border-black" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    id="description"
                    placeholder="Enter resource description"
                    className="min-h-[100px] w-full rounded-md border border-black p-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Category
                    </label>
                    <Select>
                      <SelectTrigger id="category" className="border-black">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="production">Production</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sustainability">Sustainability</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="visibility" className="text-sm font-medium">
                      Visibility
                    </label>
                    <Select defaultValue="all">
                      <SelectTrigger id="visibility" className="border-black">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Mentees</SelectItem>
                        <SelectItem value="specific">Specific Mentees</SelectItem>
                        <SelectItem value="public">Public</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Upload File</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 mb-2">Drag and drop your file here, or click to browse</p>
                    <p className="text-xs text-gray-400">Supports PDF, DOCX, PPTX, MP4, JPG, PNG (max 50MB)</p>
                    <Input type="file" className="hidden" id="file-upload" />
                    <label htmlFor="file-upload">
                      <Button variant="outline" className="mt-4 border-black" onClick={(e) => e.preventDefault()}>
                        Browse Files
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-black text-white hover:bg-gray-800">Upload Resource</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search resources..."
            className="pl-10 border-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[150px] border-black">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="capitalize">
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full md:w-[150px] border-black">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type} value={type} className="capitalize">
                  {type === "all" ? "All Types" : type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-transparent border-b border-gray-200 rounded-none p-0 h-auto">
          <TabsTrigger
            value="all"
            className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
              activeTab === "all" ? "border-black text-black" : "border-transparent text-gray-500"
            }`}
          >
            All Resources
          </TabsTrigger>
          <TabsTrigger
            value="featured"
            className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
              activeTab === "featured" ? "border-black text-black" : "border-transparent text-gray-500"
            }`}
          >
            Featured
          </TabsTrigger>
          <TabsTrigger
            value="saved"
            className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
              activeTab === "saved" ? "border-black text-black" : "border-transparent text-gray-500"
            }`}
          >
            Saved
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="border-2 border-black overflow-hidden">
                  <div className="h-40 bg-gray-100 relative">
                    {resource.type === "Video" ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-16 w-16 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
                          <Video className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {getResourceIcon(resource.type)}
                      </div>
                    )}
                    <Image
                      src={resource.thumbnail || "/placeholder.svg"}
                      alt={resource.title}
                      fill
                      className="object-cover opacity-50"
                    />
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium line-clamp-1">{resource.title}</h3>
                      <Badge variant="outline" className="border-black">
                        {resource.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{resource.description}</p>
                    <div className="flex items-center gap-2 pt-2">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gray-200">
                        <Image
                          src={resource.addedByAvatar || "/placeholder.svg"}
                          alt={resource.addedBy}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-xs text-gray-500">
                        Added by {resource.addedBy} • {resource.date}
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{resource.category}</Badge>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-8 w-8 p-0 ${resource.saved ? "text-[#FFA500]" : ""}`}
                        >
                          <BookOpen className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No resources found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="featured" className="space-y-6">
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="border-2 border-black overflow-hidden">
                  {/* Same card content as in "all" tab */}
                  <div className="h-40 bg-gray-100 relative">
                    {resource.type === "Video" ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-16 w-16 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
                          <Video className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {getResourceIcon(resource.type)}
                      </div>
                    )}
                    <Image
                      src={resource.thumbnail || "/placeholder.svg"}
                      alt={resource.title}
                      fill
                      className="object-cover opacity-50"
                    />
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium line-clamp-1">{resource.title}</h3>
                      <Badge variant="outline" className="border-black">
                        {resource.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{resource.description}</p>
                    <div className="flex items-center gap-2 pt-2">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gray-200">
                        <Image
                          src={resource.addedByAvatar || "/placeholder.svg"}
                          alt={resource.addedBy}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-xs text-gray-500">
                        Added by {resource.addedBy} • {resource.date}
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{resource.category}</Badge>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-8 w-8 p-0 ${resource.saved ? "text-[#FFA500]" : ""}`}
                        >
                          <BookOpen className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No featured resources found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="saved" className="space-y-6">
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="border-2 border-black overflow-hidden">
                  {/* Same card content as in "all" tab */}
                  <div className="h-40 bg-gray-100 relative">
                    {resource.type === "Video" ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-16 w-16 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
                          <Video className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {getResourceIcon(resource.type)}
                      </div>
                    )}
                    <Image
                      src={resource.thumbnail || "/placeholder.svg"}
                      alt={resource.title}
                      fill
                      className="object-cover opacity-50"
                    />
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium line-clamp-1">{resource.title}</h3>
                      <Badge variant="outline" className="border-black">
                        {resource.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{resource.description}</p>
                    <div className="flex items-center gap-2 pt-2">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gray-200">
                        <Image
                          src={resource.addedByAvatar || "/placeholder.svg"}
                          alt={resource.addedBy}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-xs text-gray-500">
                        Added by {resource.addedBy} • {resource.date}
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{resource.category}</Badge>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#FFA500]">
                          <BookOpen className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No saved resources</h3>
              <p className="text-gray-500">You haven't saved any resources yet</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Card className="border-2 border-black">
        <CardHeader>
          <CardTitle>"EXTERNAL RESOURCES"</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Fashion Design Council",
                description: "Industry resources and standards for fashion designers",
                link: "#",
                icon: "🏛️",
              },
              {
                title: "Sustainable Materials Database",
                description: "Comprehensive database of sustainable materials for fashion",
                link: "#",
                icon: "🌱",
              },
              {
                title: "Design Trend Forecasts",
                description: "Seasonal trend forecasts and analysis for fashion design",
                link: "#",
                icon: "📊",
              },
            ].map((resource, index) => (
              <Card key={index} className="border border-gray-200 hover:border-black transition-colors">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="text-2xl">{resource.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-medium">{resource.title}</h3>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                    <Button variant="link" className="p-0 h-auto mt-2 text-black">
                      Visit Resource
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
