import React from 'react';
import PropTypes from 'prop-types';
import { Tag, SettingsButton } from './components';

export function Sidebar({ tags, specialTags, onTagClick, onSpecialTagClick }) {
  return (
    <div className="tw-bg-purple-50 tw-p-5 tw-drop-shadow-lg tw-flex tw-flex-col tw-justify-between tw-overflow-auto tw-z-10">
      <div className="tw-overflow-auto">
        {tags.map((t) => (
          <Tag key={t.tagKey} tag={t} onTagClick={onTagClick} />
        ))}
      </div>
      <div>
        <br />
        {specialTags.map((t) => (
          <Tag
            key={t.tagKey}
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
