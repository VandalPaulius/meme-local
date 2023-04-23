import { addError } from './app.actions';

const setTagActivity = (state, { tagKey, isActive }) => {
  state.tags.find((t) => {
    if (t.tagKey === tagKey) {
      t.isActive = isActive;
      return true;
    }
  });
};

const setSpecialTagActivity = (state, { tagKey, isActive }) => {
  state.specialTags.find((t) => {
    if (t.tagKey === tagKey) {
      t.isActive = isActive;
      return true;
    }
  });
};

const setTagActivityUnique = (state, { tagKey }) => {
  state.tags.forEach((t) => {
    t.isActive = t.tagKey === tagKey;
  });

  state.specialTags.forEach((t) => {
    t.isActive = false;
  });
};

const appendLoadedState = (state, data) => {
  Object.entries(data).forEach(([key, entry]) => {
    if (!state[key]) {
      state[key] = entry;
      return;
    }

    if (Array.isArray(state[key]) && Array.isArray(entry)) {
      console.log('2.1');
      state[key] = [...state[key], ...entry];
      return;
    }

    if (typeof state[key] === 'object') {
      state[key] = {
        ...state[key],
        ...entry,
      };
      return;
    }

    addError(`Loaded state key ${key} data was not loaded`);
  });
};

const setSourceDirectories = (state, data) => {
  state.sourceDirectories = data;
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'appendLoadedState': {
      appendLoadedState(state, action.data);
      break;
    }
    case 'setTagActivity': {
      setTagActivity(state, action.data);
      break;
    }
    case 'setSpecialTagActivity': {
      setSpecialTagActivity(state, action.data);
      break;
    }
    case 'setTagActivityUnique': {
      setTagActivityUnique(state, action.data);
      break;
    }
    case 'setSourceDirectories': {
      setSourceDirectories(state, action.data);
    }
  }
};
