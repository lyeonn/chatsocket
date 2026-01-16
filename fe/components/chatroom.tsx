"use client";
import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import MessageList from "./messageList";
import MessageInput from "./messageInput";

interface Message {
  author: string;
  body: string;
}

export default function ChatRoom() {
  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [username] = useState("User" + Math.floor(Math.random() * 1000));

  useEffect(() => {
    if (!socket) return;

    socket.on("chat", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("chat");
    };
  }, [socket]);

  const handleSend = (body: string) => {
    if (socket) {
      socket.emit("chat", { author: username, body });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 border-b">
        <h1 className="text-xl font-bold">채팅방</h1>
        <p className="text-sm text-gray-500">접속: {username}</p>
      </header>
      <MessageList messages={messages} />
      <MessageInput onSend={handleSend} />
    </div>
  );
}
