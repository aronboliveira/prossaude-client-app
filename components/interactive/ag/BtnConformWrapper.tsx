"use client";

import { useState } from "react";
import BtnConform from "../def/BtnConform";
import AGDeclaration from "./AGDeclaration";

export default function BtnConformWrapper(): JSX.Element {
  const [shouldShowDeclaration, setDeclaration] = useState<boolean>(false);
  return (
    <>
      <BtnConform dispatch={setDeclaration} state={shouldShowDeclaration} />
      {shouldShowDeclaration && (
        <AGDeclaration
          state={shouldShowDeclaration}
          dispatch={setDeclaration}
        />
      )}
    </>
  );
}
