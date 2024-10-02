import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../components/error/GenericErrorComponent";
import MainFormPanel from "../../components/mainPanel/MainFormPanel";
import TipsBtnWrapper from "../../components/interactive/panel/TipsBtnWrapper";
import UserProfilePanelWrapper from "../../components/interactive/panel/UserProfilePanelWrapper";
export default function PanelPage(): JSX.Element {
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error rendering Panel Page' />}>
      <div role='group' className='pad1pc' id='bgDiv'>
        <header className='flexJBt flexAlItSt flexNoWC600Q flexAlItCt600Q pd-2vQ460 rGap1v mg-0lm601Q pd-1rbm601Q'>
          <div role='group' className='flexNoW flexAlItSE flexSimple flexQ900NoWC flexAlItSt900Q'>
            <h1 className='bolded mg-1t noInvert mgr-1v'>
              <strong className='noInvert'>Painel de Trabalho</strong>
            </h1>
            <TipsBtnWrapper />
          </div>
          <hr className='widFull d-no d-bl600Q' />
          <div
            role='group'
            className='flexNoW flexNoWC600Q flexAlItCt cGap1v flexAlItSt600Q form-control contFitW'
            id='wrapperUserInfo'>
            <section
              className='form-control noMargin widThird flexNoW rGap2v flexBasis25 mg-0bQ460 widMinFit mg-0b600Q noInvert'
              id='sectUserInfo'>
              <div role='group' className='widFull flexNoW cGap2v rGap1v flexQ460NoWC wsNoW' id='rootUserInfo'>
                <UserProfilePanelWrapper />
              </div>
            </section>
          </div>
          <hr className='widFull d-no d-bl600Q' />
        </header>
        <main>
          <section className='flexColumn' id='registSect'>
            <div role='group' id='panelDiv'>
              <MainFormPanel />
              <div role='group' id='pacDiv' className='form-padded'></div>
            </div>
          </section>
        </main>
      </div>
      <div role='group' id='rootDlgList'></div>
      <canvas id='chreference' hidden>
        0
      </canvas>
    </ErrorBoundary>
  );
}
