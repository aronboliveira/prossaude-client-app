import { ErrorBoundary } from "react-error-boundary";
import { MainPanelProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import GenericErrorComponent from "../error/GenericErrorComponent";
import SelectPanel from "../panelForms/defs/client/SelectPanel";

export default function MainFormPanel({
  defOp = "agenda",
}: MainPanelProps): JSX.Element {
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error rendering shell for Panel" />
      )}
    >
      <div role="group" id="formSelDiv" className="form-padded--nosb">
        <div role="group" id="formPanelDiv">
          <SelectPanel defOp={defOp} />
        </div>
      </div>
    </ErrorBoundary>
  );
}
