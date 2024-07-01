import { ErrorBoundary } from "react-error-boundary";
import LoginPage from "./login";
import { useContext, useEffect } from "react";
import { AppRootContext } from "./_app";
import { createRoot } from "react-dom/client";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";

export const basePath = {
  path: "",
  ph: "undefined",
};

export default function Home(): JSX.Element {
  const appContext = useContext(AppRootContext);
  useEffect(() => {
    try {
      const nextRoot = document.getElementById("__next");
      if (!(nextRoot instanceof HTMLElement))
        throw elementNotFound(nextRoot, "__next", extLine(new Error()));
      if (appContext.roots.nextRoot) return;
      else if (!appContext.roots.nextRoot)
        appContext.roots.nextRoot = createRoot(nextRoot);
      if (!("_internalRoot" in appContext.roots.nextRoot))
        throw new Error(`nextRoot not validated as a Root`);
    } catch (e) {
      console.error(`Error executing procedure for :${(e as Error).message}`);
    }
  }, []);
  return (
    <ErrorBoundary FallbackComponent={() => <div>Erro!</div>}>
      <LoginPage />
    </ErrorBoundary>
  );
}
