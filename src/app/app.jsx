import React, { useEffect } from 'react';
import { Sidebar, TopBar } from './components';
import { useImmerReducer } from 'use-immer';
import { ToastContainer } from 'react-toastify';
import { reducer } from './app.reducer.js';
import {
  loadSettings,
  selectSourceDirectory,
  BASE_TAG_KEYS,
} from './app.actions';

const initialState = {
  tags: [],
  specialTags: [],
  sourceDirectories: [],
};

export function App() {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  useEffect(() => {
    // these should be loaded from settings
    // if settings are empty these should be preloaded in
    // default settings state load location
    // if (!tags.length) {
    //   setTags([...tags, ...initTags(baseTagKeys)]);
    // }
    // if (!specialTags.length) {
    //   setSpecialTags([...specialTags, ...initTags(specialTagKeys)]);
    // }
  }, []);

  // DEV:
  // merge initial predefined tags with new loaded tags in actions

  useEffect(() => {
    (async () => {
      await loadSettings(state, dispatch, true);
    })();
  }, []);

  const getTopBarTags = () =>
    state.tags.filter((t) => BASE_TAG_KEYS.find((bt) => t.tagKey === bt));

  console.log('sourceDirectories: ', state.sourceDirectories);

  return (
    <div className="tw-flex tw-h-screen tw-overflow-hidden">
      <Sidebar
        tags={state.tags}
        specialTags={state.specialTags}
        onTagClick={(data) => dispatch({ type: 'setTagActivity', data })}
        onSpecialTagClick={(data) =>
          dispatch({ type: 'setSpecialTagActivity', data })
        }
      />
      <div className="tw-grow">
        <TopBar
          tags={getTopBarTags()}
          onTagClick={(data) =>
            dispatch({ type: 'setTagActivityUnique', data })
          }
        />

        {/* <div>
          <button onClick={() => saveSettingsFile(state)}>
            Save settings file
          </button>
        </div> */}
        {/* <div>
          <button onClick={loadSettingsFile}>Load settings file</button>
        </div> */}

        {/* <input webkitdirectory="" type="file" onChange={onSelectSourceDirectory}/> */}

        <br />

        <div className="tw-border-1">
          <select multiple>
            {state.sourceDirectories.map((dir) => (
              <option key={dir}>{dir}</option>
            ))}
          </select>
        </div>

        <button onClick={() => selectSourceDirectory(state, dispatch)}>
          Add folders
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
