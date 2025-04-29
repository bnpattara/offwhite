"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Star, MessageSquare, FileText, Award, ChevronLeft, Video, Users, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

export function MentorProfile({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState("about")
  const [date, setDate] = useState<Date | undefined>(undefined)

  // Mock data for a mentor
  const mentor = {
    id,
    name: "Sarah Johnson",
    role: "Creative Director at Studio XYZ",
    avatar: "/placeholder.svg?height=120&width=120",
    coverImage: "/placeholder.svg?height=200&width=800",
    rating: 4.9,
    reviews: 32,
    specialties: ["Design", "Streetwear", "Branding", "Creative Direction"],
    bio: "15+ years of experience in fashion design with a focus on streetwear and urban aesthetics. I've worked with major brands including OFF-WHITE, Nike, and Adidas on collaborative projects. My approach combines practical industry knowledge with creative exploration.",
    experience: [
      {
        title: "Creative Director",
        company: "Studio XYZ",
        period: "2018 - Present",
        description: "Leading creative direction for fashion and lifestyle brands.",
      },
      {
        title: "Senior Designer",
        company: "Urban Collective",
        period: "2012 - 2018",
        description: "Developed streetwear collections and brand collaborations.",
      },
      {
        title: "Designer",
        company: "Fashion Forward",
        period: "2008 - 2012",
        description: "Created seasonal collections and technical specifications.",
      },
    ],
    education: [
      {
        degree: "MFA in Fashion Design",
        institution: "Parsons School of Design",
        year: "2008",
      },
      {
        degree: "BFA in Textile Design",
        institution: "Rhode Island School of Design",
        year: "2006",
      },
    ],
    achievements: [
      "Fashion Innovation Award 2020",
      "Featured in Vogue Magazine 2019",
      "Sustainable Design Recognition 2018",
    ],
    sessionTypes: [
      {
        title: "Portfolio Review",
        duration: 30,
        price: "$75",
        description: "In-depth review of your design portfolio with actionable feedback.",
      },
      {
        title: "Career Guidance",
        duration: 45,
        price: "$100",
        description: "Strategic career planning and industry insights for emerging designers.",
      },
      {
        title: "Design Critique",
        duration: 60,
        price: "$120",
        description: "Detailed critique of specific design projects or collections.",
      },
    ],
    availability: {
      nextAvailable: "Tomorrow",
      timeSlots: ["10:00 AM", "2:00 PM", "4:30 PM"],
    },
    resources: [
      {
        title: "Design Process Guide",
        type: "PDF",
        size: "2.4 MB",
      },
      {
        title: "Industry Contacts List",
        type: "Document",
        size: "540 KB",
      },
    ],
    testimonials: [
      {
        name: "Alex Johnson",
        role: "Fashion Design Student",
        avatar: "/placeholder.svg?height=48&width=48",
        text: "Sarah's mentorship completely transformed my approach to design. Her feedback was insightful and actionable.",
        rating: 5,
      },
      {
        name: "Jamie Smith",
        role: "Emerging Designer",
        avatar: "/placeholder.svg?height=48&width=48",
        text: "Working with Sarah helped me refine my portfolio and land my dream job. Her industry knowledge is invaluable.",
        rating: 5,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/mentors">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Mentor Profile</h1>
      </div>

      <div className="relative h-48 rounded-xl overflow-hidden border-2 border-black">
        <Image src={mentor.coverImage || "/placeholder.svg"} alt="Cover" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 space-y-4">
          <Card className="border-2 border-black relative">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden border-4 border-white">
              <Image src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} fill className="object-cover" />
            </div>
            <CardContent className="pt-12 pb-6 text-center">
              <h2 className="text-xl font-bold">{mentor.name}</h2>
              <p className="text-gray-600">{mentor.role}</p>

              <div className="flex justify-center items-center mt-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={
                        star <= Math.floor(mentor.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="text-sm ml-1 font-medium">{mentor.rating}</span>
                </div>
                <span className="text-sm text-gray-500 ml-1">({mentor.reviews} reviews)</span>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {mentor.specialties.map((specialty) => (
                  <Badge key={specialty} variant="outline" className="border-black">
                    {specialty}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <Link href={`/dashboard/messages/${mentor.id}`}>
                  <Button variant="outline" className="w-full border-black">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                </Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-black text-white hover:bg-gray-800">
                      <Calendar className="mr-2 h-4 w-4" />
                      Book
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>"BOOK A SESSION"</DialogTitle>
                      <DialogDescription>
                        Select a date and time to schedule your session with {mentor.name}.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <h3 className="font-medium">Select Session Type</h3>
                        <div className="space-y-2">
                          {mentor.sessionTypes.map((session, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-3 border border-gray-200 rounded-md cursor-pointer hover:border-black"
                            >
                              <div>
                                <h4 className="font-medium">{session.title}</h4>
                                <p className="text-sm text-gray-600">
                                  {session.duration} min • {session.price}
                                </p>
                              </div>
                              <div className="h-4 w-4 rounded-full border border-black"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <h3 className="font-medium">Select Date</h3>
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="border rounded-md"
                        />
                      </div>
                      <div className="grid gap-2">
                        <h3 className="font-medium">Select Time</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {mentor.availability.timeSlots.map((time, index) => (
                            <div
                              key={index}
                              className="p-2 border border-gray-200 rounded-md text-center cursor-pointer hover:border-black"
                            >
                              {time}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button className="bg-black text-white hover:bg-gray-800">Confirm Booking</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium mb-2">"NEXT AVAILABILITY"</h3>
                <div className="flex justify-center items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{mentor.availability.nextAvailable}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle>"RESOURCES"</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mentor.resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-gray-100 rounded flex items-center justify-center">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{resource.title}</h4>
                        <p className="text-xs text-gray-500">
                          {resource.type} • {resource.size}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Request
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3 space-y-6">
          <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="bg-transparent border-b border-gray-200 rounded-none p-0 h-auto">
              <TabsTrigger
                value="about"
                className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
                  activeTab === "about" ? "border-black text-black" : "border-transparent text-gray-500"
                }`}
              >
                About
              </TabsTrigger>
              <TabsTrigger
                value="experience"
                className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
                  activeTab === "experience" ? "border-black text-black" : "border-transparent text-gray-500"
                }`}
              >
                Experience
              </TabsTrigger>
              <TabsTrigger
                value="sessions"
                className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
                  activeTab === "sessions" ? "border-black text-black" : "border-transparent text-gray-500"
                }`}
              >
                Sessions
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className={`rounded-none border-b-2 pb-2 pt-1 px-4 ${
                  activeTab === "reviews" ? "border-black text-black" : "border-transparent text-gray-500"
                }`}
              >
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <Card className="border-2 border-black">
                <CardHeader>
                  <CardTitle>"ABOUT"</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line">{mentor.bio}</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-black">
                <CardHeader>
                  <CardTitle>"ACHIEVEMENTS"</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mentor.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-[#FFA500]" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-black">
                <CardHeader>
                  <CardTitle>"EDUCATION"</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mentor.education.map((edu, index) => (
                      <div key={index} className="space-y-1">
                        <h3 className="font-medium">{edu.degree}</h3>
                        <p className="text-sm text-gray-600">
                          {edu.institution}, {edu.year}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              <Card className="border-2 border-black">
                <CardHeader>
                  <CardTitle>"WORK EXPERIENCE"</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mentor.experience.map((exp, index) => (
                      <div key={index} className="relative pl-6 pb-6 border-l border-gray-200 last:pb-0">
                        <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-black"></div>
                        <div className="space-y-1">
                          <h3 className="font-medium">{exp.title}</h3>
                          <p className="text-sm text-gray-600">
                            {exp.company} • {exp.period}
                          </p>
                          <p className="text-sm mt-2">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-2 border-black">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-gray-600" />
                    </div>
                    <h3 className="font-bold text-2xl mb-1">120+</h3>
                    <p className="text-gray-600">Mentees Guided</p>
                  </CardContent>
                </Card>
                <Card className="border-2 border-black">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <Video className="h-6 w-6 text-gray-600" />
                    </div>
                    <h3 className="font-bold text-2xl mb-1">500+</h3>
                    <p className="text-gray-600">Sessions Completed</p>
                  </CardContent>
                </Card>
                <Card className="border-2 border-black">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <BookOpen className="h-6 w-6 text-gray-600" />
                    </div>
                    <h3 className="font-bold text-2xl mb-1">15+</h3>
                    <p className="text-gray-600">Years Experience</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sessions" className="space-y-6">
              <Card className="border-2 border-black">
                <CardHeader>
                  <CardTitle>"SESSION TYPES"</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mentor.sessionTypes.map((session, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{session.title}</h3>
                          <Badge className="bg-[#FFA500] text-black">{session.duration} min</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{session.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold">{session.price}</span>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="bg-black text-white hover:bg-gray-800">Book Session</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>"BOOK {session.title.toUpperCase()}"</DialogTitle>
                                <DialogDescription>
                                  Select a date and time to schedule your session with {mentor.name}.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                  <h3 className="font-medium">Session Details</h3>
                                  <div className="p-3 border border-gray-200 rounded-md">
                                    <div className="flex justify-between items-center mb-1">
                                      <h4 className="font-medium">{session.title}</h4>
                                      <Badge className="bg-[#FFA500] text-black">{session.duration} min</Badge>
                                    </div>
                                    <p className="text-sm text-gray-600">{session.description}</p>
                                    <div className="mt-2 pt-2 border-t border-gray-200 text-sm">
                                      <span className="font-bold">{session.price}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="grid gap-2">
                                  <h3 className="font-medium">Select Date</h3>
                                  <CalendarComponent
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="border rounded-md"
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <h3 className="font-medium">Select Time</h3>
                                  <div className="grid grid-cols-3 gap-2">
                                    {mentor.availability.timeSlots.map((time, index) => (
                                      <div
                                        key={index}
                                        className="p-2 border border-gray-200 rounded-md text-center cursor-pointer hover:border-black"
                                      >
                                        {time}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <Button className="bg-black text-white hover:bg-gray-800">Confirm Booking</Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-black">
                <CardHeader>
                  <CardTitle>"WHAT TO EXPECT"</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h3 className="font-medium">Preparation</h3>
                        <p className="text-sm text-gray-600">
                          Before our session, you'll receive a questionnaire to help me understand your goals and needs.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h3 className="font-medium">The Session</h3>
                        <p className="text-sm text-gray-600">
                          We'll connect via video call for a focused, interactive discussion tailored to your specific
                          needs.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h3 className="font-medium">Follow-up</h3>
                        <p className="text-sm text-gray-600">
                          After our session, you'll receive a summary of key points and actionable next steps.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Card className="border-2 border-black">
                <CardHeader>
                  <CardTitle>"TESTIMONIALS"</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mentor.testimonials.map((testimonial, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-md">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-black">
                            <Image
                              src={testimonial.avatar || "/placeholder.svg"}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{testimonial.name}</h3>
                            <p className="text-xs text-gray-600">{testimonial.role}</p>
                          </div>
                          <div className="flex ml-auto">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={14}
                                className={
                                  star <= testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm">"{testimonial.text}"</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-black">
                <CardHeader>
                  <CardTitle>"RATING BREAKDOWN"</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { category: "Knowledge", rating: 4.9 },
                      { category: "Communication", rating: 5.0 },
                      { category: "Helpfulness", rating: 4.8 },
                      { category: "Availability", rating: 4.7 },
                    ].map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{item.category}</span>
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-2">{item.rating}</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  size={12}
                                  className={
                                    star <= Math.floor(item.rating)
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full"
                            style={{ width: `${(item.rating / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
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
