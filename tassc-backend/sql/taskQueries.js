const pool = require('../db');

const createTask = async (task) => {
  const result = await pool.query(
    'INSERT INTO tasks (title, description, status, due_date, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [task.title, task.description, task.status, task.due_date, task.user_id]
  );
  return result.rows[0];
};

const getTasksByUserId = async (userId) => {
  const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
  return result.rows;
};

const getTaskById = async (id) => {
  const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
  return result.rows[0];
};

const updateTask = async (id, task) => {
  const result = await pool.query(
    'UPDATE tasks SET title = $1, description = $2, status = $3, due_date = $4 WHERE id = $5 RETURNING *',
    [task.title, task.description, task.status, task.due_date, id]
  );
  return result.rows[0];
};

const deleteTask = async (id) => {
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
};

module.exports = { createTask, getTasksByUserId, getTaskById, updateTask, deleteTask };
