import { ErrorBoundary } from "react-error-boundary";
import { useState } from "react";
import ENTips from "./ENTips";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import TipsBtn from "../def/TipsBtn";
"use client";


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
