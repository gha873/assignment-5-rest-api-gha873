const express = require('express');
const router = express.Router();
const Todo = require('../models/todo'); // Import the Todo model

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 }); // Find all todos, sort by creation date
    res.render('index', { title: 'My To-Do List', todos: todos });
  } catch (err) {
    next(err); // Pass errors to the error handler
  }
});

/* GET About page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About My To-Do List' });
});

/* POST Create a new to-do item. */
router.post('/create', async function(req, res, next) {
  try {
    const newTodo = new Todo({
      item: req.body.item,
      description: req.body.description,
    });
    await newTodo.save();
    res.redirect('/'); // Redirect back to the home page
  } catch (err) {
    next(err);
  }
});

/* GET form to edit an item */
router.get('/edit/:id', async function(req, res, next){
  try {
    const todo = await Todo.findById(req.params.id);
        if(!todo){
            return res.status(404).send('To-do item not found');
        }
    res.render('edit', {title: "Edit To-Do", todo: todo})
  } catch (error) {
    next(error);
  }
});

/* POST Update a to-do item. */
router.post('/update/:id', async function(req, res, next) {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        item: req.body.item,
        description: req.body.description,
      },
      { new: true } // Return the updated document
    );
     if (!updatedTodo) {
            return res.status(404).send('To-do item not found.');
        }
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

/* GET Delete a to-do item. */
// Using GET for delete is simpler for a basic example, but in a production app,
// you should ideally use a form with method="POST" and the POST verb for deletion,
// possibly with method-override middleware to use DELETE.

router.get('/delete/:id', async function(req, res, next) {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
      if (!deletedTodo) {
            return res.status(404).send('To-do item not found.'); // Or handle differently
        }
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

module.exports = router;