import { Button } from "@/components/ui/button";

interface HeaderProps {
  onSelectDirectory: () => void;
  onRefresh: () => void;
  currentPath: string | null;
  canRefresh: boolean;
  openFileExplorer: (imagePath: string) => Promise<boolean>;
}

const Header: React.FC<HeaderProps> = ({
  onSelectDirectory,
  onRefresh,
  currentPath,
  canRefresh,
  openFileExplorer
}) => {
  return (
    <header className="pb-3 text-white">
      <div className="flex justify-between items-center py-4 w-full header-content">
        <h1 className="font-extrabold text-primary text-3xl">Gestor de Imagenes</h1>
        <div className="flex gap-2">
          <Button
            className="bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-950 border border-zinc-300 dark:border-zinc-950 text-black dark:text-white"
            variant="outline"
            onClick={() => openFileExplorer(currentPath ?? "")}
          >
            Abrir
          </Button>
          <Button
            className="bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-950 border border-zinc-300 dark:border-zinc-950 text-black dark:text-white"
            variant="outline"
            onClick={onRefresh}
            disabled={!canRefresh}>
            Actualizar

          </Button>
          <Button
            className="text-white"
            variant="default"
            onClick={onSelectDirectory}>
            Seleccionar
          </Button>
        </div>
      </div>

      <div className="py-2 text-base">
        <p className="text-white">
          Ruta seleccionada:
          <span className="ml-2 px-2 font-medium text-muted-foreground">
            {currentPath ? currentPath : 'Ninguna'}
          </span>
        </p>
      </div>
    </header>
  );
};

export default Header;