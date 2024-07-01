import { nullishForm } from "@/lib/global/declarations/types";
import { GlobalFormProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { useEffect, useRef, useState, useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../error/GenericErrorComponent";

export default function DefaultForm({
  mainRoot,
  userClass = "estudante",
}: GlobalFormProps): JSX.Element {
  console.log([mainRoot, userClass]);
  useState(true);
  useRef<nullishForm>(null);
  useRef<nullishForm>(null);
  useRef<nullishForm>(null);
  useRef<nullishForm>(null);
  useCallback(() => {}, []);
  useEffect(() => {}, []);
  useEffect(() => {}, []);
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Erro carregando componente de construção" />
      )}
    >
      <h1 style={{ margin: "0", alignSelf: "center", justifySelf: "center" }}>
        <strong>PÁGINA EM CONSTRUÇÃO</strong>
      </h1>
    </ErrorBoundary>
  );
}
