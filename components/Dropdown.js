import React, { Fragment, useState } from 'react'

import { useThemeContext } from './contexts';

import { COLOURS } from '../utils/constants'

const Dropdown = () => {
  const [themeColour, setThemeColour] = useThemeContext();
  // console.log('themeColour', themeColour)

  return (
    <div className="ui compact menu floated right tiny">
      <div className="ui simple dropdown item">
        Colour
      <i className="dropdown icon"></i>
        <div className="menu">
          {COLOURS.map(col =>
            <div className="item" key={col} onClick={() => setThemeColour(col)}>{col}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dropdown;