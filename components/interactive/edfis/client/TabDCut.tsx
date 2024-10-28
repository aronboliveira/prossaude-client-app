"use client";
import { ErrorBoundary } from "react-error-boundary";
import { NlMRef, nlTab, validTabLabs } from "@/lib/global/declarations/types";
import Col from "../tabs/Col";
import GenericErrorComponent from "../../../error/GenericErrorComponent";
import Td from "../tabs/Td";
import Th from "../tabs/Th";
import WatcherTab from "./tabs/WatcherTab";
import s from "@/styles//modules/sharedComponents.module.scss";
import { useContext } from "react";
import { FspCtxProps } from "@/lib/global/declarations/interfaces";
import { FspCtx } from "./FsProgCons";
import { checkContext } from "@/lib/global/gModel";
export default function TabDCut(): JSX.Element {
  let td: NlMRef<nlTab> = null;
  const ctx1 = useContext<FspCtxProps>(FspCtx),
    columns = [1, 2, 3, 4],
    rows = [
      [2, "Subescapular", "Subescap"],
      [3, "Axilar Média", "Axilm"],
      [4, "Coxa", "Coxa"],
      [5, "Tríciptal", "Tricp"],
      [6, "Suprailíaca", "Suprail"],
      [7, "Peitoral", "Peit"],
      [8, "Abdominal", "Abd"],
      [9, "Soma", "Sum"],
    ];
  if (ctx1) {
    if (ctx1.refs) ({ td } = ctx1.refs);
  }
  //TODO REMOVER APÓS TESTE
  checkContext(ctx1, "FpsCtx", TabDCut);
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error rendering Table for Skin Folds' />}>
      <div role='group' className={`divTab ${s.divTabEn}`} id='divTabDobrCut'>
        <table ref={td} className='tabProgCons noInvert' id='tabDCut' itemScope>
          <caption className='tabLegProgCons' id='tabLegDCut'>
            Dobras Cutâneas
          </caption>
          <colgroup className='tabLegProgCons' id='tabColGrpDCut'>
            {columns.map(nCol => (
              <Col ctx='DCut' nCol={nCol} key={`col_dcut_${nCol}`} />
            ))}
          </colgroup>
          <thead className='tabTheadProgCons' id='tabTheadDCut'>
            <tr className='tabRowProgCons tabRowDCutCons' id='tabRowDCut1'>
              {columns.map(nCol => (
                <Th ctx='DCut' nCol={nCol} nRow={1} key={`th_dcut_${nCol}`} />
              ))}
            </tr>
          </thead>
          <tbody className='tbodyProgCons' id='tbodyDCut'>
            {rows.map(([nRow, lab, shortLabel], i) => (
              <tr
                className={`tabRowProgCons${lab === "Soma" ? " tabRowDCutSum" : " tabRowDCutMed"}`}
                id={`row${shortLabel}${nRow}_`}
                key={`tr_dcut__${nRow}`}
                data-row={nRow}
                hidden={["Subescapular", "Axilar Média", "Tríciptal", "Suprailíaca"].includes(lab as string)}>
                <Th ctx='DCut' nRow={nRow as number} nCol={i + 1} lab={lab as validTabLabs} />
                {[2, 3, 4].map(nCol => (
                  <Td
                    ctx='DCut'
                    nRow={nRow as number}
                    nCol={nCol}
                    lab={lab as validTabLabs}
                    key={`td_${nRow}__${nCol}`}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <WatcherTab tabName='divTabDobrCut' />
    </ErrorBoundary>
  );
}
