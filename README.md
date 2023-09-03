# User IMS

User IMS a RESTful API developed for managing user information such as name, email, phone that utilizes Node.js platform.

## Live Demo

### Swagger UI

Explore the API documentation using Swagger UI:

-   [Swagger UI](https://user-ims.onrender.com/api-docs/)

### Live API Endpoints

Following API endpoints can be used through tools such as **Postman**:

1. **Get all the Users**

    - Endpoint: [GET /users](https://user-ims.onrender.com/users)
    - Description: Retrieve a list of users.

2. **Get User by ID**

    - Endpoint: [GET /users/{id}](https://user-ims.onrender.com/users/{id})
    - Description: Retrieve a user by their unique identifier i.e **id**.

3. **Create a User**

    - Endpoint: [POST /users](https://user-ims.onrender.com/users)
    - Description: Create a new user.

4. **Update User**

    - Endpoint: [PUT /users/{id}](https://user-ims.onrender.com/users/{id})
    - Description: Update an existing user by their unique identifier i.e **id**.

5. **Delete User**
    - Endpoint: [DELETE /users/{id}](https://user-ims.onrender.com/users/{id})
    - Description: Delete a user by their unique identifier i.e **id**.

## Table of Contents

-   [Live Demo](#live-demo)
    -   [Swagger UI](#swagger-ui)
    -   [Live API Endpoints](#live-api-endpoints)
-   [Table of Contents](#table-of-contents)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [Architectural Decisions](#architectural-decisions)
    -   [ORM selection](#orm-selection)
    -   [Database Selection](#database-selection)
-   [Challenges Faced](#challenges-Faced)
-   [Additional Features](#additional-features)
-   [Usage](#usage)
    -   [API Endpoints](#api-endpoints)
        -   [Get All Users](#get-all-users)
        -   [Create a new user](#get-all-users)
        -   [Get a particular user](#get-a-particular-user)
        -   [Update a user](#update-a-user)
        -   [Partially update a user](#partially-update-a-user)
        -   [Delete a user](#delete-a-user)
-   [Database](#database)
-   [Testing](#testing)
-   [Deployment](#deployment)
-   [Built With](#built-with)
-   [Acknowledgments](#acknowledgments)

## Getting Started

-   Add a new user
-   Retrieve the list of all the users
-   Retrieve data of a particular user using unique identifier i.e **id**
-   Update a particular user using unique identifier i.e **id**
-   Delete a particular user using unique identifier i.e **id**
-   Input validation for each of the user fields
-   Error handling with proper HTTP status code
-   Unit Testing for each of the API endpoints

## Prerequisites

-   Node.js and npm
-   MySQL Database

## Architectural Decisions:

### ORM selection

#### Sequelize

-   Familiarity: Given my prior experience with Eloquent ORM, I have chosen Sequelize as the optimal choice for this project due to the comfort and familiarity with the tool.

-   Validation: Upon exploring the official documentation, I discovered Sequelize's built-in validation mechanism that enforces constraints and validation rules at the model level, making it one of the points for choosing Sequelize.

-   Security: By using Sequelize's methods over raw SQL queries, SQL injection can be prevented due to the sanitization and parameterization implemented by the Sequelize methods.

Other than these, Sequelize has a huge market share and community which guided me to learn and implement Sequelize on the project through the rich official documentation and various blogs.

### Database Selection:

#### MySQL

Since, the requirement was to utilize relational database, I had chosen MySQL

Familiarity: I have been utilizing MySQL database for a certain period of time and have been very familiar with the syntax and the usage.

However, other SQL databases such as PostgreSQL and sqlite can also be implemented as the ORM supports various SQL based databases with minimal configuration changes.

## Challenges Faced:

-   Testing: Writing test cases and unit testing has been one of the valuable skills that I have acquired in this project. As I had little to no prior experience of writing test cases, I chose Jest as the Testing Framework due to ease of setup and usage.

-   Error Handling: For an API to be reliable, proper error handling is a must. While developing this project, I understood about the various HTTP status codes to indicate the nature of the error (400 for Bad Request, 409 Conflict).

## Additional Features

### Swagger UI

-   As an additional feature of this project, I have integrated **Swagger UI**, which is user-friendly and interactive API documentation tool. Through Swagger UI, it is much easier for users to understand all the API endpoints and the various HTTP status code and response that the API endpoints provides. Moreover, it allows to view the request and responses with appropriate examples and also test the functionality of the API.

## Installation

##### Clone User IMS:

```bash
  git clone https://github.com/rajeevmandongol/user-ims.git
```

##### Navigate to the project directory:

```bash
  cd user-ims
```

##### Install the required dependencies for the project:

```bash
  npm install
```

##### Or

```bash
  npm install body-parser express mysql2 nodemon sequelize sequelize-cli swagger-jsdoc swagger-ui-express
```

## Database

##### Create MySQL database:

```bash
  mysql> CREATE DATABASE `user_ims`;
```

##### After creating the database, run the database migration as follows:

```bash
  npx sequelize-cli db:migrate
```

## Testing

Before performing the test, install the jest as follows:

##### Install jest:

```bash
  npm install --save-dev jest
```

##### To perform the test:

```bash
  npm jest
```

## Deployment

##### To deploy this project run

```bash
  node server.js
```

#### OR

```bash
  nodemon server.js
```

Access the API using **postman** at http://127.0.0.1:3000

## Usage

### API Endpoints

| HTTP method | URL           | Status                                              | Description                            |
| :---------- | :------------ | :-------------------------------------------------- | :------------------------------------- |
| `POST`      | `/users`      | **201 or (409 Conflict) if ValidationError Occurs** | `Create a new user.`                   |
| `GET`       | `/users`      | **200 or (204 No Content) if no user found**        | `Retrieve a list of all users.`        |
| `GET`       | `/users/:id`  | **200 or (404 Not Found) if User not found**        | `Retrieve a user by their ID.`         |
| `PUT`       | `/users/:id`  | **200 (404 Not Found) if User not found**           | `Update a user by their ID.`           |
| `PATCH`     | `/users/:id`  | **200 (404 Not Found) if User not found**           | `Partially update a user by their ID.` |
| `DELETE`    | ` /users/:id` | **200 or (404 Not Found) if User not found**        | ` Delete a user by their ID.`          |

#### Get all Users

```http
  GET /users/
```

```javascript
{
    "success": true,
    "message": "Users found",
    "data": {
        "users": [
            {
                "id": 1,
                "name": "Some Name",
                "email": "some@email.com",
                "phone": "9812345678",
                "createdAt": "YYYY-MM-DD HH:mm:ss. SSS Z",
                "updatedAt": "YYYY-MM-DD HH:mm:ss. SSS Z"
            }
        ]
    }
}

```

#### Create a new user

```http
  POST /users/
```

| Parameter | Type     | Description                                             | Required |
| :-------- | :------- | :------------------------------------------------------ | :------- |
| `name`    | `string` | `Must only contains alphabets and whitespaces `         | **true** |
| `email`   | `string` | `Must be a valid e-mail address`                        | **true** |
| `phone`   | `string` | `Must only contain 10 digits or 7 for landline numbers` | **true** |

##### Response

```javascript
{
    "success": true,
    "message": "User has been added successfully!",
    "data": {
        "user": {
            "id": 1,
            "name": "Some Name",
            "email": "some@email.com",
            "phone": "9812345678",
            "createdAt": "YYYY-MM-DD HH:mm:ss. SSS Z",
            "updatedAt": "YYYY-MM-DD HH:mm:ss. SSS Z"
        }
    }
}
```

#### Get a particular user

```http
  GET /users/:id
```

| Parameter | Type      | Description               | Required |
| :-------- | :-------- | :------------------------ | :------- |
| `id`      | `integer` | `Must be a valid user id` | **true** |

##### Response

```javascript
{
    "success": true,
    "message": "User found",
    "data": {
        "user": {
            "id": 1,
            "name": "Some Name",
            "email": "some@email.com",
            "phone": "9812345678",
            "createdAt": "YYYY-MM-DD HH:mm:ss. SSS Z",
            "updatedAt": "YYYY-MM-DD HH:mm:ss. SSS Z"
        }
    }
}
```

#### Update a user

```http
  PUT /users/:id
```

| Parameter | Type      | Description                                             | Required |
| :-------- | :-------- | :------------------------------------------------------ | :------- |
| `id`      | `integer` | `Must be a valid user id`                               | **true** |
| `name`    | `string`  | `Must only contains alphabets and whitespaces `         | **true** |
| `email`   | `string`  | `Must be a valid e-mail address`                        | **true** |
| `phone`   | `string`  | `Must only contain 10 digits or 7 for landline numbers` | **true** |

##### Response

```javascript
{
    "success": true,
    "message": "User updated successfully",
    "data": {
        "user": {
            "id": 1,
            "name": "New Name",
            "email": "new@email.com",
            "phone": "9812345699",
            "createdAt": "YYYY-MM-DD HH:mm:ss. SSS Z",
            "updatedAt": "YYYY-MM-DD HH:mm:ss. SSS Z"
            }
    }
}

```

#### Partially update a user

```http
  PATCH /users/:id
```

| Parameter | Type      | Description                                             | Required  |
| :-------- | :-------- | :------------------------------------------------------ | :-------- |
| `id`      | `integer` | `Must be a valid user id`                               | **true**  |
| `name`    | `string`  | `Must only contains alphabets and whitespaces `         | **false** |
| `email`   | `string`  | `Must be a valid e-mail address`                        | **false** |
| `phone`   | `string`  | `Must only contain 10 digits or 7 for landline numbers` | **false** |

##### Response

```javascript
{
    "success": true,
    "message": "User updated successfully",
    "data": {
        "user": {
            "id": 1,
            "name": "New Name",
            "email": "new@email.com",
            "phone": "9812345699",
            "createdAt": "YYYY-MM-DD HH:mm:ss. SSS Z",
            "updatedAt": "YYYY-MM-DD HH:mm:ss. SSS Z"
        }
    }
}
```

#### Delete a user

```http
  DELETE /users/:id
```

| Parameter | Type      | Description                                                       | Required |
| :-------- | :-------- | :---------------------------------------------------------------- | :------- |
| `id`      | `integer` | `Must be a valid user id otherwise returns status 204 No Content` | **true** |

##### Response

```javascript
{
    "success": true,
    "message": "User deleted successfully!",
    "data": {}
}
```

## Built With

-   Node.js
-   Express.js
-   Sequelize
-   Jest
-   Swagger UI

## Acknowledgments

-   [**JEST Docs**](https://jestjs.io/docs/getting-started)
-   [**Testing NodeJs/Express API with Jest and Supertest**](https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6)
-   [**Sequelize v6 API Reference**](https://sequelize.org/docs/v6/getting-started/)
-   [**How To Use Sequelize with Node.js and MySQL**](https://www.digitalocean.com/community/tutorials/how-to-use-sequelize-with-node-js-and-mysql)
-   [**Performing CRUD with Sequelize**](https://dev.to/nedsoft/performing-crud-with-sequelize-29cf)
-   [**Swagger UI**](https://swagger.io/docs/specification/about/)
-   [**Documenting your Express API with Swagger**](https://blog.logrocket.com/documenting-express-js-api-swagger/)
