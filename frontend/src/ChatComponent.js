// ChatComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatComponent = ({ chatId, currentUserId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Отримуємо повідомлення з чату при завантаженні компонента
    axios.get(`/api/chat/${chatId}`)
      .then(response => setMessages(response.data.messages))
      .catch(error => console.error('Error fetching messages:', error));
  }, [chatId]);

  const sendMessage = () => {
    if (message) {
      axios.post(`/api/chat/${chatId}/message`, { senderId: currentUserId, message })
        .then(response => {
          setMessages([...messages, response.data.message]);
          setMessage('');
        })
        .catch(error => console.error('Error sending message:', error));
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.senderId === currentUserId ? 'You' : 'User'}: </strong>{msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
