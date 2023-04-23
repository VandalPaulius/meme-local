import { toast } from 'react-toastify';

export const BASE_TAG_KEYS = ['happy', 'sad', '+1', '-1', 'evil', 'horny'];
export const SPECIAL_TAG_KEYS = ['all', 'stray'];

export const addError = (error) => {
  toast(error, { type: toast.TYPE.ERROR });
};

export const addMessage = (msg) => {
  toast(msg, { type: toast.TYPE.INFO });
};

export const loadSettingsFile = async () => {
  const result = await window.electronAPI.ipcRenderer.invoke('settings-file', {
    type: 'load',
  });

  if (!result.payload) {
    addError('Settings file is empty');
    return;
  }

  console.log('loadSettingsFile result', result);

  return result.payload;
};

const initTags = (tags) => tags.map((t) => ({ tagKey: t, isActive: false }));

const mergeTags = (tags, newTags) => {
  const allTags = [...tags];

  newTags.forEach((nt) => {
    const exists = allTags.find((t) => t.tagKey === nt.tagKey);

    if (!exists) {
      allTags.push(nt);
    }
  });

  return allTags;
};

const initDefaultVals = (state) => {
  return {
    tags: !state.tags.length ? initTags(BASE_TAG_KEYS) : state.tags,
    specialTags: !state.specialTags.length
      ? initTags(SPECIAL_TAG_KEYS)
      : state.specialTags,
  };
};

export const loadSettings = async (state, dispatch, firstLoad) => {
  if (firstLoad) {
    state = {
      ...state,
      ...initDefaultVals(state),
    };
  }

  await dispatch(state);
  const settings = await loadSettingsFile();

  dispatch({
    type: 'appendLoadedState',
    data: {
      tags: mergeTags(state.tags, settings.tags),
      specialTags: mergeTags(state.specialTags, settings.specialTags),
      sourceDirectories: settings.sourceDirectories || [],
    },
  });
};

export const saveSettingsFile = async (state) => {
  const data = {
    tags: state.tags,
    specialTags: state.specialTags,
    sourceDirectories: state.sourceDirectories,
  };
  console.log('saveSettingsFile call');

  const result = await window.electronAPI.ipcRenderer.invoke('settings-file', {
    type: 'save',
    payload: data,
  });

  console.log('saveSettingsFile result: ', result);
};

export const selectSourceDirectory = async (state, dispatch) => {
  const result = await window.electronAPI.ipcRenderer.invoke(
    'source-directory',
    {
      type: 'select-directory',
    }
  );

  const dirs = [...state.sourceDirectories];

  console.log('result: ', result);

  result.payload.forEach((newDir) => {
    if (!newDir) {
      return;
    }

    if (!state.sourceDirectories.find((dir) => dir === newDir)) {
      dirs.push(newDir);
    }
  });

  dispatch({ type: 'setSourceDirectories', data: dirs });
};
