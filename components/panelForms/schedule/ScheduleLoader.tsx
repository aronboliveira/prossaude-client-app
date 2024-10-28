import { Suspense, lazy, useContext } from "react";
import { PanelCtx } from "../defs/client/SelectLoader";
import ReactSpinner from "../../icons/ReactSpinner";
import ScheduleTbody from "./ScheduleTbody";
import Spinner from "../../icons/Spinner";
import { Provider } from "react-redux";
import schedStore from "@/redux/schedStore";
const ScheduleForm = lazy(() => import("./ScheduleForm"));
const ScheduleTable = lazy(() => import("./ScheduleTab"));
export default function ScheduleLoader(): JSX.Element {
  const privilege = useContext(PanelCtx).userClass;
  return (
    <Suspense fallback={<ReactSpinner scale={0.5} />}>
      <Provider store={schedStore}>
        <ScheduleForm userClass={privilege}>
          <Suspense fallback={<ReactSpinner scale={0.3} />}>
            <ScheduleTable>
              <Suspense fallback={<Spinner spinnerClass='spinner-grow' key={crypto.randomUUID()} />}>
                <ScheduleTbody />
              </Suspense>
            </ScheduleTable>
          </Suspense>
        </ScheduleForm>
      </Provider>
    </Suspense>
  );
}
