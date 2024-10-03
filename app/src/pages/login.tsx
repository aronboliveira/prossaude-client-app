import { ErrorBoundary } from "react-error-boundary";
import Watcher from "../../components/interactive/def/Watcher";
import GenericErrorComponent from "../../components/error/GenericErrorComponent";
import { Suspense, lazy } from "react";
import Spinner from "../../components/icons/Spinner";
const Login = lazy(() => import("../../components/interactive/login/LoginInputs"));
export default function LoginPage(): JSX.Element {
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error loading Login Page' />} />
      )}>
      <div role='group' className='pad1pc' id='bgDiv'>
        <main>
          <Suspense fallback={<Spinner fs={true} />}>
            <Login />
          </Suspense>
        </main>
      </div>
      <Watcher routeCase='login' />
    </ErrorBoundary>
  );
}
