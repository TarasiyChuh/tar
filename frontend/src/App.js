// App.js
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Search from './Search';
import GameLibrary from './GameLibrary';
import GameDetails from './GameDetails';
import Register from './Register';
import Login from './Login';
import FreeGames from './FreeGames';
import Account from './Account';
import ChatInitiator from './ChatInitiator';
import ProfilePage from './ProfilePage';
import ChatRoom from './ChatRoom';

function App() {
  // Для прикладу, нехай currentUserId = "67d2cc2761ccf6d642399ac6" (тобто твій ID)
  const currentUserId = "67d2cc2761ccf6d642399ac6";

  return (
    <div className="app-container">
      <Sidebar />
      <Search />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<GameLibrary />} />
          <Route path="/game-details/:gameId" element={<GameDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/free-games" element={<FreeGames />} />
          <Route path="/account" element={<Account />} />
          {/* Маршрут для початку чату */}
          <Route path="/users" element={<ChatInitiator currentUserId={currentUserId} />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          {/* Маршрут для конкретного чату */}
          <Route path="/chat/:chatId" element={<ChatRoom currentUserId={currentUserId} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
