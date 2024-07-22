"use client";

import GenericErrorComponent from "../../error/GenericErrorComponent";
import TipsBtn from "../def/TipsBtn";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ENTips from "./ENTips";

export default function ENTipsBtnWrapper(): JSX.Element {
  const [shouldShowTips, setTips] = useState<boolean>(false);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error Loading Tips Button" />
      )}
    >
      <TipsBtn dispatch={setTips} state={shouldShowTips} />
      {shouldShowTips && <ENTips state={shouldShowTips} dispatch={setTips} />}
    </ErrorBoundary>
  );
}
