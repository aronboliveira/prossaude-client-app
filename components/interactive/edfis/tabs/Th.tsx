import { ThProps } from "@/lib/global/declarations/interfaces";

export default function Th({ nRow, nCol, ctx, lab }: ThProps): JSX.Element {
  return (
    <th
      className={`tabCelProgCons numConsTextHeadCel tabCel${ctx} tabCelRow${ctx}${nRow}`}
      id={`tabCelRow${ctx}${nRow}_${nCol}`}
      itemProp={`cel${ctx}`}
      data-row={nRow}
      data-column={nCol}
    >
      {lab ? lab : nCol > 1 && `${nCol - 1}ª Consulta`}
    </th>
  );
}
