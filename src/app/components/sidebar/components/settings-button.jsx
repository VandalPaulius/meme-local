import React from "react";

export const SettingsButton = () => {
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
