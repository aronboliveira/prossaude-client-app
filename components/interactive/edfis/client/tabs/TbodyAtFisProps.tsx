"use client";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
export default function TbodyAtFisProps(): JSX.Element {
  return (
    <tbody className='tbodyAtFis noInvert' id='tbodyAtFisProp'>
      <tr className='tabRowAtFis tabRowAtFisProp' id='tabRowAtFisProp1'>
        <td className='tabCelAtFis tabCelAtFisProp' id='tabCelRowAtFisProp1_1'></td>
        <td className='tabCelAtFis tabCelAtFisProp' id='tabCelRowAtFisProp1_2'>
          Qual atividade?
        </td>
        <td className='tabCelAtFis tabCelAtFisProp' id='tabCelRowAtFisProp1_3'>
          Quantas vezes por semana?
        </td>
        <td className='tabCelAtFis tabCelAtFisProp' id='tabCelRowAtFisProp1_4'>
          Quanto tempo por sessão, em minutos?
        </td>
        <td className='tabCelAtFis tabCelAtFisProp' id='tabCelRowAtFisProp1_5'>
          Por quanto tempo, em meses?
        </td>
      </tr>
      <tr className='tabRowAtFis tabRowAtFisProp' id='tabRowAtFisPropId2'>
        <td className='tabCelAtFis tabCelAtFisProp' id='tabCelRowAtFisProp2_1'>
          1)
        </td>
        <td className='tabCelAtFis tabCelAtFisProp tabCelLeft' id='tabCelRowAtFisProp2_2'>
          <input
            type='text'
            placeholder='Preencha aqui o nome da Atividade Física Proposta 1'
            className='tabInpAtFisProp tabInpRowAtFisProp2 form-control noInvert min46_900'
            id='tabInpRowAtFisProp2_1'
            data-xls='Nome da Atividade Física Proposta 1'
            data-title='Atividade_Fisica_Proposta_Nome_1'
            data-reqlength='3'
            required
            onInput={ev => handleEventReq(ev.currentTarget)}
          />
        </td>
        <td className='tabCelAtFis tabCelAtFisProp tabCelLeft' id='tabCelRowAtFisProp2_3'>
          <input
            type='number'
            placeholder='Preencha aqui o Número de Semanas para a Atividade Física Proposta 1'
            minLength={1}
            maxLength={5}
            min='0'
            max='255'
            className='inpAtivFis tabInpAtFisProp tabInpRowAtFisProp2 form-control noInvert'
            id='tabInpRowAtFisProp2_2'
            data-xls='Número de Semanas para a Atividade Física Proposta 1'
            data-title='Atividade_Fisica_Proposta_NSemana_1'
            data-reqlength='1'
            data-maxlength='3'
            data-minnum='0'
            data-maxnum='255'
            required
            onInput={ev => handleEventReq(ev.currentTarget)}
          />
        </td>
        <td className='tabCelAtFis tabCelAtFisProp' id='tabCelRowAtFisProp2_4'>
          <input
            type='number'
            placeholder='Preencha aqui o Tempo de Sessão da Atividade Física Proposta 1'
            minLength={1}
            maxLength={7}
            min='0'
            max='65535'
            className='tabInpAtFisProp tabInpRowAtFisProp2 form-control noInvert'
            id='tabInpRowAtFisProp2_3 sevenCharLongNum'
            data-xls='Tempo de Sessão Mínimo para Atividade Física Proposta 1'
            data-title='Atividade_Fisica_Proposta_SessãoMin_1'
            data-reqlength='1'
            data-maxlength='3'
            data-minnum='0'
            data-maxnum='65535'
            required
            onInput={ev => handleEventReq(ev.currentTarget)}
          />
        </td>
        <td className='tabCelAtFis tabCelAtFisProp tabCelRight' id='tabCelRowAtFisProp2_5'>
          <input
            type='number'
            placeholder='Preencha aqui o Número de Meses para a Atividade Física Proposta 1'
            minLength={1}
            maxLength={7}
            min='0'
            max='65535'
            className='tabInpAtFisProp tabInpRowAtFisProp2 form-control noInvert'
            id='tabInpRowAtFisProp2_4 sevenCharLongNum'
            data-xls='Número de Meses para a Atividade Física Proposta 1'
            data-title='Atividade_Fisica_Proposta_Meses_1'
            data-reqlength='1'
            data-maxlength='3'
            data-minnum='0'
            data-maxnum='65535'
            required
            onInput={ev => handleEventReq(ev.currentTarget)}
          />
        </td>
      </tr>
    </tbody>
  );
}
