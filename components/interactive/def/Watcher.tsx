"use client";
import { handleDivAddShow } from "@/lib/locals/aGPage/aGHandlers";
import { odProps, agProps, navigatorVars, reloader } from "@/vars";
import { handleLinkChanges, headCleanup } from "@/lib/global/handlers/gRoutingHandlers";
import { pageCases, targEl } from "@/lib/global/declarations/types";
import { useContext, useEffect, useState } from "react";
import { addExportFlags, getGlobalEls, watchLabels } from "@/lib/global/gController";
import { clearPhDates, dinamicGridAdjust, equalizeFlexSibilings } from "@/lib/global/gStyleScript";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { assignFormAttrs, modelScripts } from "@/lib/global/gModel";
import useMount from "@/lib/hooks/useMount";
import { RootCtxType } from "@/lib/global/declarations/interfaces";
import { RootCtx } from "@/pages/_app";
import useBsLink from "@/lib/hooks/useBsLink";
export default function Watcher({ routeCase }: { routeCase?: pageCases }): JSX.Element {
  const [handled, setHandle] = useState<boolean>(false),
    [isMounted] = useMount(),
    [isExportListening, setExport] = useState<boolean>(false),
    { divModal, divModalSec, divModalTerc } = useContext<RootCtxType>(RootCtx);
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
        const handleInpAvDentValue = (inpAvDent: targEl): void => {
          try {
            if (!(inpAvDent instanceof HTMLInputElement)) return;
            inpAvDent.value = "Hígido";
          } catch (e) {
            return;
          }
        };
        document.querySelectorAll(".inpAvDent").forEach(inp => handleInpAvDentValue(inp));
        dinamicGridAdjust(Array.from(document.querySelectorAll(".fsAnamGDiv")));
      }
      if (routeCase !== "login") reloader.canReloadLogin = true;
      if (routeCase !== "base") reloader.canReloadBase = true;
    }, 500);
    if (routeCase === "login") handleLinkChanges("login", "Login Page Style");
    else if (routeCase === "base") handleLinkChanges("base", "Base Page Style");
    else if (routeCase === "ag") {
      handleLinkChanges("ag", "AG Page Style");
      getGlobalEls(agProps.agIsAutoCorrectOn, "num");
    } else if (routeCase === "od") {
      handleLinkChanges("od", "Od Page Style");
      getGlobalEls(odProps.odIsAutoCorrectOn, "notNum");
    } else if (routeCase === "recover") handleLinkChanges("recover", "Recover Page Style");
    headCleanup();
    setHandle(true);
    return (): void => {
      if (routeCase === "ag") removeEventListener("resize", handleResize);
    };
  }, [isMounted, routeCase]);
  useEffect(modelScripts, [handled]);
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
  useEffect(() => {
    if (divModal) divModal.current = document.getElementById("divAdd") as HTMLDivElement;
    if (divModalSec) divModalSec.current = document.getElementById("divAddSec") as HTMLDivElement;
    if (divModalTerc) divModalTerc.current = document.getElementById("divAddTerc") as HTMLDivElement;
  }, [divModal, divModalSec, divModalTerc]);
  useEffect(() => {
    if (navigator.language.startsWith("pt-")) navigatorVars.pt = true;
    else navigatorVars.pt = false;
  }, []);
  useEffect(() => {
    if (!isMounted) return;
    setTimeout(() => {
      document.querySelectorAll("*").forEach(e => {
        if (/[ !"#$%&'()*+,/:;<=>?@[\\\]^`{|}~\s]|\b[0-9]/g.test(e.id))
          e.id = e.id.replace(/[ !"#$%&'()*+,/:;<=>?@[\\\]^`{|}~\s]|\b[0-9]/g, "__");
        e.classList.forEach(c => {
          if (/[ !"#$%&'()*+,/:;<=>?@[\\\]^`{|}~\s]|\b[0-9]/g.test(c)) {
            e.classList.add(c.replace(/[ !"#$%&'()*+,/:;<=>?@[\\\]^`{|}~\s]|\b[0-9]/g, "__"));
            e.classList.remove(c);
          }
        });
        if ("name" in e && /[ !"#$%&'()*+,/:;<=>?@[\\\]^`{|}~\s]|\b[0-9]/g.test((e as HTMLInputElement).name))
          e.name = (e as HTMLInputElement).name.replace(/[ !"#$%&'()*+,/:;<=>?@[\\\]^`{|}~\s]|\b[0-9]/g, "__");
      });
    }, 300);
  }, [isMounted]);
  useBsLink();
  return <div className='watcher' id={`watcher-${routeCase}`} style={{ display: "none" }}></div>;
}
