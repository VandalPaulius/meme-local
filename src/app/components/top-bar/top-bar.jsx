import React from "react";
import PropTypes from "prop-types";
import { TopBarTag } from "./components";

export const TopBar = ({ tags, onTagClick }) => {
  return (
    <div className="tw-flex tw-bg-purple-200 tw-drop-shadow-md">
      {tags.map((t) => (
        <TopBarTag
          className="tw-m-2"
          key={t.tagKey}
          tag={t}
          onTagClick={onTagClick}
        />
      ))}
    </div>
  );
};

TopBar.propTypes = {
  tags: PropTypes.array.isRequired,
  onTagClick: PropTypes.func.isRequired,
};
