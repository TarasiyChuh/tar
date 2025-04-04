// ChatRoom.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

/**
 * ChatRoom відображає чат за заданим chatId.
 * currentUserId передається, щоб визначити, хто є відправником повідомлень.
 */
const ChatRoom = ({ currentUserId }) => {
  const { chatId } = useParams();
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/chats/${chatId}`)
      .then(response => {
        setChat(response.data);
        setMessages(response.data.messages);
      })
      .catch(error => console.error('Error fetching chat:', error));
  }, [chatId]);

  const sendMessage = () => {
    if (newMsg.trim() === '') return;
    axios.post(`http://localhost:5000/api/chats/${chatId}/message`, {
      senderId: currentUserId,
      text: newMsg
    })
    .then(response => {
      setMessages([...messages, response.data.messageData]);
      setNewMsg('');
    })
    .catch(error => console.error('Error sending message:', error));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Чат {chatId}</h2>
      <div style={{
          border: '1px solid #ccc', 
          padding: '10px', 
          minHeight: '200px', 
          marginBottom: '10px'
        }}>
        {messages.length === 0 ? (
          <p>Немає повідомлень</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: '5px' }}>
              <strong>{msg.sender === currentUserId ? 'Ви' : 'Інший'}: </strong>{msg.text}
            </div>
          ))
        )}
      </div>
      <div>
        <input
          type="text"
          value={newMsg}
          onChange={e => setNewMsg(e.target.value)}
          placeholder="Введіть повідомлення..."
          style={{ width: '80%', padding: '8px' }}
        />
        <button onClick={sendMessage} style={{ padding: '8px 16px', marginLeft: '10px' }}>
          Надіслати
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
