import { ErrorBoundary } from "react-error-boundary";
import { Suspense, lazy } from "react";
import AgTipsBtnWrapper from "../../components/interactive/ag/AgTipsBtnWrapper";
import GenericErrorComponent from "../../components/error/GenericErrorComponent";
import HeaderDate from "../../components/interactive/def/HeaderDate";
import Watcher from "../../components/interactive/def/Watcher";
import SwitchDiv from "../../components/interactive/def/SwitchDiv";
import Spinner from "../../components/icons/Spinner";
const Form = lazy(() => import("../../components/interactive/ag/AgForm"));
export default function AGPage(): JSX.Element {
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error loading form for Anamnesis' />}>
      <div className='pad1pc' id='bgDiv' role='document'>
        <header>
          <div className='flexNoW flexDiv flexAlItT flexSimple flexQ900NoWC' id='hDiv' role='group'>
            <div role='group'>
              <div className='noInvert'>
                <h1 className='bolded flexJBt' id='hForm'>
                  Anamnese Geral
                </h1>
                <h2 className='bolded'>PROSSaúde, UFRJ</h2>
                <AgTipsBtnWrapper />
              </div>
              <SwitchDiv />
            </div>
            <HeaderDate />
          </div>
        </header>
        <main>
          <hr />
          <Suspense fallback={<Spinner fs={true} />}>
            <Form />
          </Suspense>
        </main>
      </div>
      <Watcher routeCase='ag' />
    </ErrorBoundary>
  );
}
