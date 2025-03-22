import React from 'react';
import { Link } from 'react-router-dom';
import './FreeGames.css';

function FreeGames() {
  const games = [
    { id: 1, title: 'Tic Tac Toe', link: '/free-games/tictactoe' },
    { id: 2, title: 'Snake Game', link: '/free-games/snake' },
    { id: 3, title: 'Flappy Bird', link: '/free-games/flappy' },
  ];

  return (
    <div className="free-games-container">
      <h1>Free Games Zone</h1>
      <div className="games-list">
        {games.map((game) => (
          <Link
            key={game.id}
            to={game.link}
            className="free-game-card"
            style={{
              display: 'block',
              padding: '20px',
              border: '1px solid #ccc',
              marginBottom: '10px',
              borderRadius: '8px',
              textAlign: 'center'
            }}
          >
            {game.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FreeGames;
