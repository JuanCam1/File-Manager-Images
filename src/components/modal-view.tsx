import type { FC } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import type { ImageI } from "@/model/image-model";

interface Props {
  open: boolean;
  onChangeOpen: (open: boolean) => void;
  imageSelected: ImageI;
}
const ModalView: FC<Props> = ({ open, onChangeOpen, imageSelected }) => {
  const pathImage = `file://${imageSelected.path}`;
  return (
    <Dialog open={open} onOpenChange={onChangeOpen}>
      <DialogContent className="dark:bg-zinc-900">
        <DialogHeader>
          <DialogTitle className="dark:text-white">
            {imageSelected.name}
          </DialogTitle>
        </DialogHeader>
        <div className="pb-2">
          <img src={pathImage} alt={imageSelected.name} className="h-full" />
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ModalView;
