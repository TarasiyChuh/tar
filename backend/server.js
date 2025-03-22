require('dotenv').config();  // Можна видалити цей рядок, якщо не використовуєш .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection (замість процесу з .env, прописуємо URI напряму)
const MONGO_URI = 'mongodb://localhost:27017/mydatabase';  // Твій MongoDB URI
const JWT_SECRET = 'supersecretkey123';  // Твій секретний ключ для JWT

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/games', require('./routes/game'));


// MongoDB підключення
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
