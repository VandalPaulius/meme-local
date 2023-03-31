const { app, BrowserWindow, screen } = require("electron");
// eslint-disable-next-line no-unused-vars
const path = require("path");
require("dotenv").config();

import { FileOperations } from "./app-backend";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  const displays = screen.getAllDisplays();
  const externalDisplay = displays.find((display) => {
    return (
      display.bounds.x !== 0 || (display.bounds.y !== 0 && !display.internal)
    );
  });

  const browserWindowSetup = {
    webPreferences: {
      // eslint-disable-next-line no-undef
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  };

  if (process.env.RELOAD_TO_EXTERNAL_DISPLAY && externalDisplay) {
    browserWindowSetup.x = externalDisplay.bounds.x + 50;
    browserWindowSetup.y = externalDisplay.bounds.y + 50;
  }

  // Create the browser window.
  const mainWindow = new BrowserWindow(browserWindowSetup);
  mainWindow.maximize();
  // eslint-disable-next-line no-undef
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();
};

app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

FileOperations();
