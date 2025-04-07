import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UsersList.css';

const UsersList = ({ onSelectUser, currentUserId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/users', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        console.log("Users received:", response.data);
        const filteredUsers = response.data.filter(user => user._id !== currentUserId);
        setUsers(filteredUsers);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [currentUserId]);

  return (
    <div className="users-list-container">
      <h2 className="users-list-title">Список користувачів</h2>
      {users.length === 0 ? (
        <p className="no-users">Немає користувачів</p>
      ) : (
        <ul className="users-list">
          {users.map(user => (
            <li 
              key={user._id} 
              onClick={() => onSelectUser && onSelectUser(user)}
              className="user-item"
            >
              {user.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersList;