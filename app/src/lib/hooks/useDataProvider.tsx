import { providers } from "@/vars";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { nullishHtEl } from "../global/declarations/types";
import { privilege } from "../locals/basePage/declarations/serverInterfaces";
import { DataProvider } from "../global/declarations/classesCons";
export default function useDataProvider(
  el: nullishHtEl,
  userClass: privilege = "student",
): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!mounted) return;
    try {
      if (!(el instanceof HTMLElement))
        throw new Error(`Failed to validate instance for Element to be read by Data Storage Provider`);
      providers.globalDataProvider ??= new DataProvider(el);
      providers.globalDataProvider.initPersist(el, providers.globalDataProvider, userClass);
    } catch (e) {
      console.error(`Error executing useDataProvider:\n${(e as Error).message}`);
    }
  }, [mounted]);
  return [mounted, setMounted];
}
