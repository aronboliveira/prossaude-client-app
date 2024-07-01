import { resetErrorBoundary, mainPanelVariables } from "./mainPanelVariables";
import { FallbackedMainPanelProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { ErrorBoundary } from "react-error-boundary";
import MainFormPanel from "./MainFormPanel";
import ErrorFallbackMainPanel from "../error/ErrorFallbackMainPanel";

export default function FallbackedMainPanel(
  props: FallbackedMainPanelProps
): JSX.Element {
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <ErrorFallbackMainPanel
          mainRoot={props.mainRoot}
          userClass={props.userClass}
          tryAcc={mainPanelVariables.tryAcc}
          renderError={props.renderError}
          resetErrorBoundary={() =>
            resetErrorBoundary(() => <FallbackedMainPanel {...props} />, props)
          }
          defOp={props.defOp}
        />
      )}
    >
      <MainFormPanel
        mainRoot={props.mainRoot}
        userClass={props.userClass}
        defOp={props.defOp}
      />
    </ErrorBoundary>
  );
}
