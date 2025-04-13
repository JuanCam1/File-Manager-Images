import type { FC } from 'react';
import { Trash2 } from 'lucide-react';

import type { ImageI } from '@/model/image-model';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ImageItemProps {
  image: ImageI;
  handleSelectImage: (image: ImageI) => void;
  onOpenModalView: () => void;
  onOpenModalEdit: () => void;
  onOpenDeleteImage: () => void;
}

const ImageItem: FC<ImageItemProps> = ({ image, handleSelectImage, onOpenModalView, onOpenModalEdit, onOpenDeleteImage }) => {
  const pathImage = `file:\\${image.path}`;

  return (
    <Card className="dark:bg-zinc-800 border border-zinc-200 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg truncate">{image.name}</CardTitle>
        <div className="flex justify-center items-center gap-2 pt-2">
          <Button variant="destructive" className='text-white' size="sm" onClick={() => {
            handleSelectImage(image);
            onOpenDeleteImage();
          }}>
            <Trash2 />
          </Button>
          <Button className='text-white' size="sm" onClick={() => {
            handleSelectImage(image);
            onOpenModalView();
          }}>
            ver
          </Button>
          <Button className='bg-green-500 hover:bg-green-600 text-white' size="sm" onClick={() => {
            handleSelectImage(image);
            onOpenModalEdit();
          }}>
            Editar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex justify-center items-center pb-2 h-80 overflow-hidden">
        <img src={pathImage} alt={image.name} className="h-full object-contain" />
      </CardContent>
    </Card>
  );
};

export default ImageItem;