"use client";
import { Suspense, lazy } from "react";
import TabIndPerc from "./TabIndPerc";
import TabMedAnt from "./TabMedAnt";
import TabProgSVi from "./TabProgSVi";
import ReactSpinner from "../../icons/ReactSpinner";
const DivDcut = lazy(() => import("./DivDCut"));
export default function FsTab(): JSX.Element {
  return (
    <fieldset className='fsSub' name='fsSubProgConsName' id='fsSubProgConsId'>
      <TabProgSVi />
      <hr />
      <TabMedAnt />
      <hr />
      <Suspense fallback={<ReactSpinner scale={0.5} />}>
        <DivDcut />
      </Suspense>
      <hr />
      <TabIndPerc />
      <br role='presentation' />
      <hr
        style={{
          opacity: 0.15,
          marginLeft: "0.5rem",
        }}
      />
    </fieldset>
  );
}
