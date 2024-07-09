const router = require('express').Router();
const pool = require('./db');
const jwt = require('jsonwebtoken');
 
router.post('/signup', async (req, res) => {
  const { username, email, phoneNumber, password } = req.body;
 
  try {
    // Check if the provided username already exists
    const usernameCheck = await pool.query('SELECT * FROM gkc_user_data WHERE "Name" = $1', [username]);
    if (usernameCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }
 
    // Check if the provided email already exists
    const emailCheck = await pool.query('SELECT * FROM gkc_user_data WHERE "Email" = $1', [email]);
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }
 
    // Check if the provided phone number already exists
    const phoneCheck = await pool.query('SELECT * FROM gkc_user_data WHERE "Phone" = $1', [phoneNumber]);
    if (phoneCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Phone number already registered' });
    }
 
    // If username, email, and phone number are unique, proceed with user creation
    const newUser = await pool.query(
      'INSERT INTO gkc_user_data("Name", "Email", "Phone", "Password") VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, phoneNumber, password]
    );
 
    const loginDataQuery = `
      INSERT INTO user_login_data (id, username, email, login_count, last_login)
      VALUES ($1, $2, $3, $4, NOW());
    `;
    await pool.query(loginDataQuery, [newUser.rows[0].Id, newUser.rows[0].Name, newUser.rows[0].Email, 1]);
 
    const token = jwt.sign({ userId: newUser.rows[0].Id }, process.env.JWT_SECRET || "your_default_jwt_secret");
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
 
  try {
    // Query to fetch the user's password from the database
    const userQuery = 'SELECT * FROM gkc_user_data WHERE "Name" = $1';
    const userResult = await pool.query(userQuery, [username]);
 
    if (userResult.rows.length > 0) {
      const user = userResult.rows[0];
      const storedPassword = user.Password; // Assuming 'Password' is the column name where plain text passwords are stored
 
      // Direct comparison of the plaintext passwords
      if (password === storedPassword) {
        // Generating a JWT for the user
        const token = jwt.sign({ userId: user.Id }, process.env.JWT_SECRET || "your_default_jwt_secret", {
          expiresIn: '1h' // Optional: Configures the token to expire in one hour
        });
 
        // Update login data
        const updateLoginDataQuery = `
          UPDATE user_login_data
          SET login_count = login_count + 1, last_login = NOW()
          WHERE id = $1;
        `;
        await pool.query(updateLoginDataQuery, [user.Id]);
 
        res.json({ token });
      } else {
        res.status(400).json({ error: 'Invalid Password' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.log('Login error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});
 
module.exports = router;
 