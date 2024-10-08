import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../error/GenericErrorComponent";
export default function DefaultForm(): JSX.Element {
  return (
    <ErrorBoundary
      FallbackComponent={() => <GenericErrorComponent message='Erro carregando componente de construção' />}>
      <h1 style={{ margin: "0", alignSelf: "center", justifySelf: "center" }}>
        <strong>PÁGINA EM CONSTRUÇÃO</strong>
      </h1>
    </ErrorBoundary>
  );
}
