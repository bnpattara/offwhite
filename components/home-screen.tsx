import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock } from "lucide-react"
import Image from "next/image"

export function HomeScreen() {
  return (
    <div className="flex-1 overflow-auto p-4 space-y-6">
      <section className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">"UPCOMING SESSIONS"</h2>
        <Card className="border border-black">
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span className="text-sm text-gray-600">Today, 2:00 PM</span>
                </div>
                <h3 className="font-medium">"DESIGN PRINCIPLES"</h3>
              </div>
              <Badge className="bg-[#FFA500] hover:bg-[#FF8C00] text-black">30 min</Badge>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-black">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Mentor"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-sm">Sarah Johnson</p>
                <p className="text-xs text-gray-600">Creative Director</p>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" className="border-black text-xs h-8">
                Reschedule
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800 text-xs h-8">Join Call</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">"FEATURED MENTORS"</h2>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border border-black overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-32 w-full">
                  <Image src="/placeholder.svg?height=128&width=150" alt="Mentor" fill className="object-cover" />
                </div>
                <div className="p-2 space-y-1">
                  <h3 className="font-medium text-sm truncate">"MENTOR NAME"</h3>
                  <p className="text-xs text-gray-600 truncate">Fashion Designer</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button variant="ghost" className="w-full justify-between border border-black">
          <span>View all mentors</span>
          <ArrowRight size={16} />
        </Button>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">"LEARNING PATHS"</h2>
        <div className="space-y-3">
          {[
            { title: "Fashion Design Fundamentals", level: "Beginner", modules: 8 },
            { title: "Advanced Streetwear Concepts", level: "Intermediate", modules: 12 },
            { title: "Sustainable Fashion Innovation", level: "Advanced", modules: 10 },
          ].map((path, i) => (
            <Card key={i} className="border border-black">
              <CardContent className="p-3 flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="font-medium text-sm">"{path.title}"</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs border-black">
                      {path.level}
                    </Badge>
                    <span className="text-xs text-gray-600">{path.modules} modules</span>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <ArrowRight size={16} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
