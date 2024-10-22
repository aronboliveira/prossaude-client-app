import { ErrorBoundary } from "react-error-boundary";
import Watcher from "../../components/interactive/def/Watcher";
import GenericErrorComponent from "../../components/error/GenericErrorComponent";
import { Suspense, lazy } from "react";
import Spinner from "../../components/icons/Spinner";
import ReactBrand from "../../components/icons/ReactBrand";
import { Toaster } from "react-hot-toast";
const Login = lazy(() => import("../../components/interactive/login/LoginInputs"));
export default function LoginPage(): JSX.Element {
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error loading Login Page' />} />
      )}>
      <div role='group' className='pad1pc' id='bgDiv'>
        <main>
          <div>
            <Toaster />
          </div>
          <Suspense fallback={<Spinner fs={true} />}>
            <Login />
          </Suspense>
          <ReactBrand />
        </main>
      </div>
      <Watcher routeCase='login' />
    </ErrorBoundary>
  );
}
