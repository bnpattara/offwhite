import { VideoCall } from "@/components/video-call/video-call"

export default function VideoCallPage({ params }: { params: { id: string } }) {
  return <VideoCall id={params.id} />
}
