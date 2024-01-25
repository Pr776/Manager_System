// server.js

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Import the cors middleware

const app = express();
const secretKey = 'your-secret-key'; // Replace with a strong secret key

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Authentication endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate username and password (replace with your authentication logic)
  if (username === 'Kesari' && password === 'Gamer') {
    // Generate a token
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

app.listen(3005, () => {
  console.log('Server is running on http://localhost:3005');
});
