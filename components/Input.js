import React, { Fragment } from 'react';

const Input = ({ values, handleChange, handleBlur, errors, touched }) => {
  return (
    <Fragment>
      <div
        className={`ui left icon input ${
          ''
          // errors.name && touched.name ? 'error' : ''
        }`}
        style={{ margin: '10px 0' }}
      >
        <input
          type="text"
          title="name"
          id="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className="ui input"
          placeholder="Playlist name..."
        />
        <i className="play icon green"></i>
      </div>
      {errors.name && touched.name && (
        <div className="ui negative message" style={{ margin: '10px 0' }}>
          {errors.name}
        </div>
      )}
    </Fragment>
  );
};

export default Input;
