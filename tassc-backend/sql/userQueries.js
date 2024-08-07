const pool = require('../db');
const bcrypt = require('bcryptjs');

const createUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const result = await pool.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [user.username, user.email, hashedPassword]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail };
