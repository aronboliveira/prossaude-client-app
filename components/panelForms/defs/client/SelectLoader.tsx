"use client";
import { Dispatch, lazy, SetStateAction, Suspense, useState } from "react";
import { createContext, useEffect } from "react";
import Spinner from "../../../icons/Spinner";
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
  //TODO EM UM CENÁRIO REAL, O PRIVILÉGIO VAI SER DEFINIDO NO LOGIN E RETIDO NO LOCAL STORAGE
  useEffect(() => {
    const active = localStorage.getItem("activeUser");
    if (active) {
      const privilege = JSON.parse(active)?.loadedData?.privilege;
      if (privilege) setUserClass(privilege);
    }
  }, []);
  return (
    <PanelCtx.Provider value={{ userClass, setUserClass }}>
      <Suspense fallback={<Spinner />}>
        <SelectPanel defOp='agenda' />
      </Suspense>
    </PanelCtx.Provider>
  );
}
