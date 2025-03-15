import React from 'react';

function Search() {
  const performSearch = () => {
    const query = document.getElementById('search-input').value.toLowerCase();
    const gameCards = document.querySelectorAll('.game-card');

    gameCards.forEach(card => {
      const title = card.querySelector('.game-title').textContent.toLowerCase();
      const description = card.querySelector('.game-description').textContent.toLowerCase();

      if (title.includes(query) || description.includes(query)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          id="search-input"
          placeholder="Пошук ігор, доповнення та багато іншого"
        />
        <button onClick={performSearch}>
          <img src="page/free-icon-loupe-751463.png" alt="Search Icon" width="20" height="20" />
        </button>
      </div>
    </div>
  );
}

export default Search;
