import { ErrorBoundary } from "react-error-boundary";
import { useState } from "react";
import BtnConform from "../def/BtnConform";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import OdDeclaration from "./OdDeclaration";


export default function OdBtnConformWrapper(): JSX.Element {
  const [shouldShowDeclaration, setDeclaration] = useState<boolean>(false);
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
