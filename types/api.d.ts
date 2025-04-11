import type { ImageI } from "@/model/image-model";

declare global {
  interface Window {
    api: {
      selectDirectory: () => Promise<string | null>;
      getImages: (dirPath: string) => Promise<ImageI[]>;
      renameImage: (oldPath: string, newPath: string) => Promise<boolean>;
    };
  }
}
