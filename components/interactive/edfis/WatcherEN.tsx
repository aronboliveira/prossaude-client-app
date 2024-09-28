"use client";
import { entryEl } from "@/lib/global/declarations/types";
import { handleLinkChanges } from "@/lib/global/handlers/gRoutingHandlers";
import { assignFormAttrs, parseNotNaN } from "@/lib/global/gModel";
import { person, tabProps } from "@/pages/edfis";
import { useEffect, useState } from "react";
import { addListenerExportBtn, getGlobalEls, watchLabels } from "@/lib/global/gController";
import { clearPhDates, dinamicGridAdjust, equalizeFlexSibilings } from "@/lib/global/gStyleScript";
import { elementNotFound, extLine, inputNotFound, maxNumberError } from "@/lib/global/handlers/errorHandler";
import { handleCondtReq, syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { addListenerInnerTabs, validateTitlesForTargs } from "@/lib/locals/edFisNutPage/edFisNutController";
let isExportListening = false;
export default function WatcherEN(): JSX.Element {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    const selFactorAtleta = document.getElementById("selFactorAtleta"),
      genElement = document.getElementById("genId");
    tabProps.edGenValue =
      genElement instanceof HTMLSelectElement ||
      genElement instanceof HTMLInputElement ||
      genElement instanceof HTMLTextAreaElement
        ? genElement.value
        : "masculino";
    tabProps.edIsAutoCorrectOn = getGlobalEls(tabProps.edIsAutoCorrectOn, "num");
    handleLinkChanges("ed", "EN Page Style");
    if (!isExportListening === false) {
      addListenerExportBtn("edFisNut");
      isExportListening = true;
    }
    dinamicGridAdjust(Array.from(document.querySelectorAll(".fsAnamGDiv")));
    for (const f of document.querySelectorAll("form")) assignFormAttrs(f);
    selFactorAtleta instanceof HTMLSelectElement
      ? (tabProps.factorAtleta = selFactorAtleta.value)
      : elementNotFound(selFactorAtleta, "selFactorAtleta", extLine(new Error()));
    const mountInterval = setInterval(interv => {
      if (document.getElementById("tabIndPerc")) {
        setMounted(true);
        clearInterval(interv);
        return;
      }
    }, 200);
    setTimeout(() => {
      setMounted(true);
      clearInterval(mountInterval);
      !document.getElementById("tabIndPerc") && console.warn(`Could not find tabIndPerc`);
    }, 10000);
    return () => {
      isExportListening = false;
    };
  }, []);
  useEffect(() => {
    if (mounted && document.getElementsByTagName("table").length > 3) {
      const selectNumCons = document.getElementById("selectNumCons");
      const consTablesFs = document.getElementById("fsProgConsId");
      const genElement = document.getElementById("genId");
      const atvLvlElement = document.getElementById("selectLvlAtFis");
      document.querySelectorAll(".tabInpProg").forEach((inp, i) => {
        try {
          if (!(inp instanceof HTMLInputElement && (inp.type === "number" || inp.type === "text")))
            throw inputNotFound(inp, `Validation of Input instance and type`, extLine(new Error()));
          if (inp.required) {
            inp.minLength = 1;
            inp.maxLength = 99;
            inp.pattern = "^[\\d,.]+$";
            inp.classList.add("minText", "maxText", "pattern");
            if (inp.type === "number") {
              inp.min = "0.05";
              inp.max = "999999";
              inp.classList.add("minNum", "maxNum");
            }
          }
          inp.type === "number"
            ? inp.addEventListener("input", ev =>
                handleCondtReq(ev.currentTarget as HTMLInputElement, {
                  minNum: 0.05,
                  maxNum: 999999,
                  min: 1,
                  max: 99,
                  pattern: ["^[\\d,.]+$", ""],
                }),
              )
            : inp.addEventListener("input", ev =>
                handleCondtReq(ev.currentTarget as HTMLInputElement, {
                  min: 1,
                  max: 99,
                  pattern: ["^[\\d,.]+$", ""],
                }),
              );
        } catch (e) {
          console.error(
            `Error executing iteration ${i} for Tab Inp Prog application of requirements:\n${(e as Error).message}`,
          );
        }
      });
      tabProps.IMC = parseFloat(parseFloat((tabProps.targInpIMC as entryEl)?.value || "0").toFixed(4)) || 0;
      tabProps.MLG = parseFloat(parseFloat((tabProps.targInpMLG as entryEl)?.value || "0").toFixed(4)) || 0;
      tabProps.TMB = parseFloat(parseFloat((tabProps.targInpTMB as entryEl)?.value || "0").toFixed(4)) || 0;
      tabProps.GET = parseFloat(parseFloat((tabProps.targInpGET as entryEl)?.value || "0").toFixed(4)) || 0;
      tabProps.PGC = parseFloat(parseFloat((tabProps.targInpPGC as entryEl)?.value || "0").toFixed(4)) || 0;
      tabProps.factorAtvLvl = parseNotNaN((document.getElementById("nafType") as entryEl)?.value) || 1.4;
      try {
        if (!(selectNumCons instanceof HTMLSelectElement || selectNumCons instanceof HTMLDataListElement))
          throw elementNotFound(selectNumCons, `Select Num Cons instance`, extLine(new Error()));
        tabProps.numCons = parseNotNaN((selectNumCons as entryEl)?.value || "1") || 1;
        if (!(selectNumCons.lastElementChild instanceof HTMLOptionElement))
          throw elementNotFound(
            selectNumCons.lastElementChild,
            `Last Element of Select for Número de Consulta`,
            extLine(new Error()),
          );
        tabProps.numConsLastOp = parseNotNaN(selectNumCons?.lastElementChild?.value ?? "1", 1);
        tabProps.numColsCons = Math.min(
          ...Array.from(document.querySelectorAll("table")).map(tab => {
            return tab instanceof HTMLTableElement ? tab.querySelectorAll("col").length : 0;
          }),
        );
        if (!(tabProps.numConsLastOp === tabProps.numColsCons && tabProps.numConsLastOp >= 3)) {
          console.error(`
          numConsLastOp: ${tabProps.numConsLastOp};
          numColsCons: ${tabProps.numColsCons};
          numConsLastOp: ${tabProps.numConsLastOp};
          `);
          throw maxNumberError(
            (selectNumCons?.lastElementChild as HTMLOptionElement)?.value ?? "1",
            "Options para Consultas",
            extLine(new Error()),
          );
        }
        tabProps.areNumConsOpsValid = true;
      } catch (e) {
        console.error(`Error executing procedure for determining Número de Consulta:\n${(e as Error).message}`);
      }
      person.gen = (genElement as entryEl)?.value || "masculino";
      person.age = parseNotNaN((document.getElementById("dateAgeId") as entryEl)?.value ?? "0") || 0;
      tabProps.numCons = parseNotNaN((selectNumCons as entryEl)?.value || "1") || 1;
      person.sumDCut =
        parseNotNaN(
          (document.getElementById(`tabInpRowDCut9_${tabProps.numCons + 1}`) as entryEl)?.value ?? "0",
          0,
          "float",
        ) || 0;
      person.weight =
        parseNotNaN(
          (document.getElementById(`tabInpRowMedAnt2_${tabProps.numCons + 1}`) as entryEl)?.value ?? "0",
          0,
          "float",
        ) || 0;
      person.height =
        parseNotNaN(
          (document.getElementById(`tabInpRowMedAnt3_${tabProps.numCons + 1}`) as entryEl)?.value ?? "0",
          0,
          "float",
        ) || 0;
      person.atvLvl = (atvLvlElement as entryEl)?.value ?? "leve";
      [tabProps.numColsCons, tabProps.areColGroupsSimilar] = addListenerInnerTabs(
        consTablesFs,
        tabProps.numColsCons,
        tabProps.areColGroupsSimilar,
      );
      [
        tabProps.targInpWeigth,
        tabProps.targInpHeigth,
        tabProps.targInpIMC,
        tabProps.targInpMLG,
        tabProps.targInpTMB,
        tabProps.targInpGET,
        tabProps.targInpSumDCut,
        tabProps.targInpPGC,
      ] = validateTitlesForTargs(tabProps.numCons);
      try {
        if (!(genElement instanceof HTMLSelectElement || genElement instanceof HTMLInputElement))
          throw elementNotFound(genElement, `Gen Element`, extLine(new Error()));
      } catch (e) {
        console.error(`Error executing procure for adding listeners to genElements:\n${(e as Error).message}`);
      }
      const inp2_2 = document.getElementById("tabInpRowMedAnt2_2");
      if (inp2_2 instanceof HTMLInputElement) inp2_2.value = "70";
      const inp2_3 = document.getElementById("tabInpRowMedAnt2_3");
      if (inp2_3 instanceof HTMLInputElement) inp2_3.value = "30";
      const inp2_4 = document.getElementById("tabInpRowMedAnt2_4");
      if (inp2_4 instanceof HTMLInputElement) inp2_4.value = "200";
      const inp3_2 = document.getElementById("tabInpRowMedAnt3_2");
      if (inp3_2 instanceof HTMLInputElement) inp3_2.value = "2";
      const inp3_3 = document.getElementById("tabInpRowMedAnt3_3");
      if (inp3_3 instanceof HTMLInputElement) inp3_3.value = "1";
      const inp3_4 = document.getElementById("tabInpRowMedAnt3_4");
      if (inp3_4 instanceof HTMLInputElement) inp3_4.value = "1.8";
      const inp4_2 = document.getElementById("tabInpRowDCut4_2");
      if (inp4_2 instanceof HTMLInputElement) inp4_2.value = "18";
      const inp7_2 = document.getElementById("tabInpRowDCut7_2");
      if (inp7_2 instanceof HTMLInputElement) inp7_2.value = "18";
      const inp8_2 = document.getElementById("tabInpRowDCut8_2");
      if (inp8_2 instanceof HTMLInputElement) inp8_2.value = "18";
      const inp4_3 = document.getElementById("tabInpRowDCut4_3");
      if (inp4_3 instanceof HTMLInputElement) inp4_3.value = "10";
      const inp7_3 = document.getElementById("tabInpRowDCut7_3");
      if (inp7_3 instanceof HTMLInputElement) inp7_3.value = "10";
      const inp8_3 = document.getElementById("tabInpRowDCut8_3");
      if (inp8_3 instanceof HTMLInputElement) inp8_3.value = "10";
      const inp4_4 = document.getElementById("tabInpRowDCut4_4");
      if (inp4_4 instanceof HTMLInputElement) inp4_4.value = "40";
      const inp7_4 = document.getElementById("tabInpRowDCut7_4");
      if (inp7_4 instanceof HTMLInputElement) inp7_4.value = "40";
      const inp8_4 = document.getElementById("tabInpRowDCut8_4");
      if (inp8_4 instanceof HTMLInputElement) inp8_4.value = "40";
      clearPhDates(Array.from(document.querySelectorAll('input[type="date"]')));
      equalizeFlexSibilings(document.querySelectorAll("[class*='flexTwin']"), [["width", "px"]]);
      syncAriaStates(document.querySelectorAll("*"));
      watchLabels();
    }
  }, [mounted]);
  return <div className='watcher' id='watcher-en' style={{ display: "none" }}></div>;
}
