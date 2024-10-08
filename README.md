# Lyrical Lounge
Lyrical Lounge is a web app designed to allow music enthusiasts to rate songs and interact with others!

# Deployment
Deployment for a fully functional Lyrical Lounge frontend using Java Script and React with backend developed using PhP, utilizing a REST API and MVC architecture.

Install homebrew (https://brew.sh/) with:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD /install.sh)"
```

Ensure that you have node and npm installed

You can install the latest version of node from the [official site](https://nodejs.org/en/download/current).

You can install the latest version of npm with:

```bash
npm install -g npm
```
Clone this repo to a local directory

Ensure that XAMPP is installed (https://www.apachefriends.org) and that MySQL Database and Apache Web Server are running

In http://localhost/phpmyadmin/ create a database called rest_api_music_db and generate tables using the following SQL code:

Create Users Table:
```bash
CREATE TABLE users(username VARCHAR(255) PRIMARY KEY, password VARCHAR(255))
```

Create Ratings Table:
```bash
CREATE TABLE ratings(id INTEGER(11) PRIMARY KEY AUTO_INCREMENT, username VARCHAR(255), artist VARCHAR(255), song VARCHAR(100), rating INTEGER(1), FOREIGN KEY (username) REFERENCES users(username))
```

To start Lyrical Lounge, run:

```bash
npm start
```

Enjoy!

# Additional Feature
We chose to implement react notifications to replace our alerts as well as sorting functionality for our ratings table. In order to utilize react notifications we installed and imported the react notification library and made use of the built-in functions to create functionality within our components. For our sorting, we enable users to sort ratings alphabetically by artist name or song name, as well as highest rating to lowest rating.

# MVC Architecture
```bash
├── Controller
│   └── api
│       ├── baseController.php
│       └── userController.php
│       └── ratingController.php
├── inc
│   ├── bootstrap.php
│   └── config.php
├── index.php
└── Model
    ├── database.php
    └── userModel.php
    └── ratingModel.php
```

The Model-View-Controller (MVC) is a design pattern used in software development to separate the application's concerns into three interconnected components:

1. **Model**:
   - The Model represents the data and business logic of the application. It encapsulates the data and provides methods to manipulate and access it. This component is responsible for managing the state of the application.

2. **View**:
   - The View represents the presentation layer of the application. It displays the information to the user and interacts with the user interface. The view receives input from the user and passes it to the Controller for processing.

3. **Controller**:
   - The Controller acts as an intermediary between the Model and the View. It receives input from the user through the View, processes that input using the Model, and updates the View accordingly. It contains the application's business logic and coordinates the flow of data between the Model and View.

Here's how the components interact:

- The View displays the data to the user and sends user input to the Controller.
- The Controller receives input from the View, processes it, interacts with the Model to update data, and then updates the View with the new information.
- The Model manages the application's data and business logic. It can notify observers (such as the Controller or View) about changes in its state.

# REST API
REST stands for Representational State Transfer, and it is an architectural style for designing networked applications. A RESTful API (Application Programming Interface) is an API that adheres to the principles of REST. It is a set of rules and conventions for building and interacting with web services. RESTful APIs are widely used in web development, especially in building web services that interact with front-end applications, mobile apps, and other systems. They provide a standardized way for different software components to communicate over the internet. This makes them a crucial part of modern web development and integration between various software systems.

Some key principles of RESTful API's include:

1. **Stateless**: Each request from a client to a server must contain all the information needed to understand and fulfill the request. In other words, the server should not rely on any information from previous requests. This makes each request independent and self-contained.

2. **Client-Server Architecture**: The client and server are separate entities, and they communicate over a network. The client is responsible for the user interface and user experience, while the server is responsible for handling requests, processing data, and managing resources.

3. **Uniform Interface**: RESTful APIs have a uniform and consistent way of interacting with resources. This includes using standard HTTP methods (GET, POST, PUT, DELETE) and having well-defined resource URLs.

4. **Stateless Communication**: The server does not store any information about the client's state between requests. If the server needs information about the client, it should be sent in the request.

5. **Stateless Responses**: Responses from the server must explicitly state whether they can be cached by the client or not. This allows clients to determine whether they can use cached data for subsequent requests.

6. **Use of Standard Methods**: RESTful APIs use standard HTTP methods (GET, POST, PUT, DELETE) to perform operations on resources. This aligns with the standard semantics of the HTTP protocol.

7. **Stateless Authentication**: Any authentication information needed should be included in the request. Commonly, this is done using headers, query parameters, or request bodies.


















