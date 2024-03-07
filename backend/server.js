const express = require('express');
const { exec } = require('child_process');
const cors = require('cors'); // Import the cors middleware
const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());

// API endpoint to execute mvn install command
app.post('/run-mvn-install', (req, res) => {
  // Change directory to C:\Users\sutik\IdeaProjects\gkc-aws-pipeline
  const cwd = 'C:\\Users\\sutik\\IdeaProjects\\gkc-aws-pipeline';
  
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
    res.sendFile('C:\Users\sutik\IdeaProjects\gkc-aws-pipeline\target\gkc-aws-pipeline-1.0-SNAPSHOT.jar'); // Adjust the path accordingly
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
