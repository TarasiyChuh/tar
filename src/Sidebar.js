import React from 'react';

function Sidebar() {
  return (
    <div className="sidebar">
      <a href="index.html" className="sidebar-button">Головна сторінка</a>
      <a href="account.html" className="sidebar-button">Акаунт</a>
      <a href="library.html" className="sidebar-button">Бібліотека</a>
      <a href="settings.html" className="sidebar-button">Налаштування</a>
    </div>
  );
}

export default Sidebar;
