"use client";
import { AppRootContext } from "@/pages/_app";
import { ErrorBoundary } from "react-error-boundary";
import { createRoot } from "react-dom/client";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import UserProfilePanel from "../../user/UserProfilePanel";
import { defUser } from "@/redux/slices/userSlice";
export default function UserProfilePanelWrapper(): JSX.Element {
  const user = localStorage.getItem("activeUser")
    ? JSON.parse(localStorage.getItem("activeUser")!)
    : defUser;
  const nextRouter = useRouter();
  const context = useContext(AppRootContext);
  useEffect(() => {
    const profileSpan = document.getElementById("rootUserInfo");
    if (profileSpan instanceof HTMLElement) {
      if (!context.roots.userRoot)
        context.roots.userRoot = createRoot(profileSpan);
      if (!profileSpan.hasChildNodes())
        context.roots.userRoot.render(
          <UserProfilePanel user={user} router={nextRouter} />
        );
      setTimeout(() => {
        if (!profileSpan.querySelector("img"))
          context.roots.userRoot.render(
            <GenericErrorComponent message="Erro renderizando painel de usuário" />
          );
      }, 2000);
    } else
      setTimeout(() => {
        !document.getElementById("rootUserInfo")?.querySelector("img") &&
          elementNotFound(
            profileSpan,
            "profileSpan during DOM initialization",
            extLine(new Error())
          );
      }, 2000);
  }, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading User Panel" />
      )}
    >
      <UserProfilePanel user={user} router={nextRouter} />
    </ErrorBoundary>
  );
}
