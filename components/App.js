import React, { Fragment } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Songs from './Songs';
import Genres from './Genres';
import Input from './Input';

import { downloadJSON } from '../utils/helper'

const App = () => {
  return (
    <div className="ui container" style={{ marginTop: '25px' }}>
      <h1 className="ui header">
        <i className="music icon" />
        <div className="ui content">
          Formik Playlist Creator
      </div>
      </h1>
      {/* <div className="ui right aligned grid" style={{ right: 0 }}>Upload</div> */}
      <div className="ui horizontal divider">
        Create Playlist
      </div>
      <Formik
        initialValues={{
          name: '',
          genres: [],
          songs: []
        }}
        onSubmit={(values, { setSubmitting }) => { console.log(values), downloadJSON(values) }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('You must add a playlist name!'),
          genres: Yup.array().required('You must select a genre!'),
          songs: Yup.array().min(2, 'You must select at least 2 songs')
        })}
      >
        {formik => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            submitForm
          } = formik;
          return (
            <div>
              <Input {...formik} />
              <div className="ui divider"></div>
              <Genres {...formik} />
              <div className="ui divider"></div>
              <Songs {...formik} />
              <div className="ui divider"></div>
              <button onClick={handleReset} disabled={!dirty || isSubmitting} className="ui button">Reset</button>
              <button onClick={submitForm} className="ui button green" style={{ marginLeft: '10px' }}>Submit</button>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </div>
          )
        }}
      </Formik>
    </div >
  )
}

export default App;