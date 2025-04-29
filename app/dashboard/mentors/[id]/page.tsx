import { MentorProfile } from "@/components/mentors/mentor-profile"

export default function MentorProfilePage({ params }: { params: { id: string } }) {
  return <MentorProfile id={params.id} />
}
