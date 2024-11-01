"use client";
import { Dispatch, lazy, SetStateAction, Suspense, useState } from "react";
import { createContext, useEffect } from "react";
import ReactSpinner from "../../../icons/ReactSpinner";
import useBsLink from "@/lib/hooks/useBsLink";
export const PanelCtx = createContext<{
  userClass: string;
  setUserClass: Dispatch<SetStateAction<string>>;
}>({
  userClass: "coordenador",
  setUserClass: () => {},
});
const SelectPanel = lazy(() => import("./SelectPanel"));
export default function SelectPanelLoader(): JSX.Element {
  const [userClass, setUserClass] = useState<string>("estudante");
  useEffect(() => {
    const active = localStorage.getItem("activeUser");
    if (active) {
      const privilege = JSON.parse(active)?.loadedData?.privilege;
      if (privilege) setUserClass(privilege);
    }
  }, []);
  useBsLink();
  return (
    <PanelCtx.Provider value={{ userClass, setUserClass }}>
      <Suspense fallback={<ReactSpinner scale={0.7} />}>
        <SelectPanel defOp='agenda' />
      </Suspense>
    </PanelCtx.Provider>
  );
}
