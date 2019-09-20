import React from 'react';

import { useThemeContext } from './contexts';

const SearchBox = ({ expandSearch, searchTerm, setExpandSearch, searchSongs }) => {
  const [themeColour] = useThemeContext();

  const handleSearchInput = eventType => {
    if (eventType === 'mousedown') {
      setExpandSearch(true);
    } else if (eventType === 'blur' && searchTerm.length === 0) {
      setExpandSearch(false);
    }
  };

  return (
    <div
      className="five wide column"
      style={{ marginTop: '-3px' }}
    >
      <div
        className="ui left mini icon input transparent"
        style={{
          maxWidth: expandSearch ? '100%' : '22px',
          transition: 'all 1s ease 0s'
        }}
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onMouseDown={e => handleSearchInput(e.type)}
          onBlur={e => handleSearchInput(e.type)}
          onChange={e =>
            searchSongs(e.target.value.toLowerCase())
          }
          style={{ cursor: 'pointer' }}
        />
        <i className={`search icon ${themeColour}`}></i>
      </div>
    </div>
  );
}

export default SearchBox;