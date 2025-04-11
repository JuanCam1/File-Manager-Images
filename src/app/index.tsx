import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react"
import { ImageIcon, Search, Upload, Trash2, Edit2 } from "lucide-react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { useImageStore } from "@/store";
import Header from "@/sections/header";
import { Separator } from "@/components/ui/separator";
import ImageList from "@/sections/image-list";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const images = useImageStore(state => state.images);
  const loadImages = useImageStore(state => state.loadImages);
  const handleSelectDirectory = useImageStore(state => state.handleSelectDirectory);
  const handleRefresh = useImageStore(state => state.handleRefresh);
  const currentPath = useImageStore(state => state.currentPath);
  const loading = useImageStore(state => state.isLoading);
  const refreshing = useImageStore(state => state.refreshing);

  useEffect(() => {
    loadImages();
  }, [loadImages])

  return (
    <div className="flex flex-col bg-white dark:bg-zinc-900 px-5 rounded-md w-full lg:w-[80%] min-h-[95%]">
      <Header
        onSelectDirectory={handleSelectDirectory}
        onRefresh={handleRefresh}
        currentPath={currentPath}
        canRefresh={!!currentPath && !loading}
      />
      <Separator />
      <div className="flex-1 pt-3 rounded-sm overflow-hidden">
        <h2 className="my-0 pb-3 font-semibold dark:text-white text-lg text-center">Imagenes ({images.length})</h2>
        <Separator />

        {images.length === 0 ? (
          <div className="py-10 text-muted-foreground text-base text-center">
            No hay imagenes para mostrar. Selecciona una carpeta o asegúrate de que la carpeta contiene imagenes.
          </div>
        ) : (
          <ImageList loading={loading || refreshing} />
        )}
      </div>

    </div>

  )
}
