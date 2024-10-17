import { person, tabProps } from "@/vars";
import { useEffect } from "react";
export default function useResetPerson(): void {
  useEffect(() => {
    const handleUnload = (): void => {
      Object.assign(tabProps, {
        edIsAutoCorrectOn: true,
        isAutoFillActive: true,
        areColGroupsSimilar: false,
        areNumConsOpsValid: false,
        numColsCons: 1,
        numCons: 1,
        numConsLastOp: 1,
        numCol: 1,
        IMC: 0,
        MLG: 0,
        TMB: 0,
        GET: 0,
        PGC: 0,
        factorAtvLvl: 1.4,
        factorAtleta: "peso",
        edGenValue: "masculino",
        tiw: undefined,
        tih: undefined,
        tiimc: undefined,
        timlg: undefined,
        titmb: undefined,
        tiget: undefined,
        tipgc: undefined,
        tidc: undefined,
      });
      person.resetPerson();
    };
    addEventListener("beforeunload", handleUnload);
    return (): void => removeEventListener("beforeunload", handleUnload);
  }, []);
}
