import React, { Fragment } from 'react';
import { Formik } from 'formik'

import Checkbox from './Checkbox';

import { GENRES as genres } from '../utils/constants'
import { orderArray } from '../utils/helper'

const App = ({ errors, touched }) => {

  const renderGenres = () => {
    return (
      orderArray(genres).map((genre, i) => {
        return (
          <div key={genre} className="three wide column" style={{ marginTop: '-10px' }}>
            <Checkbox name="genres" value={genre} />
          </div>
        )
      })
    )
  }

  return (
    <div className="ui container">
      <h4 className="ui header">Select Genres</h4>
      <div className="ui grid" style={{ margin: '5px 0' }}>
        {renderGenres()}
      </div>
      {errors.genres && touched.genres && <div className="ui negative message" style={{ margin: '10px 0' }}>{errors.genres}</div>}
    </div>
  )
}

export default App