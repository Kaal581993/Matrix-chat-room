// src/App.js

// Import React hooks and libraries
import React, { useState, useEffect, useRef } from "react"; // Core React and hooks
import { Client } from "@stomp/stompjs"; // STOMP client for WebSocket communication
import SockJS from "sockjs-client"; // SockJS for WebSocket fallback support
import "./App.css"; // CSS styling

// Define and export the ChatApp component
export default function ChatApp() {
  // useState hooks for managing component state
  const [username, setUsername] = useState(""); // User's name
  const [isUsernameSet, setIsUsernameSet] = useState(false); // Flag to check if user joined
  const [newMessage, setNewMessage] = useState(""); // Current message being typed
  const [messages, setMessages] = useState([]); // List of all messages received
  const [client, setClient] = useState(null); // STOMP client instance
  const videoRef = useRef(null); // Ref for accessing the <video> DOM element

  // 1) WebSocket/STOMP setup using useEffect
  useEffect(() => {
    // Create a new STOMP client instance
    const stompClient = new Client({
      // Use SockJS to connect to the `/chat` WebSocket endpoint (defined on the server)
      webSocketFactory: () => new SockJS("/chat"),
      // Callback when connection is successfully established
      onConnect: () => {
        // Subscribe to the topic "/topic/messages" to receive messages
        stompClient.subscribe("/topic/messages", (msg) => {
          // Append new message to the messages array
          setMessages((msgs) => [...msgs, msg.body]);
        });
      },
      // Error handler for STOMP-level issues
      onStompError: (err) => console.error("STOMP error:", err),
    });

    stompClient.activate(); // Start the WebSocket connection
    setClient(stompClient); // Save client in state for publishing messages

    return () => stompClient.deactivate(); // Cleanup on component unmount
  }, []);

  // 2) Webcam setup using useEffect
  useEffect(() => {
    // Check if videoRef is attached to a <video> element
    if (videoRef.current) {
      // Access webcam using the browser API
      navigator.mediaDevices
        .getUserMedia({ video: true }) // Request video stream only
        .then((stream) => {
          // Assign the webcam stream to the video element
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error("getUserMedia error:", err)); // Handle permission or access errors
    }
  }, []);

  // Function to send a message to the WebSocket server
  const handleSend = () => {
    // Check if client is connected and message is not empty
    if (client && client.connected && newMessage.trim()) {
      client.publish({
        destination: "/app/sendMessage", // Server-side controller endpoint
        body: `${username}: ${newMessage.trim()}`, // Message body including username
      });
      setNewMessage(""); // Clear the input field
    }
  };

  // Handler for Enter key to send message
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent newline
      handleSend(); // Trigger send
    }
  };

  // Handler to set username and enter chat
  const joinChat = () => {
    if (username.trim()) setIsUsernameSet(true); // Set user as joined if username is not blank
  };

  // JSX UI rendering
  return (
    <div className="chat-container">
      {/* If user hasn't set username, show username input screen */}
      {!isUsernameSet ? (
        <div className="username-container">
          <h2>Enter your username</h2>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username on input
            placeholder="Username…"
          />
          <button onClick={joinChat}>Join Chat</button> {/* Button to join */}
        </div>
      ) : (
        <>
          {/* Chat messages display */}
          <div className="messages">
            {messages.map((m, i) => (
              <div key={i} className="message">
                {m} {/* Render each message */}
              </div>
            ))}
          </div>

          {/* Message input and send button */}
          <div className="input-container">
            <textarea
              rows="2"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)} // Update message state
              onKeyDown={handleKeyDown} // Handle Enter to send
              placeholder="Type a message…"
            />
            <button onClick={handleSend}>Send</button> {/* Button to send */}
          </div>

          {/* Live webcam stream */}
          <div className="video-container">
            <h3>Live Webcam</h3>
            <video ref={videoRef} autoPlay width="400" /> {/* Video stream */}
          </div>
        </>
      )}
    </div>
  );
}
