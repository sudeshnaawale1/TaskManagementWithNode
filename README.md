# Below are the detailed instructions to run the application for both the Frontend and the Backend 

## Prerequisites
 - Node.js installed on your machine (ensure you have a recent version, e.g., 14.x or later).
 - npm (Node Package Manager).

### Backend (Node.js)

#### Navigate to the backend directory:

- cd path/to/your/backend

#### Install dependencies:

- npm install

#### Run tests:

- npm test

#### Start the server:

- npm start

### Frontend (React)

#### Navigate to the frontend directory:

- cd path/to/your/frontend

#### Install dependencies:

- npm install

#### Start the development server:

- npm start

# Example requests and responses for each endpoint: 

### Create a Task:

#### Request:
- Request Method: POST
- Request Path: /tasks
- Content-Type: application/json
- Request Body: {
      title: request.body.title,
      description: request.body.description,
      comment = request.body.comment;
      status: request.body.status,
      createdAt: Date.now(),
    };


#### Response:
{
    "title": "Test 1",
    "description": "Test 1 description",
    "comment": "Test 1 comment",
    "status": true,
    "createdAt": "2024-06-11T06:20:20.980Z",
    "_id": "6667eca43cf161110740d819",
    "__v": 0
}

### Get All tasks:

- Request Method: GET
- Request Path: /tasks
- Content-Type: application/json

#### Response:
[
    {
        "_id": "6667ee243cf161110740d81c",
        "title": "Test 2 ",
        "description": "Test 2 description",
        "status": false,
        "createdAt": "2024-06-11T06:26:44.627Z",
        "__v": 0
    },
    {
        "_id": "6667eca43cf161110740d819",
        "title": "Test 1",
        "description": "Test 1 description",
        "comment": "Test 1 comment",
        "status": true,
        "createdAt": "2024-06-11T06:20:20.980Z",
        "__v": 0
    }
]

### Update Task By ID:

#### Request:
- Request Method: PUT
- Request Path: /tasks/6667ee243cf161110740d81c
- Content-Type: application/json

#### Response:
{
    "_id": "6667ee243cf161110740d81c",
    "title": "Test 2 22",
    "description": "Test 2 description",
    "status": false,
    "createdAt": "2024-06-11T06:26:44.627Z",
    "__v": 0,
    "comment": "Test 2 comment"
}

### Delete Task By ID:

- Request Method: DELETE
- Request Path: /tasks/6667eca43cf161110740d819
- Content-Type: application/json

#### Request:
{
    "_id": "6667eca43cf161110740d819",
    "title": "Test 1",
    "description": "Test 1 description",
    "comment": "Test 1 comment",
    "status": true,
    "createdAt": "2024-06-11T06:20:20.980Z",
    "__v": 0
}

#### Response:
{
    "task": {
            "_id": "6667eca43cf161110740d819",
   	        "title": "Test 1",
           "description": "Test 1 description",
           "comment": "Test 1 comment",
           "status": true,
           "createdAt": "2024-06-11T06:20:20.980Z",
          "__v": 0
          },
    "message": "Task deleted successfully"
}

