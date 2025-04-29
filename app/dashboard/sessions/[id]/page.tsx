import { SessionDetails } from "@/components/sessions/session-details"

export default function SessionDetailsPage({ params }: { params: { id: string } }) {
  return <SessionDetails id={params.id} />
}
