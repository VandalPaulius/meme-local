import React from "react";
import PropTypes from "prop-types";

export const Tag = ({ tag, onTagClick, prefix = "#" }) => {
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
      {tag.tagKey}
    </div>
  );
};

Tag.propTypes = {
  tag: PropTypes.object.isRequired,
  onTagClick: PropTypes.func.isRequired,
  prefix: PropTypes.string,
};
