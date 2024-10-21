"use client";
import { handleLinkChanges } from "@/lib/global/handlers/gRoutingHandlers";
import { assignFormAttrs } from "@/lib/global/gModel";
import { person, tabProps, timers } from "@/vars";
import { useEffect, useRef, useState } from "react";
import { addExportFlags, getGlobalEls } from "@/lib/global/gController";
import useResetPerson from "@/lib/hooks/useResetPerson";
import useMount from "@/lib/hooks/useMount";
import { CacheEN } from "@/lib/locals/edFisNutPage/cache";
import { CacheENProps } from "@/lib/global/declarations/interfaces";
import { nlFs, nlTab } from "@/lib/global/declarations/types";
export default function WatcherEN(): JSX.Element {
  const [mounted, setMounted] = useMount(),
    [isExportListening, setExport] = useState<boolean>(false),
    fsp = useRef<nlFs>(null),
    tsv = useRef<nlTab>(null),
    tma = useRef<nlTab>(null),
    td = useRef<nlTab>(null),
    tip = useRef<nlTab>(null);
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
  useEffect(() => {
    const populateCache = (): void => {
        (
          [
            { k: "dcisDoc", s: ".tabInpProgDCut" },
            { k: "indisDoc", s: ".tabInpProgIndPerc" },
            { k: "ncthc", s: ".numConsTextHeadCel" },
            { k: "locksinds", s: ".lockTabInd" },
            { k: "tip", s: ".tabInpProg" },
            { k: "his", s: ".inpHeight" },
            { k: "wis", s: ".inpWeight" },
          ] as { k: keyof CacheENProps; s: string }[]
        ).forEach(({ k, s }, i) => {
          try {
            if (!CacheEN.hasOwnProperty(k)) return;
            CacheEN[k] = Array.from(document.querySelectorAll(s)) as any;
          } catch (e) {
            console.error(
              `Error executing iteration ${i} for querying the DOM for filling the Cache:\n${(e as Error).message}`,
            );
          }
        });
        if (!(fsp.current instanceof HTMLElement)) fsp.current = document.getElementById("fsProgConsId") as nlFs;
        (() => {
          if (!(fsp.current instanceof HTMLElement)) return;
          CacheEN.fsptb = Array.from(fsp.current.querySelectorAll("table"));
          CacheEN.fsptrs = Array.from(fsp.current.querySelectorAll("tr"));
          CacheEN.fspcols = Array.from(fsp.current.querySelectorAll("col"));
        })();
        tsv.current ??= document.getElementById("tabProgSVi") as nlTab;
        tma.current ??= document.getElementById("tabMedAnt") as nlTab;
        td.current ??= document.getElementById("tabDCut") as nlTab;
        tip.current ??= document.getElementById("tabIndPerc") as nlTab;
        [
          { tab: tsv.current, queries: [{ k: "tsvis", s: ".tabInpProgSVi" }] },
          { tab: tma.current, queries: [{ k: "tmais", s: ".tabInpProgMedAnt" }] },
          {
            tab: td.current,
            queries: [
              { k: "dcis", s: ".tabInpProg" },
              { k: "dctrs", s: ".tabRowDCutMed" },
            ],
          },
          { tab: tip.current, queries: [{ k: "indis", s: ".inpInd" }] },
        ].forEach(({ tab, queries }, i) => {
          try {
            if (!(tab instanceof HTMLElement)) return;
            CacheEN.lists[tab.id] = tab.querySelectorAll("col");
            for (const { k, s } of queries) (CacheEN as any)[k] = tab.querySelectorAll(s);
            if (!(tab instanceof HTMLTableElement)) return;
            for (const row of Array.from(tab.rows).filter(r => !r.id.endsWith("1") && !/svi[0-9]/gi.test(r.id)))
              CacheEN.targs[`${row.id}__inputs`] = Array.from(row.querySelectorAll("input"));
          } catch (e) {
            console.error(
              `Error executing iteration ${i} for querying the Cache for assinging the Mutable References:\n${
                (e as Error).message
              }`,
            );
          }
        });
      },
      cacheInterv = setInterval(populateCache, 20000),
      handleUnload = (): void => {
        for (const k in CacheEN)
          if (CacheEN.hasOwnProperty(k)) {
            const l = k as keyof CacheENProps;
            Array.isArray(CacheEN[l])
              ? (CacheEN[l] as Array<any>).splice(0, (CacheEN[l] as Array<any>).length)
              : ((CacheEN as any)[l] = {});
          }
      };
    addEventListener("beforeunload", handleUnload);
    if (!mounted) return;
    setTimeout(populateCache, 1000);
    return (): void => {
      clearInterval(cacheInterv);
      removeEventListener("beforeunload", handleUnload);
    };
  }, [mounted]);
  //TODO REMOVER APÓS TESTE
  useEffect(() => {
    setTimeout(() => {
      console.log(new Date().getHours() + ":" + new Date().getUTCMinutes());
      console.log("Person");
      console.log(person);
      // console.log("Tab Properties");
      // console.log(tabProps);
      // console.log("Cache");
      // console.log(CacheEN);
    }, timers.personENTimer);
    const i = setInterval(() => {
      console.log(new Date().getHours() + ":" + new Date().getUTCMinutes());
      console.log("Person");
      console.log(person);
      // console.log("Tab Properties");
      // console.log(tabProps);
      // console.log("Cache");
      // console.log(CacheEN);
    }, 10000);
    return (): void => clearInterval(i);
  }, []);
  return <div className='watcher' id='watcher-en' style={{ display: "none" }}></div>;
}
