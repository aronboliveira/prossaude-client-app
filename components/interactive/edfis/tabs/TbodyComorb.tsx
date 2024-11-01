export default function TbodyComorb(): JSX.Element {
  return (
    <tbody>
      <tr className='tabRowComorb' id='tabRowComorb1'>
        <td className={`tabCelComorb tabCelRowComorb1 tdNum`} id='tabCelRowComorb1_1'></td>
        <td className='tabCelComorb tabCelLeft tabCelRowComorb1 tdInpComorb noInvert' id='tabCelRowComorb1_2'>
          Nome da Comorbidade
        </td>
        <td className='tabCelComorb tabCelRight tabCelRowComorb1 tdInpComorb noInvert' id='tabCelRowComorb1_3'>
          Data de Diagnóstico
        </td>
      </tr>
      <tr className='tabRowComorb' id='tabRowComorb2'>
        <td className={`tabCelComorb tabCelRowComorb2 tdNum noInvert`} id='tabCelRowComorb2_1'>
          1
        </td>
        <td className='tabCelComorb tabCelLeft tabCelRowComorb2 tdInpComorb' id='tabCelRowComorb2_2'>
          <input
            type='text'
            className='tabInpComorb tabInpRowComorb2 form-control'
            id='tablInpRowComorb2_2'
            data-title='Comorbidade_1_nome'
            required
          />
        </td>
        <td className='tabCelComorb tabCelRight tabCelRowComorb2 tdInpComorb' id='tabCelRowComorb2_3'>
          <input
            type='date'
            className='tabInpComorb tabInpRowComorb2 form-control'
            id='tablInpRowComorb2_3'
            data-title='Comorbidade_1_data_de_Diagnostico'
            required
          />
        </td>
      </tr>
    </tbody>
  );
}
