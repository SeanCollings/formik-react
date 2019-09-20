import React, { Fragment, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Songs from './Songs';
import Genres from './Genres';
import Input from './Input';
import Dropdown from './Dropdown';
import { useThemeContext } from './contexts';

import { downloadJSON } from '../utils/helper';

const Main = () => {
  const [themeColour] = useThemeContext();
  const [savedValues, setSavedValues] = useState(null);
  const [newUpload, setNewUpload] = useState(false);

  const uploadJSON = () => {
    document.getElementById('file-input').click();
    document
      .getElementById('file-input')
      .addEventListener('change', handleFileSelect, false);
  };

  const handleFileSelect = e => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = event => {
      const playlist = JSON.parse(event.target.result);
      if (playlist.name && playlist.genres && playlist.songs) {
        setSavedValues(playlist);
      } else {
        alert('Whoops! You have selected a bad playlist.');
      }
      setNewUpload(false);
    };
    reader.onerror = error => reject(error);

    setNewUpload(true);
    reader.readAsText(selectedFile);
  };

  return (
    <Fragment>
      <button onClick={uploadJSON} className={`ui button right floated ${themeColour}`}>
        Upload
      </button>
      <Dropdown />
      <input
        id="file-input"
        type="file"
        name="file-input"
        accept=".json"
        multiple={false}
        style={{ display: 'none' }}
      />
      <h1 className="ui header">
        <i className={`music icon ${themeColour}`} />
        <div className="ui content">Formik Playlist Creator</div>
      </h1>
      <div className="ui horizontal divider">
        {`${savedValues ? `Edit` : `Create`} Playlist`}
      </div>
      <Formik
        initialValues={
          savedValues
            ? { ...savedValues }
            : {
              name: '',
              genres: [],
              songs: []
            }
        }
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          console.log(values), downloadJSON(values);
        }}
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
              <div className="ui divider" />
              <Genres {...formik} />
              <div className="ui divider" />
              <Songs {...formik} savedValues={savedValues} newUpload={newUpload} />
              <div className="ui divider" />
              <button
                onClick={() => {
                  handleReset();
                  setSavedValues(null);
                }}
                disabled={savedValues ? false : !dirty || isSubmitting}
                className="ui button"
              >
                Reset
              </button>
              <button
                onClick={submitForm}
                className={`ui button ${themeColour}`}
                style={{ marginLeft: '10px' }}
              >
                Submit
              </button>
              <div className="ui divider" />
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </div>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export default Main;
