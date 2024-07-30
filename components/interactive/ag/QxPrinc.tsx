import { addDblQuotes } from "@/lib/locals/aGPage/aGModel";


export default function QxPrinc(): JSX.Element {
  return (
    <textarea
      className="form-control taSdGeral"
      name="issue"
      id="qxPrinc"
      maxLength={1000}
      placeholder="Escreva aqui a(s) queixa(s)"
      data-title="queixa_principal"
      onClick={ev => addDblQuotes(ev.currentTarget)}
      onInput={ev => addDblQuotes(ev.currentTarget)}
    ></textarea>
  );
}
