const express = require('express');
const router = express.Router();
const multer = require('multer');
const Book = require('../models/Book');
const path = require('path');
const fs = require('fs');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'thumbnail') {
      cb(null, 'uploads/thumbnails/');
    } else if (file.fieldname === 'pdf') {
      cb(null, 'uploads/pdfs/');
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create book (admin only)
router.post('/', upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'pdf', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, description, editor } = req.body;
    const thumbnail = req.files['thumbnail'] ? req.files['thumbnail'][0].path : '';
    const pdf = req.files['pdf'] ? req.files['pdf'][0].path : '';
    const book = new Book({ title, description, editor, thumbnail, pdf });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update book (admin only)
router.put('/:id', upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'pdf', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, description, editor } = req.body;
    const updateData = { title, description, editor };
    if (req.files['thumbnail']) {
      updateData.thumbnail = req.files['thumbnail'][0].path;
    }
    if (req.files['pdf']) {
      updateData.pdf = req.files['pdf'][0].path;
    }
    const book = await Book.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete book (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    // Optionally delete files
    if (book.thumbnail) fs.unlink(book.thumbnail, () => {});
    if (book.pdf) fs.unlink(book.pdf, () => {});
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
