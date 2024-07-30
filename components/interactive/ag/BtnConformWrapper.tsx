import { useState } from "react";
import AGDeclaration from "./AGDeclaration";
import BtnConform from "../def/BtnConform";
"use client";


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
