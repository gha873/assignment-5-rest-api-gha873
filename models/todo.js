const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true, // Make 'item' required
    trim: true,     // Remove whitespace from start/end
  },
  description: {
    type: String,
    trim: true,
  },
}, { timestamps: true }); // Add timestamps (createdAt, updatedAt)

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;