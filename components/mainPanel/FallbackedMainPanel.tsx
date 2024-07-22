"use client";

import { resetErrorBoundary, mainPanelVariables } from "./mainPanelVariables";
import { FallbackedMainPanelProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { ErrorBoundary } from "react-error-boundary";
import { useContext } from "react";
import MainFormPanel from "./MainFormPanel";
import ErrorFallbackMainPanel from "../error/ErrorFallbackMainPanel";
import { AppRootContext } from "@/pages/_app";

export default function FallbackedMainPanel(
  props: FallbackedMainPanelProps
): JSX.Element {
  const context = useContext(AppRootContext);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <ErrorFallbackMainPanel
          mainRoot={context.roots.rootSel}
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
        mainRoot={context.roots.rootSel}
        userClass={props.userClass}
        defOp={props.defOp}
      />
    </ErrorBoundary>
  );
}
