import type { FC } from "react";
import type { ImageI } from "@/model/image-model";
import ImageItem from "./image-item";

interface Props {
  images: ImageI[];
  handleSelectImage: (image: ImageI) => void;
  onOpenModalView: () => void;
  onOpenModalEdit: () => void;
  onOpenDeleteImage: () => void;
}
const ImageCard: FC<Props> = ({ images, handleSelectImage, onOpenModalView, onOpenModalEdit, onOpenDeleteImage }) => {

  return (
    <>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 p-4">
        {images.map((image) => (
          <ImageItem
            key={image.path}
            image={image}
            handleSelectImage={handleSelectImage}
            onOpenModalView={onOpenModalView}
            onOpenModalEdit={onOpenModalEdit}
            onOpenDeleteImage={onOpenDeleteImage}
          />
        ))}
      </div>


    </>
  )
}
export default ImageCard