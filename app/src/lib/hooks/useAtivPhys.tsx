import { useState, useEffect, useCallback, Dispatch, SetStateAction } from "react";
import { callbackAtvLvlElementNaf } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { NlMRef, nlSel } from "@/lib/global/declarations/types";
import { GordLvl, Intensity, NafTypeValue, TMBFormula } from "../global/declarations/testVars";
type PhysIndx = GordLvl | Intensity | TMBFormula | NafTypeValue;
export function useAtvLvlElementNaf(
  refElement: NlMRef<nlSel>,
  idf: string,
  initialValue: PhysIndx,
  refs: {
    gl: NlMRef<nlSel>;
    nafr: NlMRef<nlSel>;
    fct: NlMRef<nlSel>;
    sar: NlMRef<nlSel>;
  },
): [PhysIndx, Dispatch<SetStateAction<PhysIndx>>] {
  const { gl, nafr, fct, sar } = refs,
    [v, setValue] = useState<PhysIndx>(initialValue),
    cb = useCallback(
      () =>
        callbackAtvLvlElementNaf(refElement?.current?.id ?? document.getElementById(idf)?.id ?? "", {
          sa: sar?.current ?? document.getElementById("selectLvlAtFis"),
          gl: gl?.current ?? document.getElementById("gordCorpLvl"),
          naf: nafr?.current ?? document.getElementById("nafType"),
          fct: fct?.current ?? document.getElementById("formCalcTMBType"),
        }),
      [refElement, sar, gl, nafr, fct, idf],
    );
  useEffect(() => cb(), [v, cb]);
  return [v, setValue];
}
