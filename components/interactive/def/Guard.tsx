"use client";
import { execLogout } from "@/lib/global/auth";
import { navigatorVars } from "@/vars";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
export default function Guard(): JSX.Element {
  const router = useRouter(),
    toastTimer = 500,
    authorizationToasted = useRef<boolean>(false),
    errorToasted = useRef<boolean>(false),
    timerToasted = useRef<boolean>(false),
    timerSet = useRef<boolean>(false),
    testToasted = useRef<boolean>(false);
  useEffect(() => {
    let timerCounter: NodeJS.Timeout | null = null;
    if (!timerSet.current) {
      timerCounter = setInterval(() => {
        const timer = localStorage.getItem("timer"),
          timerOut = (): void => {
            if (!timerToasted.current) {
              toast("Timeout alcançado. Deslogando do sistema.", { icon: "⚠" });
              timerToasted.current = true;
              setTimeout(() => (timerToasted.current = false), toastTimer * 2);
            }
            execLogout(router);
            timerCounter && clearInterval(timerCounter);
          };
        if (timer) {
          const newTimer = parseInt(timer) - 1;
          localStorage.setItem("timer", newTimer.toString());
          if (newTimer <= 0) {
            timerOut();
            return;
          }
        } else {
          timerOut();
          return;
        }
      }, 1000);
      timerSet.current = true;
    }
    if (!localStorage.getItem("user")) {
      if (!errorToasted.current) {
        setTimeout(() => {
          toast.error(
            navigatorVars.pt ? "Por favor logue no sistema antes de prosseguir." : "Please login before proceeding.",
          );
        }, toastTimer);
        errorToasted.current = true;
        setTimeout(() => (errorToasted.current = false), toastTimer * 2);
      }
      if (!testToasted.current) {
        setTimeout(() => {
          toast(
            navigator.language.startsWith("en")
              ? "For this test version, type any entry that is not empty!"
              : "Para esta versão de teste, digite qualquer login que não seja vazio!",
            { icon: "🛠" },
          );
        }, toastTimer);
        testToasted.current = true;
        setTimeout(() => (testToasted.current = false), toastTimer * 2);
      }
      execLogout(router);
      timerCounter && clearInterval(timerCounter);
      return;
    }
    if (!localStorage.getItem("timer")) localStorage.setItem("timer", "6000");
    if (!localStorage.getItem("authorized") || localStorage.getItem("authorized") !== "true") {
      if (!authorizationToasted.current) {
        setTimeout(() => {
          toast.error(
            navigatorVars.pt
              ? "Usuário não autorizado. Retornando à tela de login."
              : "User unauthorized. Returning to login page.",
          );
        }, toastTimer);
        authorizationToasted.current = true;
        setTimeout(() => (authorizationToasted.current = false), toastTimer * 2);
      }
      if (!testToasted.current) {
        setTimeout(() => {
          toast(
            navigator.language.startsWith("en")
              ? "For this test version, type any entry that is not empty!"
              : "Para esta versão de teste, digite qualquer login que não seja vazio!",
            { icon: "🛠" },
          );
        }, toastTimer);
        testToasted.current = true;
        setTimeout(() => (testToasted.current = false), toastTimer * 2);
      }
      execLogout(router);
      timerCounter && clearInterval(timerCounter);
    }
  }, [router]);
  return <></>;
}
