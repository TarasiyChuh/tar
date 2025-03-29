const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  link: { type: String, required: false },  // Якщо не потрібно, просто залишимо як необов'язкове
  photo: { type: String, required: true },
  genre: { type: String, required: true }  // Замість масиву - простий рядок тексту
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);
