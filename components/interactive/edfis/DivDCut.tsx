import { Suspense, lazy } from "react";
import TabDCut from "./client/TabDCut";
import ReactSpinner from "../../icons/ReactSpinner";
import sEn from "@/styles//modules/enStyles.module.scss";
const Protocolo = lazy(() => import("./client/Protocolo"));
export default function DivDCut(): JSX.Element {
  return (
    <>
      <div role='group' className={`spanMain spanMainTabProgCons ${sEn.divLab}`} id='tabSpanDCut'>
        <label
          htmlFor='tabSelectDCutId'
          style={{ display: "inline", fontWeight: "600", marginBottom: "0.5rem" }}
          className='forceInvert'>
          Protocolo:
        </label>
        <Suspense fallback={<ReactSpinner scale={0.3} />}>
          <Protocolo />
        </Suspense>
      </div>
      <TabDCut />
    </>
  );
}
