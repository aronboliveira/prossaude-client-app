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
export default function TabIndPerc({
  children = <></>,
  columns,
}: {
  children: JSX.Element;
  columns: number[];
}): JSX.Element {
  let tip: NlMRef<nlTab> = null;
  const ctx1 = useContext<FspCtxProps>(FspCtx);
  if (ctx1?.refs) ({ tip } = ctx1.refs);
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error rendering Table for Indexes' />}>
      <div role='group' className={`divTab ${s.divTabEn}`} id='divTabInd'>
        <table ref={tip} className='tabProgCons noInvert' id='tabIndPerc'>
          <colgroup>
            {columns.map(nCol => (
              <Col ctx='IndPerc' nCol={nCol} key={`col_ind-perc__${nCol}`} />
            ))}
          </colgroup>
          <caption className='tabLegProgCons'>Índices e Percentuais Corporais</caption>
          <thead>
            <tr className='tabRowProg tabRowProgIndPerc' id='tabRowProgIndPerc1'>
              {columns.map(nCol => (
                <Th ctx='IndPerc' nCol={nCol} nRow={1} key={`th_ind-perc__${nCol}`} />
              ))}
            </tr>
          </thead>
          <tbody className='tbodyProgCons'>{children}</tbody>
        </table>
      </div>
      <WatcherTab tabName='divTabInd' />
    </ErrorBoundary>
  );
}
