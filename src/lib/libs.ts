import { shell } from "electron";

export const template: Electron.MenuItemConstructorOptions[] = [
  {
    label: "File",
    submenu: [{ role: "quit" }],
  },
  {
    label: "View",
    submenu: [
      { role: "toggleDevTools" },
      { type: "separator" },
      { role: "reload" },
      { role: "forceReload" },
      { role: "resetZoom" },
      { role: "zoomIn" },
      { role: "zoomOut" },
      { type: "separator" },
      { role: "togglefullscreen" },
    ],
  },
  {
    label: "Help",
    submenu: [
      {
        label: "Learn More",
        click: async () => {
          await shell.openExternal("https://www.youtube.com");
        },
      },
    ],
  },
];
