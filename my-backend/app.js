require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const authRoutes = require('./authRoutes');
const pool = require('./db');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get("/", async (req, res) => {
  try {
    const a = await pool.query("SELECT * FROM gkc_user_data");
    return res.json(a);
  } catch (ee) {
    return res.json(ee.message);
  }
});

// API endpoint to execute mvn install command
app.post('/run-mvn-install', (req, res) => {
  // Change directory to the specified path
  const cwd = 'D:\\react test\\gkc-aws-pipeline';

  // Execute mvn install command in the specified directory
  exec('mvn clean install', { cwd }, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.status(500).send('Failed to execute mvn install command');
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    // Assuming the JAR file is created in a directory named 'target'
    res.sendFile('D:\\react test\\gkc-aws-pipeline\\target\\gkc-aws-pipeline-1.0-SNAPSHOT.jar'); // Adjust the path accordingly
  });
});

// Define the PORT after loading environment variables
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
