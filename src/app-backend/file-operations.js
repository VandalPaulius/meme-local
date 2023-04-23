import { ipcMain, dialog } from 'electron';
import * as fs from 'fs';

const settingsFilename = 'settings.json';
const settingsFileDirectory = process.cwd();

const loadSettingsFile = async () => {
  let result = {};

  try {
    const contentsRaw = await fs.readFileSync(
      `${settingsFileDirectory}\\${settingsFilename}`
    );
    const contents = JSON.parse(contentsRaw);

    result.success = true;
    result.payload = contents;
  } catch (err) {
    result.error = true;
    result.message = err.message;
  }

  return result;
};

const saveSettingsFile = async (payload) => {
  console.log('saveSettingsFile INSIDE 1');
  let result = {};
  if (!payload) {
    result.error = true;
    result.message = 'no payload';
    return result;
  }

  try {
    const stringifiedPayload = JSON.stringify(payload);
    await fs.writeFileSync(
      `${settingsFileDirectory}\\${settingsFilename}`,
      stringifiedPayload
    );
  } catch (err) {
    result.error = true;
    result.message = err.message;
  }

  return result;
};

export const FileOperations = () => {
  ipcMain.handle('settings-file', async (event, data) => {
    console.log('data: ', data);
    let actionResult = {};

    if (!data.type) {
      const msg = 'missing settings-file event type';
      console.warn(msg);
      actionResult.error = true;
      actionResult.message = msg;

      return actionResult;
    }

    switch (data.type) {
      case 'load': {
        const result = await loadSettingsFile();

        actionResult = {
          ...actionResult,
          ...result,
        };

        return actionResult;
      }
      case 'save': {
        const result = await saveSettingsFile(data.payload);
        console.log('saveSettingsFile result', result);

        actionResult = {
          ...actionResult,
          ...result,
        };

        return actionResult;
      }
      default: {
        const msg = 'not matched settings-file event type';
        console.warn(msg);
        actionResult.error = true;
        actionResult.message = msg;
        return actionResult;
      }
    }
  });

  ipcMain.handle('source-directory', async (event, data) => {
    console.log('data: ', data);
    let actionResult = {};

    if (!data.type) {
      const msg = 'missing source-directory event type';
      console.warn(msg);
      actionResult.error = true;
      actionResult.message = msg;

      return actionResult;
    }

    switch (data.type) {
      case 'select-directory': {
        // const result = await loadSettingsFile()

        // actionResult = {
        //   ...actionResult,
        //   ...result
        // }

        const result = await dialog.showOpenDialogSync(null, {
          properties: ['openDirectory'],
        });

        actionResult = {
          ...actionResult,
          success: true,
          payload: result,
        };

        console.log('result: ', result);

        return actionResult;
      }
      default: {
        const msg = 'not matched source-directory event type';
        console.warn(msg);
        actionResult.error = true;
        actionResult.message = msg;
        return actionResult;
      }
    }
  });
};
