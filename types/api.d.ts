import type { ImageI } from "@/model/image-model";

declare global {
  interface Window {
    api: {
      selectDirectory: () => Promise<string | null>;
      getImages: (dirPath: string) => Promise<ImageI[]>;
      renameImage: (oldPath: string, newPath: string, type: string) => Promise<string>;
      openInFileExplorer: (imagePath: string) => Promise<boolean>;
      deleteImage: (imagePath: string) => Promise<boolean>;
    };
  }
}
