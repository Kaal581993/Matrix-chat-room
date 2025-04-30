package com.example.chat.config;

import org.springframework.context.annotation.Configuration;
// Imports the @Configuration annotation, indicating that this class contains Spring configuration.
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
// Imports the MessageBrokerRegistry class, used to configure message routing between clients and the server.

import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
// Imports the annotation to enable WebSocket message handling, backed by a message broker.

import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
// Imports the registry used to define STOMP (Simple Text Oriented Messaging Protocol) endpoints.

import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
// Imports the interface that must be implemented to configure WebSocket message handling.

@Configuration
  //Marks this class as a configuration class so Spring Boot will process it during application startup.

@EnableWebSocketMessageBroker
  //Enables WebSocket message handling, and activates a message broker for routing messages.


public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
// Declares the WebSocketConfig class and implements the 
  //WebSocketMessageBrokerConfigurer interface, which provides methods to configure the message broker and STOMP endpoints.


  @Override
  public void configureMessageBroker(MessageBrokerRegistry config) {
    config.enableSimpleBroker("/topic");
    config.setApplicationDestinationPrefixes("/app");
  }
// @Override: Overrides the method from the WebSocketMessageBrokerConfigurer interface.

//enableSimpleBroker("/topic"): Enables a simple in-memory message broker that clients can subscribe to.
  //Messages sent to destinations with /topic will be routed through this broker.

//setApplicationDestinationPrefixes("/app"): Defines the prefix for messages that should be routed to controller 
  //methods (@MessageMapping). For example, a client sending to /app/chat will be handled by the server-side method.


  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/chat")
            .setAllowedOriginPatterns("*")
            .withSockJS();
  }

 // registerStompEndpoints: Defines the endpoints that clients use to connect to the WebSocket server.

// addEndpoint("/chat"): Registers /chat as the endpoint clients will use to connect.

// setAllowedOriginPatterns("*"): Allows cross-origin requests from any domain (useful for development; for production, specify domains).

// withSockJS(): Enables SockJS fallback options for browsers that don’t support WebSocket natively.


}
