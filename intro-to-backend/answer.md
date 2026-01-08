Q1. Role of Frontend (FE)
In a web application, the Frontend (FE) is the part that the users of that application directly interact with. It is the part that they can directly see in their browser. The frontend needs to be easy to use for a good user experience, and it needs to be smooth. 
Frontend includes user interface like buttons, text, images, etc. It takes care of the responsiveness for different sized screens. The user can click these buttons and give inputs and see different pages.This is how the user interacts with the pages.
This input and interaction is communicated with the backend. Like during signup, the credentials need to be sent to the server.

![Frontend vs backend](images/FrontendvsBackend.jpg)


Q2. Role of Backend (BE)
Backend (BE) is the behind-the-scenes part of a web application. It is used for handling the server-side operations. Since it works behind the scenes, the users can neither see, nor interact with it. 
The backend is used for interacting with the database to access the data from it. Operations like creating, reading, update and delete are performed on it. Backend makes sure that the web application is thoroughly authenticated. It provides security by protecting the sensitive data from unauthorized access during sign-in/login actions.

Q3. Business Logic
The meaning of business logic is that it is in charge of what is and isn’t allowed in the application behaviour. It is written in the backend, and it is used for referring to the rules and conditions to define how the application should behave.
Real world examples
(i) Free delivery being allowed only for the premium users
(ii) Users not being able to withdraw more than what’s in their bank account
(iii) Student not being able to submit their test after the time limit

Q4. Client–Server Model
It is a model where the roles are clearly defined and divided between the client and server.
The client is the user side system of the web application. It includes the web browser, or mobile apps.
The server is the system that receives and sends requests to and from the client system. It holds the business logic and has access to the database.
The client sends a request to the server => the server processes the request => the server sends a response to the client => the client displays the result to the user

![Client Server Model](images/ClientServer.png)

Q5. Three-Tier Architecture
A web application that is divided into 3 layers is called 3 tier architecture. All the major web applications use this style of organization, because it improves maintenance, and it is easy to scale. Changes in one layer won’t affect the other layers.
(i) The presentation layer is the frontend, which handles all the user interaction and the design aspect. 
(ii) The application/business layer is the backend layer, because it contains the business logic. It processes the client requests and accesses the database.
(iii) The data layer handles the storage of data. The user can store, and retrieve data from here, and technologies like MySQL, MongoDB are used. Even database as a service, like Firebase can be used.

![Three-Tier Architecture](images/3tier.png)


Q6. JavaScript as a Backend Language
There are different languages that we can use for the backend business logic. But JavaScript is better suited for web applications because of the following reasons -
(i) Better performance. JS uses Node.js as a runtime environment, which is fast and efficient. It is suitable for handling multiple requests at the same time. Allows multi-threading.
(ii) There are lots of in-built libraries that can be used for faster development. npm(node package manager) contains a lot of useful tools.
(iii) JavaScript can be used both on the frontend and backend, so it allows the developers to use a single language throughout the application.

