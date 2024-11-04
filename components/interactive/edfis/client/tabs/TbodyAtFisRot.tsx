"use client";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
export default function TbodyAtFisRot(): JSX.Element {
  return (
    <tbody className='tbodyAtFis noInvert' id='tbodyAtFisRot'>
      <tr className='tabRowAtFis tabRowAtFisRot' id='tabRowAtFisRot1'>
        <td className='tabCelAtFis tabCelAtFisRot' id='tabCelRowAtFisRot1_1'></td>
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
      <tr className='tabRowAtFis tabRowAtFisRot' id='tabRowAtFisRotId2'>
        <td className='tabCelAtFis tabCelAtFisRot' id='tabCelRowAtFisRot2_1'>
          1)
        </td>
        <td className='tabCelAtFis tabCelAtFisRot tabCelLeft' id='tabCelRowAtFisRot2_2'>
          <input
            type='text'
            className='tabInpAtFisRot tabInpRowAtFisRot2 form-control noInvert minText'
            placeholder='Preencha aqui o nome da Atividade Física Rotineira 1'
            id='tabInpRowAtFisRot2_1'
            data-xls='Nome da Atividade Física Rotineira 1'
            data-title='Atividade_Fisica_Rotineira_Nome_1'
            data-reqlength='3'
            required
            onInput={ev => handleEventReq(ev.currentTarget)}
          />
        </td>
        <td className='tabCelAtFis tabCelAtFisRot tabCelLeft' id='tabCelRowAtFisRot2_3'>
          <input
            type='number'
            placeholder='Preencha aqui o Número de Semanas para a Atividade Física Rotineira 1'
            minLength={1}
            maxLength={5}
            min='0'
            max='255'
            className='inpAtivFis tabInpAtFisRot tabInpRowAtFisRot2 form-control noInvert minText maxText minNum maxNum patternText'
            id='tabInpRowAtFisRot2_2'
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
        <td className='tabCelAtFis tabCelAtFisRot' id='tabCelRowAtFisRot2_4'>
          <input
            type='number'
            placeholder='Preencha aqui o Tempo de Sessão da Atividade Física Rotineira 1'
            minLength={1}
            maxLength={7}
            min='0'
            max='32767'
            className='tabInpAtFisRot tabInpRowAtFisRot2 form-control noInvert minText maxText minNum maxNum patternText'
            id='tabInpRowAtFisRot2_3 sevenCharLongNum'
            data-xls='Tempo de Sessão Mínimo para Atividade Física Rotineira 1'
            data-title='Atividade_Fisica_Rotineira_SessãoMin_1'
            data-reqlength='1'
            data-maxlength='3'
            data-minnum='0'
            data-maxnum='32767'
            required
            onInput={ev => handleEventReq(ev.currentTarget)}
          />
        </td>
        <td className='tabCelAtFis tabCelAtFisRot tabCelRight' id='tabCelRowAtFisRot2_5'>
          <input
            type='number'
            placeholder='Preencha aqui o Número de Meses para a Atividade Física Rotineira 1'
            minLength={1}
            maxLength={7}
            min='0'
            max='32767'
            className='tabInpAtFisRot tabInpRowAtFisRot2 form-control noInvert minText maxText minNum maxNum patternText'
            id='tabInpRowAtFisRot2_4 sevenCharLongNum'
            data-xls='Número de Meses para a Atividade Física Rotineira 1'
            data-title='Atividade_Fisica_Rotineira_Meses_1'
            data-reqlength='1'
            data-maxlength='3'
            data-minnum='0'
            data-maxnum='32767'
            required
          />
        </td>
      </tr>
    </tbody>
  );
}
