import type { FC } from 'react';
import type { ImageI } from '@/model/image-model';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ImageItemProps {
  image: ImageI;
  handleSelectImage: (image: ImageI) => void;
  onOpenModalView: (image: ImageI) => void;
}

const ImageItem: FC<ImageItemProps> = ({ image, handleSelectImage, onOpenModalView }) => {
  const pathImage = `file:\\${image.path}`

  return (
    <Card className="dark:bg-zinc-800 border border-zinc-200 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg truncate">{image.name}</CardTitle>
        <div className="flex gap-2 pt-2">
          <Button className='text-white' size="sm" onClick={() => onOpenModalView(image)}>
            ver
          </Button>
          <Button className='bg-green-500 hover:bg-green-600 text-white' size="sm" onClick={() => handleSelectImage(image)}>
            Editar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <img src={pathImage} alt={image.name} className="h-full" />
      </CardContent>
    </Card>
  );
};

export default ImageItem;