import { clearQuadrInps } from "@/lib/locals/odPage/odHandler";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
import { qrInpProps } from "@/lib/global/declarations/interfaces";
import { resetAvDentValue } from "@/lib/locals/odPage/odModel";


export default function InpAvDent({ qr, num }: qrInpProps): JSX.Element {
  return (
    <label className={`labelAvDent labelAvDent${qr}`} id={`labD${num}`}>
      <span role="group" className="spanMain" id={`spanMain${num}`}>
        <span role="textbox" className="spanSub DNum" id={`spanSubD${num}`}>
          {num}
        </span>
      </span>
      <input
        type="text"
        list={`avElemD${num}`}
        id={`inpD${num}`}
        name={`teeth_${num}`}
        className="inpAvDent form-control noInvert minText patternText"
        onInput={ev => handleEventReq(ev.currentTarget)}
        data-title={`Estado do Dente ${num}`}
        required
        data-reqlength="6"
        data-pattern="amálgama|careado|hígido|trincado|ausente"
        data-flags="gi"
        onClick={ev => {
          resetAvDentValue(ev.currentTarget);
          clearQuadrInps(ev.currentTarget);
        }}
      />
      <datalist id={`avElemD${num}`} className="dlAvDent">
        <option value="Amálgama" className="elemOp">
          Amálgama
        </option>
        <option value="Careado" className="elemOp">
          Careado
        </option>
        <option value="Hígido" className="elemOp">
          Hígido
        </option>
        <option value="Trincado" className="elemOp">
          Trincado
        </option>
        <option value="Ausente" className="elemOp">
          Ausente
        </option>
      </datalist>
    </label>
  );
}
