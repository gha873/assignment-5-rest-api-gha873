# Assignment #5 - REST APIs: To-Do List

This repository contains my solution for **Assignment #5** in the [CSCI E-33a](https://canvas.harvard.edu/courses/150064) course (Spring 2024). This assignment significantly enhances the To-Do List application built in Assignment #4 by adding a **RESTful API** layer alongside the existing server-rendered HTML interface. The API allows programmatic access to manage To-Do items using standard HTTP methods and JSON data format, while the database logic has been centralized into a reusable service layer.

## Project Overview: Full-Stack To-Do App with API

Building on the previous assignment's foundation, this project now offers two ways to interact with the To-Do list data stored in MongoDB Atlas:

1.  **Server-Rendered HTML Interface:** (Carried over from Assignment #4)
    *   Users can view, add, edit, and delete to-do items through dynamically generated web pages using Express and Pug.
    *   Interactions involve standard HTML form submissions and link navigation, resulting in full page reloads.
2.  **RESTful API Interface:** (New for Assignment #5)
    *   Provides endpoints (`/api/todos/...`) for programmatic CRUD operations.
    *   Uses standard HTTP verbs (`GET`, `POST`, `PUT`, `DELETE`) according to REST principles.
    *   Accepts JSON data in request bodies (for creating/updating).
    *   Returns JSON data in responses.
    *   Includes CORS support to allow access from web browsers (like the provided test client).

## Running the Application Locally

To run this project on your local machine:

1.  **Clone the repository:**
    ```bash
    # Replace with your Assignment 5 repository URL
    git clone https://github.com/gha873/assignment-5-rest-api-gha873
    cd assignment-5-rest-api-gha873
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up Environment Variables:**
    *   Create a file named `.env` in the project root.
    *   Add your MongoDB Atlas connection string to this file:
        ```
        MONGODB_URI=mongodb+srv://<your_username>:<your_password>@<your_cluster_url>/<your_database_name>?retryWrites=true&w=majority
        ```
    *   **Important:** Ensure the `.env` file is listed in your `.gitignore` so you don't commit your credentials!
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
5.  Open your browser:
    *   HTML Interface: `http://localhost:3000/`
    *   API Test Client: `http://localhost:3000/test-api.html`

## Technologies Used

*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (using the cloud-hosted Atlas service)
*   **ODM (Object Data Modeling):** Mongoose
*   **Templating:** Pug (for HTML interface)
*   **Styling:** CSS
*   **API:** REST principles, JSON
*   **Middleware:** `cors` (for Cross-Origin Resource Sharing), `express.json` (for parsing JSON bodies)
*   **Development:** Nodemon
*   **Environment Variables:** dotenv
*   **Version Control:** Git / GitHub
*   **Deployment:** CapRover

## Key Functionality (HTML & API)

*   **HTML Interface (Server-Rendered):**
    *   Provides a user-friendly web interface for managing To-Dos using forms and links.
    *   Uses server-side rendering with Pug templates.
*   **REST API (`/api/todos`):**
    *   **Create (`POST /api/todos`):** Adds a new item via JSON request body. Returns `201 Created` with the new item.
    *   **Read (`GET /api/todos`):** Retrieves all items as a JSON array. Returns `200 OK`.
    *   **Read (`GET /api/todos/:id`):** Retrieves a single item by ID as a JSON object. Returns `200 OK` or `404 Not Found`.
    *   **Update (`PUT /api/todos/:id`):** Updates an item via JSON request body. Returns `200 OK` with the updated item or `404 Not Found`. **Does not use GET.**
    *   **Delete (`DELETE /api/todos/:id`):** Removes an item by ID. Returns `204 No Content` on success or `404 Not Found`. **Does not use GET.**

## Development Journey & Key Steps (Assignment #5 Focus)

Building upon the working CRUD application from Assignment #4, the key steps for this assignment were:

1.  **Project Setup:** Cloned the new Assignment #5 repository, copied relevant code from Assignment #4.
2.  **Dependency Installation:** Installed existing dependencies via `npm install` and added `cors`.
3.  **Service Layer Creation:**
    *   Created the `services/` directory and `services/todoService.js`.
    *   **Refactored:** Moved all Mongoose database interaction logic (`Todo.find`, `Todo.findById`, `Todo.save`, `Todo.findByIdAndUpdate`, `Todo.findByIdAndDelete`) from `routes/index.js` into exported functions within `todoService.js`.
    *   Updated `routes/index.js` (HTML routes) to import and *use* the `todoService` functions, removing direct Mongoose calls.
4.  **REST API Implementation:**
    *   Created the API router file `routes/api.js`.
    *   Defined routes for all CRUD operations under the `/todos` path prefix.
    *   Implemented route handlers using `async/await` and calling the appropriate `todoService` functions.
    *   Ensured API routes use correct HTTP verbs (`GET`, `POST`, `PUT`, `DELETE`).
    *   Formatted API responses as JSON using `res.json()` and set appropriate HTTP status codes (200, 201, 204, 400, 404).
    *   Added basic request body validation and specific error handling (e.g., for `CastError`).
5.  **Middleware Configuration (`app.js`):**
    *   Added `cors()` middleware to enable cross-origin requests.
    *   Added `express.json()` middleware to parse incoming JSON request bodies for the API.
    *   Mounted the new `apiRouter` under the `/api` path prefix (`app.use('/api', apiRouter)`).
    *   Enhanced the central error handler to return JSON errors for requests under `/api/`.
6.  **Client-Side API Test Page:**
    *   Created `public/test-api.html` to act as an interactive API client.
    *   Used HTML to structure sections for each API endpoint, including input fields for parameters/bodies.
    *   Wrote vanilla JavaScript using the `fetch` API to make requests to each endpoint.
    *   Implemented logic to display the HTTP status and JSON response body (or errors) from the API calls. Added basic JSON validation for request bodies input by the user.
7.  **Environment Variables:** Continued using `dotenv` locally and configured the `MONGODB_URI` in CapRover's environment variables for secure deployment.
8.  **Deployment:** Deployed the updated application to CapRover, ensuring the Node.js version was correctly specified in `captain-definition` and the server IP was whitelisted in MongoDB Atlas.

## REST API Endpoints

The following RESTful endpoints are available for managing To-Do items:

*   **`GET /api/todos`**
    *   Description: Retrieves a list of all To-Do items, sorted by creation date (newest first).
    *   Success Response: `200 OK` with JSON array of To-Do objects.
*   **`POST /api/todos`**
    *   Description: Creates a new To-Do item.
    *   Request Body (JSON): `{ "item": "Required title", "description": "Optional details" }`
    *   Success Response: `201 Created` with the newly created To-Do object.
    *   Error Responses: `400 Bad Request` (missing item, invalid JSON), `500 Internal Server Error`.
*   **`GET /api/todos/:id`**
    *   Description: Retrieves a single To-Do item by its ID.
    *   Success Response: `200 OK` with the requested To-Do object.
    *   Error Responses: `400 Bad Request` (invalid ID format), `404 Not Found`.
*   **`PUT /api/todos/:id`**
    *   Description: Updates an existing To-Do item by its ID.
    *   Request Body (JSON): `{ "item": "Updated title", "description": "Updated details" }`
    *   Success Response: `200 OK` with the updated To-Do object.
    *   Error Responses: `400 Bad Request` (invalid ID, missing item, validation error, invalid JSON), `404 Not Found`.
*   **`DELETE /api/todos/:id`**
    *   Description: Deletes a To-Do item by its ID.
    *   Success Response: `204 No Content`.
    *   Error Responses: `400 Bad Request` (invalid ID format), `404 Not Found`.

## Testing the API

A client-side API testing page ("API Explorer") is included with this project to demonstrate the functionality of all endpoints.

1.  Navigate to `/test-api.html` on the deployed application URL (or locally at `http://localhost:3000/test-api.html`).
2.  The page displays separate, collapsible sections for each API endpoint. Click the header to expand a section.
3.  For endpoints requiring an ID (`GET /:id`, `PUT /:id`, `DELETE /:id`), enter a valid Todo ID into the corresponding input field.
4.  For endpoints requiring a request body (`POST`, `PUT`), enter valid JSON into the `<textarea>`. Example JSON is provided as a placeholder.
5.  Click the "Execute" button within the desired section.
6.  The HTTP status code and the JSON response body (or an error message, or "(No content)" for DELETE) will be displayed in the "Response" area at the bottom of the page.

## Future Enhancements (Ideas)

*   Implement more robust server-side input validation (e.g., using a library like Joi or express-validator).
*   Add client-side validation to the test client (and potentially the HTML forms).
*   Refine error handling and provide more specific error messages in API responses.
*   Add features like marking items as complete via the API and HTML interface.
*   Consider pagination for the `GET /api/todos` endpoint.
*   Explore user authentication (e.g., JWT) to secure the API and create user-specific data.
*   Implement API documentation using Swagger/OpenAPI.

---