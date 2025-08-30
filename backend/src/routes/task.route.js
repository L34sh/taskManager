const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// Get all tasks with optional filtering
router.get('/tasks', taskController.getTasks);

// Create a new task
router.post('/tasks', taskController.createTask);

// Update a task
router.put('/tasks/:id', taskController.updateTask);

// Delete a task
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
