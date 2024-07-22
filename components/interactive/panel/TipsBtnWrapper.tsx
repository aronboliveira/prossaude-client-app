"use client";

import { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import PanelTips from "./PanelTips";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import TipsBtn from "../def/TipsBtn";

export default function TipsBtnWrapper(): JSX.Element {
  const [shouldShowTips, setTips] = useState<boolean>(false);
  useEffect(() => {
    syncAriaStates(document.querySelectorAll("*"));
  }, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Failed to Load Tips Btn" />
      )}
    >
      <TipsBtn dispatch={setTips} state={shouldShowTips} />
      {shouldShowTips && (
        <PanelTips state={shouldShowTips} dispatch={setTips} />
      )}
    </ErrorBoundary>
  );
}
