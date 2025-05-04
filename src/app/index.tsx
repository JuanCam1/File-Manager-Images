import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { useImageStore } from "@/store";
import Header from "@/sections/header";
import { Separator } from "@/components/ui/separator";
import ImageList from "@/sections/image-list";
import { ModeToggle } from "@/components/toggle-mode";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const images = useImageStore((state) => state.images);
  const loadImages = useImageStore((state) => state.loadImages);
  const handleSelectDirectory = useImageStore(
    (state) => state.handleSelectDirectory,
  );
  const handleRefresh = useImageStore((state) => state.handleRefresh);
  const loadCurrent = useImageStore((state) => state.initPlatformPath);
  const currentPath = useImageStore((state) => state.currentPath);
  const loading = useImageStore((state) => state.isLoading);
  const refreshing = useImageStore((state) => state.refreshing);
  const openFileExplorer = useImageStore((state) => state.openFileExplorer);

  useEffect(() => {
    loadCurrent();
  }, []);

  useEffect(() => {
    if (currentPath) {
      loadImages();
    }
  }, [currentPath]);

  return (
    <div className="flex flex-col bg-white dark:bg-zinc-900 px-5 rounded-md w-full lg:w-[80%] min-h-[95%] pt-6">
      <div className="flex w-full justify-end">
        <ModeToggle />
      </div>
      <Header
        onSelectDirectory={handleSelectDirectory}
        onRefresh={handleRefresh}
        currentPath={currentPath}
        canRefresh={!!currentPath && !loading}
        openFileExplorer={openFileExplorer}
      />
      <Separator />
      <div className="flex-1 pt-3 rounded-sm overflow-hidden">
        <h2 className="my-0 pb-3 font-semibold dark:text-white text-lg text-center">
          Imagenes ({images.length})
        </h2>
        <Separator />

        {images.length === 0 && !loading ? (
          <div className="py-10 text-muted-foreground text-base text-center">
            No hay imagenes para mostrar. Selecciona una carpeta o asegúrate de
            que la carpeta contiene imagenes.
          </div>
        ) : (
          <ImageList loading={loading || refreshing} />
        )}
      </div>
    </div>
  );
}
