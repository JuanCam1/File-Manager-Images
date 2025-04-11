import { type FormEvent, useState, type FC } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import type { ImageI } from "@/model/image-model";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onChangeOpen: (open: boolean) => void;
  handleRenameImage: (projectPath: string, newName: string) => Promise<boolean>;
  imageSelected: ImageI;
}
const ModalEdit: FC<Props> = ({ open, onChangeOpen, imageSelected, handleRenameImage }) => {
  console.log(imageSelected.name.split(".")[0]);
  const [projectName, setProjectName] = useState(imageSelected.name.split(".")[0]);

  const handleRename = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const value = await handleRenameImage(imageSelected.path, projectName);

    if (!value) {
      toast.error("Ocurrió un error al renombrar la imagen.");
      return;
    }

    toast.success("El proyecto se ha renombrado correctamente.");
    onChangeOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={onChangeOpen}>
      <DialogContent className="dark:bg-zinc-900">
        <DialogHeader>
          <DialogTitle className="dark:text-white">Editar el nombre del proyecto</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-2" onSubmit={handleRename}>
          <Input
            autoFocus
            placeholder="Nombre del proyecto"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="dark:bg-zinc-950 w-full dark:text-white"
          />
          <div className="flex justify-center">
            <Button type="submit" className="md:w-full lg:w-[20%] text-white">
              Actualizar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default ModalEdit