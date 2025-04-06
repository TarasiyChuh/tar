const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const authMiddleware = require('../middleware/auth');

// Створення або отримання чату
router.post('/createOrGetChat', authMiddleware, async (req, res) => {
  const { user2 } = req.body;
  const user1 = req.user.id;

  try {
    let chat = await Chat.findOne({
      users: { $all: [user1, user2], $size: 2 }
    });

    if (!chat) {
      chat = new Chat({ users: [user1, user2], messages: [] });
      await chat.save();
    }

    res.json({ chatId: chat._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Отримання повідомлень чату
router.get('/:chatId/messages', authMiddleware, async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await Message.find({ chat: chatId })
      .populate('sender', 'username')
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Відправка повідомлення
router.post('/:chatId/sendMessage', authMiddleware, async (req, res) => {
  const { chatId } = req.params;
  const { content } = req.body;
  const sender = req.user.id;

  try {
    const message = new Message({ chat: chatId, sender, content });
    await message.save();

    await Chat.findByIdAndUpdate(chatId, { $push: { messages: message._id } });

    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;