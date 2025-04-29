"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, Check, Users, Calendar, BookOpen, Award } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

interface OnboardingFlowProps {
  onComplete: () => void
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0)
  const { user } = useAuth()

  const steps = [
    {
      title: "Welcome to OFF-WHITE Mentorship",
      description:
        "Connect with industry mentors, learn from the best, and accelerate your career in fashion and design.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      title: "Find Your Mentor",
      description:
        "Browse our curated list of industry professionals and connect with mentors who match your interests and goals.",
      icon: <Users className="h-12 w-12" />,
    },
    {
      title: "Schedule Sessions",
      description: "Book one-on-one sessions with your mentors at times that work for you.",
      icon: <Calendar className="h-12 w-12" />,
    },
    {
      title: "Access Resources",
      description: "Explore our library of exclusive resources, tutorials, and industry insights.",
      icon: <BookOpen className="h-12 w-12" />,
    },
    {
      title: "Track Your Progress",
      description: "Monitor your growth, complete learning paths, and earn achievements as you develop your skills.",
      icon: <Award className="h-12 w-12" />,
    },
  ]

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      onComplete()
    }
  }

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const skipOnboarding = () => {
    onComplete()
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-2 border-black">
          <CardContent className="p-6">
            <div className="flex justify-center mb-8">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-full mx-1 rounded-full ${
                    index === step ? "bg-black" : index < step ? "bg-gray-400" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            <div className="text-center mb-8">
              {step === 0 ? (
                <>
                  <div className="flex justify-center mb-6">
                    <div className="h-16 w-16 border-2 border-black flex items-center justify-center">
                      <div className="h-8 w-8 bg-black"></div>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">"{steps[step].title}"</h2>
                  <p className="text-gray-600">{steps[step].description}</p>
                  {user && (
                    <div className="mt-4">
                      <Badge className="bg-[#FFA500] text-black">Welcome, {user.name}!</Badge>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="flex justify-center mb-6">
                    <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center">
                      {steps[step].icon}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">"{steps[step].title}"</h2>
                  <p className="text-gray-600">{steps[step].description}</p>
                </>
              )}
            </div>

            <div className="flex justify-between">
              {step > 0 ? (
                <Button variant="outline" className="border-black" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <Button variant="outline" className="border-black" onClick={skipOnboarding}>
                  Skip
                </Button>
              )}

              <Button className="bg-black text-white hover:bg-gray-800" onClick={nextStep}>
                {step === steps.length - 1 ? (
                  <>
                    Get Started
                    <Check className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
