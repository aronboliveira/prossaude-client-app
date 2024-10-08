"use client";
import { HrCelProps } from "@/lib/global/declarations/interfacesCons";
import EraseAptBtn from "./EraseAptBtn";
import TdSlotInput from "./TdSlotInput";
export default function TdBSchedTab({ nHr, nRow, nCol, last = false }: HrCelProps): JSX.Element {
  const dayOrder = ((): string => {
      switch (nCol) {
        case 1:
          return "Primeiro";
        case 2:
          return "Segundo";
        case 3:
          return "Terceiro";
        case 4:
          return "Quarto";
        case 5:
          return "Quinto";
        case 6:
          return "Sexto";
        case 7:
          return "Sétimo";
        case 8:
          return "Oitavo";
        case 9:
          return "Nono (ignorar se 01)";
        case 10:
          return "Décimo";
        default:
          return "Indefinido";
      }
    })(),
    hourOrder = ((): string => {
      switch (nRow) {
        case 1:
          return "Primeiro";
        case 2:
          return "Segundo";
        case 3:
          return "Terceiro";
        case 4:
          return "Quarto";
        default:
          return "Indefinido";
      }
    })();
  return (
    <td className={`tabCel${last ? " lastConsDayCont" : ""}`} data-col={nCol} data-row={nRow}>
      <slot
        className={`consSlot lcPersist htFull wid90 flexNoW cGap2v slot${nHr}`}
        id={`slot_${nHr}-00_${nCol}`}
        data-row={nRow}
        data-col={nCol}>
        <TdSlotInput nHr={nHr} nCol={nCol} nRow={nRow} dayOrder={dayOrder} hourOrder={hourOrder} />
        <div role='group' className='flexNoWC flexAlItCt'>
          <input
            type='checkbox'
            className={`form-check-input apptCheck redMg checkGreen invtSignal dkGreen lcPersist inp${nHr}-00 inp-cb-${nHr}-00`}
            id={`check_${nHr}-00_${nCol}`}
            name={`date_conf_${nHr}-00_${nCol}`}
            title='Confirme aqui o agendamento relativo'
            data-title={`Confirmação do ${hourOrder} Horário, ${dayOrder} dia`}
            data-row={nRow}
            data-col={nCol}
          />
          <EraseAptBtn />
        </div>
      </slot>
    </td>
  );
}
