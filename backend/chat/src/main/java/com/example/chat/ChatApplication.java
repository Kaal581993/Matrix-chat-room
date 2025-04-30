// Define the package this class belongs to
package com.example.chat;

// Import the SpringApplication class used to bootstrap and launch the application
import org.springframework.boot.SpringApplication;

// Import the main annotation that triggers auto-configuration and component scanning
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication  // Marks this as a Spring Boot application entry point. Combines:
// @Configuration - to define configuration beans
// @EnableAutoConfiguration - to enable auto configuration
// @ComponentScan - to scan the package for components like @Controller, @Service, etc.
public class ChatApplication {

    // The main method is the entry point for the Java application
	public static void main(String[] args) {
        // Launches the Spring Boot application by creating the ApplicationContext and initializing beans
		SpringApplication.run(ChatApplication.class, args);
	}

}
