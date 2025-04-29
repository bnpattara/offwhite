import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Star } from "lucide-react"
import Image from "next/image"

export function MentorsScreen() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search mentors..." className="pl-8 border-black" />
          </div>
          <Button variant="outline" size="icon" className="border-black">
            <Filter size={18} />
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {["All", "Design", "Marketing", "Production", "Business"].map((category) => (
            <Badge
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className={category === "All" ? "bg-black text-white" : "border-black text-black"}
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="border border-black">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden border border-black flex-shrink-0">
                    <Image src="/placeholder.svg?height=64&width=64" alt="Mentor" fill className="object-cover" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">"MENTOR NAME"</h3>
                      <div className="flex items-center">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm ml-1">4.9</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Creative Director at Studio XYZ</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {["Design", "Streetwear", "Branding"].map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-black">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <Button variant="outline" className="border-black text-xs h-8">
                    View Profile
                  </Button>
                  <Button className="bg-black text-white hover:bg-gray-800 text-xs h-8">Book Session</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
