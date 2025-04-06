import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './menu/Sidebar';
import Search from './menu/Search';
import GameLibrary from './game/GameLibrary';
import GameDetails from './game/GameDetails';
import Register from './user/Register';
import Login from './user/Login';
import FreeGames from './game/FreeGames';
import Account from './user/Account';
import ChatInitiator from './chat/ChatInitiator';
import ProfilePage from './chat/ProfilePage';
import ChatRoom from './chat/ChatRoom';

function App() {
  const currentUserId = "67d2cc2761ccf6d642399ac6"; // Приклад ID

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
          <Route path="/users" element={<ChatInitiator currentUserId={currentUserId} />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/chat/:chatId" element={<ChatRoom currentUserId={currentUserId} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;