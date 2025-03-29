// Завантажуємо змінні середовища з файлу .env
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());  // Дозволяє CORS запити
app.use(express.json());  // Парсить JSON у тілі запиту

// Підключення до MongoDB
const MONGO_URI = process.env.MONGO_URI;  // Беремо URI з .env файлу
const JWT_SECRET = process.env.JWT_SECRET;  // Беремо секретний ключ з .env файлу

// Роутери
app.use('/api/auth', require('./routes/auth'));  // Роут для аутентифікації
app.use('/api/games', require('./routes/game'));  // Роут для ігор
app.use('/api/comments', require('./routes/comment'));


// Підключення до MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Налаштування порту
const PORT = process.env.PORT || 5000;  // Якщо в середовищі є PORT, використовуємо його, інакше 5000ы

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
