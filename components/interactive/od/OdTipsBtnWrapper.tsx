import { ErrorBoundary } from "react-error-boundary";
import { useState } from "react";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import OdTips from "./OdTips";
import TipsBtn from "../def/TipsBtn";


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
