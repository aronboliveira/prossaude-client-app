"use client";
import { lazy, useContext } from "react";
import { PanelCtx } from "../defs/client/SelectLoader";
import { Provider } from "react-redux";
import panelStore from "@/redux/panelStore";
const Form = lazy(() => import("./ScheduleForm"));
export default function ScheduleLoader(): JSX.Element {
  const privilege = useContext(PanelCtx).userClass;
  return (
    <Provider store={panelStore}>
      <Form context={false} userClass={privilege} />
    </Provider>
  );
}
