import React from 'react';
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/" className="sidebar-button">Головна сторінка</Link>
      <a href="account.html" className="sidebar-button">Акаунт</a>
      <a href="library.html" className="sidebar-button">Бібліотека</a>
      <a href="settings.html" className="sidebar-button">Налаштування</a>
    </div>
  );
}

export default Sidebar;
