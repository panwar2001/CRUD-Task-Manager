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
}


  // - GET /api/tasks/:id - Retrieve a specific task by ID
const getTaskById = (request, response) => {

}

// - POST /api/tasks - Create a new task
const createTask = (request, response) => {
  }
// - PUT /api/tasks/:id - Update an existing task
  const updateTask = (request, response) => {
  }

// - DELETE /api/tasks/:id - Delete a task by ID
  const deleteTask = (request, response) => {
  }


module.exports={getTasks,getTaskById,createTask,updateTask,deleteTask};