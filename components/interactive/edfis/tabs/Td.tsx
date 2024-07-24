import { TdProps } from "@/lib/global/declarations/interfaces";
import TabInpProg from "../client/tabs/TabInpProg";
import TabBtnDCut from "../client/tabs/TabBtnDCut";
import { textTransformPascal } from "@/lib/global/gModel";
import TabBtnInd from "../client/tabs/TabBtnInd";
import LockTabInd from "./LobTackInd";

export default function Td({ nRow, nCol, ctx, lab }: TdProps): JSX.Element {
  const pascalLab = textTransformPascal(lab);
  return (
    <td
      className={`tabCelProgCons tabCel${ctx} tabCelRow${ctx}${nRow}`}
      id={`tabCelRow${ctx}${nRow}_${nCol}`}
      itemProp={`${lab.toLowerCase()}Num`}
      data-row={nRow}
      data-col={nCol}
    >
      {ctx === "IndPerc" ? (
        <div
          role="group"
          className={`flexDiv flexDivTab flexAlItCt noInvert div${ctx} div${lab}`}
        >
          <label
            htmlFor={`inp${pascalLab}${nCol - 1}Cel${nRow}_${nCol}`}
            id={`lab${pascalLab}${nCol - 1}Cel${nRow}_${nCol}`}
            className={`form-control tabLabProgCons tabLabRow${ctx}${nRow} labInd lab${pascalLab}`}
            data-row={nRow}
            data-col={nCol}
          >
            <TabInpProg nRow={nRow} nCol={nCol} ctx={ctx} lab={lab} />
            <p className={`msrProgCons indMsr`}>mm</p>
          </label>
          <TabBtnInd nRow={nRow} nCol={nCol} lab={lab} />
          <LockTabInd addGroup={["lockTabInd"]} ctx={lab} />
        </div>
      ) : (
        (() => {
          if (ctx === "MedAnt")
            return (
              <label
                htmlFor={`tabInpRow${ctx}${nRow}_${nCol}`}
                id={`labInpRow${ctx}${nRow}_${nCol}`}
                className={`form-control tabLabProgCons tabLabRow${ctx}${nRow}`}
                data-row={nRow}
                data-col={nCol}
              >
                <TabInpProg nRow={nRow} nCol={nCol} ctx={ctx} lab={lab} />
                <p className={`msrProgCons`}>mm</p>
              </label>
            );
          else
            return (
              <label
                htmlFor={`tabInpRow${ctx}${nRow}_${nCol}`}
                id={`labInpRow${ctx}${nRow}_${nCol}`}
                className={`form-control tabLabProgCons tabLabRow${ctx}${nRow}`}
                data-row={nRow}
                data-col={nCol}
              >
                <TabInpProg nRow={nRow} nCol={nCol} ctx={ctx} lab={lab} />
                <p
                  className={`msrProgCons${
                    ctx === "DCut" && lab === "Soma" ? " sumMsr" : ""
                  }`}
                >
                  mm
                </p>
                {ctx === "DCut" && lab === "Soma" ? (
                  <TabBtnDCut nCol={nCol}></TabBtnDCut>
                ) : (
                  <></>
                )}
              </label>
            );
        })()
      )}
    </td>
  );
}
