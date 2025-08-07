const mongoose = require('mongoose');

const SuggestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  userEmail: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Suggestion', SuggestionSchema);