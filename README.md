This project is part of WOU Bachelor in Software Engineering DSE205/03 Advanced Web Development module.

Hi-Fi Cars Used Car Sales Portal
This project is a web application designed for buying and selling used cars. It comprises two main components:

Frontend: Built with React
Backend: Built with Spring Boot

Prerequisites:
Before you begin, ensure you have the following installed on your machine:

Node.js (version 14 or higher),
npm (version 6 or higher),
Java Development Kit (JDK) (version 11 or higher),
Maven (version 3.6 or higher),
MySQL (version 5.7 or higher)

Getting Started

1. Clone the Repository
git clone https://github.com/your-username/hi-fi-cars.git
cd hi-fi-cars

2. Set Up the Backend
Navigate to the backend directory:
cd dse20503-spring

Create a MySQL database:

CREATE DATABASE used_car_portal;

Update the database configuration in src/main/resources/application.properties:
spring.datasource.url=jdbc:mysql://localhost:3306/used_car_portal
spring.datasource.username=your-username
spring.datasource.password=your-password

Build the backend project:
./mvnw clean install
3. Set Up the Frontend

Navigate to the frontend directory:
cd ../dse20503-react/dse20503-app

Install the dependencies:
npm install

Running the Application

1. Start the Backend Server
Navigate to the backend directory and run the Spring Boot application:

cd dse20503-spring
./mvnw spring-boot:run
The backend server will start at: http://localhost:8080

2. Start the Frontend Development Server
Navigate to the frontend directory and start the React development server:
cd ../dse20503-react/dse20503-app
npm start
The frontend development server will start at: http://localhost:3000

Project Structure

.vscode/
    settings.json
dse20503-react/
    dse20503-app/
        .gitignore
        package.json
        public/
            index.html
            ...
        src/
            ...
    package.json
dse20503-spring/
    .gitattributes
    .gitignore
    .mvn/
        wrapper/
    HELP.md
    mvnw
    mvnw.cmd
    pom.xml
    src/
        main/
            ...
        test/
            ...
    target/
        ...
README.md
