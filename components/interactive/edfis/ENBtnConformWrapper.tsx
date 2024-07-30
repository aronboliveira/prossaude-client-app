import { ErrorBoundary } from "react-error-boundary";
import { useState } from "react";
import BtnConform from "../def/BtnConform";
import ENDeclaration from "./ENDeclaration";
import GenericErrorComponent from "../../error/GenericErrorComponent";


export default function ENBtnConformWrapper(): JSX.Element {
  const [shouldShowDeclaration, setDeclaration] = useState<boolean>(false);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error rendering Button for Agreement" />
      )}
    >
      <BtnConform dispatch={setDeclaration} state={shouldShowDeclaration} />
      {shouldShowDeclaration && (
        <ENDeclaration
          state={shouldShowDeclaration}
          dispatch={setDeclaration}
        />
      )}
    </ErrorBoundary>
  );
}
