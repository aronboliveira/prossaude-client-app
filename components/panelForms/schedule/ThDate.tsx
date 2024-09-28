"use client";
export default function ThDate({ nCol = NaN, last = false }: { nCol: number; last?: boolean }): JSX.Element {
  const fullName = ((): string => {
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
        return "Nono";
      case 10:
        return "Décimo";
      default:
        return "Indefinido";
    }
  })();
  return (
    <th className={last ? `tabCel lastConsDayCont` : ""} scope='col' data-row='1' data-col={nCol}>
      <label
        className='consWeekday'
        htmlFor='order_dayfInp'
        contentEditable={true}
        data-row='1'
        data-col={nCol}></label>
      <div role='group' className='flexAlItCt'>
        <input
          type='date'
          className='form-control dayTabRef lcPersist noInvert flScape90'
          id='order_dayfInp'
          name={`date_h_1_${nCol}`}
          data-title={`${fullName} dia do mês`}
          data-row='1'
          data-col={nCol}
        />
        <span role='textbox' className='alertSpan flexBasis10 widMax10C widMin3C'></span>
      </div>
    </th>
  );
}
