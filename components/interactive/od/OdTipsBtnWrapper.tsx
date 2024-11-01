"use client";
import { ErrorBoundary } from "react-error-boundary";
import { useState, useEffect } from "react";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import OdTips from "./OdTips";
import TipsBtn from "../def/TipsBtn";
export default function OdTipsBtnWrapper(): JSX.Element {
  const [shouldShowTips, setTips] = useState<boolean>(false);
  useEffect(() => {
    /tips=open/gi.test(location.search) && setTips(true);
  }, []);
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error Loading Tips Button' />}>
      <TipsBtn dispatch={setTips} state={shouldShowTips} />
      {shouldShowTips && <OdTips state={shouldShowTips} dispatch={setTips} />}
    </ErrorBoundary>
  );
}
