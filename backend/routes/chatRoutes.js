// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

// Створення нового чату між двома користувачами
router.post('/create', async (req, res) => {
  try {
    const { participants } = req.body;
    // Має бути передано масив з рівно двох ID
    if (!participants || !Array.isArray(participants) || participants.length !== 2) {
      return res.status(400).json({ message: 'Потрібно вказати двох користувачів' });
    }
    // Перевірка, чи вже існує чат між цими користувачами (повинно співпадати з обома, незалежно від порядку)
    const existingChat = await Chat.findOne({
      participants: { $all: participants, $size: participants.length }
    });
    if (existingChat) {
      return res.status(200).json({ message: 'Чат вже існує', chat: existingChat });
    }
    // Створення нового чату
    const newChat = new Chat({ participants, messages: [] });
    await newChat.save();
    res.status(201).json({ message: 'Чат створено успішно', chat: newChat });
  } catch (error) {
    console.error('Помилка створення чату:', error);
    res.status(500).json({ message: 'Помилка сервера при створенні чату' });
  }
});

// Отримання чату за його ID
router.get('/:chatId', async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId)
      .populate('participants', 'username email')
      .populate('messages.sender', 'username');
    if (!chat) {
      return res.status(404).json({ message: 'Чат не знайдено' });
    }
    res.json(chat);
  } catch (error) {
    console.error('Помилка отримання чату:', error);
    res.status(500).json({ message: 'Помилка сервера при отриманні чату' });
  }
});

// Відправка повідомлення в чат
router.post('/:chatId/message', async (req, res) => {
  try {
    const { senderId, text } = req.body;
    if (!senderId || !text) {
      return res.status(400).json({ message: 'senderId і text є обов’язковими' });
    }
    const chat = await Chat.findById(req.params.chatId);
    if (!chat) {
      return res.status(404).json({ message: 'Чат не знайдено' });
    }
    const newMessage = { sender: senderId, text, createdAt: new Date() };
    chat.messages.push(newMessage);
    await chat.save();
    res.status(201).json({ message: 'Повідомлення надіслано', messageData: newMessage });
  } catch (error) {
    console.error('Помилка відправки повідомлення:', error);
    res.status(500).json({ message: 'Помилка сервера при відправці повідомлення' });
  }
});

module.exports = router;
