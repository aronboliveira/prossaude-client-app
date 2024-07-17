import { switchAutoFill } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { tabProps } from "@/pages/edfis";

export default function SwitchDiv({
  autofill = false,
}: {
  autofill?: boolean;
}): JSX.Element {
  return (
    <div role="group" className="switchDiv flexQ900NoWC divTab">
      {autofill && (
        <span role="group" className="form-switch spanLeft" id="autofillDiv">
          <input
            type="checkbox"
            className="deActBtn form-check-input"
            role="switch"
            id="autoFillBtn"
            data-title="Cálculo Automático"
            defaultChecked
            onChange={ev => {
              tabProps.isAutoFillActive = switchAutoFill(
                ev.currentTarget,
                tabProps.isAutoFillActive
              );
            }}
          />{" "}
          <strong>Cálculo Automático</strong>
        </span>
      )}
      <span role="group" className="form-switch spanRight" id="autocorrectDiv">
        <input
          type="checkbox"
          className="deActBtn form-check-input"
          role="switch"
          id="deactAutocorrectBtnPac"
          data-title="Autocorreção"
          defaultChecked
        />{" "}
        <strong style={{ marginLeft: "0.3rem" }}>Autocorreção</strong>
      </span>
    </div>
  );
}
