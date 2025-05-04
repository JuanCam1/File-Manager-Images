import { useEffect, useState, type FC } from "react";

import { useImageStore } from "@/store";
import { Input } from "@/components/ui/input";
import SkeletonList from "@/components/skeleton-list";
import ModalEdit from "@/components/modal-edit";

import ImageCard from "./image-card";
import type { ImageI } from "@/model/image-model";
import ModalView from "@/components/modal-view";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AlertDialogModal from "./alert-delete";
import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";

interface ImageListProps {
  loading: boolean;
}
const ImageList: FC<ImageListProps> = ({ loading }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenViewModal, setIsOpenViewModal] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [imageSelected, setImageSelected] = useState<ImageI | null>(null);
  const [value, setValue] = useState("all");
  const images = useImageStore((state) => state.images);
  const searchTerm = useImageStore((state) => state.searchTerm);
  const setSearchTerm = useImageStore((state) => state.setSearchTerm);
  const setDebouncedSearchTerm = useImageStore(
    (state) => state.setDebouncedSearchTerm,
  );
  const debouncedSearchTerm = useImageStore(
    (state) => state.debouncedSearchTerm,
  );
  const handleRenameImage = useImageStore((state) => state.handleRenameImage);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredImages = images.filter((img) =>
    img.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  );

  if (loading) {
    return <SkeletonList />;
  }

  const onOpenModalEdit = () => {
    setIsOpenModal(true);
  };

  const handleSelectImage = (image: ImageI) => {
    setImageSelected(image);
  };

  const onOpenModalView = () => {
    setIsOpenViewModal(true);
  };

  const onOpenDeleteImage = () => {
    return setIsOpenAlert(true);
  };

  const onClearSearch = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
  };
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center gap-4 my-4 ml-2">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Bucar imagen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="dark:bg-zinc-950 w-64 dark:text-white"
          />
          <Button onClick={onClearSearch}>
            <Eraser color="white" />
          </Button>
        </div>
        <Tabs defaultValue={value} onValueChange={setValue}>
          <TabsList className="grid grid-cols-4 dark:bg-zinc-800 w-full">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="jpg">JPG</TabsTrigger>
            <TabsTrigger value="png">PNG</TabsTrigger>
            <TabsTrigger value="webp">WEBP</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Tabs value={value} className="w-full">
        <TabsContent
          value="all"
          className="mt-0 pt-2 border dark:border-zinc-600 rounded-md h-[500px] overflow-y-scroll scrollbar scrollbar-thumb-zinc-400 scrollbar-track-zinc-300 dark:scrollbar-thumb-zinc-950 dark:scrollbar-track-zinc-800"
        >
          <ImageCard
            images={filteredImages}
            handleSelectImage={handleSelectImage}
            onOpenModalView={onOpenModalView}
            onOpenModalEdit={onOpenModalEdit}
            onOpenDeleteImage={onOpenDeleteImage}
          />
        </TabsContent>
        <TabsContent
          value="jpg"
          className="mt-0 pt-2 border dark:border-zinc-600 rounded-md h-[500px] overflow-y-scroll scrollbar scrollbar-thumb-zinc-400 scrollbar-track-zinc-300 dark:scrollbar-thumb-zinc-950 dark:scrollbar-track-zinc-800"
        >
          <ImageCard
            images={filteredImages.filter(
              (img) => img.type === "jpg" || img.type === "jpeg",
            )}
            handleSelectImage={handleSelectImage}
            onOpenModalView={onOpenModalView}
            onOpenModalEdit={onOpenModalEdit}
            onOpenDeleteImage={onOpenDeleteImage}
          />
        </TabsContent>
        <TabsContent
          value="png"
          className="mt-0 pt-2 border dark:border-zinc-600 rounded-md h-[500px] overflow-y-scroll scrollbar scrollbar-thumb-zinc-400 scrollbar-track-zinc-300 dark:scrollbar-thumb-zinc-950 dark:scrollbar-track-zinc-800"
        >
          <ImageCard
            images={filteredImages.filter((img) => img.type === "png")}
            handleSelectImage={handleSelectImage}
            onOpenModalView={onOpenModalView}
            onOpenModalEdit={onOpenModalEdit}
            onOpenDeleteImage={onOpenDeleteImage}
          />
        </TabsContent>
        <TabsContent
          value="webp"
          className="mt-0 pt-2 border dark:border-zinc-600 rounded-md h-[500px] overflow-y-scroll scrollbar scrollbar-thumb-zinc-400 scrollbar-track-zinc-300 dark:scrollbar-thumb-zinc-950 dark:scrollbar-track-zinc-800"
        >
          <ImageCard
            images={filteredImages.filter((img) => img.type === "webp")}
            handleSelectImage={handleSelectImage}
            onOpenModalView={onOpenModalView}
            onOpenModalEdit={onOpenModalEdit}
            onOpenDeleteImage={onOpenDeleteImage}
          />
        </TabsContent>
      </Tabs>

      {isOpenModal && imageSelected && (
        <ModalEdit
          open={isOpenModal}
          onChangeOpen={setIsOpenModal}
          handleRenameImage={handleRenameImage}
          imageSelected={imageSelected}
        />
      )}

      {isOpenViewModal && imageSelected && (
        <ModalView
          open={isOpenViewModal}
          onChangeOpen={setIsOpenViewModal}
          imageSelected={imageSelected}
        />
      )}

      <AlertDialogModal
        open={isOpenAlert}
        onChangeOpen={setIsOpenAlert}
        image={imageSelected}
      />
    </div>
  );
};

export default ImageList;
