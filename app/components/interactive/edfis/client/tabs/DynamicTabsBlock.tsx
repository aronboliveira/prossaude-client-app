"use client";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../error/GenericErrorComponent";
import TabMedAnt from "../../tabs/TabMedAnt";
import ReactSpinner from "../../../../icons/ReactSpinner";
import { Suspense, createContext, lazy, useCallback, useContext } from "react";
import TabIndPerc from "../../tabs/TabIndPerc";
import { NlMRef, autofillResult, nlFs, nlSel, targEl, validTabLabs } from "@/lib/global/declarations/types";
import { person, tabProps } from "@/vars";
import { Person } from "@/lib/global/declarations/classes";
import { getNumCol, runAutoFill } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { DTsCtxProps, ENCtxProps, FspCtxProps, TargInps } from "@/lib/global/declarations/interfaces";
import { ENCtx } from "../ENForm";
import { FspCtx } from "../FsProgCons";
import Td from "../../tabs/Td";
import Th from "../../tabs/Th";
import { checkContext } from "@/lib/global/gModel";
const DTsCtx = createContext<DTsCtxProps>({ exeAutoFillCtx: null }),
  DivDCut = lazy(() => import("../../DivDCut"));
export default function DynamicTabsBlock(): JSX.Element {
  let fct: NlMRef<nlSel> = null,
    fspr: NlMRef<nlFs> = null,
    gl: NlMRef<nlSel> = null,
    snc: NlMRef<nlSel> = null,
    targs: TargInps | null = null;
  const ctx1 = useContext<ENCtxProps>(ENCtx),
    ctx2 = useContext<FspCtxProps>(FspCtx),
    exeAutoFillCtx = useCallback(
      (el: targEl, ctx: string = "cons"): autofillResult => {
        let numRef = 1;
        const iniResult = {
          ncl: numRef || 1,
          ps: {
            w: person.weight || 0,
            h: person.height || 0,
            sd: person.sumDCut || 0,
          },
          i: {
            imc: tabProps.IMC ?? 0,
            mlg: tabProps.MLG ?? 0,
            tmb: tabProps.TMB ?? 0,
            get: tabProps.GET ?? 0,
            pgc: tabProps.PGC ?? 0,
          },
          ts: {
            tiw: tabProps.tiw,
            tih: tabProps.tih,
            tii: tabProps.tiimc,
            tim: tabProps.timlg,
            tit: tabProps.titmb,
            tidc: tabProps.tidc,
            tip: tabProps.tiget,
          },
        };
        try {
          if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement))
            throw new Error(`Failed to validate target instance`);
          if (!(person instanceof Person)) throw new Error(`Failed to validate person instance`);
          if (typeof ctx !== "string") throw new Error(`Failed to validate typeof ctx argument`);
          if (ctx === "cons") numRef = tabProps.numCons || 1;
          else {
            getNumCol(el);
            numRef = Number.isFinite(tabProps.numCol) ? tabProps.numCol || 2 : 2;
          }
          return runAutoFill(el, ctx, targs ?? undefined);
        } catch (e) {
          return iniResult;
        }
      },
      [tabProps, getNumCol, runAutoFill, fct, fspr, gl, snc, targs],
    ),
    rowsm = [
      [2, "Peso"],
      [3, "Altura"],
      [4, "Tórax"],
      [5, "Cintura"],
      [6, "Quadril"],
      [7, "Cintura / Quadril"],
      [8, "Braço"],
      [9, "Antebraço"],
      [10, "Coxa"],
      [11, "Panturrilha"],
    ],
    rowsi = [
      [2, "IMC"],
      [3, "MLG"],
      [4, "PGC"],
      [5, "TMB"],
      [6, "GET"],
    ],
    columnsi = [1, 2, 3, 4];
  if (ctx1?.refs) ({ fct, fspr, gl } = ctx1.refs);
  if (ctx2) {
    if (ctx2.refs) ({ snc } = ctx2.refs);
    if (ctx2.targs) targs = ctx2.targs;
  }
  //TODO REMOVER APÓS TESTE
  checkContext(ctx1, "ENCtx", DynamicTabsBlock);
  checkContext(ctx2, "FspCtx", DynamicTabsBlock);
  return (
    <ErrorBoundary fallback={<GenericErrorComponent message='Error mounting dynamic tables!' />}>
      <DTsCtx.Provider value={{ exeAutoFillCtx }}>
        <TabMedAnt>
          <Suspense fallback={<ReactSpinner scale={0.3} key={crypto.randomUUID()} />}>
            {rowsm.map(([nRow, lab], i) => (
              <tr
                className='tabRowProgCons tabRowMedAnt'
                id={`tabRowMedAnt${nRow}`}
                data-row={nRow}
                key={`tr_med-ant__${nRow}`}>
                <Th ctx='MedAnt' nRow={nRow as number} nCol={i + 1} lab={lab as validTabLabs} />
                {[2, 3, 4].map(nCol => (
                  <Td
                    ctx='MedAnt'
                    nRow={nRow as number}
                    nCol={nCol}
                    lab={lab as validTabLabs}
                    key={`td_${nRow}__${nCol}`}
                  />
                ))}
              </tr>
            ))}
          </Suspense>
        </TabMedAnt>
        <hr />
        <Suspense fallback={<ReactSpinner scale={0.5} key={crypto.randomUUID()} />}>
          <DivDCut />
        </Suspense>
        <hr />
        <TabIndPerc columns={columnsi}>
          <Suspense fallback={<ReactSpinner scale={0.5} key={crypto.randomUUID()} />}>
            {rowsi.map(([nRow, lab], i) => (
              <tr
                className={`tabRowProg tabRowProgIndPerc`}
                id={`tabRowProgIndPerc${nRow}`}
                data-row={nRow}
                key={`tr_ind-perc__${nRow}`}>
                <Th ctx='IndPerc' nRow={nRow as number} nCol={i + 1} lab={lab as validTabLabs} />
                {columnsi.slice(1).map(nCol => (
                  <Td
                    ctx='IndPerc'
                    nRow={nRow as number}
                    nCol={nCol}
                    lab={lab as validTabLabs}
                    key={`td_${nCol}__${nRow}`}
                  />
                ))}
              </tr>
            ))}
          </Suspense>
        </TabIndPerc>
      </DTsCtx.Provider>
    </ErrorBoundary>
  );
}
