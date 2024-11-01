import { ErrorBoundary } from "react-error-boundary";
import Col from "./Col";
import GenericErrorComponent from "../../../error/GenericErrorComponent";
import Th from "./Th";
import WatcherTab from "../client/tabs/WatcherTab";
import s from "@/styles//modules/sharedComponents.module.scss";
import { NlMRef, nlTab } from "@/lib/global/declarations/types";
import { useContext } from "react";
import { FspCtxProps } from "@/lib/global/declarations/interfaces";
import { FspCtx } from "../client/FsProgCons";
export default function TabMedAnt({ children = <></> }: { children: JSX.Element }): JSX.Element {
  let tma: NlMRef<nlTab> = null;
  const columns = [1, 2, 3, 4],
    ctx1 = useContext<FspCtxProps>(FspCtx);
  if (ctx1?.refs) ({ tma } = ctx1.refs);
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error rendering Table for Measures' />}>
      <div role='group' className={`divTab ${s.divTabEn}`} id='divTabMedAnt'>
        <table ref={tma} className='tabProgCons noInvert' id='tabMedAnt' itemScope>
          <caption className='tabLegProgCons' id='tabLegMedAnt'>
            Medidas Antropométricas (exceto Dobras Cutâneas)
          </caption>
          <colgroup className='tabLegProgCons' id='tabColGrpMedAnt'>
            {columns.map(nCol => (
              <Col ctx='MedAnt' nCol={nCol} key={`col_med-ant__${nCol}`} />
            ))}
          </colgroup>
          <thead className='tabTheadProgCons' id='tabTheadMedAnt'>
            <tr className='tabRowProgCons tabRowMedAnt' id='tabRowMedAnt1' data-row='1'>
              {columns.map(nCol => (
                <Th ctx='MedAnt' nCol={nCol} nRow={1} key={`th__med-ant__${nCol}`} />
              ))}
            </tr>
          </thead>
          <tbody className='tbodyProgCons' id='tbodyMedAnt'>
            {children}
          </tbody>
        </table>
      </div>
      <WatcherTab tabName='divTabMedAnt' />
    </ErrorBoundary>
  );
}
