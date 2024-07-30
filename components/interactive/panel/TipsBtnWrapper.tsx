import { ErrorBoundary } from "react-error-boundary";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useState, useEffect } from "react";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import PanelTips from "./PanelTips";
import TipsBtn from "../def/TipsBtn";
("use client");

export default function TipsBtnWrapper(): JSX.Element {
  const [shouldShowTips, setTips] = useState<boolean>(false);
  useEffect(() => {
    syncAriaStates(document.querySelectorAll("*"));
    /tips=open/gi.test(location.search) && setTips(true);
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
