import { ErrorBoundary } from "react-error-boundary";
import { nlBtn } from "@/lib/global/declarations/types";
import { useContext, useEffect, useRef, useState } from "react";
import ExcludeConsDlg from "../../alerts/ExcludeConsDlg";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import { PanelCtx } from "../defs/client/SelectLoader";
export default function EraseAptBtn(): JSX.Element {
  const [shouldShowExcludeDlg, setDisplayExcludeDlg] = useState(false),
    btnRef = useRef<nlBtn>(null),
    userClass = useContext(PanelCtx).userClass;
  useEffect(() => {
    try {
      if (!(btnRef.current instanceof HTMLButtonElement)) return;
      const relSlot = btnRef.current.closest("slot");
      if (!(relSlot instanceof HTMLElement)) return;
      btnRef.current.id = btnRef.current.id.replace("unfilled", relSlot.id.replace("slot_", ""));
    } catch (err) {
      return;
    }
  }, [btnRef]);
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Erro carregando botão de excluir' />}>
      <button
        type='button'
        className='btn btn-close reduced-btn-close eraseAptBtn forceInvert'
        title='Remova o agendamento relativo'
        id={`eraseAptBtn_unfilled`}
        ref={btnRef}
        onClick={() => {
          (userClass === "coordenador" || userClass === "supervisor") && setDisplayExcludeDlg(!shouldShowExcludeDlg);
        }}></button>
      {shouldShowExcludeDlg && (
        <ExcludeConsDlg
          setDisplayExcludeDlg={setDisplayExcludeDlg}
          shouldDisplayExcludeDlg={shouldShowExcludeDlg}
          btn={btnRef.current}
        />
      )}
    </ErrorBoundary>
  );
}
