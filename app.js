const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

// Home Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Save Report (Mock)
app.post('/report-a-hazard', (req, res) => {
  const { location, description } = req.body;

  res.json({
    message: 'Report received',
    location,
    description,
    photo: 'No photo uploaded'
  });
});

// Analysis Data
app.get('/analysis', (req, res) => {
  res.json({
    liveReports: 27,
    trendingHazards: ['Oil Spill', 'Plastic Waste', 'Algae Bloom'],
    socialMentions: 1342,
    graphData: [12, 18, 25, 40, 33, 50]
  });
});

// Login
app.post('/login', (req, res) => {
  const { username } = req.body;
  res.json({ message: `Welcome back, ${username}` });
});

// Register
app.post('/register', (req, res) => {
  const { username } = req.body;
  res.json({ message: `User ${username} registered successfully` });
});

// Contact Us
app.post('/contact', (req, res) => {
  const { name } = req.body;
  res.json({ message: `Thanks ${name}, we received your message.` });
});

// Fetch Reports (Mock)
app.get('/reports', (req, res) => {
  res.json([
    {
      location: 'Goa',
      description: 'Plastic debris near shoreline',
      photo: 'debris.jpg',
      timestamp: new Date()
    },
    {
      location: 'Chennai',
      description: 'Oil slick spotted offshore',
      photo: 'oil.jpg',
      timestamp: new Date()
    }
  ]);
});

// Start Server
app.listen(PORT, () => {
  console.log(`🌊 OCEAN WATCH backend running at http://localhost:${PORT}`);
});
