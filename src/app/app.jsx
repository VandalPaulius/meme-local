import React, { useEffect, useState } from "react";
import { Sidebar, TopBar } from "./components";

export function App() {
  const baseTagKeys = ["happy", "sad", "+1", "-1", "evil", "horny"];

  const specialTagKeys = ["all", "stray"];

  const [tags, setTag] = useState([]);
  const [specialTags, setSpecialTag] = useState([]);
  useEffect(() => {
    setTag([...tags, ...initTags(baseTagKeys)]);
    setSpecialTag([...specialTags, ...initTags(specialTagKeys)]);
  }, []);

  const initTags = (tags) => tags.map((t) => ({ tagKey: t, isActive: false }));

  const setTagActivity = ({ tagKey, isActive }) => {
    setTag(() =>
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
    setSpecialTag(() =>
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
  // const topBarTags = getTopBarTags()

  // const [topBarTags, setTopBarTags] = useState(getTopBarTags)

  const setTagActivityUnique = ({ tagKey }) => {
    setTag(() =>
      tags.map((t) => ({
        ...t,
        isActive: t.tagKey === tagKey,
      }))
    );

    setSpecialTag(() =>
      specialTags.map((t) => ({
        ...t,
        isActive: false,
      }))
    );

    // setTopBarTags(getTopBarTags())
  };

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
      </div>
    </div>
  );
}
