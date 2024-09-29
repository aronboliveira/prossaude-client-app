import { ErrorBoundary } from "react-error-boundary";
import MainContainer from "../../components/interactive/base/MainContainer";
import Watcher from "../../components/interactive/def/Watcher";
export default function BasePage(): JSX.Element {
 return (
  <ErrorBoundary FallbackComponent={() => <div>Erro!</div>}>
   <div id='bgDiv'>
    <nav className='main-article flexNoWC widFullView widAt750Q htFullView htAuto750Q noMargin'>
     <header className='header-main-container bolded ht10 flexAlItCt noMargin bolded flexJBt flexNoWC900Q pd1r900Q htAt900Q htpd-2vQ460 pdL2r rGap1v mg-0lm601Q bolded'>
      <h1 className='header-main-text bolded txaCt noInvert'>Menu Inicial — PROS-Saúde: UFRJ</h1>
      <div
       role='group'
       className='flexNoW flexAlItCt cGap1v flexAlItE600Q cGap3v600Q contFitW flexNoWC460Q'
       id='divUserPanel'>
       <section className='form-control mgr-1_5v widThird flexNoW rGap2v flexBasis25 mg-t1-2v mg-0bQ460 widMinFit mg-0b600Q noInvert mg-05b forceInvert'>
        <div role='group' className='widFull flexNoW cGap2v rGap1v flexQ460NoWC wsNoW' id='rootUserInfo'></div>
       </section>
      </div>
     </header>
     <MainContainer />
    </nav>
    <footer></footer>
    <Watcher routeCase='base' />
   </div>
  </ErrorBoundary>
 );
}
