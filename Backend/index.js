const express = require('express');
const sequelize = require('./config/database');
const Task = require('./models/Task');
const cors = require('cors');
const PORT = 4000;

// const app = express();
// app.use(express.json());

const app = express(); 
app.use(cors()); 
app.use(express.json());

// Create a new task
app.post('/tasks', async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const newTask = await Task.create({ title, description, dueDate, status });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// View all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Update an existing task
app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, status } = req.body;
    const task = await Task.findByPk(id);
    if (task) {
      task.title = title;
      task.description = description;
      task.dueDate = dueDate;
      task.status = status;
      await task.save();
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (task) {
      await task.destroy();
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

app.get('/', (req, res) => { 
    res.send('Hello, Express is set up!');
});

// Sync database and start the server
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });
