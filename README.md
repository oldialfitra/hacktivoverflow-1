# hacktivoverflow

## Questions Route
**Note:**  *  *is required*
 HTTP | Router | Headers | Body | Success | Error | Description
------|--------|---------|------|---------|-------|------------
 POST | <span style="color:red">/questions</span> | token | *title, *description, tags, *userId | Status: 201<br>Object{_id, title, description, upvotes, downvotes, tags, userId, createdAt, updatedAt} | Status: 400<br>Object { message: `Title required` }<br>Status: 400<br>Object { message: `Description required` }<br>Status: 500<br>Object { message: `Internal Server Error`, err } | Create a Question
 GET | <span style="color:red">/questions</span> | token |  | Status: 200<br>[Object{_id, title, description, upvotes, downvotes, tags, userId, createdAt, updatedAt}] | Status: 500<br>Object { message: `Internal Server Error`, err } | Get all Questions
 GET | <span style="color:red">/questions/:id</span> | token |  | Status: 200<br>Object{_id, title, description, upvotes, downvotes, tags, userId, createdAt, updatedAt} | Status: 500<br>Object { message: `Internal Server Error`, err } | Get a Question
 PUT | <span style="color:red">/questions/:id</span> | token | *title, *description, tags | Status: 200<br>Object{_id, title, description, upvotes, downvotes, tags, userId, createdAt, updatedAt} | Status: 400<br>Object { message: `Title required` }<br>Status: 400<br>Object { message: `Description required` }<br>Status: 500<br>Object { message: `Internal Server Error`, err } | Update a Question
 DELETE | <span style="color:red">/questions/:id</span> | token |  | Status: 200<br>Object{_id, title, description, upvotes, downvotes, tags, userId, createdAt, updatedAt} | Status: 500<br>Object { message: `Internal Server Error`, err } | Delete a Question
 PUT | <span style="color:red">/questions/upvote/:id</span> | token |  | Status: 200<br>Object{_id, title, description, upvotes, downvotes, tags, userId, createdAt, updatedAt} | Status: 500<br>Object { message: `Internal Server Error`, err } | Upvote a Question
 PUT | <span style="color:red">/questions/downvote/:id</span> | token | userId | Status: 200<br>Object{_id, title, description, upvotes, downvotes, tags, userId, createdAt, updatedAt} | Status: 500<br>Object { message: `Internal Server Error`, err } | Downvote a Question

<br>

## Users Route
**Note:**  *  *is required*
 HTTP | Router | Body | Success | Error | Description
------|--------|------|---------|-------|------------
 POST | <span style="color:red">/users/signin</span> |  *email, *password | Status: 200<br>Object{token, id} | Status: 400<br>Object { message: `email / password wrong` }<br>Status: 500<br>Object { message: `Internal Server Error`, err } | Sign In User  
 POST | <span style="color:red">/users/signup</span> |  *email, *password | Status: 201<br>Object{_id, email, password, tags, createdAt, updatedAt} | Status: 400<br>Object { message: `Email required` }<br>Status: 400<br>Object { message: `Password required` }<br>Status: 500<br>Object { message: `Internal Server Error`, err } | Sign Up User
 PUT | <span style="color:red">/users/tags</span> |  tags | Status: 200<br>Object{_id, email, password, tags, createdAt, updatedAt} | Status: 500<br>Object { message: `Internal Server Error`, err } | Edit Watched Tags
 GET | <span style="color:red">/users/tags</span> |  *email, *password | Status: 200<br>Object{_id, email, password, tags, createdAt, updatedAt} | Status: 500<br>Object { message: `Internal Server Error`, err } | Get Watched Tags

<br>

## Answers Route
**Note:**  *  *is required*
  HTTP | Router | Headers | Body | Success | Error | Description
------|--------|---------|------|---------|-------|------------
 POST | <span style="color:red">/answers</span> | token | *title, *description, *userId | Status: 201<br>Object{_id, title, description, upvotes, downvotes, userId, createdAt, updatedAt} | Status: 400<br>Object { message: `Title required` }<br>Status: 400<br>Object { message: `Description required` }<br>Status: 500<br>Object { message: `Internal Server Error`, err } | Create a Answer
 GET | <span style="color:red">/answers</span> | token |  | Status: 200<br>[Object{_id, title, description, upvotes, downvotes, userId, createdAt, updatedAt}] | Status: 500<br>Object { message: `Internal Server Error`, err } | Get all Answers
 GET | <span style="color:red">/answers/:id</span> | token |  | Status: 200<br>Object{_id, title, description, upvotes, downvotes, userId, createdAt, updatedAt} | Status: 500<br>Object { message: `Internal Server Error`, err } | Get a Answer
 PUT | <span style="color:red">/answers/:id</span> | token | *title, *description | Status: 200<br>Object{_id, title, description, upvotes, downvotes, userId, createdAt, updatedAt} | Status: 400<br>Object { message: `Title required` }<br>Status: 400<br>Object { message: `Description required` }<br>Status: 500<br>Object { message: `Internal Server Error`, err } | Update a Answer
 DELETE | <span style="color:red">/answers/:id</span> | token |  | Status: 200<br>Object{_id, title, description, upvotes, downvotes, userId, createdAt, updatedAt} | Status: 500<br>Object { message: `Internal Server Error`, err } | Delete a Answer
 PUT | <span style="color:red">/answers/upvote/:id</span> | token |  | Status: 200<br>Object{_id, title, description, upvotes, downvotes, userId, createdAt, updatedAt} | Status: 500<br>Object { message: `Internal Server Error`, err } | Upvote a Answer
 PUT | <span style="color:red">/answers/downvote/:id</span> | token | userId | Status: 200<br>Object{_id, title, description, upvotes, downvotes, userId, createdAt, updatedAt} | Status: 500<br>Object { message: `Internal Server Error`, err } | Downvote a Answer

## Usage

Make sure you have Node.js and npm installed in your computer, and then run these commands:<br>
$npm install<br>
$npm run start<br>
$npm run serve<br>

Access the Server side via http://localhost:5000/.

Access the Client side via http://localhost:8080/.