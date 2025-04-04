const jwt = require('jsonwebtoken');
const JWT_SECRET = 'supersecretkey123'; // Той самий ключ, що у вашому auth.js

module.exports = function (req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Немає токена, доступ заборонено' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Додаємо розшифровані дані користувача в req.user
    next();
  } catch (error) {
    res.status(401).json({ message: 'Недійсний токен' });
  }
};