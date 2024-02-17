const {Pool} = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.USER_NAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database:process.env.DB_NAME
});

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  });


  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS tasks (
    id VARCHAR(255) PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    status VARCHAR(20)
  );
`;

async function createTable() {
  try {
    // Execute the query to create the table
     pool.query(createTableQuery);
    console.log('Table created successfully if it does not exist!');
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

createTable();
// - GET /api/tasks  Retrieve all tasks
const getTasks = (request, response) => {
    pool.query('SELECT * FROM tasks', (error, results) => {
      if (error) {
        throw error
      }
      console.log('- GET /api/tasks  Retrieve all tasks')
      response.status(200).json(results.rows)
    })
}


  // - GET /api/tasks/:id - Retrieve a specific task by ID
const getTaskById = (request, response) => {
    const id = request.params.id
    pool.query('SELECT * FROM tasks WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      console.log('- GET /api/tasks/:id - Retrieve a specific task by ID')
      response.status(200).json(results.rows)
    })
}

// - POST /api/tasks - Create a new task
const createTask = (request, response) => {
    const {id, title, description, status} = request.body;
    pool.query('INSERT INTO tasks(id, title, description, status) VALUES ($1, $2, $3, $4) RETURNING *', [id, title, description, status], (error, results) => {
      if (error) {
        throw error
      }
      console.log('- POST /api/tasks - Create a new task')
      response.status(201).json({taskStatus:`Task added with ID: ${id}`})
    })
  }
// - PUT /api/tasks/:id - Update an existing task
  const updateTask = (request, response) => {
    const id = request.params.id;
    const {title, description, status} = request.body  
    pool.query(
      'UPDATE tasks SET title= $2,description=$3, status=$4 WHERE id = $1',
      [id, title, description, status],
      (error, results) => {
        if (error) {
          throw error
        }
        console.log('- PUT /api/tasks/:id - Update an existing task')
        response.status(200).json({taskStatus:`User modified with ID: ${id}`})
      }
    )
  }

// - DELETE /api/tasks/:id - Delete a task by ID
  const deleteTask = (request, response) => {
    const id = request.params.id
    pool.query('DELETE FROM tasks WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      console.log('- DELETE /api/tasks/:id - Delete a task by ID')
      response.status(200).json({taskStatus:`User deleted with ID: ${id}`})
    })
  }


module.exports={getTasks,getTaskById,createTask,updateTask,deleteTask};