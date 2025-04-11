import { app, BrowserWindow, dialog, ipcMain, Menu } from "electron";
import { shell } from "electron";
import started from "electron-squirrel-startup";
import fs from "node:fs";
import path from "node:path";
import type { ImageI } from "./model/image-model";
import { template } from "./lib/libs";

if (started) {
  app.quit();
}

let mainWindow: BrowserWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({
    title: "File Manager Images",
    minHeight: 600,
    minWidth: 500,
    frame: true,
    show: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false,
    },
  });

  mainWindow.maximize();
  mainWindow.removeMenu();

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);


  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // mainWindow.webContents.openDevTools({
  //   mode: "detach",
  // });
};


app.on("ready", createWindow);


app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('select-directory', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });

  if (!result.canceled) {
    return result.filePaths[0];
  }
  return null;
});

function isImage(filePath: string) {
  const imageExtensions = ['.webp', '.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.tiff', '.ico'];
  const ext = path.extname(filePath).toLowerCase();
  return imageExtensions.includes(ext);
}


ipcMain.handle('get-images', async (_: unknown, dirPath: string) => {
  try {
    const images: ImageI[] = [];
    const processDirectory = (directory: string) => {
      const entries = fs.readdirSync(directory, { withFileTypes: true });

      for (const entry of entries) {
        const entryPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
          processDirectory(entryPath);
        } else if (isImage(entryPath)) {
          images.push({
            name: entry.name,
            path: entryPath,
            type: path.extname(entry.name).substring(1).toLowerCase()
          });
        }
      }
    };

    processDirectory(dirPath);

    console.log("images", images);
    return images;
  } catch (error) {
    console.error('Error al leer las imágenes:', error);
    return [];
  }
});

ipcMain.handle('rename-image', async (_, pathProject: string, newName: string): Promise<boolean> => {
  try {

    console.log(pathProject);
    console.log(newName);
    const parentDir = path.dirname(pathProject);
    const newPath = path.join(parentDir, newName);
    console.log(newPath);

    if (fs.existsSync(newPath)) {
      console.error(`Ya existe una imagen llamado "${newName}".`);
      return false;
    }

    return new Promise((resolve) => {
      fs.rename(pathProject, newPath, (error) => {
        if (error) {
          console.error(`Error al renombrar el proyecto: ${error.message}`);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  } catch (error) {
    console.error(`Error al renombrar el proyecto: ${error}`);
    return false;
  }
});