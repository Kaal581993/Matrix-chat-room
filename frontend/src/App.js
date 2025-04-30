// src/App.js
import React, { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import "./App.css";

export default function ChatApp() {
  const [username, setUsername] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);
  const videoRef = useRef(null);

  // 1) WebSocket/STOMP setup using relative URL
  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () => new SockJS("/chat"),       // ← relative path!
      onConnect: () => {
        stompClient.subscribe("/topic/messages", (msg) => {
          setMessages((msgs) => [...msgs, msg.body]);
        });
      },
      onStompError: (err) => console.error("STOMP error:", err),
    });
    stompClient.activate();
    setClient(stompClient);
    return () => stompClient.deactivate();
  }, []);

  // 2) Webcam setup
  useEffect(() => {
    if (videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error("getUserMedia error:", err));
    }
  }, []);

  const handleSend = () => {
    if (client && client.connected && newMessage.trim()) {
      client.publish({
        destination: "/app/sendMessage",
        body: `${username}: ${newMessage.trim()}`,
      });
      setNewMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const joinChat = () => {
    if (username.trim()) setIsUsernameSet(true);
  };

  return (
    <div className="chat-container">
      {!isUsernameSet ? (
        <div className="username-container">
          <h2>Enter your username</h2>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username…"
          />
          <button onClick={joinChat}>Join Chat</button>
        </div>
      ) : (
        <>
          <div className="messages">
            {messages.map((m, i) => (
              <div key={i} className="message">
                {m}
              </div>
            ))}
          </div>
          <div className="input-container">
            <textarea
              rows="2"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
            />
            <button onClick={handleSend}>Send</button>
          </div>
          <div className="video-container">
            <h3>Live Webcam</h3>
            <video ref={videoRef} autoPlay width="400" />
          </div>
        </>
      )}
    </div>
  );
}
