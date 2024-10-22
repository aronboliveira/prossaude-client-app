import { TdProps } from "@/lib/global/declarations/interfaces";
import { textTransformPascal } from "@/lib/global/gModel";
import LockTabInd from "./LobTackInd";
import TabBtnDCut from "../client/tabs/TabBtnDCut";
import TabBtnInd from "../client/tabs/TabBtnInd";
import TabInpProg from "../client/tabs/TabInpProg";
import TabInpSvi from "../client/tabs/TabInpSvi";
import sEn from "@/styles/locals/modules/enStyles.module.scss";
export default function Td({ nRow, nCol, ctx, lab }: TdProps): JSX.Element {
  const pascalLab = textTransformPascal(lab);
  return (
    <td
      className={`tabCelProgCons tabCel${ctx} tabCelRow${ctx}${nRow}`}
      id={`tabCelRow${ctx}${nRow}_${nCol}`}
      data-row={nRow}
      data-col={nCol}>
      {ctx === "IndPerc" ? (
        <div
          role='group'
          className={`flexDiv flexDivTab flexAlItCt noInvert div${ctx} div${lab} ${sEn.flexDivEn} ${sEn.flexDivTab}`}>
          <label
            htmlFor={`inp${pascalLab}${nCol - 1}Cel${nRow}_${nCol}`}
            id={`lab${pascalLab}${nCol - 1}Cel${nRow}_${nCol}`}
            className={`form-control tabLabProgCons tabLabRow${ctx}${nRow} labInd lab${pascalLab} ${sEn.tabLabProgCons} ${sEn.formControl}`}
            data-row={nRow}
            data-col={nCol}>
            <TabInpProg nRow={nRow} nCol={nCol} ctx={ctx} lab={lab} />
            <p className={`${sEn.msrProgCons} ${sEn.indMsr}`}>
              {lab === "MLG" || lab === "PGC" ? "%" : lab === "TMB" || lab === "GET" ? "kcal" : "—"}
            </p>
          </label>
          <TabBtnInd nRow={nRow} nCol={nCol} lab={lab} />
          <LockTabInd addGroup={["lockTabInd"]} ctx={lab} />
        </div>
      ) : (
        ((): JSX.Element => {
          if (ctx === "MedAnt")
            return (
              <label
                htmlFor={`tabInpRow${ctx}${nRow}_${nCol}`}
                id={`labInpRow${ctx}${nRow}_${nCol}`}
                className={`form-control tabLabProgCons tabLabRow${ctx}${nRow} ${sEn.tabLabProgCons} ${sEn.formControl}`}
                data-row={nRow}
                data-col={nCol}>
                <TabInpProg nRow={nRow} nCol={nCol} ctx={ctx} lab={lab} />
                <p className={`${sEn.msrProgCons}`}>{/peso|weight/gi.test(lab) ? "kg" : "cm"}</p>
              </label>
            );
          else if (ctx === "DCut") {
            return (
              <label
                htmlFor={`tabInpRow${ctx}${nRow}_${nCol}`}
                id={`labInpRow${ctx}${nRow}_${nCol}`}
                className={`form-control tabLabProgCons tabLabRow${ctx}${nRow} ${sEn.tabLabProgCons} ${sEn.formControl}`}
                data-row={nRow}
                data-col={nCol}>
                <TabInpProg nRow={nRow} nCol={nCol} ctx={ctx} lab={lab} />
                <p className={`${sEn.msrProgCons}${lab === "Soma" ? ` ${sEn.sumMsr}` : ""}`}>mm</p>
                {lab === "Soma" ? <TabBtnDCut nCol={nCol}></TabBtnDCut> : <></>}
              </label>
            );
          } else {
            return (
              <label
                htmlFor={`tabInpRow${ctx}${nRow}_${nCol}`}
                id={`labInpRow${ctx}${nRow}_${nCol}`}
                className={`form-control tabLabProgCons tabLabRow${ctx}${nRow} ${sEn.tabLabProgCons} ${sEn.formControl}`}
                data-row={nRow}
                data-col={nCol}>
                <TabInpSvi nRow={nRow} nCol={nCol} ctx={ctx} lab={lab} />
                <p className={`${sEn.msrProgCons}`}>mm</p>
              </label>
            );
          }
        })()
      )}
    </td>
  );
}
