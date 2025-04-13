import { createRoot } from "react-dom/client";
import App from "./main";
import { ThemeProvider } from "@/contexts/theme-provider";
import { Toaster } from "sonner";
import "./index.css";

const idRoot = document.getElementById("root") as HTMLElement;

const root = createRoot(idRoot);

root.render(
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <App />
    <Toaster richColors duration={2000} />
  </ThemeProvider>
);
