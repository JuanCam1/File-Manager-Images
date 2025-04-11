import { ModeToggle } from "@/components/toggle-mode";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="relative flex justify-center items-center bg-slate-100 dark:bg-zinc-950 h-screen font-sans">
      <div className="top-0 right-0 absolute p-2">
        <ModeToggle />
      </div>
      <Outlet />
    </div>
  ),
});
