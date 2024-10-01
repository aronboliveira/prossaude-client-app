import { ErrorBoundary } from "react-error-boundary";
import { SpinnerComponentProps } from "@/lib/global/declarations/interfaces";
import GenericErrorComponent from "../error/GenericErrorComponent";
export default function Spinner({
  spinnerClass = "spinner-border",
  spinnerColor = "text-info",
  message = "Loading...",
  fs = false,
}: SpinnerComponentProps): JSX.Element {
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error loading Spinner' />}>
      <div
        className={`${spinnerClass} ${spinnerColor} spinner`}
        role='status'
        style={
          fs
            ? {
                width: "50vw",
                height: "50vw",
                maxWidth: "40rem",
                maxHeight: "40rem",
                marginInline: "auto",
                marginTop: "0",
                marginBottom: "15vh",
                background: "transparent",
                position: "fixed",
                top: "10vh",
                left: "30%",
                borderWidth: "0.5vw 1vw 1vw 1vw",
                borderRight: "0.8vw",
                borderRightStyle: "solid",
                borderTop: "0.5vw dotted #a6cad5",
                zIndex: 1,
                animationTimingFunction: "cubic-bezier(0.1, 0.05, 0, 1)",
                animationDuration: "1.2s",
              }
            : {}
        }>
        <span className='visually-hidden'>{`${message}`}</span>
      </div>
    </ErrorBoundary>
  );
}
