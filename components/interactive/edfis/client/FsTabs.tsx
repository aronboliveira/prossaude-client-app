"use client";
import { createContext, useRef, useEffect, useContext } from "react";
import TabProgSVi from "../tabs/TabProgSVi";
import { nlInp } from "@/lib/global/declarations/types";
import { ENTabsCtxProps, FspCtxProps } from "@/lib/global/declarations/interfaces";
import useMount from "@/lib/hooks/useMount";
import { FspCtx } from "./FsProgCons";
import { handleQueryForRefs } from "@/lib/locals/edFisNutPage/edFisNutReactHandlers";
import DynamicTabsBlock from "./tabs/DynamicTabsBlock";
import { checkContext } from "@/lib/global/gModel";
export const ENTabsCtx = createContext<ENTabsCtxProps>({
  targs: {
    firstCol: {
      tiw1: null,
      tih1: null,
      tiimc1: null,
      timlg1: null,
      titmb1: null,
      tiget1: null,
      tipgc1: null,
      tidc1: null,
    },
    secondCol: {
      tiw2: null,
      tih2: null,
      tiimc2: null,
      timlg2: null,
      titmb2: null,
      tiget2: null,
      tipgc2: null,
      tidc2: null,
    },
    thirdCol: {
      tiw3: null,
      tih3: null,
      tiimc3: null,
      timlg3: null,
      titmb3: null,
      tiget3: null,
      tipgc3: null,
      tidc3: null,
    },
  },
});
export default function FsTab(): JSX.Element {
  const tiw1 = useRef<nlInp>(null),
    tih1 = useRef<nlInp>(null),
    tiimc1 = useRef<nlInp>(null),
    timlg1 = useRef<nlInp>(null),
    titmb1 = useRef<nlInp>(null),
    tiget1 = useRef<nlInp>(null),
    tipgc1 = useRef<nlInp>(null),
    tidc1 = useRef<nlInp>(null),
    tiw2 = useRef<nlInp>(null),
    tih2 = useRef<nlInp>(null),
    tiimc2 = useRef<nlInp>(null),
    timlg2 = useRef<nlInp>(null),
    titmb2 = useRef<nlInp>(null),
    tiget2 = useRef<nlInp>(null),
    tipgc2 = useRef<nlInp>(null),
    tidc2 = useRef<nlInp>(null),
    tiw3 = useRef<nlInp>(null),
    tih3 = useRef<nlInp>(null),
    tiimc3 = useRef<nlInp>(null),
    timlg3 = useRef<nlInp>(null),
    titmb3 = useRef<nlInp>(null),
    tiget3 = useRef<nlInp>(null),
    tipgc3 = useRef<nlInp>(null),
    tidc3 = useRef<nlInp>(null),
    tabKey = useRef<number>(0),
    { td } = useContext<FspCtxProps>(FspCtx).refs,
    [mounted] = useMount();
  //TODO REMOVER APÓS TESTE
  const ctx = useContext(FspCtx);
  checkContext(ctx, "FspCtx", FsTab);
  useEffect(() => {
    if (!mounted) return;
    setTimeout(() => {
      console.log(tiw1.current?.id ?? "NOT FOUND");
      console.log(tiw2.current?.id ?? "NOT FOUND");
      console.log(tiw3.current?.id ?? "NOT FOUND");
      console.log(tih1.current?.id ?? "NOT FOUND");
      console.log(tih2.current?.id ?? "NOT FOUND");
      console.log(tih3.current?.id ?? "NOT FOUND");
      console.log(tidc1.current?.id ?? "NOT FOUND");
      console.log(tidc2.current?.id ?? "NOT FOUND");
      console.log(tidc3.current?.id ?? "NOT FOUND");
    }, 3000);
  }, [mounted]);
  useEffect(() => {
    if (!mounted) return;
    const queryForTargs = (): void => {
      handleQueryForRefs(
        {
          id: "tabInpRowMedAnt2_2",
          r: tiw1,
          fallback: { p: "tabCelRowMedAnt2_2", selector: "input" },
        },
        {
          id: "tabInpRowMedAnt2_3",
          r: tiw2,
          fallback: { p: "tabCelRowMedAnt2_3", selector: "input" },
        },
        { id: "tabInpRowMedAnt2_4", r: tiw3, fallback: { p: "tabCelRowMedAnt2_4", selector: "input" } },
        { id: "tabInpRowMedAnt3_2", r: tih1, fallback: { p: "tabCelRowMedAnt3_2", selector: "input" } },
        { id: "tabInpRowMedAnt3_3", r: tih2, fallback: { p: "tabCelRowMedAnt3_3", selector: "input" } },
        { id: "tabInpRowMedAnt3_4", r: tih3, fallback: { p: "tabCelRowMedAnt3_4", selector: "input" } },
        { id: "tabInpRowDCut9_2", r: tidc1, fallback: { p: "tabCelRowDCut9_2", selector: "input" } },
        { id: "tabInpRowDCut9_3", r: tidc2, fallback: { p: "tabCelRowDCut9_3", selector: "input" } },
        { id: "tabInpRowDCut9_4", r: tidc3, fallback: { p: "tabCelRowDCut9_4", selector: "input" } },
      );
    };
    setTimeout(
      () =>
        td?.current instanceof HTMLElement
          ? queryForTargs()
          : setTimeout(
              () =>
                td?.current instanceof HTMLElement
                  ? queryForTargs()
                  : console.error(`Failed to validate Table of Skin Folds instance`),
              1500,
            ),
      500,
    );
  }, [mounted, td, tiw1, tiw2, tiw3, tih1, tih2, tih3]);
  useEffect(() => {
    if (!mounted) return;
    setTimeout(() => {
      tabKey.current = +1;
    }, 1200);
  }, [mounted]);
  return (
    <fieldset className='fsSub' name='fsSubProgConsName' id='fsSubProgConsId'>
      <TabProgSVi />
      <hr />
      <ENTabsCtx.Provider
        value={{
          targs: {
            firstCol: { tiw1, tih1, tiimc1, timlg1, titmb1, tiget1, tipgc1, tidc1 },
            secondCol: { tiw2, tih2, tiimc2, timlg2, titmb2, tiget2, tipgc2, tidc2 },
            thirdCol: { tiw3, tih3, tiimc3, timlg3, titmb3, tiget3, tipgc3, tidc3 },
          },
        }}>
        <DynamicTabsBlock key={tabKey.current} />
      </ENTabsCtx.Provider>
      <br role='presentation' />
      <hr
        style={{
          opacity: 0.15,
          marginLeft: "0.5rem",
        }}
      />
    </fieldset>
  );
}
