import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings, Edit, BookOpen } from "lucide-react"
import Image from "next/image"

export function ProfileScreen() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="relative h-32 bg-gradient-to-r from-gray-100 to-gray-200">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm border border-black"
        >
          <Settings size={18} />
        </Button>
      </div>

      <div className="px-4 pb-6 space-y-6">
        <div className="flex flex-col items-center -mt-16 text-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
            <Image src="/placeholder.svg?height=128&width=128" alt="Profile" fill className="object-cover" />
          </div>
          <h2 className="mt-2 text-xl font-bold">"YOUR NAME"</h2>
          <p className="text-gray-600">Fashion Design Student</p>

          <div className="flex gap-2 mt-3">
            <Button variant="outline" size="sm" className="border-black gap-1">
              <Edit size={14} />
              Edit Profile
            </Button>
          </div>
        </div>

        <section className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight">"MY LEARNING PATH"</h3>
          <Card className="border border-black">
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">"FASHION DESIGN FUNDAMENTALS"</h4>
                <Badge className="bg-[#FFA500] hover:bg-[#FF8C00] text-black">In Progress</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>60%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-black rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
              <Button className="w-full bg-black text-white hover:bg-gray-800 gap-2">
                <BookOpen size={16} />
                Continue Learning
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight">"MY MENTORS"</h3>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="relative w-full aspect-square rounded-md overflow-hidden border border-black mb-1">
                  <Image src="/placeholder.svg?height=80&width=80" alt="Mentor" fill className="object-cover" />
                </div>
                <p className="text-xs font-medium truncate">Mentor Name</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold tracking-tight">"ACHIEVEMENTS"</h3>
            <Button variant="link" className="text-xs h-auto p-0">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="relative w-full aspect-square rounded-full overflow-hidden border border-black mb-1 bg-gray-100 flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <p className="text-xs truncate">Achievement</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
