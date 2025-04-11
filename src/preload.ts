import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  selectDirectory: () => ipcRenderer.invoke("select-directory"),
  getImages: (dirPath: string) => ipcRenderer.invoke("get-images", dirPath),
  renameImage: (oldPath: string, newPath: string) => ipcRenderer.invoke("rename-image", oldPath, newPath)
});
