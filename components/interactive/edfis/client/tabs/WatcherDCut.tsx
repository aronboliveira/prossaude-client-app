"use client";

import { useEffect, useState } from "react";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";

export default function WatcherIndPerc(): JSX.Element {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!document.getElementById("divTabInd") || !mounted) return;
    try {
      const reference = document.getElementById("divTabInd");
      if (!(reference instanceof HTMLElement))
        setTimeout(() => {
          if (!document.getElementById("divTabInd"))
            throw elementNotFound(
              reference,
              `Main Reference in TabIndPerc`,
              extLine(new Error())
            );
        }, 1000);
      syncAriaStates(document.querySelectorAll("*"));
    } catch (e) {
      console.error(
        `Error executing procedure for syncing aria states in TabIndPerc:\n${
          (e as Error).message
        }`
      );
    }
  }, [mounted]);
  return (
    <div
      className="watcher"
      id="watcher-ind-perc"
      style={{ display: "none" }}
    ></div>
  );
}
