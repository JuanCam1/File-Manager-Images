import { type FormEvent, useState, type FC } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import type { ImageI } from "@/model/image-model";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onChangeOpen: (open: boolean) => void;
  handleRenameImage: (
    pathImage: string,
    newName: string,
    type: string,
  ) => Promise<string>;
  imageSelected: ImageI;
}
const ModalEdit: FC<Props> = ({
  open,
  onChangeOpen,
  imageSelected,
  handleRenameImage,
}) => {
  const [imageName, setImageName] = useState(imageSelected.name.split(".")[0]);

  const handleRename = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const value = await handleRenameImage(
      imageSelected.path,
      imageName,
      imageSelected.type,
    );

    if (value === "El nombre del archivo no puede estar vacío") {
      toast.warning("El nombre del archivo no puede estar vacío");
      return;
    }

    if (value === "El archivo ya existe") {
      toast.warning("El archivo ya existe");
      return;
    }

    if (value === "Error al renombrar el archivo") {
      toast.error("Ocurrió un error al renombrar la imagen");
      return;
    }

    toast.success("La imagen se ha renombrado correctamente.");
    onChangeOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={onChangeOpen}>
      <DialogContent className="dark:bg-zinc-900">
        <DialogHeader>
          <DialogTitle className="dark:text-white">
            Editar el nombre de la imagen
          </DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-2" onSubmit={handleRename}>
          <Input
            autoFocus
            placeholder="Nombre de la imagen"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
            className="dark:bg-zinc-950 w-full dark:text-white"
          />
          <div className="flex justify-center mt-4">
            <Button type="submit" className="sm:w-full md:w-[20%] text-white">
              Actualizar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default ModalEdit;
