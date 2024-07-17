export default function HeaderDate(): JSX.Element {
  return (
    <span role="group" className="control flexJSt flexQ900NoW" id="spanHFlex">
      <input
        type="date"
        className="form-control d-ibl minCurrDate"
        id="dateHeader"
        placeholder="Date"
        data-title="data_cabecalho"
      />
      <button
        type="button"
        className="datBtn d-ibl btn btn-secondary"
        id="headerDatBtn"
      >
        Usar data atual
      </button>
    </span>
  );
}
