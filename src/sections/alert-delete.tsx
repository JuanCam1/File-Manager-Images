import type { FC } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogAction
} from "@/components/ui/alert-dialog"
import type { ImageI } from "@/model/image-model";
import { useImageStore } from "@/store";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onChangeOpen: (open: boolean) => void;
  image: ImageI | null
}
const AlertDialogModal: FC<Props> = ({ open, onChangeOpen, image }) => {
  const deleteImage = useImageStore(state => state.deleteImage);

  if (!image) {
    return null;
  }

  const handleDelete = async () => {
    const success = await deleteImage(image.path);

    if (success) {
      toast.success("La imagen se ha eliminado correctamente");
      onChangeOpen(false);
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={onChangeOpen}>
      <AlertDialogContent className="dark:bg-zinc-900">
        <AlertDialogHeader>
          <AlertDialogTitle className="dark:text-white">Eliminar Imagen?</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro que deseas eliminar esta imagen?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:text-white">Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="dark:bg-red-500 dark:hover:bg-red-600 text-white">Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default AlertDialogModal