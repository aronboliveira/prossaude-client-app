import { useEffect } from "react";
import { exporters } from "../../vars";
import { ExportHandler } from "../global/declarations/classes";
import { addExportFlags } from "../global/gController";
import { cleanStorageName } from "../global/handlers/gHandlers";
import { nlEl } from "../global/declarations/types";
export default function useExportHandler(
  exportHandlerProperty: keyof typeof exporters,
  ref: nlEl,
  clearNames: boolean = false,
  timeout = 600000,
): ExportHandler | null {
  const exporter = new ExportHandler();
  useEffect(() => {
    exporters[exportHandlerProperty] = exporter;
    const interv = exporter.autoResetTimer(timeout),
      path = location.pathname,
      handleUnload = (): void => interv && clearInterval(interv),
      handlePop = (): boolean => {
        if (location.pathname !== path) {
          interv && clearInterval(interv);
          return true;
        }
        return false;
      };
    addEventListener(
      "beforeunload",
      () => {
        handleUnload();
        removeEventListener("beforeunload", handleUnload);
      },
      { once: true },
    );
    addEventListener("popstate", () => {
      handlePop() && removeEventListener("popstate", handlePop);
    });
    addExportFlags(ref ?? document);
    clearNames && addEventListener("beforeunload", cleanStorageName);
    return (): void => {
      cleanStorageName();
      handlePop();
      removeEventListener("popstate", handlePop);
      handleUnload();
      removeEventListener("beforeunload", handleUnload);
      clearNames && removeEventListener("beforeunload", cleanStorageName);
    };
  }, [exportHandlerProperty, timeout, clearNames, exporter, ref]);
  return exporter;
}
