import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // використовуємо useNavigate
import './ProfilePage.css';

const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate(); // отримуємо navigate

  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then(response => setUser(response.data))
      .catch(err => console.error('Error fetching profile:', err));
  }, [userId]);

  const handleStartChat = () => {
    // Перехід у чат з цим користувачем
    navigate(`/chat/${userId}`);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <h1>{user.username}</h1>
      <p>Email: {user.email}</p>
      <button onClick={handleStartChat}>Почати чат</button>
    </div>
  );
};

export default ProfilePage;
