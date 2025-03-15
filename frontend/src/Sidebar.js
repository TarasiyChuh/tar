import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Видаляємо токен і виконуємо перенаправлення на головну сторінку
    localStorage.removeItem('token');
    navigate('/');  // Перехід на головну сторінку після виведення
  };

  return (
    <div className="sidebar">
      <Link to="/" className="sidebar-button">Головна сторінка</Link>
      <Link to="/account" className="sidebar-button">Акаунт</Link>
      <Link to="/library" className="sidebar-button">Бібліотека</Link>
      <Link to="/settings" className="sidebar-button">Налаштування</Link>

      {/* Виведення кнопок для логіну та реєстрації, якщо користувач не залогінений */}
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
