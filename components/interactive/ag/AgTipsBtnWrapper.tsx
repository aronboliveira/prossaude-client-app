"use client";

import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import AGTips from "./AGTips";
import TipsBtn from "../def/TipsBtn";
import GenericErrorComponent from "../../error/GenericErrorComponent";

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
