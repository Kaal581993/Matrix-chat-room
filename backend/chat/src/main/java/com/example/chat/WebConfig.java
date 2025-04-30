package com.example.chat.config;

import org.springframework.context.annotation.Configuration;
// Imports the @Configuration annotation, indicating this class contains Spring configuration.

import org.springframework.web.servlet.config.annotation.CorsRegistry;
//Imports the CorsRegistry class, which is used to define CORS (Cross-Origin Resource Sharing) rules for HTTP endpoints
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
// Imports the WebMvcConfigurer interface, which allows customization of Spring MVC configuration such as CORS mappings.


@Configuration
    //Marks this class as a configuration component, so Spring processes it and applies its settings at runtime.
public class WebConfig implements WebMvcConfigurer {
// Declares the class WebConfig and implements the WebMvcConfigurer interface, enabling it to override 
    //default MVC configurations like CORS, formatters, interceptors, etc.


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        //Overrides the addCorsMappings method from WebMvcConfigurer, which is called to register CORS settings.

        registry.addMapping("/**") // Allows CORS requests for all URL patterns (/** means every endpoint in the app).
                .allowedOrigins("http://localhost:3000","http://192.168.1.8:3000")
            //Specifies allowed origins that can access the backend. In this case:
            //Local React development server at localhost:3000
            //A device on the local network at IP 192.168.1.8:3000

                .allowedMethods("*")//Allows all HTTP methods (GET, POST, PUT, DELETE, etc.) from the specified origins.
                .allowCredentials(true);//Enables cookies and HTTP authentication (credentials) to be included in cross-origin requests.
                                        //Useful when sessions or JWT tokens are used. go to JWT.io for understanding JWT encryption

    }
}
