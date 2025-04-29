"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowDown, Users, Calendar, MessageSquare, BookOpen } from "lucide-react"
import Image from "next/image"

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-black py-4 px-6 flex justify-between items-center bg-white sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 border border-black"></div>
          <span className="font-bold tracking-tighter text-lg">"OFF-WHITE MENTORSHIP"</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth/login">
            <Button variant="outline" className="border-black">
              "LOGIN"
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button className="bg-black text-white hover:bg-gray-800">"SIGN UP"</Button>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-50 z-0"></div>
          <div className="container mx-auto px-6 z-10 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
                  "CONNECT" <br />
                  "LEARN" <br />
                  "CREATE"
                </h1>
                <p className="text-xl">
                  Join the exclusive OFF-WHITE mentorship program connecting emerging talent with industry leaders.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/auth/register">
                    <Button className="bg-black text-white hover:bg-gray-800 h-12 px-6 text-base">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-black h-12 px-6 text-base">
                    Learn More
                    <ArrowDown className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="relative h-[400px] border-2 border-black">
                <Image src="/hero-group.jpg" alt="Mentorship" fill className="object-cover" />
                <div className="absolute -bottom-4 -right-4 bg-white border-2 border-black p-3 text-sm font-medium">
                  "MENTORSHIP 2025"
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">"PROGRAM FEATURES"</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our mentorship program offers a comprehensive suite of tools and resources to help you grow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Users className="h-10 w-10" />,
                  title: "EXPERT MENTORS",
                  description: "Connect with industry professionals from leading fashion and design companies.",
                },
                {
                  icon: <Calendar className="h-10 w-10" />,
                  title: "FLEXIBLE SCHEDULING",
                  description: "Book one-on-one sessions that fit your schedule and learning pace.",
                },
                {
                  icon: <MessageSquare className="h-10 w-10" />,
                  title: "DIRECT COMMUNICATION",
                  description: "Message your mentors directly and get timely feedback on your work.",
                },
                {
                  icon: <BookOpen className="h-10 w-10" />,
                  title: "RESOURCE LIBRARY",
                  description: "Access exclusive learning materials, tutorials, and industry insights.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="border-2 border-black p-6 bg-white hover:translate-y-[-4px] transition-transform"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">"{feature.title}"</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold tracking-tighter mb-16 text-center">"SUCCESS STORIES"</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-2 border-black p-6 bg-white relative">
                  <div className="absolute -top-4 -left-4 h-8 w-8 bg-black text-white flex items-center justify-center font-bold">
                    "
                  </div>
                  <div className="mb-6 pt-4">
                    <p className="text-lg">
                      The OFF-WHITE mentorship program completely transformed my approach to design. The guidance I
                      received was invaluable.
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden border border-black">
                      <Image
                        src="/placeholder.svg?height=48&width=48"
                        alt="Testimonial"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold">Alex Johnson</p>
                      <p className="text-sm text-gray-600">Fashion Designer</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter mb-6">"JOIN THE COMMUNITY"</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Take the next step in your creative journey with personalized mentorship from industry leaders.
            </p>
            <Link href="/auth/register">
              <Button className="bg-white text-black hover:bg-gray-200 h-12 px-8 text-base">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-black py-8 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="h-6 w-6 border border-black"></div>
              <span className="font-bold tracking-tighter">"OFF-WHITE MENTORSHIP"</span>
            </div>
            <div className="text-sm text-gray-600">© {new Date().getFullYear()} OFF-WHITE™. All Rights Reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
