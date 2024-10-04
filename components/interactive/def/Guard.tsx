"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Guard(): JSX.Element {
  const router = useRouter();
  useEffect(() => {
    console.log("guarding...");
    if (window) {
      if (!localStorage.getItem("user")) {
        alert("Por favor logue no sistema antes de prosseguir.");
        router.push("/login");
        return;
      }
      if (!localStorage.getItem("timer")) {
        if (!localStorage.getItem("timer")) localStorage.setItem("timer", "20");
        const timerCounter = setInterval(() => {
          const timer = localStorage.getItem("timer");
          console.log("Current Timer:", timer);
          if (timer) {
            const newTimer = parseInt(timer) - 1;
            if (newTimer <= 0) {
              alert("Timeout alcançado. Deslogando do sistema.");
              localStorage.removeItem("user");
              localStorage.removeItem("authorized");
              localStorage.removeItem("pw");
              clearInterval(timerCounter);
              router.push("/login");
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
        router.push("/login");
      }
    }
  }, [router]);
  return <></>;
}
