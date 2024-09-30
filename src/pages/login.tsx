import { ErrorBoundary } from "react-error-boundary";
import Watcher from "../../components/interactive/def/Watcher";
import GenericErrorComponent from "../../components/error/GenericErrorComponent";
import { Suspense, lazy } from "react";
import Spinner from "../../components/icons/Spinner";
export const getStaticProps = async (): Promise<object> => {
  const data = {
    fetch: "",
    status: 404,
    text: "",
  };
  try {
    const res = await fetch("https://cdn.jsdelivr.net/gh/aronboliveira/my-python@main/fetch_test.py", {
      method: "GET",
      headers: {},
      mode: "cors",
      credentials: "same-origin",
      referrer: "",
      referrerPolicy: "same-origin",
      cache: "no-store",
      redirect: "error",
      keepalive: false,
    });
    if (!res.ok)
      throw new Error(
        `${res.status}: ${res.statusText} && ${res.redirected ? "should redirect" : "should not redirect"}`,
      );
    let script = await res.text();
    script = JSON.parse(script.slice(script.indexOf("{"), script.lastIndexOf("}") + 1).trim());
    data.fetch = script;
    data.status = res.status;
    data.text = res.statusText;
  } catch (e) {
    console.warn(`Failed to execute fetch API:
      Name: ${(e as Error).name}
      Message: ${(e as Error).message}
      Stack: ${(e as Error).stack || "undefined"}
      Cause: ${(e as Error).cause || "undefined"}`);
  }
  return {
    props: { data },
  };
};
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
