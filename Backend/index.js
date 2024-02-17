const express=require('express');
require('dotenv').config();
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cors({origin: '*'}));
const PORT=process.env.PORT|8000;
const db=require('./db');

// Retrieve all tasks
app.get('/api/tasks/',db.getTasks);
// Retrieve a specific task by ID
app.get('/api/tasks/:id',db.getTaskById);
// Create a new task
app.post('/api/tasks/',db.createTask);
// Update an existing task
app.put('/api/tasks/:id',db.updateTask);
// Delete a task by ID
app.delete('/api/tasks/:id',db.deleteTask);

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));