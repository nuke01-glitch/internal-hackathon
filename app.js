const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname)));

// Optional: parse form data (for future POST requests)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`🌊 OCEAN WATCH server running at http://localhost:${PORT}`);
});
