import { ErrorBoundary } from "react-error-boundary";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useEffect, useRef } from "react";
import GenericErrorComponent from "../../error/GenericErrorComponent";
export default function Unauthorized(): JSX.Element {
  const mainRef = useRef(null);
  useEffect(() => {
    mainRef.current && syncAriaStates(mainRef.current);
  }, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => <GenericErrorComponent message='Erro carregando componente de desautorização' />}
    >
      <article ref={mainRef}>
        <h3>
          Você <em className='noInvert'>não possui autorização</em> para acessar essa tela! <span>✋🚫</span>
        </h3>
        <small>
          <strong className='noInvert'>
            Mude sua opção ou recarregue a página <span>🔁</span>
          </strong>{" "}
        </small>
      </article>
    </ErrorBoundary>
  );
}
