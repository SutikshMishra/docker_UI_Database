require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Signup Route
app.post('/', async (req, res) => {
  const { username, email, phoneNumber, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      'INSERT INTO users (username, email, phone_number, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, phoneNumber, hashedPassword]
    );
    const token = jwt.sign({ userId: newUser.rows[0].id }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(401).json('Email or Password is incorrect');
    }
    const validPassword = await bcrypt.compare (password, user.rows[0].password);
    if (!validPassword) return res.status(401).json('Email or Password is incorrect');
    
    const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
