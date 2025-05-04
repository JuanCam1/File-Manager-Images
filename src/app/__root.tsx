import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col items-center bg-slate-100 dark:bg-zinc-950 h-screen">
      <Outlet />
    </div>
  ),
});
