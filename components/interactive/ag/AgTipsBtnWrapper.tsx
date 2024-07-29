import { ErrorBoundary } from "react-error-boundary";
import { useState } from "react";
import AGTips from "./AGTips";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import TipsBtn from "../def/TipsBtn";
"use client";


export default function AgTipsBtnWrapper(): JSX.Element {
  const [shouldShowTips, setTips] = useState<boolean>(false);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Failed to render Tips Btn" />
      )}
    >
      <TipsBtn dispatch={setTips} state={shouldShowTips} />
      {shouldShowTips && <AGTips dispatch={setTips} state={shouldShowTips} />}
    </ErrorBoundary>
  );
}
