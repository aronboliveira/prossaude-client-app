import { ErrorBoundary } from "react-error-boundary";
import { GlobalFormProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { nullishBtn } from "@/lib/global/declarations/types";
import { useEffect, useRef, useState } from "react";
import ExcludeConsDlg from "../../alerts/ExcludeConsDlg";
import GenericErrorComponent from "../../error/GenericErrorComponent";
export default function EraseAptBtn({ userClass = "estudante" }: GlobalFormProps): JSX.Element {
  const [shouldShowExcludeDlg, setDisplayExcludeDlg] = useState(false);
  const btnRef = useRef<nullishBtn>(null);
  useEffect(() => {
    try {
      if (!(btnRef.current instanceof HTMLButtonElement))
        throw elementNotFound(btnRef.current, `${(btnRef.current as any)?.id ?? "UNIDENTIFIED"}`, extLine(new Error()));
      const relSlot = btnRef.current.closest("slot");
      if (!(relSlot instanceof HTMLElement))
        throw elementNotFound(relSlot, "slot for erase appointment btn", extLine(new Error()));
      btnRef.current.id = btnRef.current.id.replace("unfilled", relSlot.id.replace("slot_", ""));
    } catch (err) {
      console.warn(`Error with reference for button:
      ${(err as Error).message}`);
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
          userClass={userClass}
        />
      )}
    </ErrorBoundary>
  );
}
