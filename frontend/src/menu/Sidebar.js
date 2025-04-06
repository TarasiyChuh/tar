// Sidebar.jsx
import React from 'react'; 
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="sidebar">
      <Link to="/" className="sidebar-button">Головна сторінка</Link>
      <Link to="/account" className="sidebar-button">Акаунт</Link>
      <Link to="/library" className="sidebar-button">Бібліотека</Link>
      <Link to="/settings" className="sidebar-button">Налаштування</Link>
      <Link to="/free-games" className="sidebar-button">Безкоштовні ігри</Link>
      {/* Нова кнопка для користувачів */}
      <Link to="/users" className="sidebar-button">Користувачі</Link>

      {!localStorage.getItem('token') ? (
        <>
          <Link to="/login" className="sidebar-button">Логін</Link>
          <Link to="/register" className="sidebar-button">Реєстрація</Link>
        </>
      ) : (
        <button onClick={handleLogout} className="sidebar-button">Вийти</button>
      )}
    </div>
  );
}

export default Sidebar;
