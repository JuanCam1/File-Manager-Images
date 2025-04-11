import { create } from "zustand";
import { createImageSListlice, type ImageSlice } from "./image-list-slice";
import { createImageSlice, type ImageItemSlice } from "./current-slice";

type ImageState = ImageSlice & ImageItemSlice
export const useImageStore = create<ImageState>()(
  (...a) => ({
    ...createImageSListlice(...a),
    ...createImageSlice(...a),
  })
)