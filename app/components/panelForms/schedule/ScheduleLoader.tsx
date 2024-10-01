"use client";
import { Suspense, lazy, useContext } from "react";
import Spinner from "../../icons/Spinner";
import { PanelCtx } from "../defs/client/SelectLoader";
const Form = lazy(() => import("./ScheduleForm"));
export default function ScheduleLoader(): JSX.Element {
  const privilege = useContext(PanelCtx).userClass;
  return (
    <Suspense fallback={<Spinner />}>
      <Form context={false} userClass={privilege} />
    </Suspense>
  );
}
