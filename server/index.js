const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config();

const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ensure uploads directories exist
const uploadDirs = ['uploads', 'uploads/thumbnails', 'uploads/pdfs'];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Serve uploads statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/suggestions', require('./routes/suggestionRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

app.get('/', (req, res) => {
  res.send('EbookSite API is running');
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});