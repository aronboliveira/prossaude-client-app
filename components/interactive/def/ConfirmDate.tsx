export default function ConfirmDate(): JSX.Element {
  return (
    <label
      htmlFor="confirmDatId"
      className="labConfirm labDivConfirm2 pdT2pc900Q htFull900Q flexNoWC htHalf900Q bolded"
      id="labConfirmDate"
    >
      <span>Data:</span>
      <div
        className="widFull flexQ900NoW htFull900Q"
        id="divConfirmDat"
        role="group"
      >
        <input
          type="date"
          name="confirmDatName"
          id="confirmDatId"
          className="inpConfirm inpDate form-control noInvert minCurrDate"
          data-title="assinatura_data"
          required
        />
        <button
          type="button"
          className="datBtn confirmBtn btn btn-secondary widFull"
          id="confirmDatBtn"
        >
          Usar data atual
        </button>
      </div>
    </label>
  );
}
