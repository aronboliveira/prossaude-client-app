"use client";
import { execLogout } from "@/lib/global/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
export default function Guard(): JSX.Element {
  const router = useRouter();
  useEffect(() => {
    if (window) {
      if (!localStorage.getItem("user")) {
        toast.promise(Promise.reject(new Error("Por favor logue no sistema antes de prosseguir.")), {
          loading: "Saving...",
          success: <b>Settings saved!</b>,
          error: <b>Could not save.</b>,
        });
        router.replace("/login");
        return;
      }
      if (!localStorage.getItem("timer")) {
        if (!localStorage.getItem("timer")) localStorage.setItem("timer", "6000");
        const timerCounter = setInterval(() => {
          const timer = localStorage.getItem("timer");
          if (timer) {
            const newTimer = parseInt(timer) - 1;
            localStorage.setItem("timer", newTimer.toString());
            if (newTimer <= 0) {
              toast("Timeout alcançado. Deslogando do sistema.", { icon: "⚠" });
              execLogout(router);
              clearInterval(timerCounter);
            }
          } else toast("Timeout alcançado. Deslogando do sistema.", { icon: "⚠" });
          execLogout(router);
          clearInterval(timerCounter);
        }, 1000);
      }
      if (!localStorage.getItem("authorized") || localStorage.getItem("authorized") !== "true") {
        toast.error("Usuário não autorizado. Retornando à tela de login.");
        router.replace("/login");
      }
    }
  }, [router]);
  return <></>;
}
