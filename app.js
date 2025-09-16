const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = 3000;
const uploadsDir = path.join(__dirname, 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Middleware
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    res.json({ message: `Welcome back, ${username}` });
  } else {
    res.status(400).json({ error: 'Username and password required' });
  }
});

// Register page
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  if (username && email && password) {
    res.json({ message: `User ${username} registered successfully` });
  } else {
    res.status(400).json({ error: 'All fields are required' });
  }
});

// Contact page
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

app.post('/contact', (req, res) => {
  const { name } = req.body;
  if (name) {
    res.json({ message: `Thanks ${name}, we received your message.` });
  } else {
    res.status(400).json({ error: 'Name is required' });
  }
});

app.get('/settings', (req, res) => {
  res.sendFile(path.join(__dirname, 'settings.html'));
});

app.post('/settings', (req, res) => {
  const {
    emailNotifications,
    smsAlerts,
    language = 'english',
    dataSharing
  } = req.body;

  const parsedSettings = {
    emailNotifications: emailNotifications === 'on',
    smsAlerts: smsAlerts === 'on',
    language,
    dataSharing: dataSharing === 'on'
  };

  console.log('✅ Settings received:', parsedSettings);

  res.json({
    message: 'Settings updated successfully',
    ...parsedSettings
  });
});





// Hazard report
app.post('/report-a-hazard', upload.single('file'), (req, res) => {
  const { location, description } = req.body;
  const photo = req.file ? req.file.filename : 'No photo';

  if (!location || !description) {
    return res.status(400).json({ error: 'Location and description required' });
  }

  res.json({
    message: 'Report received',
    location,
    description,
    photo
  });
});

// Analysis data
app.get('/analysis', (req, res) => {
  res.json({
    liveReports: 27,
    trendingHazards: ['Oil Spill', 'Plastic Waste', 'Algae Bloom'],
    socialMentions: 1342,
    graphData: [12, 18, 25, 40, 33, 50]
  });
});

// Mock reports
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

// Start server
app.listen(PORT, () => {
  console.log(`🌊 OCEAN WATCH backend running at http://localhost:${PORT}`);
});
