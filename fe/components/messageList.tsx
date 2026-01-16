"use client";

interface Message {
  author: string;
  body: string;
}

interface Props {
  messages: Message[];
}

export default function MessageList({ messages }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((msg, idx) => (
        <div key={idx} className="p-3 bg-gray-100 rounded-lg">
          <span className="font-bold">{msg.author}: </span>
          <span>{msg.body}</span>
        </div>
      ))}
    </div>
  );
}
