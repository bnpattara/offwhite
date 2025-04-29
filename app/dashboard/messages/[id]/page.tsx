import { MessageThread } from "@/components/messages/message-thread"

export default function MessageThreadPage({ params }: { params: { id: string } }) {
  return <MessageThread id={params.id} />
}
