"use client";
import { handleLinkChanges } from "@/lib/global/handlers/gRoutingHandlers";
import { assignFormAttrs } from "@/lib/global/gModel";
import { tabProps } from "@/vars";
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
        //TODO REMOVER APÓS TESTE
        console.log("populating...");
        CacheEN.dcisDoc = Array.from(document.querySelectorAll(".tabInpProgDCut"));
        CacheEN.indisDoc = Array.from(document.querySelectorAll(".tabInpProgIndPerc"));
        CacheEN.ncthc = Array.from(document.querySelectorAll(".numConsTextHeadCel"));
        CacheEN.locksinds = Array.from(document.querySelectorAll(".lockTabInd"));
        CacheEN.tip = Array.from(document.querySelectorAll(".tabInpProg"));
        CacheEN.his = Array.from(document.querySelectorAll(".inpHeight"));
        CacheEN.wis = Array.from(document.querySelectorAll(".inpWeight"));
        CacheEN.indis = Array.from(document.querySelectorAll(".tabInpProgIndPerc"));
        if (!(fsp.current instanceof HTMLElement)) fsp.current = document.getElementById("fsProgConsId") as nlFs;
        (() => {
          if (!(fsp.current instanceof HTMLElement)) return;
          CacheEN.fsptb = Array.from(fsp.current.querySelectorAll("table"));
          CacheEN.fsptrs = Array.from(fsp.current.querySelectorAll("tr"));
          CacheEN.fspcols = Array.from(fsp.current.querySelectorAll("col"));
        })();
        if (!(tsv.current instanceof HTMLElement)) tsv.current = document.getElementById("tabProgSVi") as nlTab;
        (() => {
          if (!(tsv.current instanceof HTMLElement)) return;
          CacheEN.tsvis = Array.from(tsv.current.querySelectorAll(".tabInpProgSVi"));
        })();
        if (!(tma.current instanceof HTMLElement)) tma.current = document.getElementById("tabMedAnt") as nlTab;
        (() => {
          if (!(tma.current instanceof HTMLElement)) return;
          CacheEN.tmais = Array.from(tma.current.querySelectorAll(".tabInpProgMedAnt"));
        })();
        if (!(td.current instanceof HTMLElement)) td.current = document.getElementById("tabDCut") as nlTab;
        (() => {
          if (!(td.current instanceof HTMLElement)) return;
          CacheEN.dcis = Array.from(td.current.querySelectorAll(".tabInpProg"));
          CacheEN.dctrs = Array.from(td.current.querySelectorAll(".tabRowDCutMed"));
        })();
        if (!(tip.current instanceof HTMLElement)) tip.current = document.getElementById("tabIndPerc") as nlTab;
        (() => {
          if (!(tip.current instanceof HTMLElement)) return;
          CacheEN.indis = Array.from(tip.current.querySelectorAll(".inpInd"));
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
        ].forEach(({ tab, queries }) => {
          if (!(tab instanceof HTMLElement)) return;
          CacheEN.lists[tab.id] = tab.querySelectorAll("col");
          for (const { k, s } of queries) (CacheEN as any)[k] = tab.querySelectorAll(s);
          if (!(tab instanceof HTMLTableElement)) return;
          for (const row of tab.rows) CacheEN.targs[`${row.id}__inputs`] = Array.from(row.querySelectorAll("input"));
        });
        console.log(CacheEN);
      },
      cacheInterv = setInterval(populateCache, 120000),
      handleUnload = (): void => {
        for (const k in CacheEN)
          if (CacheEN.hasOwnProperty(k)) {
            const l = k as keyof CacheENProps;
            Array.isArray(CacheEN[l])
              ? (CacheEN[l] as Array<any>).splice(0, (CacheEN[l] as Array<any>).length)
              : ((CacheEN as any)[l] = {});
          }
      };
    populateCache();
    addEventListener("beforeunload", handleUnload);
    return (): void => {
      clearInterval(cacheInterv);
      removeEventListener("beforeunload", handleUnload);
    };
  }, []);
  return <div className='watcher' id='watcher-en' style={{ display: "none" }}></div>;
}
