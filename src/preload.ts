import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  selectDirectory: () => ipcRenderer.invoke("select-directory"),
  getImages: (dirPath: string) => ipcRenderer.invoke("get-images", dirPath),
  renameImage: (oldPath: string, newPath: string, type: string) => ipcRenderer.invoke("rename-image", oldPath, newPath, type),
  openInFileExplorer: (imagePath: string) => ipcRenderer.invoke("open-in-file-explorer", imagePath),
  deleteImage: (imagePath: string) => ipcRenderer.invoke("delete-image", imagePath),
});
