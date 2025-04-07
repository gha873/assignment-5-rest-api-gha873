const express = require('express');
const router = express.Router();
const todoService = require('../services/todoService'); // Import the service

/* GET home page - Uses Service */
router.get('/', async function(req, res, next) {
  try {
    const todos = await todoService.getAllTodos(); // Use the service function
    res.render('index', { title: 'My To-Do List', todos: todos });
  } catch (err) {
    console.error("Error fetching todos:", err); // Log the specific error
    next(err); // Pass errors to the error handler
  }
});

/* GET About page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About My To-Do List' });
});

/* POST Create a new to-do item - Uses Service */
router.post('/create', async function(req, res, next) {
  try {
    // Pass the relevant data from req.body to the service
    await todoService.createTodo({
      item: req.body.item,
      description: req.body.description,
    });
    res.redirect('/'); // Redirect back to the home page
  } catch (err) {
    console.error("Error creating todo:", err);
    // Optionally render the form again with an error message
    // For now, just pass the error
    next(err);
  }
});

/* GET form to edit an item - Uses Service */
router.get('/edit/:id', async function(req, res, next) {
  try {
    const todo = await todoService.getTodoById(req.params.id); // Use the service
    if (!todo) {
      const err = new Error('To-do item not found');
      err.status = 404;
      return next(err); // Go to error handler if not found
    }
    res.render('edit', { title: "Edit To-Do", todo: todo });
  } catch (err) {
    console.error("Error getting todo for edit:", err);
    next(err);
  }
});

/* POST Update a to-do item - Uses Service */
router.post('/update/:id', async function(req, res, next) {
  try {
    const updatedTodo = await todoService.updateTodo(req.params.id, { // Use the service
      item: req.body.item,
      description: req.body.description,
    });
    if (!updatedTodo) {
       const err = new Error('To-do item not found for update');
       err.status = 404;
       return next(err);
    }
    res.redirect('/');
  } catch (err) {
    console.error("Error updating todo:", err);
     // Handle validation errors specifically if needed, e.g., render edit form again
    next(err);
  }
});

/* GET Delete a to-do item - Uses Service */
// Note: While the API won't use GET for delete, the HTML interface might still
// If you want the HTML interface to also use POST/DELETE, you'd need method-override
router.get('/delete/:id', async function(req, res, next) {
  try {
    const deletedTodo = await todoService.deleteTodo(req.params.id); // Use the service
    if (!deletedTodo) {
       const err = new Error('To-do item not found for delete');
       err.status = 404;
       return next(err);
    }
    res.redirect('/');
  } catch (err) {
    console.error("Error deleting todo:", err);
    next(err);
  }
});

module.exports = router;