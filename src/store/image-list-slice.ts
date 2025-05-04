import type { ImageI } from "@/model/image-model";
import type { StateCreator } from "zustand";

export interface ImageSlice {
  currentPath: string | null;
  images: ImageI[];
  isLoading: boolean;
  refreshing: boolean;

  loadImages: () => Promise<void>;
  handleSelectDirectory: () => Promise<void>;
  initPlatformPath: () => Promise<void>;
  handleRefresh: () => Promise<void>;
  handleRenameImage: (
    oldPath: string,
    newName: string,
    type: string,
  ) => Promise<string>;
  openFileExplorer: (imagePath: string) => Promise<boolean>;
  deleteImage: (imagePath: string) => Promise<boolean>;
}

export const createImageSListlice: StateCreator<ImageSlice> = (set, get) => ({
  currentPath: null,
  images: [],
  isLoading: false,
  refreshing: false,

  initPlatformPath: async () => {
    try {
      const platformPath = await window.api.platform();
      console.log(platformPath);
      set({ currentPath: platformPath });
    } catch (error) {
      console.error("Error al obtener la plataforma:", error);
    }
  },

  loadImages: async () => {
    const currentPath = get().currentPath;

    if (!currentPath) {
      return;
    }

    set({ isLoading: true });

    try {
      const imagesList = await window.api.getImages(currentPath);
      set({
        images: imagesList,
        isLoading: false,
      });
    } catch (_error) {
      set({
        images: [],
        isLoading: false,
      });
    }
  },

  handleSelectDirectory: async () => {
    try {
      const selectedPath = await window.api.selectDirectory();
      if (selectedPath) {
        set({ currentPath: selectedPath });
        get().loadImages();
      }
    } catch (error) {
      console.error("Error al seleccionar directorio:", error);
    }
  },

  handleRefresh: async () => {
    const { currentPath } = get();
    if (currentPath) {
      set({ refreshing: true });
      try {
        get().loadImages();
      } catch (error) {
        console.error("Error al actualizar las imagenes:", error);
      } finally {
        setTimeout(() => {
          set({ refreshing: false });
        }, 1000);
      }
    }
  },

  handleRenameImage: async (oldPath: string, newName: string, type: string) => {
    if (!newName || newName.trim() === "" || type.trim() === "") {
      return "El nombre del archivo no puede estar vacío";
    }

    try {
      const success = await window.api.renameImage(oldPath, newName, type);

      if (success === "El archivo se ha renombrado correctamente") {
        get().loadImages();
        return "El archivo se ha renombrado correctamente";
      }

      if (success === "El archivo ya existe") {
        return "El archivo ya existe";
      }

      return "Error al renombrar el archivo";
    } catch (_error) {
      return "Error al renombrar el archivo";
    }
  },

  openFileExplorer: async (imagePath: string) => {
    if (imagePath.trim() === "") {
      return false;
    }

    try {
      const success = await window.api.openInFileExplorer(imagePath);

      if (success) {
        return true;
      }

      return false;
    } catch (_error) {
      return false;
    }
  },

  deleteImage: async (imagePath: string) => {
    if (imagePath.trim() === "") {
      return false;
    }

    try {
      const success = await window.api.deleteImage(imagePath);

      if (success) {
        get().loadImages();
        return true;
      }

      return false;
    } catch (_error) {
      return false;
    }
  },
});
