import { ErrorBoundary } from "react-error-boundary";
import { textTransformPascal } from "@/lib/global/gModel";
import GenericErrorComponent from "../../error/GenericErrorComponent";
export default function OpProtUr({ ctx }: { ctx: "Persist" | "Ort" | "Tr" }): JSX.Element {
  const fullName = ((): string => {
    switch (ctx) {
      case "Persist":
        return "Persistente";
      case "Ort":
        return "Ortostática";
      case "Tr":
        return "Transitória";
      default:
        return "Indefinida";
    }
  })();
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message={`Error rendering Option for Proteinúria ${fullName || "Undefined context"}`} />
      )}>
      <input
        type='radio'
        name={`protur_lvl`}
        id={`protUr${textTransformPascal(ctx)}Id`}
        className='cpbOp opProtUr noInvert'
        data-title={`Proteinúria ${fullName}`}
        data-value={`protur_${ctx.toLowerCase()}`}
      />
      <span>{fullName}</span>
    </ErrorBoundary>
  );
}
