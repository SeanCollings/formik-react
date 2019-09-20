import React, { useState } from 'react';

import { SORT } from '../utils/constants'
import { useThemeContext } from './contexts';

const SortButton = ({ direction, setDirection }) => {
  const [themeColour] = useThemeContext();

  return (
    <button
      className="ui icon button "
      style={{
        transform: `rotateX(${
          direction === SORT.DOWN ? '0' : '180'
          }deg)`,
        transition: 'all 0.2s ease 0s',
        backgroundColor: 'white',
        marginTop: '-14px'
      }}
      onClick={() => setDirection(direction === SORT.DOWN ? SORT.DOWN : SORT.UP)}
    >
      <i className="sort arrow down icon"></i>
    </button>
  );
}

export default SortButton;