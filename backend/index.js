const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/devopsdb');

const TaskSchema = new mongoose.Schema({
  title: String,
});

const Task = mongoose.model('Task', TaskSchema);

app.get('/', (req, res) => {
  res.send('DevOps Project Running 🚀');
});

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json({ message: 'Task saved', task });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
