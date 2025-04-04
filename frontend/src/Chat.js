// Chat.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Chat.css';

const Chat = () => {
  const { userId } = useParams();  // ID користувача, з яким ведеться чат
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  useEffect(() => {
    axios.get(`/api/chats/${userId}`)
      .then(response => setMessages(response.data ? response.data.messages : []))
      .catch(err => console.error('Error fetching chat:', err));
  }, [userId]);

  const handleSend = () => {
    // Надсилаємо повідомлення (логіку можна доопрацювати)
    axios.post(`/api/chats/${userId}`, { text: newMsg })
      .then(response => {
        // Оновлюємо список повідомлень
        setMessages([...messages, { text: newMsg }]);
        setNewMsg('');
      })
      .catch(err => console.error('Error sending message:', err));
  };

  return (
    <div className="chat-container">
      <h2>Чат з користувачем</h2>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input 
          type="text" 
          value={newMsg} 
          onChange={(e) => setNewMsg(e.target.value)} 
          placeholder="Введіть повідомлення..."
        />
        <button onClick={handleSend}>Надіслати</button>
      </div>
    </div>
  );
};

export default Chat;
