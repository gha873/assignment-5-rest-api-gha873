const Todo = require('../models/todo'); // Import the Mongoose model

// Function to get all todos
async function getAllTodos() {
  // The sort logic stays here as it's part of fetching 'all'
  return await Todo.find().sort({ createdAt: -1 });
}

// Function to get a single todo by ID
async function getTodoById(id) {
  return await Todo.findById(id);
}

// Function to create a new todo
async function createTodo(itemData) {
  const newTodo = new Todo({
    item: itemData.item,
    description: itemData.description,
  });
  return await newTodo.save();
}

// Function to update a todo by ID
async function updateTodo(id, updateData) {
  // The { new: true } option returns the updated document
  return await Todo.findByIdAndUpdate(
    id,
    {
      item: updateData.item,
      description: updateData.description,
    },
    { new: true, runValidators: true } // Added runValidators to ensure schema rules are checked on update
  );
}

// Function to delete a todo by ID
async function deleteTodo(id) {
  return await Todo.findByIdAndDelete(id);
}

// Export all the functions
module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};