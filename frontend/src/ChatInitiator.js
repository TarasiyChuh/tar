// ChatInitiator.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UsersList from './UsersList';

/**
 * ChatInitiator відповідає за створення нового чату між поточним користувачем і вибраним.
 * Поточний користувач має бути переданий як prop currentUserId.
 */
const ChatInitiator = ({ currentUserId }) => {
  const navigate = useNavigate();

  const handleSelectUser = (selectedUser) => {
    // Відправляємо запит на створення чату між currentUserId та selectedUser._id
    axios.post('http://localhost:5000/api/chats/create', {
      participants: [currentUserId, selectedUser._id]
    })
    .then(response => {
      // Отримуємо ID чату; перевіряємо, чи він міститься в chat.chatId або chat._id
      const chat = response.data.chat;
      const chatId = chat.chatId || chat._id;
      navigate(`/chat/${chatId}`);
    })
    .catch(error => console.error('Error creating chat:', error));
  };

  return (
    <div>
      <UsersList onSelectUser={handleSelectUser} />
    </div>
  );
};

export default ChatInitiator;
