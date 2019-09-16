import React, { Fragment } from 'react';
import { Formik } from 'formik'

import { GENRES as genres } from '../utils/constants'
import { orderList } from '../utils/helper'

const App = () => {

  const renderGenres = () => {
    return (
      orderList(genres).map((genre, i) => {
        return (<li key={i}>{`${genre}`}</li>)
      })
    )
  }

  return (
    <div className="ui container">
      <h3>Genre Selection</h3>
      <ul>{renderGenres()}</ul>
    </div>
  )
}

export default App