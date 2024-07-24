import { ErrorBoundary } from "react-error-boundary";
import Col from "./tabs/Col";
import Th from "./tabs/Th";
import WatcherTab from "./client/tabs/WatcherTab";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import { validTabLabs } from "@/lib/global/declarations/types";
import Td from "./tabs/Td";

export default function TabMedAnt(): JSX.Element {
  const columns = [1, 2, 3, 4];
  const rows = [
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
  ];
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error rendering Table for Measures" />
      )}
    >
      <div role="group" className="divTab" id="divTabMedAnt">
        <table className="tabProgCons noInvert" id="tabMedAnt" itemScope>
          <caption
            className="tabLegProgCons"
            id="tabLegMedAnt"
            itemProp="headerMedAnt"
          >
            Medidas Antropométricas (exceto Dobras Cutâneas)
          </caption>
          <colgroup
            className="tabLegProgCons"
            id="tabColGrpMedAnt"
            itemProp="blockMedAnt"
          >
            {columns.map(nCol => (
              <Col ctx="MedAnt" nCol={nCol} />
            ))}
          </colgroup>
          <thead
            className="tabTheadProgCons"
            id="tabTheadMedAnt"
            itemProp="blockMedAnt"
          >
            <tr
              className="tabRowProgCons tabRowMedAnt"
              id="tabRowMedAnt1"
              itemProp="rowMedAnt"
              data-row="1"
            >
              {columns.map(nCol => (
                <Th ctx="MedAnt" nCol={nCol} nRow={1} />
              ))}
            </tr>
          </thead>
          <tbody
            className="tbodyProgCons"
            id="tbodyMedAnt"
            itemProp="blockMedAnt"
          >
            {rows.map(([nRow, lab], i) => (
              <tr
                className="tabRowProgCons tabRowMedAnt"
                id={`tabRowMedAnt${nRow}`}
                itemProp="rowMedAnt"
                data-row={nRow}
                key={`tr_med-ant__${nRow}`}
              >
                <Th
                  ctx="MedAnt"
                  nRow={nRow as number}
                  nCol={i + 1}
                  lab={lab as validTabLabs}
                />
                {[2, 3, 4].map(nCol => (
                  <Td
                    ctx="MedAnt"
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
      <WatcherTab tabName="divTabMedAnt" />
    </ErrorBoundary>
  );
}
