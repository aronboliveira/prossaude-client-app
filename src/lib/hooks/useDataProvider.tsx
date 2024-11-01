import { providers } from "@/vars";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { nlHtEl } from "../global/declarations/types";
import { privilege } from "../locals/basePage/declarations/serverInterfaces";
import { DataProvider } from "../global/declarations/classesCons";
export default function useDataProvider(
  el: nlHtEl,
  userClass: privilege = "student",
): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [mounted, setMounted] = useState<boolean>(false),
    [ready, setReady] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!mounted) return;
    setReady(true);
  }, [mounted, el, userClass]);
  useEffect(() => {
    if (!mounted || !ready) return;
    setTimeout(
      () => {
        try {
          if (!(el instanceof HTMLElement))
            throw new Error(`Failed to validate instance for Element to be read by Data Storage Provider`);
          providers.globalDataProvider ??= new DataProvider(el);
          providers.globalDataProvider.initPersist(el, providers.globalDataProvider, userClass);
        } catch (e) {
          return;
        }
      },
      location.pathname.includes("edfis") ? 1000 : 500,
    );
  }, [ready, mounted, userClass, el]);
  return [mounted, setMounted];
}
