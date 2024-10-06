import { HistoricRowProps } from "@/lib/global/declarations/interfacesCons";
import { dateISOtoBRL } from "@/lib/global/gModel";
export default function PrevConsRow({ historic, nRow, name = "Anônimo" }: HistoricRowProps): JSX.Element {
  const typeFullName = ((): string => {
    switch (historic.type) {
      case "acompanhamento":
        return "Acompanhamento Geral";
      case "analise":
        return "Análise de Exames Bioquímicos";
      case "anamnese":
        return "Anamnese e Exame Clínico";
      case "avaliacao":
        return "Avaliação Antropométrica";
      case "diagnostico":
        return "Diagnóstico Nutricional";
      case "exodontia":
        return "Exodontia";
      case "profilaxia":
        return "Profilaxia e Orientação";
      case "raspagem":
        return "Raspagem";
      case "rcarie":
        return "Remoção de Cárie";
      case "recordatorio":
        return "Recordatório Alimentar";
      case "retorno":
        return "Retorno e Reavaliação";
      case "suplementacao":
        return "Suplementação e Plano Alimentar";
      default:
        if (
          (historic.type as any) === "Acompanhamento Geral" ||
          (historic.type as any) === "Análise de Exames Bioquímicos" ||
          (historic.type as any) === "Anamnese e Exame Clínico" ||
          (historic.type as any) === "Avaliação Antropométrica" ||
          (historic.type as any) === "Diagnóstico Nutricional" ||
          (historic.type as any) === "Exodontia" ||
          (historic.type as any) === "Profilaxia e Orientação" ||
          (historic.type as any) === "Raspagem" ||
          (historic.type as any) === "Remoção de Cárie" ||
          (historic.type as any) === "Recordatório Alimentar" ||
          (historic.type as any) === "Retorno e Reavaliação" ||
          (historic.type as any) === "Suplementação e Plano Alimentar"
        )
          return historic.type;
        else return "Indefinido";
    }
  })();
  return (
    <tr id={`prevCons-row${nRow}`} data-row={nRow}>
      <td className='celNamePrevCons' data-row={nRow} data-col={1}>
        <output
          className={`outputPrevCons outputPrevConsPac${nRow - 1} outputPrevConsPac${name}`}
          id={`outpNamePrevCons-${nRow}`}
          data-title={`Nome de Paciente no Histórico ${nRow}`}
          data-row={nRow}
          data-col={1}>
          {name}
        </output>
      </td>
      <td className='celDatePrevCons' data-row={nRow} data-col={2}>
        <output
          className={`outputPrevCons outputPrevConsPac${nRow - 1} outputPrevConsPac${name}`}
          id={`outpDatePrevCons-${nRow}`}
          data-title={`Data de Consulta no Histórico ${nRow}`}
          data-row={nRow}
          data-col={2}>
          {dateISOtoBRL(historic.day)}
        </output>
      </td>
      <td className='celTypePrevCons' data-row={nRow} data-col={3}>
        <output
          className={`outputPrevCons outputPrevConsPac${nRow} outputPrevConsPac${name}`}
          id={`outpTypePrevCons-${nRow}`}
          data-title={`Tipo de Consulta no Histórico ${nRow}`}
          data-row={nRow}
          data-col={3}>
          {typeFullName}
        </output>
      </td>
      <td className='celProfPrevCons' data-row={nRow} data-col={4}>
        <output
          className={`outputPrevCons outputPrevConsPac${nRow - 1} outputPrevConsPac${name}`}
          id={`outpProfPrevCons-${nRow}`}
          data-title={`Estudante de Consulta no Histórico ${nRow}`}
          data-row={nRow}
          data-col={4}>
          {historic.prof || "Anônimo"}
        </output>
      </td>
      <td className='celStudPrevCons' data-row={nRow} data-col={5}>
        <output
          className={`outputPrevCons outputPrevConsPac${nRow - 1} outputPrevConsPac${name}`}
          id={`outpStudPrevCons-${nRow}`}
          data-title={`Estudante de Consulta no Histórico ${nRow}`}
          data-row={nRow}
          data-col={5}>
          {historic.stud || "Anônimo"}
        </output>
      </td>
      <td className='celNotesPrevCons' data-row={nRow} data-col={6}>
        <output
          className={`outputPrevCons outputPrevConsPac${nRow - 1} outputPrevConsPac${name}`}
          id={`outpNotesPrevCons-${nRow}`}
          data-title={`Notas de Consulta no Histórico ${nRow} (${typeFullName})`}
          data-row={nRow}
          data-col={6}>
          {historic.notes || "Sem observações"}
        </output>
      </td>
    </tr>
  );
}
