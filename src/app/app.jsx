import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export function App() {
  const baseTagsInit = ["happy", "sad", "+1", "-1", "evil", "horny"];

  const specialTagsInit = ["all", "stray"];

  const [tags, setTag] = useState([]);
  const [specialTags, setSpecialTag] = useState([]);
  useEffect(() => {
    setTag([...tags, ...initTags(baseTagsInit)]);
    setSpecialTag([...specialTags, ...initTags(specialTagsInit)]);
  }, []);

  const initTags = (tags) =>
    tags.map((t) => ({ tagValue: t, isActive: false }));

  console.log(tags);

  const setTagActivity = ({ tagValue, isActive }) => {
    setTag(() =>
      tags.map((t) => {
        if (t.tagValue === tagValue) {
          return {
            ...t,
            isActive,
          };
        }

        return t;
      })
    );
  };

  const setSpecialTagActivity = ({ tagValue, isActive }) => {
    setSpecialTag(() =>
      specialTags.map((t) => {
        if (t.tagValue === tagValue) {
          return {
            ...t,
            isActive,
          };
        }

        return t;
      })
    );
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
        {/* <TopBar tags={baseTags} onTagClick={setTagActivity}/> */}
      </div>
    </div>
  );
}

// const TopBar = ({ tags }) => {
//   return (
//     <div>
//       TopBar
//     </div>
//   )
// }

const Tag = ({ tag, onTagClick, prefix = "#" }) => {
  const onClickHandler = () =>
    onTagClick({
      ...tag,
      isActive: !tag.isActive,
    });

  return (
    <div
      className={`
        hover:tw-cursor-pointer
        hover:tw-bg-purple-500
        hover:tw-text-white
        ${tag.isActive && "tw-bg-purple-200"}
        tw-px-1
      `}
      onClick={onClickHandler}
    >
      {prefix}
      {tag.tagValue}
    </div>
  );
};

Tag.propTypes = {
  tag: PropTypes.object.isRequired,
  onTagClick: PropTypes.func.isRequired,
  prefix: PropTypes.string,
};

const SettingsButton = () => {
  const onClickSettings = () => {
    console.log("settings clicked");
  };

  return (
    <button
      onClick={onClickSettings}
      className={`
    hover:tw-cursor-pointer
    hover:tw-bg-purple-500
    hover:tw-text-white
    tw-p-1
  `}
    >
      Settings
    </button>
  );
};

function Sidebar({ tags, specialTags, onTagClick, onSpecialTagClick }) {
  return (
    <div className="tw-bg-purple-50 tw-p-5 tw-shadow-md tw-flex tw-flex-col tw-justify-between tw-overflow-auto">
      <div className="tw-overflow-auto">
        {tags.map((t) => (
          <Tag key={t.tagValue} tag={t} onTagClick={onTagClick} />
        ))}
      </div>
      <div>
        <br />
        {specialTags.map((t) => (
          <Tag
            key={t.tagValue}
            prefix="~"
            tag={t}
            onTagClick={onSpecialTagClick}
          />
        ))}
        <br />
        <SettingsButton />
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  tags: PropTypes.array.isRequired,
  specialTags: PropTypes.array.isRequired,
  onSpecialTagClick: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired,
};
