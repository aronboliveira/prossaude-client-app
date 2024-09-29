import { ErrorBoundary } from "react-error-boundary";
import { validTabLabs } from "@/lib/global/declarations/types";
import Col from "./tabs/Col";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import Td from "./tabs/Td";
import Th from "./tabs/Th";
import WatcherTab from "./client/tabs/WatcherTab";
export default function TabProgSVi(): JSX.Element {
  const columns = [1, 2, 3, 4];
  const rows = [
    [2, "PA"],
    [3, "FC"],
  ];
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error rendering Table for Vital Signs" />
      )}
    >
      <div role="group" className="divTab" id="divTabSVi">
        <table className="tabProgCons noInvert" id="tabProgSVi" itemScope>
          <caption
            className="tabLegProg"
            id="tabLegProgSVi"
            itemProp="headerSVi"
          >
            Sinais Vitais
          </caption>
          <colgroup
            className="tabColGrpProg"
            id="tabColGrpProgSVi"
            itemProp="blockSVi"
          >
            {columns.map(nCol => (
              <Col ctx="ProgSVi" nCol={nCol} key={`col_svi__${nCol}}`} />
            ))}
          </colgroup>
          <thead
            className="tabTheadProg"
            id="tabTheadProgSVi"
            itemProp="blockSVi"
          >
            <tr
              className="tabRowProg tabRowProgSVi"
              id="tabRowProgSVi1"
              itemProp="rowSVi"
            >
              {columns.map(nCol => (
                <Th
                  ctx="ProgSVi"
                  nCol={nCol}
                  nRow={1}
                  key={`th_svi__${nCol}`}
                />
              ))}
            </tr>
          </thead>
          <tbody
            className="tbodyProgCons"
            id="tbodyProgSvi"
            itemProp="blockSVi"
          >
            {rows.map(([nRow, lab], i) => (
              <tr
                className="tabRowProg tabRowProgSVi"
                id={`tabRowProgSVi${nRow}`}
                itemProp="rowSVi"
                key={`tr_svi__${nRow}`}
              >
                <Th
                  ctx="ProgSVi"
                  nRow={nRow as number}
                  nCol={i + 1}
                  lab={lab as validTabLabs}
                />
                {[2, 3, 4].map(nCol => (
                  <Td
                    ctx="ProgSVi"
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
      <WatcherTab tabName="divTabSVi" />
    </ErrorBoundary>
  );
}
