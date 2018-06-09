import React from 'react';

const SearchPanel = () => (
  <div className='sidepanel--content'>
    <h3> Поиск </h3>
    <input type="text" disabled className="search" placeholder="Поиск" />
    <p> В скором времени в этой вкладке появится возможность
      быстрого поиска по изобретениям и персонам.
    </p>
  </div>
);

export default SearchPanel;
