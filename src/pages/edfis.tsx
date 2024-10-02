import { ErrorBoundary } from "react-error-boundary";
import ENTipsBtnWrapper from "../../components/interactive/edfis/ENTipsBtnWrapper";
import GenericErrorComponent from "../../components/error/GenericErrorComponent";
import HeaderDate from "../../components/interactive/def/HeaderDate";
import SwitchDiv from "../../components/interactive/def/SwitchDiv";
import WatcherEN from "../../components/interactive/edfis/WatcherEN";
import { Suspense, lazy } from "react";
import Spinner from "../../components/icons/Spinner";
const ENForm = lazy(() => import("../../components/interactive/edfis/EdFisForm"));
export default function EdFisNutPage(): JSX.Element {
  return (
    <ErrorBoundary
      FallbackComponent={() => <GenericErrorComponent message='Error loading form Physical Education and Nutrition' />}>
      <div id='bgDiv'>
        <header>
          <div role='group' className='pad1pc'>
            <div role='group' className='flexNoW flexDiv flexAlItT flexSimple flexQ900NoWC' id='hDiv'>
              <div role='group' id='hTextDiv' className='noInvert'>
                <h1 className='bolded flexJBt' id='hForm'>
                  <strong>Ficha de Avaliação:</strong>
                </h1>
                <h2>
                  <strong>Educação Física & Nutrição</strong>
                </h2>
                <p>
                  <strong>PROSSaúde — UFRJ</strong>
                </p>
                <ENTipsBtnWrapper />
              </div>
              <HeaderDate />
            </div>
          </div>
        </header>
        <main>
          <SwitchDiv autofill={true} />
          <hr />
          <Suspense fallback={<Spinner fs={true} />}>
            <ENForm />
          </Suspense>
        </main>
      </div>
      <WatcherEN />
    </ErrorBoundary>
  );
}
