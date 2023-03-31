import React, { useEffect, useState } from "react";
import { Sidebar, TopBar } from "./components";
// import { ipcRenderer } from "electron";

export function App() {
  const baseTagKeys = ["happy", "sad", "+1", "-1", "evil", "horny"];

  // const specialTagKeys = ["all", "stray"];

  const [tags, setTags] = useState([]);
  const [specialTags, setSpecialTags] = useState([]);
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

  // const initTags = (tags) => tags.map((t) => ({ tagKey: t, isActive: false }));

  const setTagActivity = ({ tagKey, isActive }) => {
    setTags(() =>
      tags.map((t) => {
        if (t.tagKey === tagKey) {
          return {
            ...t,
            isActive,
          };
        }

        return t;
      })
    );
  };

  const setSpecialTagActivity = ({ tagKey, isActive }) => {
    setSpecialTags(() =>
      specialTags.map((t) => {
        if (t.tagKey === tagKey) {
          return {
            ...t,
            isActive,
          };
        }

        return t;
      })
    );
  };

  const getTopBarTags = () =>
    tags.filter((t) => baseTagKeys.find((bt) => t.tagKey === bt));

  const setTagActivityUnique = ({ tagKey }) => {
    setTags(() =>
      tags.map((t) => ({
        ...t,
        isActive: t.tagKey === tagKey,
      }))
    );

    setSpecialTags(() =>
      specialTags.map((t) => ({
        ...t,
        isActive: false,
      }))
    );
  };

  const saveSettingsFile = async () => {
    // const data = { setting1: 'la', setting2: 'lala' }
    const data = { tags, specialTags, sourceDirectories };
    console.log("saveSettingsFile call");

    const result = await window.electronAPI.ipcRenderer.invoke(
      "settings-file",
      {
        type: "save",
        payload: data,
      }
    );

    console.log("saveSettingsFile result: ", result);
  };

  const loadSettingsFile = async () => {
    console.log("loadSettingsFile call");

    const result = await window.electronAPI.ipcRenderer.invoke(
      "settings-file",
      {
        type: "load",
      }
    );

    // if (result.tags) {
    //   set
    // }

    if (result?.payload?.tags?.length) {
      setTags(result.payload.tags);
    }
    if (result?.payload?.specialTags?.length) {
      setSpecialTags(result.payload.specialTags);
    }
    if (result?.payload?.sourceDirectories?.length) {
      setSourceDirectories(result.payload.sourceDirectories);
    }

    // const data = { tags, specialTags, sourceDirectories }

    console.log("loadSettingsFile result", result);
  };

  useEffect(() => {
    (async () => {
      await loadSettingsFile();
    })();
  }, []);
  const [sourceDirectories, setSourceDirectories] = useState([]);

  const onSelectSourceDirectory = async () => {
    const result = await window.electronAPI.ipcRenderer.invoke(
      "source-directory",
      {
        type: "select-directory",
      }
    );

    const dirs = [...sourceDirectories];

    console.log("result: ", result);

    result.payload.forEach((newDir) => {
      if (!newDir) {
        return;
      }

      if (!sourceDirectories.find((dir) => dir === newDir)) {
        dirs.push(newDir);
      }
    });

    setSourceDirectories(dirs);
  };

  console.log("sourceDirectories: ", sourceDirectories);

  return (
    <div className="tw-flex tw-h-screen tw-overflow-hidden">
      <Sidebar
        tags={tags}
        specialTags={specialTags}
        onTagClick={setTagActivity}
        onSpecialTagClick={setSpecialTagActivity}
      />
      <div className="tw-grow">
        <TopBar tags={getTopBarTags()} onTagClick={setTagActivityUnique} />

        <div>
          <button onClick={saveSettingsFile}>Save settings file</button>
        </div>
        <div>
          <button onClick={loadSettingsFile}>Load settings file</button>
        </div>

        {/* <input webkitdirectory="" type="file" onChange={onSelectSourceDirectory}/> */}

        <br />

        <button onClick={onSelectSourceDirectory}>Add folders</button>
        <div className="tw-border-1">
          <select multiple>
            {sourceDirectories.map((dir) => (
              <option key={dir}>{dir}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
