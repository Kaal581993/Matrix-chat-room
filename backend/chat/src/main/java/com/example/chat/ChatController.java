// Define the package where this controller class resides
package com.example.chat.controller;

// Import the annotation used to map incoming WebSocket messages to methods
import org.springframework.messaging.handler.annotation.MessageMapping;

// Import the SimpMessagingTemplate used to send messages to subscribed clients
import org.springframework.messaging.simp.SimpMessagingTemplate;

// Marks the class as a Spring MVC Controller (also works for WebSocket message handling)
import org.springframework.stereotype.Controller;

@Controller  // Indicates this class is a Spring-managed controller component
public class ChatController {

    // Used to send messages to specific destinations
    private final SimpMessagingTemplate messagingTemplate;

    // Constructor injection for SimpMessagingTemplate
    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;  // Assign the injected template to the field
    }

    // Maps messages sent to the "/app/sendMessage" endpoint (prefix /app is set in config)
    @MessageMapping("/sendMessage")
    public void sendMessage(String message) {
        // Sends the received message to all subscribers of "/topic/messages"
        messagingTemplate.convertAndSend("/topic/messages", message);
    }
}
