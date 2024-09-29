"use client";
import { agProps, handleDivAddShow } from "@/pages/ag";
import { extLine, inputNotFound } from "@/lib/global/handlers/errorHandler";
import { handleLinkChanges } from "@/lib/global/handlers/gRoutingHandlers";
import { odProps } from "@/pages/od";
import { pageCases, targEl } from "@/lib/global/declarations/types";
import { useEffect, useState } from "react";
import { addListenerExportBtn, getGlobalEls, watchLabels } from "@/lib/global/gController";
import { clearPhDates, dinamicGridAdjust, equalizeFlexSibilings } from "@/lib/global/gStyleScript";
import { deactTextInput, syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { assignFormAttrs, modelScripts } from "@/lib/global/gModel";
let isFetching = false,
  isExportListening = false;
export default function Watcher({ routeCase }: { routeCase?: pageCases }): JSX.Element {
  const [handled, setHandle] = useState<boolean>(false);
  useEffect(() => {
    const handleResize = (): void => {
      equalizeFlexSibilings(document.querySelectorAll("[class*='flexTwin']"), [["width", "px"]]);
    };
    syncAriaStates(document.querySelectorAll("*"));
    watchLabels();
    if (routeCase === "login") handleLinkChanges("login", "Login Page Style");
    else if (routeCase === "base") handleLinkChanges("base", "Base Page Style");
    else if (routeCase === "ag") {
      handleLinkChanges("ag", "AG Page Style");
      agProps.agIsAutoCorrectOn = getGlobalEls(agProps.agIsAutoCorrectOn, "num");
      equalizeFlexSibilings(document.querySelectorAll("[class*='flexTwin']"), [["width", "px"]]);
      clearPhDates(Array.from(document.querySelectorAll('input[type="date"]')));
      deactTextInput(
        document.querySelectorAll('input[type="number"][id$=NumId]'),
        document.querySelectorAll("input[id$=NullId]"),
      );
      document.querySelectorAll(".cbFam").forEach(handleDivAddShow);
      if (!isExportListening) {
        addListenerExportBtn("anamG");
        isExportListening = true;
      }
      addEventListener("resize", handleResize);
    } else if (routeCase === "od") {
      handleLinkChanges("od", "Od Page Style");
      odProps.odIsAutoCorrectOn = getGlobalEls(odProps.odIsAutoCorrectOn, "notNum");
      dinamicGridAdjust(Array.from(document.querySelectorAll(".fsAnamGDiv")));
      addListenerExportBtn("od");
      const handleInpAvDentValue = (inpAvDent: targEl, i: number): void => {
        try {
          if (!(inpAvDent instanceof HTMLInputElement))
            throw inputNotFound(inpAvDent, `Validation of Input instance`, extLine(new Error()));
          inpAvDent.value = "Hígido";
        } catch (e) {
          console.error(`Error executing iteration ${i} for defaulting values to inpAvDents:\n${(e as Error).message}`);
        }
      };
      document.querySelectorAll(".inpAvDent").forEach((inp, i) => handleInpAvDentValue(inp, i));
    } else if (routeCase === "recover") handleLinkChanges("recover", "Recover Page Style");
    setHandle(true);
    for (const f of document.querySelectorAll("form")) assignFormAttrs(f);
    return (): void => {
      if (routeCase === "ag") removeEventListener("resize", handleResize);
      isExportListening = false;
    };
  }, []);
  useEffect(() => {
    modelScripts();
    if (isFetching) return;
    (async (): Promise<void> => {
      console.log("TRYING ON CLIENT...");
      isFetching = true;
      try {
        const res = await fetch("https://cdn.jsdelivr.net/gh/aronboliveira/my-python@main/fetch_test.py", {
          method: "GET",
          headers: {},
          mode: "cors",
          credentials: "same-origin",
          referrer: "",
          referrerPolicy: "same-origin",
          cache: "no-store",
          redirect: "error",
          keepalive: false,
          signal: null,
        });
        if (!res.ok)
          throw new Error(
            `${res.status}: ${res.statusText} && ${res.redirected ? "should redirect" : "should not redirect"}`,
          );
        let script = await res.text();
        script = JSON.parse(script.slice(script.indexOf("{"), script.lastIndexOf("}") + 1).trim());
        console.log(script);
        isFetching = false;
      } catch (e) {
        console.warn(`Failed: 
        Name: ${(e as Error).name} 
        Message: ${(e as Error).message}
        Stack: ${(e as Error).stack || "undefined"}
        Cause: ${(e as Error).cause || "undefined"}`);
      }
    })();
  }, [handled]);
  return <div className='watcher' id={`watcher-${routeCase}`} style={{ display: "none" }}></div>;
}
