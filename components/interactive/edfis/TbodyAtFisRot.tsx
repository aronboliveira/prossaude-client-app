"use client";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
export default function TbodyAtFisRot(): JSX.Element {
  return (
    <tbody className='tbodyAtFis noInvert' id='tbodyAtFisRot' itemProp='blockAtfisRot'>
      <tr className='tabRowAtFis tabRowAtFisRot' id='tabRowAtFisRot1' itemProp='rowAtFisRot'>
        <td className='tabCelAtFis tabCelAtFisRot' id='tabCelRowAtFisRot1_1' itemProp='celAtFisRot'></td>
        <td className='tabCelAtFis tabCelAtFisRot' id='tabCelRowAtFisRot1_2'>
          Pratica qual atividade física?
        </td>
        <td className='tabCelAtFis tabCelAtFisRot' id='tabCelRowAtFisRot1_3'>
          Quantas vezes por semana?
        </td>
        <td className='tabCelAtFis tabCelAtFisRot' id='tabCelRowAtFisRot1_4'>
          Quanto tempo por sessão, em minutos?
        </td>
        <td className='tabCelAtFis tabCelAtFisRot' id='tabCelRowAtFisRot1_5'>
          Há quanto tempo, em meses?
        </td>
      </tr>
      <tr className='tabRowAtFis tabRowAtFisRot' id='tabRowAtFisRotId2' itemProp='rowAtFisRot'>
        <td className='tabCelAtFis tabCelAtFisRot' id='tabCelRowAtFisRot2_1' itemProp='celAtFisRot'>
          1)
        </td>
        <td className='tabCelAtFis tabCelAtFisRot tabCelLeft' id='tabCelRowAtFisRot2_2' itemProp='celAtFisRot'>
          <input
            type='text'
            className='tabInpAtFisRot tabInpRowAtFisRot2 form-control noInvert minText'
            id='tabInpRowAtFisRot2_1'
            itemProp='inpAtFisRot'
            data-xls='Nome da Atividade Física Rotineira 1'
            data-title='Atividade_Fisica_Rotineira_Nome_1'
            data-reqlength='3'
            required
            onInput={ev => handleEventReq(ev.currentTarget)}
          />
        </td>
        <td className='tabCelAtFis tabCelAtFisRot tabCelLeft' id='tabCelRowAtFisRot2_3' itemProp='celAtFisRot'>
          <input
            type='number'
            minLength={1}
            maxLength={5}
            min='0'
            max='255'
            className='inpAtivFis tabInpAtFisRot tabInpRowAtFisRot2 form-control noInvert minText maxText minNum maxNum patternText'
            id='tabInpRowAtFisRot2_2'
            itemProp='inpAtFisRot'
            data-xls='Número de Semanas para a Atividade Física Rotineira 1'
            data-title='Atividade_Fisica_Rotineira_NSemana_1'
            data-reqlength='1'
            data-maxlength='3'
            data-minnum='0'
            data-maxnum='255'
            required
            onInput={ev => handleEventReq(ev.currentTarget)}
          />
        </td>
        <td className='tabCelAtFis tabCelAtFisRot' id='tabCelRowAtFisRot2_4' itemProp='celAtFisRot'>
          <input
            type='number'
            minLength={1}
            maxLength={7}
            min='0'
            max='65535'
            className='tabInpAtFisRot tabInpRowAtFisRot2 form-control noInvert minText maxText minNum maxNum patternText'
            id='tabInpRowAtFisRot2_3 sevenCharLongNum'
            itemProp='inpAtFisRot'
            data-xls='Tempo de Sessão Mínimo para Atividade Física Rotineira 1'
            data-title='Atividade_Fisica_Rotineira_SessãoMin_1'
            data-reqlength='1'
            data-maxlength='3'
            data-minnum='0'
            data-maxnum='65535'
            required
            onInput={ev => handleEventReq(ev.currentTarget)}
          />
        </td>
        <td className='tabCelAtFis tabCelAtFisRot tabCelRight' id='tabCelRowAtFisRot2_5' itemProp='celAtFisRot'>
          <input
            type='number'
            minLength={1}
            maxLength={7}
            min='0'
            max='65535'
            className='tabInpAtFisRot tabInpRowAtFisRot2 form-control noInvert minText maxText minNum maxNum patternText'
            id='tabInpRowAtFisRot2_4 sevenCharLongNum'
            itemProp='inpAtFisRot'
            data-xls='Número de Meses para a Atividade Física Rotineira 1'
            data-title='Atividade_Fisica_Rotineira_Meses_1'
            data-reqlength='1'
            data-maxlength='3'
            data-minnum='0'
            data-maxnum='65535'
            required
          />
        </td>
      </tr>
    </tbody>
  );
}
