import { ThProps } from "@/lib/global/declarations/interfaces";
import sEn from "@/styles//modules/enStyles.module.scss";
export default function Th({ nRow, nCol, ctx, lab }: ThProps): JSX.Element {
  return (
    <th
      className={`tabCelProgCons tabCel${ctx} tabCelRow${ctx}${nRow} ${
        nRow === 1 && nCol > 1 ? `${`numConsTextHeadCel ${sEn.numConsTextHeadCel}`}` : ""
      }`}
      id={`tabCelRow${ctx}${nRow}_${nCol}`}
      itemProp={`cel${ctx}`}
      data-row={nRow}
      data-col={nCol}>
      {lab ? lab : nCol > 1 && `${nCol - 1}ª Consulta`}
    </th>
  );
}
