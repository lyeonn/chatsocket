"use client";
import { useState } from "react";

interface Props {
  onSend: (message: string) => void;
}

export default function MessageInput({ onSend }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="메시지를 입력하세요..."
        className="flex-1 px-4 py-2 border rounded-lg"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        전송
      </button>
    </form>
  );
}
