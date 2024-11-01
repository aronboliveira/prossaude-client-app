export default function AntMedContainer(): JSX.Element {
  return (
    <div id='antMedContainer' role='group'>
      <div className='antMedBlock flexNoW' id='antMedBlock1' role='group'>
        <span role='group' className='divAntMedSpan spanMain spanAntMedText' id='antMedSpanInp1'>
          <label htmlFor='antMedId1' className='antMedLabel'>
            1)
            <input
              type='text'
              name='antMedName1'
              id='antMedId1'
              className='form-control autocorrect autocorrectFirst inpAntMed antMedText'
              data-title='desc_tratamento1'
              data-xls='Descrição de Tratamento 1'
            />
          </label>
        </span>
        <span role='group' className='divAntMedSpan spanMain spanAntMedDate' id='antMedSpanMainDate1'>
          <span role='group' className='divAntMedSubSpan spanSub spanSubAntMedDate' id='antMedSpanSubDate1'>
            <fieldset className='antMedDiv' role='group'>
              <label htmlFor='antMedDateIniId1' className='antMedLabel'></label>
              <div className='antMedDateDiv flexDiv' role='group'>
                <input
                  type='date'
                  name='antMedDateIniName1'
                  id='antMedDateIniId1'
                  className='form-control inpDate antMedDate inpAntMed'
                  data-title='data_ini_tratamento1'
                  data-xls='Início de Tratamento 1'
                  required
                />
                <span role='textbox'>até</span>
                <input
                  type='date'
                  name='antMedDateEndName1'
                  id='antMedDateEndId1'
                  className='form-control inpDate antMedDate inpAntMed'
                  data-title='data_end_tratamento1'
                  data-xls='Término de Tratamento 1'
                  required
                />
                <label htmlFor='antMedDateEndId1' className='antMedLabel'></label>
                <button type='button' className='datBtn atualTratBtn btn btn-secondary' id='atualTrat1DatBtn'>
                  Usar data atual
                </button>
              </div>
            </fieldset>
          </span>
        </span>
      </div>
    </div>
  );
}
