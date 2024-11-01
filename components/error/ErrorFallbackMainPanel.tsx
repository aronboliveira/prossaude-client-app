import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallbackMainPanelProps } from "@/lib/global/declarations/interfacesCons";
import { nlSel, panelOpts } from "@/lib/global/declarations/types";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useEffect, useRef, useState } from "react";
import MainFormPanel from "../mainPanel/MainFormPanel";
import { mainPanelVariables, resetErrorBoundary } from "../mainPanel/mainPanelVariables";
export default function ErrorFallbackMainPanel(props: ErrorFallbackMainPanelProps): JSX.Element {
  const [, setPanelValue] = useState(props.defOp);
  const selectRef = useRef<nlSel>(null);
  const mainArticleRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (mainArticleRef.current instanceof HTMLElement) {
      syncAriaStates([...mainArticleRef.current.querySelectorAll("*"), mainArticleRef.current]);
    }
  }, [mainArticleRef]);
  return (
    <article role='alert' id='errorMainPanelDiv' ref={mainArticleRef}>
      <select
        className='form-select'
        id='coordPanelSelect'
        data-title='Opção de Painel Ativa'
        ref={selectRef}
        onChange={() => {
          setPanelValue(
            (selectRef.current?.value as panelOpts) ||
              (document.getElementById("coordPanelSelect") as HTMLSelectElement).value,
          );
          props.mainRoot.render(
            <ErrorBoundary
              FallbackComponent={() => (
                <ErrorFallbackMainPanel
                  mainRoot={props.mainRoot}
                  tryAcc={mainPanelVariables.tryAcc}
                  renderError={props.renderError}
                  resetErrorBoundary={() => resetErrorBoundary(() => <MainFormPanel />, props)}
                  defOp={props.defOp}
                />
              )}>
              <MainFormPanel />
            </ErrorBoundary>,
          );
        }}
        autoFocus>
        <optgroup id='grpRegst' label='Registro'>
          <option value='registStud'>Cadastrar Aluno</option>
          <option value='registProf'>Cadastrar Membro Profissional</option>
          <option value='removeStud'>Editar ou Remover Aluno</option>
          <option value='removeProf'>Editar ou Remover Membro Profissional</option>
          <option value='pacList'>Editar Lista de Pacientes</option>
        </optgroup>
        <optgroup id='grpDates' label='Datas'>
          <option value='agenda'>Agendamento</option>
        </optgroup>
      </select>
      <h2 className='mg__2bv widHalf'>
        <strong>Oops, algo deu errado! 😨</strong>
      </h2>
      <h4>{props.renderError.message}</h4>
      <small>
        Clique em <kbd className='kbd kbdPrimary vtAltxTop'>Tentar Novamente</kbd>
        &nbsp;uma vez e tente trocar de opção ou clique <em>três vezes</em> para recarregar a página!
      </small>
      <br />
      <button
        className='btn btn-info bolded widHalf mg__1t'
        id='retryRenderBtn'
        onClick={() => {
          props.resetErrorBoundary(props.mainRoot, "student", mainPanelVariables.tryAcc);
          mainPanelVariables.tryAcc++;
        }}>
        Tentar novamente
      </button>
    </article>
  );
}
