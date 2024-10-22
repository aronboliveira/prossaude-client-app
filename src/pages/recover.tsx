import { ErrorBoundary } from "react-error-boundary";
import Watcher from "../../components/interactive/def/Watcher";
import GenericErrorComponent from "../../components/error/GenericErrorComponent";
import RecoverForm from "../../components/interactive/recover/RecoverForm";
import { Toaster } from "react-hot-toast";
export default function Recover(): JSX.Element {
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error loading Recover Password Page!' />}>
      <div>
        <Toaster />
      </div>
      <div id='bgDiv'>
        <RecoverForm />
      </div>
      <Watcher routeCase='recover' />
    </ErrorBoundary>
  );
}
