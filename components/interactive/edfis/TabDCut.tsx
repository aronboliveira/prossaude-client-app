import { ErrorBoundary } from "react-error-boundary";
import { validTabLabs } from "@/lib/global/declarations/types";
import Col from "./tabs/Col";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import Td from "./tabs/Td";
import Th from "./tabs/Th";
import WatcherTab from "./client/tabs/WatcherTab";
export default function TabDCut(): JSX.Element {
  const columns = [1, 2, 3, 4],
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
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error rendering Table for Skin Folds' />}>
      <div role='group' className='divTab' id='divTabDobrCut'>
        <table className='tabProgCons noInvert' id='tabDCut' itemScope>
          <caption className='tabLegProgCons' id='tabLegDCut' itemProp='capDCut'>
            Dobras Cutâneas
          </caption>
          <colgroup className='tabLegProgCons' id='tabColGrpDCut' itemProp='blockDCut'>
            {columns.map(nCol => (
              <Col ctx='DCut' nCol={nCol} key={`col_dcut_${nCol}`} />
            ))}
          </colgroup>
          <thead className='tabTheadProgCons' id='tabTheadDCut' itemProp='blockDCut'>
            <tr className='tabRowProgCons tabRowDCutCons' id='tabRowDCut1' itemProp='rowDCut' data-row='1'>
              {columns.map(nCol => (
                <Th ctx='DCut' nCol={nCol} nRow={1} key={`th_dcut_${nCol}`} />
              ))}
            </tr>
          </thead>
          <tbody className='tbodyProgCons' id='tbodyDCut' itemProp='blockDCut'>
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
