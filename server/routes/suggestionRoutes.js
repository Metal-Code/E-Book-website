const express = require('express');
const router = express.Router();
const Suggestion = require('../models/Suggestion');

// Create suggestion (user)
router.post('/', async (req, res) => {
  try {
    const { title, author, userEmail, message } = req.body;
    const suggestion = new Suggestion({ title, author, userEmail, message });
    await suggestion.save();
    res.status(201).json(suggestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all suggestions (admin)
router.get('/', async (req, res) => {
  try {
    const suggestions = await Suggestion.find();
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;