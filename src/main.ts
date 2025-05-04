import { app, BrowserWindow, dialog, ipcMain, Menu } from "electron";
import { shell } from "electron";
import started from "electron-squirrel-startup";
import fs from "node:fs";
import path from "node:path";
import type { ImageI } from "./model/image-model";
import { template } from "./lib/libs";
import { exec } from "node:child_process";
import { platform } from "node:process";

if (started) {
  app.quit();
}

let mainWindow: BrowserWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    icon: "../images/logo.png",
    title: "ImageDeck",
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

  // const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(null);

  // mainWindow.webContents.setWindowOpenHandler((details) => {
  //   shell.openExternal(details.url);
  //   return { action: "deny" };
  // });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
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

ipcMain.handle("select-directory", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"],
  });

  if (!result.canceled) {
    return result.filePaths[0];
  }
  return null;
});

function isImage(filePath: string) {
  const imageExtensions = [
    ".webp",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".bmp",
    ".svg",
    ".tiff",
    ".ico",
  ];
  const ext = path.extname(filePath).toLowerCase();
  return imageExtensions.includes(ext);
}

ipcMain.handle("get-images", async (_: unknown, dirPath: string) => {
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
            type: path.extname(entry.name).substring(1).toLowerCase(),
          });
        }
      }
    };

    processDirectory(dirPath);

    return images;
  } catch (_error) {
    return [];
  }
});

ipcMain.handle(
  "rename-image",
  async (
    _,
    pathImage: string,
    newName: string,
    type: string,
  ): Promise<string> => {
    try {
      const parentDir = path.dirname(pathImage);
      const newPath = path.join(parentDir, `${newName}.${type}`);

      if (fs.existsSync(newPath)) {
        return "El archivo ya existe";
      }

      return new Promise((resolve) => {
        fs.rename(pathImage, newPath, (error) => {
          if (error) {
            resolve("Error al renombrar el archivo");
          } else {
            resolve("El archivo se ha renombrado correctamente");
          }
        });
      });
    } catch (_error) {
      return "Error al renombrar el archivo";
    }
  },
);

ipcMain.handle(
  "open-in-file-explorer",
  async (_: unknown, imagePath: string) => {
    try {
      let command: string;

      switch (process.platform) {
        case "win32":
          command = `explorer "${imagePath}"`;
          break;
        case "darwin":
          command = `open "${imagePath}"`;
          break;
        case "linux":
          command = `xdg-open "${imagePath}"`;
          break;
        default:
          return false;
      }

      exec(command, (error) => {
        if (error) {
          console.error(`Error al abrir el explorador de archivos: ${error}`);
          return false;
        }
      });

      return true;
    } catch (error) {
      console.error("Error al abrir el explorador de archivos:", error);
      return false;
    }
  },
);

ipcMain.handle("delete-image", async (_: unknown, imagePath: string) => {
  try {
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
    return false;
  }
});

ipcMain.handle("platform", async () => {
  const pathWind = "C:\\Users\\jkl3_\\Pictures";
  const pathLinux = "/home/juanc/Imágenes";
  try {
    const type = platform === "win32" ? pathWind : pathLinux;
    return type;
  } catch (error) {
    console.log("Error", error);
    return pathLinux;
  }
});
