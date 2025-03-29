const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const mongoose = require('mongoose');

// Отримання всіх ігор
router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching games' });
  }
});

// Отримання гри за її ID
router.get('/:id', async (req, res) => {
  // Перевірка чи ID має правильний формат
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid game ID format' });
  }

  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
