require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./authRoutes');
const app = express();
const pool = require('./db');
app.use(cors());  // Enable CORS
app.use(express.json());  // Parse JSON bodies
app.use('/api/auth', authRoutes);
app.get("/", async(req, res) => {
    try {const a = await pool.query("SELECT * FROM gkc_user_data");
    return res.json(a)} catch(ee) {return res.json(ee.message)}
    
    })

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
