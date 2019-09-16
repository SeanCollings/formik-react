import React, { Fragment } from 'react';
import { Formik } from 'formik'

import { SONG_LIST as songList } from '../utils/constants'
import { orderList } from '../utils/helper'

const App = () => {

  const renderSongs = () => {
    return (
      orderList(songList).map((song, i) => {
        return (<li key={i}>{`${song[0]} - ${song[1]}`}</li>)
      })
    )
  }

  return (
    <div className="ui container">
      <h3>Songs Selection</h3>
      <ul className="ui list">{renderSongs()}</ul>
    </div>
  )
}

export default App