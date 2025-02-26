import React from 'react';
import { Link } from 'react-router-dom';

function GameLibrary() {
  return (
    <div className="game-library">
      {/* Карточка для Forza Horizon 5 */}
      <Link to="/game1" className="game-card">
        <img src="/page/ForzaHorizon5.jpg" alt="Forza Horizon 5" />
        <div className="game-info">
          <h2 className="game-title">Forza Horizon 5</h2>
          <p className="game-description">Гонки </p>
        </div>
      </Link>

      {/* Карточка для S.T.A.L.K.E.R. 2 */}
      <Link to="/game2" className="game-card">
        <img src="/page/S.T.A.L.K.E.R._2.jpg" alt="S.T.A.L.K.E.R. 2" />
        <div className="game-info">
          <h2 className="game-title">S.T.A.L.K.E.R. 2</h2>
          <p className="game-description">Постапокаліпсис</p>
        </div>
      </Link>

      {/* Карточка для Atomic Heart */}
      <Link to="/game3" className="game-card">
        <img src="/page/AtomicHeart.jpg" alt="Atomic Heart" />
        <div className="game-info">
          <h2 className="game-title">Atomic Heart</h2>
          <p className="game-description">Пригодницький екшен</p>
        </div>
      </Link>

      {/* Карточка для Call of Duty: Modern Warfare III */}
      <Link to="/game4" className="game-card">
        <img src="/page/MWIII.png" alt="Call of Duty: MWIII" />
        <div className="game-info">
          <h2 className="game-title">Call of Duty</h2>
          <p className="game-description">Шутер </p>
        </div>
      </Link>
    </div>
  );
}

export default GameLibrary;
