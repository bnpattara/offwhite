import type React from "react"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="h-screen overflow-hidden">{children}</div>
}
