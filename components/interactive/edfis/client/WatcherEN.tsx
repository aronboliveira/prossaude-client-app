"use client";
import { handleLinkChanges } from "@/lib/global/handlers/gRoutingHandlers";
import { assignFormAttrs } from "@/lib/global/gModel";
import { tabProps, timers } from "@/vars";
import { useEffect, useState } from "react";
import { addExportFlags, getGlobalEls } from "@/lib/global/gController";
import useResetPerson from "@/lib/hooks/useResetPerson";
import useMount from "@/lib/hooks/useMount";
import { evalMatchTMBElements } from "@/lib/locals/edFisNutPage/edFisNutModel";
import { exeAutoFill } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import useBsLink from "@/lib/hooks/useBsLink";
export default function WatcherEN(): JSX.Element {
  const [mounted, setMounted] = useMount(),
    [isExportListening, setExport] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      tabProps.edIsAutoCorrectOn = getGlobalEls(tabProps.edIsAutoCorrectOn, "num");
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
  }, [setMounted]);
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
    setTimeout(() => {
      for (const f of document.querySelectorAll("form")) assignFormAttrs(f);
    }, timers.personENTimer + 100);
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
  useBsLink();
  //TODO REMOVER APÓS TESTE
  useEffect(() => {
    setTimeout(() => {
      evalMatchTMBElements();
      const filledTabInpProg = Array.from(document.querySelectorAll(".tabInpProg")).filter(
        e =>
          (e instanceof HTMLInputElement || e instanceof HTMLSelectElement || e instanceof HTMLTextAreaElement) &&
          e.value !== "",
      )[0];
      if (filledTabInpProg instanceof HTMLElement && tabProps.edIsAutoCorrectOn) {
        [2, 3, 4].forEach(n => {
          const sumBtn = document.getElementById(`sumDCBtn9_${n}`);
          if (!(sumBtn instanceof HTMLElement)) return;
          sumBtn.click();
        });
        exeAutoFill(filledTabInpProg, "col");
      }
    }, timers.personENTimer + 200);
  }, []);
  return <div className='watcher' id='watcher-en' style={{ display: "none" }}></div>;
}
