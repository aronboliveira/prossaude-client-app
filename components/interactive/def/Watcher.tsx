"use client";

import { pageCases } from "@/lib/global/declarations/types";
import {
  addListenerExportBtn,
  getGlobalEls,
  watchLabels,
} from "@/lib/global/gController";
import { clearPhDates, equalizeFlexSibilings } from "@/lib/global/gStyleScript";
import {
  deactTextInput,
  syncAriaStates,
} from "@/lib/global/handlers/gHandlers";
import { handleLinkChanges } from "@/lib/global/handlers/gRoutingHandlers";
import { agProps, handleDivAddShow } from "@/pages/ag";
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
    if (routeCase === "login") {
      handleLinkChanges("login", "Login Page Style");
    } else if (routeCase === "base") {
      handleLinkChanges("base", "Base Page Style");
    } else if (routeCase === "ag") {
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
    }
    return () => {
      if (routeCase === "ag") removeEventListener("resize", handleResize);
    };
  }, []);
  return <div style={{ display: "none" }}></div>;
}
