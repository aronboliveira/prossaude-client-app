import { useEffect, useRef, useState } from "react";
import { nlDiv, nlSel } from "../global/declarations/types";
import { AlignType, BirthRelation, Gender, TransitionLevel } from "../global/declarations/testVars";
import { GenDivProps, UseGenDivReturn } from "../global/declarations/interfacesCons";
import { handleGenRender } from "../locals/edFisNutPage/edFisNutReactHandlers";
import { person } from "@/vars";
export default function useGenDiv({ onSetGen, genValueRef }: GenDivProps): UseGenDivReturn {
  const r = useRef<nlDiv>(null),
    gr = useRef<nlSel>(null),
    gbr = useRef<nlSel>(null),
    gtr = useRef<nlSel>(null),
    gar = useRef<nlSel>(null),
    [gen, setGen] = useState<Gender>("masculino"),
    [genBirthRel, setGenBirthRel] = useState<BirthRelation>("cis"),
    [genTrans, setGenTrans] = useState<TransitionLevel>("avancado"),
    [genFisAlin, setGenFisAlin] = useState<AlignType>("masculinizado");
  useEffect(() => {
    (gr.current ??= document.getElementById("genId") as HTMLSelectElement),
      (gbr.current ??= document.getElementById("genBirthRelId") as HTMLSelectElement),
      (gtr.current ??= document.getElementById("genTransId") as HTMLSelectElement),
      (gar.current ??= document.getElementById("genFisAlinId") as HTMLSelectElement);
    try {
      const agGenElement = gr.current ?? document.getElementById("genId");
      if (
        agGenElement instanceof HTMLInputElement ||
        agGenElement instanceof HTMLTextAreaElement ||
        agGenElement instanceof HTMLSelectElement
      ) {
        const g = gr.current ?? (document.getElementById("genId") as HTMLSelectElement),
          gb = gbr.current ?? (document.getElementById("genBirthRelId") as HTMLSelectElement),
          gt = gtr.current ?? (document.getElementById("genTransId") as HTMLSelectElement),
          ga = gar.current ?? (document.getElementById("genFisAlinId") as HTMLSelectElement);
        handleGenRender({ g, gb, gt, ga, setGenTrans, setGenBirthRel, setGenFisAlin });
        if (genValueRef) genValueRef.current = person.gen as Gender;
      }
    } catch (e) {
      return;
    }
  }, [gr, gbr, gtr, gar, onSetGen, setGen, setGenFisAlin, genValueRef]);
  useEffect(() => {
    const handleResize = (): void => {
      if (!(gbr.current instanceof HTMLElement && gtr.current instanceof HTMLElement)) return;
      gtr.current.style.maxWidth = getComputedStyle(gbr.current).width;
      gtr.current.style.width = getComputedStyle(gbr.current).width;
      gtr.current.style.minWidth = getComputedStyle(gbr.current).width;
    };
    handleResize();
    addEventListener("resize", handleResize);
    return (): void => removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const handleResize = (): void => {
      if (!(gar.current instanceof HTMLElement && gr.current instanceof HTMLElement)) return;
      gar.current.style.maxWidth = getComputedStyle(gr.current).width;
    };
    try {
      if (!(r.current instanceof HTMLElement)) return;
      if (!r.current?.dataset.equalizing || r.current?.dataset.equalizing !== "true") {
        addEventListener("resize", handleResize);
        document.body.dataset.equalizing = "true";
        handleResize();
      }
    } catch (e) {
      return;
    }
    (): void => removeEventListener("resize", handleResize);
  }, [r]);
  return {
    refs: {
      r,
      gr,
      gbr,
      gtr,
      gar,
    },
    values: {
      gen,
      genBirthRel,
      genTrans,
      genFisAlin,
    },
    setters: {
      setGen,
      setGenBirthRel,
      setGenTrans,
      setGenFisAlin,
    },
  };
}
