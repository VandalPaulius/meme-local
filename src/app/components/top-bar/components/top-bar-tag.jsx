import React from "react";
import PropTypes from "prop-types";

export const TopBarTag = ({ tag, onTagClick, className }) => {
  const onClickHandler = () => onTagClick({ tagKey: tag.tagKey });

  return (
    <div
      className={`
        ${className}
        hover:tw-cursor-pointer
        hover:tw-bg-purple-500
        hover:tw-text-white
        ${tag.isActive && "tw-bg-purple-400"}
        tw-px-1
      `}
      onClick={onClickHandler}
    >
      {tag.tagKey}
    </div>
  );
};

TopBarTag.propTypes = {
  tag: PropTypes.object.isRequired,
  onTagClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};
