import { useEffect, useRef, useState } from "react";
import { nullishDiv, nlSel } from "../global/declarations/types";
import { AlignType, BirthRelation, GordLvl, TransitionLevel } from "../tests/testVars";
import { elementNotFound, extLine } from "../global/handlers/errorHandler";
import { fluxGen } from "../global/gModel";
import { GenDivProps, UseGenDivReturn } from "../global/declarations/interfacesCons";
export default function useGenDiv({ genRef, genBirthRef }: GenDivProps): UseGenDivReturn {
  const r = useRef<nullishDiv>(null),
    gr = useRef<nlSel>(null),
    gbr = useRef<nlSel>(null),
    gtr = useRef<nlSel>(null),
    gar = useRef<nlSel>(null),
    [gen, setGen] = useState<string>("masculino"),
    [genBirthRel, setGenBirthRel] = useState<BirthRelation>("cis"),
    [genTrans, setGenTrans] = useState<TransitionLevel>("avancado"),
    [genFisAlin, setGenFisAlin] = useState<AlignType>("masculinizado"),
    [textBodytype, setTextBodytype] = useState<GordLvl>("eutrofico");
  useEffect(() => {
    const g = gr.current ?? (document.getElementById("genId") as HTMLSelectElement),
      gb = gbr.current ?? (document.getElementById("genBirthRelId") as HTMLSelectElement),
      gt = gtr.current ?? (document.getElementById("genTransId") as HTMLSelectElement),
      ga = gar.current ?? (document.getElementById("genFisAlinId") as HTMLSelectElement);
    fluxGen({ g, gb, gt, ga }, g.value, setGenFisAlin);
  }, [fluxGen]);
  useEffect(() => {
    const handleResize = (): void => {
      if (gbr.current instanceof HTMLElement && gtr.current instanceof HTMLElement) {
        try {
          gtr.current.style.maxWidth = getComputedStyle(gbr.current).width;
        } catch (e) {
          console.error(
            `Error executing equalization of widths for gender transition element:\n${(e as Error).message}`,
          );
        }
      }
    };
    handleResize();
    addEventListener("resize", handleResize);
    return (): void => removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const handleResize = (): void => {
      if (!(gar.current instanceof HTMLElement && gr.current instanceof HTMLElement)) return;
      gar.current.style.width = getComputedStyle(gr.current).width;
      gar.current.style.maxWidth = getComputedStyle(gr.current).width;
    };
    try {
      if (!(r.current instanceof HTMLElement))
        throw elementNotFound(r.current, `Validation of Gen Div Reference`, extLine(new Error()));
      if (!r.current.dataset.equalizing || r.current.dataset.equalizing !== "true") {
        addEventListener("resize", handleResize);
        document.body.dataset.equalizing = "true";
        handleResize();
      }
    } catch (e) {
      console.error(`Error executing addition of resizing listener to GenDiv:\n${(e as Error).message}`);
    }
    (): void => removeEventListener("resize", handleResize);
  }, [r]);
  useEffect(() => {
    if (genRef && gr.current) genRef.current = gr.current;
  }, [genRef, gr]);
  useEffect(() => {
    if (genBirthRef && gr.current) genBirthRef.current = gr.current;
  }, [genBirthRef, gr]);
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
      textBodytype,
    },
    setters: {
      setGen,
      setGenBirthRel,
      setGenTrans,
      setGenFisAlin,
      setTextBodytype,
    },
  };
}
