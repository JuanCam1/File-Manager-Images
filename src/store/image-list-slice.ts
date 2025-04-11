import type { ImageI } from "@/model/image-model";
import type { StateCreator } from "zustand";

export interface ImageSlice {
  currentPath: string | null;
  images: ImageI[];
  isLoading: boolean;
  refreshing: boolean;

  loadImages: () => Promise<void>;
  handleSelectDirectory: () => Promise<void>;
  handleRefresh: () => Promise<void>;
  handleRenameImage: (oldPath: string, newName: string) => Promise<boolean>;
}

export const createImageSListlice: StateCreator<ImageSlice> = (set, get) => ({
  currentPath: "C:\\Users\\jkl3_\\Pictures",
  images: [],
  isLoading: false,
  refreshing: false,

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
      })

    } catch (error) {
      console.error('Error al cargar imagenes:', error);
      set({
        images: [],
        isLoading: false
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
      console.error('Error al seleccionar directorio:', error);
    }
  },

  handleRefresh: async () => {
    const { currentPath } = get();
    if (currentPath) {
      set({ refreshing: true });
      try {
        get().loadImages();
      } catch (error) {
        console.error('Error al actualizar proyectos:', error);
      } finally {
        setTimeout(() => {
          set({ refreshing: false });
        }, 1000);
      }
    }
  },

  handleRenameImage: async (oldPath: string, newName: string) => {
    if (!newName || newName.trim() === '') {
      return false;
    }

    try {
      const success = await window.api.renameImage(oldPath, newName);

      if (success) {
        get().loadImages();
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error al renombrar el proyecto:', error);
      return false;
    }
  },
});


