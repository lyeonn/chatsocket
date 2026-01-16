"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);

  //소켓 연결 설정
  useEffect(() => {
    const newSocket = io(
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    );
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);
  return socket;
}
