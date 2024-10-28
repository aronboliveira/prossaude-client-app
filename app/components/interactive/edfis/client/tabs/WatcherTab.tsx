"use client";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import useMount from "@/lib/hooks/useMount";
import { useEffect } from "react";
export default function WatcherTab({
  tabName,
}: {
  tabName: "divTabSVi" | "divTabMedAnt" | "divTabDobrCut" | "divTabInd";
}): JSX.Element {
  const [mounted] = useMount();
  useEffect(() => {
    if (!document.getElementById(tabName) || !mounted) return;
    try {
      const reference = document.getElementById(tabName);
      if (!(reference instanceof HTMLElement))
        setTimeout(() => {
          if (!document.getElementById(tabName)) return;
          syncAriaStates(document.querySelectorAll("*"));
        }, 1000);
    } catch (e) {
      return;
    }
  }, [mounted, tabName]);
  return <div className='watcher' id={`watcher-${tabName}`} style={{ display: "none" }}></div>;
}
