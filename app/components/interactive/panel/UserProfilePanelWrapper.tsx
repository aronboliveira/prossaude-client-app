"use client";
import { RootCtx } from "@/pages/_app";
import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import { RootCtxType } from "@/lib/global/declarations/interfaces";
import { registerRoot } from "@/lib/global/handlers/gHandlers";
import EnhancedUserProfilePanel from "../../user/EnhancedUserProfilePanel";
import { checkContext } from "@/lib/global/gModel";
export default function UserProfilePanelWrapper(): JSX.Element {
  const router = useRouter(),
    context = useContext<RootCtxType>(RootCtx),
    hasInitializedRoot = useRef<boolean>(false);
  //TODO REMOVER APÓS TESTE
  const ctx = useContext(RootCtx);
  checkContext(ctx, "RootCtx", UserProfilePanelWrapper);
  useEffect(() => {
    const profileSpan = document.getElementById("rootUserInfo");
    if (profileSpan instanceof HTMLElement) {
      if (!hasInitializedRoot.current) {
        context.roots.userRoot = registerRoot(context.roots.userRoot, `#${profileSpan.id}`);
        hasInitializedRoot.current = true;
      }
      if (!profileSpan.hasChildNodes()) context.roots.userRoot?.render(<EnhancedUserProfilePanel router={router} />);
      const timeoutId = setTimeout(() => {
        if (!profileSpan.querySelector("img"))
          context.roots.userRoot?.render(<GenericErrorComponent message='Erro renderizando painel de usuário' />);
      }, 2000);
      return (): void => clearTimeout(timeoutId);
    }
  }, [context.roots, router]);
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error loading User Panel' />}>
      <EnhancedUserProfilePanel router={router} />
    </ErrorBoundary>
  );
}
