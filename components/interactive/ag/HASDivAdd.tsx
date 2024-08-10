"use client";
import { opRadioHandler } from "@/lib/global/handlers/gHandlers";
export default function HASDivAdd(): JSX.Element {
  return (
    <div className="divAdd gridTwoCol" id="divAddPrAlta" role="list">
      <span role="listitem" className="cbDoencaSubt">
        <input
          type="radio"
          name="has_stg"
          id="HASPreId"
          className="cpbOp indivOp opHAS"
          data-title="Pré-hipertensão"
          data-group="true"
          data-parent="#divAddPrAlta"
          data-value="pre"
          onKeyDown={keydown => {
            opRadioHandler(
              keydown,
              Array.from(
                document.querySelectorAll('input[id$="Yes"], input[id$="No"]')
              )
            );
          }}
        />{" "}
        Pré-hipertensão
      </span>
      <span role="listitem" className="cbDoencaSubt">
        <input
          type="radio"
          name="has_stg"
          id="HASStg1Id"
          className="cpbOp indivOp opHAS"
          data-title="Hipertensão Estágio 1"
          data-value="1"
          data-group="true"
          data-parent="#divAddPrAlta"
          onKeyDown={keydown => {
            opRadioHandler(
              keydown,
              Array.from(
                document.querySelectorAll('input[id$="Yes"], input[id$="No"]')
              )
            );
          }}
        />{" "}
        Estágio 1
      </span>
      <span role="listitem" className="cbDoencaSubt">
        <input
          type="radio"
          name="has_stg"
          id="HASStg2Id"
          className="cpbOp indivOp opHAS"
          data-title="Hipertensão Estágio 2"
          data-value="2"
          data-group="true"
          data-parent="#divAddPrAlta"
          onKeyDown={keydown => {
            opRadioHandler(
              keydown,
              Array.from(
                document.querySelectorAll('input[id$="Yes"], input[id$="No"]')
              )
            );
          }}
        />{" "}
        Estágio 2
      </span>
      <span role="listitem" className="cbDoencaSubt">
        <input
          type="radio"
          name="has_stg"
          id="HASStg3Id"
          className="cpbOp indivOp opHAS"
          data-title="Hipertensão Estágio 3"
          data-value="3"
          data-group="true"
          data-parent="#divAddPrAlta"
          onKeyDown={keydown => {
            opRadioHandler(
              keydown,
              Array.from(
                document.querySelectorAll('input[id$="Yes"], input[id$="No"]')
              )
            );
          }}
        />{" "}
        Estágio 3 | Em Crise
      </span>
      <span role="listitem" className="cbDoencaSubt">
        <input
          type="radio"
          name="has_stg"
          id="HASPrimId"
          className="cpbOp indivOp opHAS"
          data-title="Hipertensão Primária | Essencial"
          data-group="true"
          data-parent="#divAddPrAlta"
          data-value="prim"
          onKeyDown={keydown => {
            opRadioHandler(
              keydown,
              Array.from(
                document.querySelectorAll('input[id$="Yes"], input[id$="No"]')
              )
            );
          }}
        />{" "}
        Primária | Essencial
      </span>
      <span role="listitem" className="cbDoencaSubt">
        <input
          type="radio"
          name="has_stg"
          id="HASSecId"
          className="cpbOp indivOp opHAS"
          data-title="Hipertensão Secundária"
          data-group="true"
          data-parent="#divAddPrAlta"
          data-value="sec"
          onKeyDown={keydown => {
            opRadioHandler(
              keydown,
              Array.from(
                document.querySelectorAll('input[id$="Yes"], input[id$="No"]')
              )
            );
          }}
        />{" "}
        Secundária
      </span>
      <span role="listitem" className="cbDoencaSubt">
        <input
          type="checkbox"
          name="has_res"
          id="HASResId"
          className="cpbOp indivOp opHAS"
          data-title="Hipertensão Resistente"
        />{" "}
        Resistente
      </span>
      <span role="listitem" className="cbDoencaSubt">
        <input
          type="checkbox"
          name="has_sist"
          id="HASIsolId"
          className="cpbOp indivOp opHAS"
          data-title="Hipertensão Sistólica Isolada"
        />{" "}
        Sistólica Isolada
      </span>
      <span role="listitem" className="cbDoencaSubt">
        <input
          type="checkbox"
          name="has_mal"
          id="HASMalId"
          className="cpbOp indivOp opHAS"
          data-title="Hipertensão Maligna"
        />{" "}
        Maligna
      </span>
    </div>
  );
}
