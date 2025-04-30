About backend, is created using maven & springWeb

:

🚀 Getting Started with Maven + Spring Web
Follow these steps to set up a basic Spring Boot project using Maven and Spring Web:

1. 📁 Create a New Maven Project
You can create it using Spring Initializr or manually.

Using Spring Initializr (Recommended):
Go to https://start.spring.io/

Project: Maven

Language: Java

Spring Boot: Choose the latest stable version

Dependencies:

Spring Web

Group: com.example

Artifact: chat

Name: chat

Click Generate to download the project zip and extract it.

2. 💻 Open in Your IDE
Open the extracted project in your IDE (e.g., IntelliJ IDEA, Eclipse, VS Code).

3. 📦 Project Structure
Typical structure:

css
Copy
Edit
src/
└── main/
    ├── java/com/example/chat
    │   └── ChatApplication.java
    └── resources/
        └── application.properties
4. 🛠️ Add/Check Dependencies
Ensure the pom.xml has these dependencies:

xml
Copy
Edit
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
Run:

bash
Copy
Edit
mvn clean install
5. ▶️ Run the Application
Use your IDE or run the following command in the terminal:

bash
Copy
Edit
mvn spring-boot:run
The application will start at:
http://localhost:8080

✅ You’re All Set!
You now have a working Maven + Spring Web project. Start building your APIs or WebSocket controllers!


