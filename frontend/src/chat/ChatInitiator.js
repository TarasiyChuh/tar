import React from 'react';
import axios from 'axios';
import UsersList from './UsersList';

const ChatInitiator = ({ currentUserId }) => {
  const handleSelectUser = async (selectedUser) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/chats/createOrGetChat',
        { user2: selectedUser._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      const chatId = response.data.chatId;
      window.location.href = `/chat/${chatId}`; // Перенаправлення на чат
    } catch (error) {
      console.error('Error creating or getting chat:', error);
    }
  };

  return (
    <div>
      
      <UsersList onSelectUser={handleSelectUser} currentUserId={currentUserId} />
    </div>
  );
};

export default ChatInitiator;