"use client";
import { Suspense, lazy, useContext } from "react";
import { PanelCtx } from "../defs/client/SelectLoader";
import ReactSpinner from "../../icons/ReactSpinner";
const Form = lazy(() => import("./ScheduleForm"));
export default function ScheduleLoader(): JSX.Element {
  const privilege = useContext(PanelCtx).userClass;
  return (
    <Suspense fallback={<ReactSpinner scale={0.5} />}>
      <Form context={false} userClass={privilege} />
    </Suspense>
  );
}
