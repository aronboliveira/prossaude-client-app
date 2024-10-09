"use client";
import { handleLinkChanges } from "@/lib/global/handlers/gRoutingHandlers";
import { assignFormAttrs } from "@/lib/global/gModel";
import { tabProps } from "@/vars";
import { useEffect, useState } from "react";
import { addExportFlags, getGlobalEls } from "@/lib/global/gController";
import { dinamicGridAdjust } from "@/lib/global/gStyleScript";
import useResetPerson from "@/lib/hooks/useResetPerson";
export default function WatcherEN(): JSX.Element {
  const [mounted, setMounted] = useState<boolean>(false),
    [isExportListening, setExport] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      tabProps.edIsAutoCorrectOn = getGlobalEls(tabProps.edIsAutoCorrectOn, "num");
      dinamicGridAdjust(Array.from(document.querySelectorAll(".fsAnamGDiv")));
    }, 500);
    handleLinkChanges("ed", "EN Page Style");
    setTimeout(() => {
      setMounted(true);
      const mountInterval = setInterval(interv => {
        if (document.getElementById("tabIndPerc")) {
          setMounted(true);
          clearInterval(interv);
        }
      }, 200);
      clearInterval(mountInterval);
    }, 10000);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    setTimeout(() => {
      if (!isExportListening) {
        addExportFlags();
        setExport(true);
      }
    }, 500);
  }, [mounted]);
  useEffect(() => {
    setTimeout(() => {
      for (const f of document.querySelectorAll("form")) assignFormAttrs(f);
    }, 1000);
    const fInterv = setInterval(() => {
      for (const f of document.querySelectorAll("form")) assignFormAttrs(f);
    }, 120000);
    return (): void => clearInterval(fInterv);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      for (const a of document.querySelectorAll(".divAdd.divAntFamCheck"))
        if (a instanceof HTMLElement) a.style.display = "none";
    }, 1000);
  }, []);
  useResetPerson();
  return <div className='watcher' id='watcher-en' style={{ display: "none" }}></div>;
}
