import { ErrorBoundary } from "react-error-boundary";
import { Suspense, lazy } from "react";
import GenericErrorComponent from "../../components/error/GenericErrorComponent";
import HeaderDate from "../../components/interactive/def/HeaderDate";
import OdTipsBtnWrapper from "../../components/interactive/od/OdTipsBtnWrapper";
import SwitchDiv from "../../components/interactive/def/SwitchDiv";
import Watcher from "../../components/interactive/def/Watcher";
import Spinner from "../../components/icons/Spinner";
const Form = lazy(() => import("../../components/interactive/od/OdForm"));
export default function OdPage(): JSX.Element {
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error loading form for Odontology' />}>
      <div role='group' className='pad1pc' id='bgDiv'>
        <header>
          <div role='group' className='flexNoW flexDiv flexAlItT flexSimple flexQ900NoWC' id='hDiv'>
            <div role='group' id='hTextDiv'>
              <div>
                <h1 className='bolded flexJBt' id='hForm'>
                  <strong>Exame Clínico: Odontologia</strong>
                </h1>
                <p>
                  <strong>PROSSaúde — UFRJ</strong>
                </p>
              </div>
              <OdTipsBtnWrapper />
            </div>
            <HeaderDate />
          </div>
        </header>
        <main>
          <SwitchDiv />
          <hr />
          <Suspense fallback={<Spinner fs={true} />}>
            <Form />
          </Suspense>
        </main>
      </div>
      <Watcher routeCase='od' />
    </ErrorBoundary>
  );
}
