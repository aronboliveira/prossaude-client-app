"use client";
import { ErrorBoundary } from "react-error-boundary";
import { InspProps } from "@/lib/global/declarations/interfaces";
import { searchNextSiblings } from "@/lib/global/handlers/gHandlers";
import { useState } from "react";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import InspDlg from "./InspDlg";
import { showInspDialogs, showInspSpanSub } from "@/lib/locals/odPage/odHandler";
export default function InspDlgElements({ count, ctx, fullName }: InspProps): JSX.Element {
  const [shouldShowDlg, setDlg] = useState<boolean>(false);
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error loading Inspection Elements' />}>
      <fieldset className='fsSub fsInsp noInvert' id={`inspFs${count}`}>
        <legend className='legSub inspLeg' id={`inspLegSub${count}`}>
          {fullName}
        </legend>
        <div role='group' className='inspDiv' id={`inspDiv${count}`}>
          <span>Há alteração?</span>
          <span role='group' className='spanMain inspSpanMain' id={`inspSpanMain${count}`}>
            <input
              type='radio'
              name={`insp_${ctx}`}
              id={`inpYes${count}`}
              className='radOp radYes'
              data-title={`${fullName} (Sim)`}
              data-required='true'
              data-group='true'
              onClick={showInspSpanSub}
              onDoubleClick={ev => {
                const validSibling = searchNextSiblings(ev.currentTarget, "inspSpanSub");
                !ev.currentTarget.checked && validSibling.setAttribute("hidden", "");
              }}
            />
            <label htmlFor={`inpYes${count}`} id={`labInpYes${count}`} className='labOp labInsp'>
              Sim
            </label>
            <input
              type='radio'
              name={`insp_${ctx}`}
              id={`inpNo${count}`}
              className='radOp radNo'
              data-title={`${fullName} (Não)`}
              data-required='true'
              data-group='true'
              onClick={showInspSpanSub}
            />
            <label htmlFor={`inpNo${count}`} id={`labInpNo${count}`} className='labOp labInsp'>
              Não
            </label>
            <br role='presentation' />
            <fieldset role='group' className='spanSub inspSpanSub' id={`inspSpanSub${count}`}>
              <textarea
                className='form-control inspTa noInvert'
                id={`inspTa${count}`}
                placeholder={`Insira aqui as observações sobre ${fullName}`}
                data-title={`Observações: ${fullName}`}
                name={`desc_insp_${ctx}`}></textarea>
              <button
                type='button'
                className='btn btn-secondary inspBtn inspBtnDialog'
                id={`inspDialogBtn${count}`}
                onClick={ev => setDlg(!showInspDialogs(ev, shouldShowDlg))}>
                Mostrar Sugestões
              </button>
              {shouldShowDlg && <InspDlg state={shouldShowDlg} dispatch={setDlg} ctx={ctx} count={count} />}
            </fieldset>
          </span>
        </div>
      </fieldset>
    </ErrorBoundary>
  );
}
