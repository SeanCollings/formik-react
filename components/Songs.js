import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Formik, Field } from 'formik';
import { useThemeContext } from './contexts';

import SearchBox from './SearchBox';
import SortButton from './SortButton';

import { SONG_LIST as songList, SORT } from '../utils/constants';
import { orderArrayOfObjects } from '../utils/helper';

// const TOGGLE_ACTION = 'toogle'
// const toggleAction = id => ({
//   type: TOGGLE_ACTION,
//   value: id
// })

// const initialState = { moved: [], toggle: [] };

// function reducer(state, action) {
//   switch (action.type) {
//     case TOGGLE_ACTION:
//       return { ...state, moved: state.moved.includes(action.value) ? state.moved.filter(x => x !== action.value) : [...state.moved, action.value] };
//     default:
//       state;
//   }
// }

const App = ({ values, errors, touched, dirty, savedValues, newUpload }) => {
  const [themeColour] = useThemeContext();
  // const { setFieldValue } = useFormikContext();
  // const [{ moved, toggle }, dispatch] = useReducer(reducer, initialState);

  const [unSelected, setUnselected] = useState([...songList]);
  const [movedSongs, setMovedSongs] = useState([]);
  const [toggledUnSelectedSongs, setToggledUnSelectedSongs] = useState([]);
  const [toggledMoveSongs, setToggledMovedSongs] = useState([]);
  const [searchedSongs, setSearchedSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandSearch, setExpandSearch] = useState(false);
  const [sortSongs, setSortSongs] = useState(SORT.DOWN);

  const preventUpdate = useRef(true);
  const savedValuesUsed = useRef(false);

  useEffect(() => {
    if (preventUpdate.current) {
      preventUpdate.current = false;
    } else {
      if ((!dirty && !savedValues) || newUpload) {
        if (searchTerm.length === 0) {
          setUnselected([...songList]);
          setMovedSongs([]);
          preventUpdate.current = true;
          savedValuesUsed.current = false;
        }
      }

      if (
        savedValues &&
        savedValues.songs &&
        savedValues.songs.length > 0 &&
        !savedValuesUsed.current
      ) {
        const savedSongIds = savedValues.songs.map(song => song.id);
        const filtered = songList.filter(f => !savedSongIds.includes(f.id));
        setMovedSongs([...savedValues.songs]);
        setUnselected(filtered);
        savedValuesUsed.current = true;
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
      setSearchTerm('');
      setSearchedSongs([]);
      setExpandSearch(false);
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
    return orderArrayOfObjects(
      searchTerm.length > 0 ? searchedSongs : unSelected,
      sortSongs
    ).map((song, i) => {
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

  const searchSongs = term => {
    setSearchTerm(term);
    const filtered = unSelected.filter(song => {
      if (
        song.band.toLowerCase().includes(term) ||
        song.title.toLowerCase().includes(term)
      ) {
        return song;
      }
      return null;
    });

    setSearchedSongs(filtered);
  };

  return (
    <Field>
      {({ field, form }) => {
        return (
          <Fragment>
            <h4 className={`ui header ${themeColour}`}>Select Songs</h4>
            <div className="ui grid" style={{ margin: 'auto' }}>
              <div
                className="ui seven wide column segment"
                style={{ marginBottom: '0px' }}
              >
                <Fragment>
                  <div
                    className="ui grid centered"
                    style={{ marginLeft: '0px' }}
                  >
                    <h5 className="ui header six wide column aligned right">
                      Available songs
                    </h5>
                    <SearchBox
                      expandSearch={expandSearch}
                      searchTerm={searchTerm}
                      setExpandSearch={(expand) => setExpandSearch(expand)}
                      searchSongs={term => searchSongs(term)}
                    />
                    <SortButton
                      setDirection={direction =>
                        setSortSongs(direction === SORT.DOWN ? SORT.UP : SORT.DOWN)}
                      direction={sortSongs}
                    />
                  </div>
                </Fragment>
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
                className="ui one wide column center aligned"
                style={{ margin: 'auto' }}
              >
                <button
                  className="ui icon button"
                  onClick={() => moveRight(form)}
                  style={{ marginBottom: '5px' }}
                >
                  <i className={`angle right icon ${themeColour}`}></i>
                </button>
                <button
                  className="ui icon button"
                  onClick={() => moveLeft(form)}
                  style={{ marginBottom: '5px' }}
                >
                  <i className={`angle left icon ${themeColour}`}></i>
                </button>
                <button
                  className="ui icon button"
                  onClick={() => moveAllRight(form)}
                  style={{ marginBottom: '5px' }}
                >
                  <i className="angle double right icon"></i>
                </button>
                <button
                  className="ui icon button"
                  onClick={() => moveAllLeft(form)}
                  style={{ marginBottom: '5px' }}
                >
                  <i className="angle double left icon"></i>
                </button>
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
                  className={`ui icon button ${themeColour}`}
                  disabled={toggledMoveSongs.length < 1}
                  onClick={() => moveUp(form)}
                >
                  <i className="arrow up icon"></i>
                </button>
                <button
                  className={`ui icon button ${themeColour}`}
                  disabled={toggledMoveSongs.length < 1}
                  onClick={() => moveDown(form)}
                >
                  <i className="arrow down icon"></i>
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
