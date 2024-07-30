("use client");
import { ErrorBoundary } from "react-error-boundary";
import { useState, useEffect } from "react";
import BtnConform from "../def/BtnConform";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import OdDeclaration from "./OdDeclaration";
export default function OdBtnConformWrapper(): JSX.Element {
  const [shouldShowDeclaration, setDeclaration] = useState<boolean>(false);
  useEffect(() => {
    /conform=open/gi.test(location.search) && setDeclaration(true);
  }, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error rendering Button for Agreement" />
      )}
    >
      <BtnConform dispatch={setDeclaration} state={shouldShowDeclaration} />
      {shouldShowDeclaration && (
        <OdDeclaration
          state={shouldShowDeclaration}
          dispatch={setDeclaration}
        />
      )}
    </ErrorBoundary>
  );
}
