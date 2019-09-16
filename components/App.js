import React from 'react';
import { Formik } from 'formik'

import Songs from './Songs'
import Genres from './Genres'

const App = () => {
  return (
    <div className="ui container">
      <h1>Formik Playlist Creator</h1>
      <label className="ui label">Playlist Name</label>
      <input type="text" title="name" className="ui input" />
      <Songs />
      <Genres />
      <button type="submit" className="ui blue button">Submit</button>
    </div>
  )
}

export default App