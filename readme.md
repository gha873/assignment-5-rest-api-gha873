# Assignment #4 - Express, MongoDB, and Mongoose: To-Do List

This repository contains my solution for **Assignment #4** in the [CSCI E-33a](https://canvas.harvard.edu/courses/150064) course (Spring 2024). This project builds upon the foundation laid in Assignment #3, integrating a **MongoDB** database using **Mongoose** to provide persistent storage and full **CRUD** (Create, Read, Update, Delete) functionality for a simple To-Do List application.

## Project Overview: A Full-Stack To-Do App

The core goal was to transform the basic Express application from the previous assignment into a more functional, database-driven web app. Users can now:

*   View a dynamic list of their to-do items, fetched directly from a MongoDB Atlas database.
*   Add new to-do items (with an item title and an optional description) using an HTML form. The form now uses the `POST` method for creating resources.
*   Edit the details of existing to-do items.
*   Delete items they no longer need.
*   Navigate between the main To-Do list page and a simple "About" page.
*   See a slightly enhanced visual design for better usability.

## Running the Application Locally

To run this project on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/gha873/assignment-4-express-routing-mongodb-and-mongoose-new-gha873
    cd assignment-4-express-routing-mongodb-and-mongoose-new-gha873
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
5.  Open your browser and navigate to `http://localhost:3000` (or the port specified if different).

## Technologies Used

*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (using the cloud-hosted Atlas service)
*   **ODM (Object Data Modeling):** Mongoose (for interacting with MongoDB)
*   **Templating:** Pug
*   **Styling:** CSS
*   **Development:** Nodemon (for auto-restarting the server)
*   **Environment Variables:** dotenv (for local development)
*   **Version Control:** Git / GitHub
*   **Deployment:** CapRover

## Key Functionality Implemented (CRUD)

*   **Create:** New to-do items are added via a POST request from the main form and saved to the database using `new Todo(...).save()`.
*   **Read:** The main page (`GET /`) fetches all to-do items from the database using `Todo.find()` and displays them, sorted by creation date. A specific item is fetched for editing using `Todo.findById()` (`GET /edit/:id`).
*   **Update:** Existing items are modified via a POST request (`POST /update/:id`) using `Todo.findByIdAndUpdate()`.
*   **Delete:** Items are removed via a GET request (`GET /delete/:id`) using `Todo.findByIdAndDelete()`. (Note: Using POST/DELETE verbs would be more conventional in a RESTful API, but GET was sufficient for this assignment's scope).

## Development Journey & Key Steps

Building upon Assignment #3, the major steps for this assignment involved:

1.  **Project Setup:** Cloned the new Assignment #4 repository and copied relevant code (structure, views, routes, `app.js`, `package.json`) from the previous assignment.
2.  **Dependency Installation:** Ran `npm install` to get existing dependencies and added `mongoose` and `dotenv`.
3.  **MongoDB Atlas Setup:**
    *   Created a free-tier cluster on MongoDB Atlas.
    *   Set up a database user with read/write permissions.
    *   Obtained the connection string (`MONGODB_URI`).
    *   **Crucially:** Whitelisted my local development IP address and *later* the IP address of the CapRover VPS for database access.
4.  **Mongoose Integration:**
    *   Created the `models/` directory.
    *   Defined a Mongoose schema and model (`models/todo.js`) for the `Todo` items, specifying field types (`String`), requirements (`required: true`), and enabling timestamps (`timestamps: true`).
    *   Added the Mongoose connection logic to `app.js`, ensuring error handling.
5.  **Environment Variable Management:**
    *   Implemented `dotenv` to load the `MONGODB_URI` from a local `.env` file (keeping credentials out of the codebase).
    *   Ensured `.env` was added to `.gitignore`.
    *   Configured the `MONGODB_URI` as an environment variable within the CapRover app settings for deployment.
6.  **CRUD Route Implementation:**
    *   Refactored the `routes/index.js` file significantly.
    *   Converted route handlers to use `async/await` for cleaner asynchronous database operations.
    *   Implemented logic for creating, reading (listing all and fetching one for edit), updating, and deleting To-Do items using appropriate Mongoose methods.
    *   Added basic error handling using `try...catch` blocks within the routes.
    *   Used `res.redirect('/')` after create, update, and delete operations to refresh the list.
7.  **Template Updates:**
    *   Modified `views/index.pug`:
        *   Changed the form method to `POST` and action to `/create`.
        *   Iterated through the `todos` array passed from the route.
        *   Added "Edit" and "Delete" links next to each item, dynamically including the `_id`.
    *   Created `views/edit.pug`:
        *   Built a form pre-populated with the item's data.
        *   Set the form action to `/update/:id` using `POST`.
        *   Included a "Cancel" link back to the homepage.
8.  **Styling Enhancements:** Overhauled `public/stylesheets/style.css` to provide a cleaner, more modern look using a container, better spacing, improved form styles, and enhanced list item presentation with flexbox.
9.  **Deployment Preparation (CapRover):**
    *   Created a `captain-definition` file.
    *   **Debugging:** Encountered a deployment error due to an outdated Node.js version in the default CapRover environment. Resolved this by explicitly specifying a modern Node.js version (e.g., `node/18`) in the `captain-definition` file's `templateId`.
    *   Successfully deployed the application to CapRover.

## Future Enhancements (Ideas)

*   Add user input validation (both client-side and server-side).
*   Implement more robust error handling and display user-friendly error messages.
*   Add features like marking items as complete.
*   Consider pagination if the list becomes very long.
*   Explore user authentication to create separate lists for different users.

---

This enhanced README provides a much clearer picture of the project, its functionality, and the steps taken during development. Remember to replace placeholders like `https://github.com/gha873/assignment-4-express-routing-mongodb-and-mongoose-new-gha873`, `gha873`, etc., with your actual details.