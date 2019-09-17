import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Formik, Field } from 'formik';

import { SONG_LIST as songList } from '../utils/constants';
import { orderArrayOfObjects } from '../utils/helper';

const App = ({ values, errors, touched, dirty, savedValues }) => {
  const [unSelected, setUnselected] = useState([...songList]);
  const [movedSongs, setMovedSongs] = useState([]);
  const [toggledUnSelectedSongs, setToggledUnSelectedSongs] = useState([]);
  const [toggledMoveSongs, setToggledMovedSongs] = useState([]);

  const preventUpdate = useRef(true);
  // console.log('SAVEDVALUES', savedValues);
  useEffect(() => {
    if (preventUpdate.current) {
      preventUpdate.current = false;
    } else {
      if (!dirty) {
        setUnselected([...songList]);
        setMovedSongs([]);
        preventUpdate.current = true;
        // console.log('NOT DIRTY');
      } else {
        // console.log('dirty');
      }
    }
  });

  const moveRight = form => {
    if (unSelected.length > 0 && toggledUnSelectedSongs.length > 0) {
      setMovedSongs([...movedSongs, ...toggledUnSelectedSongs]);
      setToggledUnSelectedSongs([]);
      const filtered = unSelected.filter(
        f => !toggledUnSelectedSongs.includes(f)
      );
      setUnselected(filtered);
      form.setFieldValue('songs', [...movedSongs, ...toggledUnSelectedSongs]);
    }
  };

  const moveLeft = form => {
    if (movedSongs.length > 0 && toggledMoveSongs.length > 0) {
      setUnselected([...unSelected, ...toggledMoveSongs]);
      setToggledMovedSongs([]);
      const filtered = movedSongs.filter(f => !toggledMoveSongs.includes(f));
      setMovedSongs(filtered);
      form.setFieldValue('songs', [...filtered]);
    }
  };

  function moveAllRight(form) {
    const orderedList = orderArrayOfObjects(songList);
    setUnselected([]);
    setMovedSongs([...orderedList]);
    form.setFieldValue('songs', [...orderedList]);
  }

  function moveAllLeft(form) {
    setUnselected([...songList]);
    setMovedSongs([]);
    form.setFieldValue('songs', []);
  }

  const getPosition = () => {
    let position = -1;

    for (let i = 0; i < movedSongs.length; i++) {
      if (movedSongs[i].id === toggledMoveSongs[0].id) {
        position = i;
        break;
      }
    }

    return position;
  };

  const moveUp = form => {
    if (toggledMoveSongs.length > 0) {
      const newOrder = [...movedSongs];
      const position = getPosition();

      if (position > 0) {
        [newOrder[position - 1], newOrder[position]] = [
          newOrder[position],
          newOrder[position - 1]
        ];
      }

      setMovedSongs([...newOrder]);
      form.setFieldValue('songs', [...newOrder]);
    }
  };

  const moveDown = form => {
    if (toggledMoveSongs.length > 0) {
      const newOrder = [...movedSongs];
      const position = getPosition();

      if (position < movedSongs.length - 1) {
        [newOrder[position + 1], newOrder[position]] = [
          newOrder[position],
          newOrder[position + 1]
        ];
      }

      setMovedSongs([...newOrder]);
      form.setFieldValue('songs', [...newOrder]);
    }
  };

  const handleUnselectedChange = (e, song) => {
    setToggledMovedSongs([]);
    if (toggledUnSelectedSongs.includes(song)) {
      const nextValue = toggledUnSelectedSongs.filter(
        value => value.id !== song.id
      );
      setToggledUnSelectedSongs(nextValue);
    } else {
      setToggledUnSelectedSongs([...toggledUnSelectedSongs, song]);
    }
  };

  const handleMovedChange = (e, song) => {
    setToggledUnSelectedSongs([]);
    if (toggledMoveSongs.length > 0 && toggledMoveSongs[0].id === song.id) {
      setToggledMovedSongs([]);
    } else {
      setToggledMovedSongs([song]);
    }
  };

  const renderMovedSongs = dirty => {
    return movedSongs.map((song, i) => {
      return (
        <div key={song.id} className="ui checkbox item">
          <input
            type="checkbox"
            onChange={e => handleMovedChange(e, song)}
            checked={toggledMoveSongs.includes(song)}
          />
          <label>{`${song.band} - ${song.title}`}</label>
        </div>
      );
    });
  };

  const renderUnselectedSongs = dirty => {
    return orderArrayOfObjects(unSelected).map((song, i) => {
      return (
        <div key={song.id} className="ui checkbox item">
          <input
            type="checkbox"
            onChange={e => handleUnselectedChange(e, song)}
            checked={toggledUnSelectedSongs.includes(song)}
          />
          <label>{`${song.band} - ${song.title}`}</label>
        </div>
      );
    });
  };

  return (
    <Field>
      {({ field, form }) => {
        return (
          <Fragment>
            <h4 className="ui header green">Select Songs</h4>
            <div className="ui grid" style={{ margin: 'auto' }}>
              <div
                className="ui seven wide column segment"
                style={{ marginBottom: '0px' }}
              >
                <h5 className="ui header aligned center">Available songs</h5>
                <div
                  className="ui list"
                  style={{
                    height: '260px',
                    overflow: 'auto'
                  }}
                >
                  {renderUnselectedSongs(dirty)}
                </div>
              </div>
              <div
                className="ui two wide column center aligned"
                style={{ margin: 'auto' }}
              >
                <button
                  className="ui button"
                  onClick={() => moveRight(form)}
                  style={{ marginBottom: '5px' }}
                >{`>`}</button>
                <button
                  className="ui button"
                  onClick={() => moveLeft(form)}
                  style={{ marginBottom: '5px' }}
                >{`<`}</button>
                <button
                  className="ui button"
                  onClick={() => moveAllRight(form)}
                  style={{ marginBottom: '5px' }}
                >{`>>`}</button>
                <button
                  className="ui button"
                  onClick={() => moveAllLeft(form)}
                  style={{ marginBottom: '5px' }}
                >{`<<`}</button>
              </div>
              <div
                className="ui seven wide column segment"
                style={{ marginTop: '0px' }}
              >
                <h5 className="ui header aligned center">Selected songs</h5>
                <div
                  className="ui list"
                  style={{
                    height: '260px',
                    overflow: 'auto'
                  }}
                >
                  {renderMovedSongs(dirty)}
                </div>
              </div>
            </div>
            <div className="ui grid" style={{ textAlign: 'center' }}>
              <div className="ui seven wide column" />
              <div className="ui two wide column" />
              <div
                className="ui seven wide column"
                stlye={{ margin: 'auto', paddingTop: '0px' }}
              >
                <button
                  className="ui button"
                  disabled={toggledMoveSongs.length < 1}
                  onClick={() => moveUp(form)}
                >
                  Up
                </button>
                <button
                  className="ui button"
                  disabled={toggledMoveSongs.length < 1}
                  onClick={() => moveDown(form)}
                >
                  Down
                </button>
              </div>
            </div>
            {errors.songs && touched.songs && (
              <div className="ui negative message" style={{ margin: '10px 0' }}>
                {errors.songs}
              </div>
            )}
          </Fragment>
        );
      }}
    </Field>
  );
};

export default App;
