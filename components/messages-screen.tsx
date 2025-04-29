import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Image from "next/image"

export function MessagesScreen() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search conversations..." className="pl-8 border-black" />
        </div>

        <div className="space-y-2">
          {[
            { name: "Sarah Johnson", message: "Let's discuss your portfolio next week", time: "2m ago", unread: true },
            { name: "Michael Chen", message: "Thanks for the feedback on my designs", time: "1h ago", unread: false },
            { name: "Ava Williams", message: "Can we reschedule our session?", time: "3h ago", unread: false },
            { name: "James Rodriguez", message: "I've shared some resources with you", time: "1d ago", unread: false },
            { name: "Emma Thompson", message: "Looking forward to our next session", time: "2d ago", unread: false },
          ].map((chat, i) => (
            <Card key={i} className={`border ${chat.unread ? "border-black bg-gray-50" : "border-gray-200"}`}>
              <CardContent className="p-3 flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-black flex-shrink-0">
                  <Image src="/placeholder.svg?height=48&width=48" alt={chat.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-500 flex-shrink-0">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{chat.message}</p>
                </div>
                {chat.unread && <div className="w-2 h-2 bg-[#FFA500] rounded-full flex-shrink-0"></div>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
