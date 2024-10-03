"use client";
import { handleDivAddShow } from "@/lib/locals/aGPage/aGHandlers";
import { odProps, agProps } from "@/vars";
import { extLine, inputNotFound } from "@/lib/global/handlers/errorHandler";
import { handleLinkChanges } from "@/lib/global/handlers/gRoutingHandlers";
import { pageCases, targEl } from "@/lib/global/declarations/types";
import { useEffect, useLayoutEffect, useState } from "react";
import { addExportFlags, getGlobalEls, watchLabels } from "@/lib/global/gController";
import { clearPhDates, dinamicGridAdjust, equalizeFlexSibilings } from "@/lib/global/gStyleScript";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { assignFormAttrs, modelScripts } from "@/lib/global/gModel";
export default function Watcher({ routeCase }: { routeCase?: pageCases }): JSX.Element {
  const [handled, setHandle] = useState<boolean>(false);
  const [isMounted, setMount] = useState<boolean>(false);
  const [isExportListening, setExport] = useState<boolean>(false);
  useLayoutEffect(() => setMount(true), []);
  useEffect(() => {
    if (!isMounted) return;
    const handleResize = (): void =>
      equalizeFlexSibilings(document.querySelectorAll("[class*='flexTwin']"), [["width", "px"]]);
    setTimeout(() => {
      watchLabels();
      addEventListener("resize", handleResize);
      if (routeCase !== "login" && routeCase !== "base" && routeCase !== "recover") {
        if (!isExportListening) {
          addExportFlags();
          setExport(true);
        }
      }
      if (routeCase === "ag") {
        equalizeFlexSibilings(document.querySelectorAll("[class*='flexTwin']"), [["width", "px"]]);
        clearPhDates(Array.from(document.querySelectorAll('input[type="date"]')));
        document.querySelectorAll(".cbFam").forEach(handleDivAddShow);
      } else if (routeCase === "od") {
        const handleInpAvDentValue = (inpAvDent: targEl, i: number): void => {
          try {
            if (!(inpAvDent instanceof HTMLInputElement))
              throw inputNotFound(inpAvDent, `Validation of Input instance`, extLine(new Error()));
            inpAvDent.value = "Hígido";
          } catch (e) {
            console.error(
              `Error executing iteration ${i} for defaulting values to inpAvDents:\n${(e as Error).message}`,
            );
          }
        };
        document.querySelectorAll(".inpAvDent").forEach((inp, i) => handleInpAvDentValue(inp, i));
        dinamicGridAdjust(Array.from(document.querySelectorAll(".fsAnamGDiv")));
      }
    }, 500);
    if (routeCase === "login") handleLinkChanges("login", "Login Page Style");
    else if (routeCase === "base") handleLinkChanges("base", "Base Page Style");
    else if (routeCase === "ag") {
      handleLinkChanges("ag", "AG Page Style");
      agProps.agIsAutoCorrectOn = getGlobalEls(agProps.agIsAutoCorrectOn, "num");
    } else if (routeCase === "od") {
      handleLinkChanges("od", "Od Page Style");
      odProps.odIsAutoCorrectOn = getGlobalEls(odProps.odIsAutoCorrectOn, "notNum");
    } else if (routeCase === "recover") handleLinkChanges("recover", "Recover Page Style");
    setHandle(true);
    return (): void => {
      if (routeCase === "ag") removeEventListener("resize", handleResize);
    };
  }, [isMounted]);
  useEffect(() => {
    modelScripts();
  }, [handled]);
  useEffect(() => {
    if (!isMounted) return;
    setTimeout(() => syncAriaStates(document.querySelectorAll("*")), 1000);
    setTimeout(() => {
      for (const f of document.querySelectorAll("form")) assignFormAttrs(f);
    }, 1000);
    const fInterv = setInterval(() => {
      for (const f of document.querySelectorAll("form")) assignFormAttrs(f);
    }, 60000);
    return (): void => clearInterval(fInterv);
  });
  useEffect(() => {
    setTimeout(() => {
      for (const a of document.querySelectorAll(".divAdd.divAntFamCheck"))
        if (a instanceof HTMLElement) a.style.display = "none";
    }, 1000);
  }, []);
  return <div className='watcher' id={`watcher-${routeCase}`} style={{ display: "none" }}></div>;
}
