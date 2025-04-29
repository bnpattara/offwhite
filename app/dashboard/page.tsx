import { MenteeDashboard } from "@/components/dashboard/mentee-dashboard"
import { MentorDashboard } from "@/components/dashboard/mentor-dashboard"
import type { UserRole } from "@/lib/types"

export default function DashboardPage() {
  // In a real app, this would be determined by the authenticated user's role
  const userRole: UserRole = "mentee"

  return <>{userRole === "mentee" ? <MenteeDashboard /> : <MentorDashboard />}</>
}
