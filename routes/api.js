const express = require('express');
const router = express.Router();
const todoService = require('../services/todoService');

// --- API Endpoints for Todos ---

// GET /api/todos - Retrieve all todos
router.get('/todos', async (req, res, next) => {
    try {
        const todos = await todoService.getAllTodos();
        res.json(todos); // Send JSON response
    } catch (err) {
        next(err); // Pass errors to the central error handler
    }
});

// GET /api/todos/:id - Retrieve a single todo by ID
router.get('/todos/:id', async (req, res, next) => {
    try {
        const todo = await todoService.getTodoById(req.params.id);
        if (!todo) {
            // If no todo is found, send a 404 Not Found response
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo); // Send the found todo as JSON
    } catch (err) {
         // Handle potential CastError if ID format is invalid
         if (err.name === 'CastError') {
             return res.status(400).json({ message: 'Invalid Todo ID format' });
         }
        next(err);
    }
});

// POST /api/todos - Create a new todo
router.post('/todos', async (req, res, next) => {
    try {
        // We expect the client to send 'item' and optionally 'description' in the JSON request body
        const { item, description } = req.body;

        // Basic validation
        if (!item) {
            return res.status(400).json({ message: 'Missing required field: item' });
        }

        const newTodoData = { item, description };
        const createdTodo = await todoService.createTodo(newTodoData);

        // Send back the created todo with a 201 Created status
        res.status(201).json(createdTodo);
    } catch (err) {
         // Handle potential validation errors from Mongoose
         if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        next(err);
    }
});

// PUT /api/todos/:id - Update an existing todo by ID
router.put('/todos/:id', async (req, res, next) => {
    const todoId = req.params.id.trim(); // Trim whitespace/newlines
    console.log(`PUT request received for ID: [${todoId}]`);
    try {
        const { item, description } = req.body;

         // Basic validation (ensure at least 'item' is present for PUT, though debatable)
         if (item === undefined || item === null || item === '') { // Check more thoroughly for item presence
             return res.status(400).json({ message: 'Missing required field: item' });
         }

        // Prepare update data, allowing description to be optional or explicitly cleared
        const updateData = { item, description: description !== undefined ? description : '' };


        const updatedTodo = await todoService.updateTodo(req.params.id, updateData);

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found for update' });
        }
        res.json(updatedTodo); // Send back the updated todo
    } catch (err) {
         if (err.name === 'CastError') {
            console.error("================== CastError Details =================="); 
         console.error(err); // Log the full error object
         console.error("=====================================================");
         return res.status(400).json({ message: 'Invalid Todo ID format (See server logs for details)' }); 
         }
         // Handle potential validation errors from Mongoose during update
         if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        next(err);
    }
});

// DELETE /api/todos/:id - Delete a todo by ID
router.delete('/todos/:id', async (req, res, next) => {
    const todoId = req.params.id.trim(); // Trim whitespace/newlines
    console.log(`DELETE request received for ID: [${todoId}]`);
    try {
        const deletedTodo = await todoService.deleteTodo(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found for delete' });
        }
        // Respond with 204 No Content, indicating success but no body
        res.status(204).send();
    } catch (err) {
         if (err.name === 'CastError') {
            console.error("================== CastError Details =================="); 
            console.error(err); // Log the full error object
            console.error("=====================================================");
            return res.status(400).json({ message: 'Invalid Todo ID format (See server logs for details)' });
         }
        next(err);
    }
});


module.exports = router;