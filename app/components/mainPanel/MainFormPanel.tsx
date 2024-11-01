import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../error/GenericErrorComponent";
import SelectPanelLoader from "../panelForms/defs/client/SelectLoader";
export default function MainFormPanel(): JSX.Element {
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error rendering shell for Panel' />}>
      <div role='group' id='formSelDiv' className='formPadded--nosb'>
        <div role='group' id='formPanelDiv'>
          <SelectPanelLoader />
        </div>
      </div>
    </ErrorBoundary>
  );
}
