import { Suspense, lazy } from "react";
import TabDCut from "./client/TabDCut";
import ReactSpinner from "../../icons/ReactSpinner";
import sEn from "@/styles/locals/modules/enStyles.module.scss";
const Protocolo = lazy(() => import("./client/Protocolo"));
export default function DivDCut(): JSX.Element {
  return (
    <>
      <div role='group' className={`spanMain spanMainTabProgCons ${sEn.divLab}`} id='tabSpanDCut'>
        <span className='forceInvert'>Protocolo:</span>
        <Suspense fallback={<ReactSpinner scale={0.3} />}>
          <Protocolo />
        </Suspense>
      </div>
      <TabDCut />
    </>
  );
}
