import { ErrorBoundary } from "react-error-boundary";
import Col from "./tabs/Col";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import Td from "./tabs/Td";
import Th from "./tabs/Th";
import WatcherTab from "./client/tabs/WatcherTab";
import { validTabLabs } from "@/lib/global/declarations/types";
export default function TabIndPerc(): JSX.Element {
  const columns = [1, 2, 3, 4];
  const rows = [
    [2, "IMC"],
    [3, "MLG"],
    [4, "PGC"],
    [5, "TMB"],
    [6, "GET"],
  ];
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error rendering Table for Indexes' />}>
      <div role='group' className='divTab' id='divTabInd'>
        <table className='tabProgCons noInvert' id='tabIndPerc'>
          <colgroup>
            {columns.map(nCol => (
              <Col ctx='IndPerc' nCol={nCol} key={`col_ind-perc__${nCol}`} />
            ))}
          </colgroup>
          <caption className='tabLegProgCons'>Índices e Percentuais Corporais</caption>
          <thead>
            <tr className='tabRowProg tabRowProgIndPerc' id='tabRowProgIndPerc1' itemProp='rowIndPerc'>
              {columns.map(nCol => (
                <Th ctx='IndPerc' nCol={nCol} nRow={1} key={`th_ind-perc__${nCol}`} />
              ))}
            </tr>
          </thead>
          <tbody className='tbodyProgCons'>
            {rows.map(([nRow, lab], i) => (
              <tr
                className={`tabRowProg tabRowProgIndPerc`}
                id={`tabRowProgIndPerc${nRow}`}
                itemProp='rowIndPerc'
                data-row={nRow}
                key={`tr_ind-perc__${nRow}`}>
                <Th ctx='IndPerc' nRow={nRow as number} nCol={i + 1} lab={lab as validTabLabs} />
                {columns.slice(1).map(nCol => (
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
          </tbody>
        </table>
      </div>
      <WatcherTab tabName='divTabInd' />
    </ErrorBoundary>
  );
}
