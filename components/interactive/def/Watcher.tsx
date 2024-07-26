"use client";

import { pageCases, targEl } from "@/lib/global/declarations/types";
import {
  addListenerExportBtn,
  getGlobalEls,
  watchLabels,
} from "@/lib/global/gController";
import {
  clearPhDates,
  dinamicGridAdjust,
  equalizeFlexSibilings,
} from "@/lib/global/gStyleScript";
import { extLine, inputNotFound } from "@/lib/global/handlers/errorHandler";
import {
  deactTextInput,
  syncAriaStates,
} from "@/lib/global/handlers/gHandlers";
import { handleLinkChanges } from "@/lib/global/handlers/gRoutingHandlers";
import { agProps, handleDivAddShow } from "@/pages/ag";
import { odProps } from "@/pages/od";
import { useEffect } from "react";

export default function Watcher({
  routeCase,
}: {
  routeCase?: pageCases;
}): JSX.Element {
  useEffect(() => {
    const handleResize = () => {
      equalizeFlexSibilings(document.querySelectorAll("[class*='flexTwin']"), [
        ["width", "px"],
      ]);
    };
    syncAriaStates(document.querySelectorAll("*"));
    watchLabels();
    if (routeCase === "login") handleLinkChanges("login", "Login Page Style");
    else if (routeCase === "base") handleLinkChanges("base", "Base Page Style");
    else if (routeCase === "ag") {
      handleLinkChanges("ag", "AG Page Style");
      agProps.agIsAutoCorrectOn = getGlobalEls(
        agProps.agIsAutoCorrectOn,
        "num"
      );
      equalizeFlexSibilings(document.querySelectorAll("[class*='flexTwin']"), [
        ["width", "px"],
      ]);
      clearPhDates(Array.from(document.querySelectorAll('input[type="date"]')));
      deactTextInput(
        document.querySelectorAll('input[type="number"][id$=NumId]'),
        document.querySelectorAll("input[id$=NullId]")
      );
      document.querySelectorAll(".cbFam").forEach(handleDivAddShow);
      addListenerExportBtn("anamG");
      addEventListener("resize", handleResize);
    } else if (routeCase === "od") {
      handleLinkChanges("od", "Od Page Style");
      odProps.odIsAutoCorrectOn = getGlobalEls(
        odProps.odIsAutoCorrectOn,
        "notNum"
      );
      dinamicGridAdjust(Array.from(document.querySelectorAll(".fsAnamGDiv")));
      addListenerExportBtn("od");
      const handleInpAvDentValue = (inpAvDent: targEl, i: number): void => {
        try {
          if (!(inpAvDent instanceof HTMLInputElement))
            throw inputNotFound(
              inpAvDent,
              `Validation of Input instance`,
              extLine(new Error())
            );
          inpAvDent.value = "Hígido";
        } catch (e) {
          console.error(
            `Error executing iteration ${i} for defaulting values to inpAvDents:\n${
              (e as Error).message
            }`
          );
        }
      };
      document
        .querySelectorAll(".inpAvDent")
        .forEach((inp, i) => handleInpAvDentValue(inp, i));
    }
    return () => {
      if (routeCase === "ag") removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className="watcher"
      id={`watcher-${routeCase}`}
      style={{ display: "none" }}
    ></div>
  );
}
