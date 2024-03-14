-----------------------------------backend_testing_test_coverage_with_jest----------------------

-----------------------Setup & configurations----------------------------

Step 1: Create Project Directory
Create a new directory for your project and navigate into it:

mkdir backend_testing_test_coverage_with_jest

cd backend_testing_test_coverage_with_jest

Step 2: Initialize Node.js Project
Initialize a new Node.js project by running:

npm init -y


Step 3: Install Dependencies
Install the required dependencies listed in the package.json file:

npm install express body-parser bcryptjs dotenv jsonwebtoken pg jest supertest --save

or 

npm install

Step 4: Project Structure
Create the necessary directories and files for project structure:

mkdir config controllers routes tests
touch server.js


To set up .env file with the provided environment variables, follow these steps:

Step 1: Create .env File
Create a new file named .env in the root directory of project.

Step 2: Add Environment Variables
Inside the .env file, add the following environment variables with their respective values:

This is only for example data:

PORT=3000


Step 3: Save the File
Save the .env file. Make sure there are no extra spaces or special characters around the variable names or values.

Step 4: Use Environment Variables in  Application
You can now use these environment variables in  Node.js application to connect to  PostgreSQL database or for any other purposes. For example, you can access these variables using the process.env object:

const PORT = process.env.PORT || 3000;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const SECRET_KEY = process.env.SECRET_KEY;

Step 5: Loading Environment Variables
To load the environment variables from the .env file into  Node.js application, you can use a package like dotenv. Install dotenv as a dependency:

npm install dotenv --save
Then, at the top of  application entry file (e.g., server.js), add the following line:

require('dotenv').config();

This will load the environment variables from the .env file into the process.env object.

---------------------------------Task Management API Documentation-------------------------------

User Registration and Login

Register a New User:

Endpoint: POST http://localhost:3000/users/registration

Description: Register a new user with the provided credentials.

Parameters:
username (string): Username of the user.
email (string): Email address of the user.
password (string): Password for the user account.

Sample Request:
json
{
  "username": "akhilesh_sahu",
  "email": "akhilesh@example.com",
  "password": "password123"
}




Authenticate a User:

Endpoint: POST http://localhost:3000/users/login

Description: Authenticate a user with the provided credentials.
Parameters:
email (string): Email address of the user.
password (string): Password for the user account.

Sample Request:
json
{
  "email": "akhilesh@example.com",
  "password": "password123"
}
Return Type: JSON object containing user information and authentication token.



Task Management:

Create a New Task:

Endpoint: POST /tasks
Description: Create a new task with the provided details.

Parameters:
title (string): Title of the task.
description (string): Description of the task.

Sample Request:
json
{
  "title": "Sample Task",
  "description": "This is a sample task."
}
Return Type: JSON object representing the created task.


Sample Response:
json

{
  "id": 1,
  "title": "Sample Task",
  "description": "This is a sample task."
}


Retrieve All Tasks:

Endpoint: GET /tasks
Description: Retrieve all tasks.
Return Type: JSON array containing all tasks.

Sample Response:
json
[
  {
    "id": 1,
    "title": "Sample Task",
    "description": "This is a sample task."
  },
  {
    "id": 2,
    "title": "Another Task",
    "description": "This is another task."
  }
]

Retrieve a Task by ID:

Endpoint: GET /tasks/{id}
Description: Retrieve a single task by its ID.

Parameters:
id (integer): ID of the task to retrieve.
Return Type: JSON object representing the retrieved task.

Sample Response:
json
{
  "id": 1,
  "title": "Sample Task",
  "description": "This is a sample task."
}


Update a Task:

Endpoint: PUT /tasks/{id}
Description: Update a task with the provided details.

Parameters:
id (integer): ID of the task to update.
title (string): Updated title of the task.
description (string): Updated description of the task.

Sample Request:
json
{
  "title": "Updated Task",
  "description": "This is an updated task."
}
Return Type: JSON object representing the updated task.

Sample Response:
json
{
  "id": 1,
  "title": "Updated Task",
  "description": "This is an updated task."
}

Delete a Task:

Endpoint: DELETE /tasks/{id}
Description: Delete a task by its ID.

Parameters:
id (integer): ID of the task to delete.
Return Type: Success or failure message.

Sample Response (Success):
json
{
  "message": "Task deleted successfully"
}

Sample Response (Failure):
json
{
  "error": "Task not found"
}

-------------------------------DB configuration---------------------
Database Integration with PostgreSQL

Introduction
PostgreSQL is a powerful, open-source relational database management system known for its reliability, robustness, and advanced features. In this documentation, I'll cover integrating PostgreSQL into the task management system.

Prerequisites
Before proceeding, ensure you have PostgreSQL installed and running on system. You'll also need the pg library to connect to PostgreSQL from Node.js. Install it using npm:

npm install pg

Database Setup
Create a Database: Use the PostgreSQL command line or a GUI tool like pgAdmin to create a database for  task management system. For example:

sql:
CREATE DATABASE postgres;

Create Tables: Define tables for storing user and task data.

sql
-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Tasks Table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INTEGER REFERENCES users(id)
);

--------------------Test Cases and Coverage Documentation-------------------------

Introduction
Testing is an essential part of software development to ensure the reliability and functionality of the system. In this documentation, I covered writing test cases using Jest and generating a test coverage report to ensure comprehensive testing of the task management API.

Test Cases
Test cases should cover all endpoints of the API, including success and error scenarios. Here's an outline of test cases for each endpoint:

User Registration and Login Endpoints:

Test registration with valid data.
Test registration with invalid data (e.g., missing fields, invalid email).
Test login with valid credentials.
Test login with invalid credentials.


Task Management Endpoints:

Test creating a task with valid data.
Test creating a task with invalid data (e.g., missing fields).
Test retrieving all tasks.
Test retrieving a task by ID.
Test updating a task with valid data.
Test updating a task with invalid data (e.g., invalid task ID).
Test deleting a task.


Jest Testing Framework
Jest is a popular JavaScript testing framework that provides a simple and intuitive way to write test cases. It offers features like test suites, assertions, and mocking for testing JavaScript code.

Running Test:

To run test:
npx jest 


