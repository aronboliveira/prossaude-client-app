import { HrInpProps } from "@/lib/global/declarations/interfacesCons";
export default function TdSlotInput({ nHr, nRow, nCol, hourOrder, dayOrder }: HrInpProps): JSX.Element {
  return (
    <input
      className={`transparent-el lcPersist slotableDay opaque-bluish wid100 form-control inp${nHr}-00 inp-text-${nHr}-00`}
      placeholder='Horário Livre'
      id={`_${nHr}-00_${nCol}`}
      name={`date_${nHr}-00_${nCol}`}
      data-title={`${hourOrder} Horário, ${dayOrder} dia`}
      data-row={nRow}
      data-col={nCol}
    />
  );
}
