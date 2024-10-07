"use client";
import { AppRootContext } from "@/pages/_app";
import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import UserProfilePanel from "../../user/UserProfilePanel";
import { AppRootContextType } from "@/lib/global/declarations/interfaces";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { registerRoot } from "@/lib/global/handlers/gHandlers";
export default function UserProfilePanelWrapper(): JSX.Element {
  const nextRouter = useRouter(),
    context = useContext<AppRootContextType>(AppRootContext),
    hasInitializedRoot = useRef<boolean>(false);
  useEffect(() => {
    const profileSpan = document.getElementById("rootUserInfo");
    if (profileSpan instanceof HTMLElement) {
      if (!hasInitializedRoot.current) {
        context.roots.userRoot = registerRoot(context.roots.userRoot, `#${profileSpan.id}`);
        hasInitializedRoot.current = true;
      }
      if (!profileSpan.hasChildNodes()) context.roots.userRoot?.render(<UserProfilePanel router={nextRouter} />);
      const timeoutId = setTimeout(() => {
        if (!profileSpan.querySelector("img"))
          context.roots.userRoot?.render(<GenericErrorComponent message='Erro renderizando painel de usuário' />);
      }, 2000);
      return (): void => clearTimeout(timeoutId);
    } else {
      const timeoutId = setTimeout(() => {
        const foundProfileSpan = document.getElementById("rootUserInfo");
        if (!foundProfileSpan?.querySelector("img"))
          elementNotFound(profileSpan, "profileSpan during DOM initialization", extLine(new Error()));
      }, 2000);
      return (): void => clearTimeout(timeoutId);
    }
  }, [context.roots, nextRouter]);

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error loading User Panel' />}>
      <UserProfilePanel router={nextRouter} />
    </ErrorBoundary>
  );
}
