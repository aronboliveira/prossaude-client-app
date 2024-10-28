import { ErrorBoundary } from "react-error-boundary";
import { NlMRef, nlTab, validTabLabs } from "@/lib/global/declarations/types";
import Col from "./Col";
import GenericErrorComponent from "../../../error/GenericErrorComponent";
import Td from "./Td";
import Th from "./Th";
import WatcherTab from "../client/tabs/WatcherTab";
import s from "@/styles//modules/sharedComponents.module.scss";
import { useContext } from "react";
import { FspCtxProps } from "@/lib/global/declarations/interfaces";
import { FspCtx } from "../client/FsProgCons";
export default function TabProgSVi(): JSX.Element {
  let tsv: NlMRef<nlTab> = null;
  const columns = [1, 2, 3, 4],
    rows = [
      [2, "PA"],
      [3, "FC"],
    ],
    ctx1 = useContext<FspCtxProps>(FspCtx);
  if (ctx1?.refs) ({ tsv } = ctx1.refs);
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error rendering Table for Vital Signs' />}>
      <div role='group' className={`divTab ${s.divTabEn}`} id='divTabSVi'>
        <table ref={tsv} className='tabProgCons noInvert' id='tabProgSVi' itemScope>
          <caption className='tabLegProg' id='tabLegProgSVi'>
            Sinais Vitais
          </caption>
          <colgroup className='tabColGrpProg' id='tabColGrpProgSVi'>
            {columns.map(nCol => (
              <Col ctx='ProgSVi' nCol={nCol} key={`col_svi__${nCol}}`} />
            ))}
          </colgroup>
          <thead className='tabTheadProg' id='tabTheadProgSVi'>
            <tr className='tabRowProg tabRowProgSVi' id='tabRowProgSVi1'>
              {columns.map(nCol => (
                <Th ctx='ProgSVi' nCol={nCol} nRow={1} key={`th_svi__${nCol}`} />
              ))}
            </tr>
          </thead>
          <tbody className='tbodyProgCons' id='tbodyProgSvi'>
            {rows.map(([nRow, lab], i) => (
              <tr className='tabRowProg tabRowProgSVi' id={`tabRowProgSVi${nRow}`} key={`tr_svi__${nRow}`}>
                <Th ctx='ProgSVi' nRow={nRow as number} nCol={i + 1} lab={lab as validTabLabs} />
                {[2, 3, 4].map(nCol => (
                  <Td
                    ctx='ProgSVi'
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
      <WatcherTab tabName='divTabSVi' />
    </ErrorBoundary>
  );
}
