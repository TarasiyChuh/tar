// models/Chat.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    // Масив учасників чату (має містити рівно 2 користувача)
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    // Повідомлення у чаті
    messages: [
      {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Chat', chatSchema);
