"use client";
import { execLogout } from "@/lib/global/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Guard(): JSX.Element {
  const router = useRouter();
  useEffect(() => {
    if (window) {
      if (!localStorage.getItem("user")) {
        alert("Por favor logue no sistema antes de prosseguir.");
        router.replace("/login");
        return;
      }
      if (!localStorage.getItem("timer")) {
        if (!localStorage.getItem("timer")) localStorage.setItem("time-r", "20");
        const timerCounter = setInterval(() => {
          const timer = localStorage.getItem("timer");
          console.log("Current Timer:", timer);
          if (timer) {
            const newTimer = parseInt(timer) - 1;
            if (newTimer <= 0) {
              alert("Timeout alcançado. Deslogando do sistema.");
              execLogout(router);
              clearInterval(timerCounter);
            } else {
              localStorage.setItem("timer", newTimer.toString());
              console.log("Updated Timer:", newTimer);
            }
          }
        }, 60000);
        console.log("TIMER COUNTER");
        console.log(timerCounter);
      }
      if (!localStorage.getItem("authorized") || localStorage.getItem("authorized") !== "true") {
        alert("Usuário não autorizado. Retornando à tela de login.");
        router.replace("/login");
      }
    }
  }, [router]);
  return <></>;
}
