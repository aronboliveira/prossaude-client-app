"use client";

import GenericErrorComponent from "../../error/GenericErrorComponent";
import TipsBtn from "../def/TipsBtn";
import OdTips from "./OdTips";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function OdTipsBtnWrapper(): JSX.Element {
  const [shouldShowTips, setTips] = useState<boolean>(false);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error Loading Tips Button" />
      )}
    >
      <TipsBtn dispatch={setTips} state={shouldShowTips} />
      {shouldShowTips && <OdTips state={shouldShowTips} dispatch={setTips} />}
    </ErrorBoundary>
  );
}
