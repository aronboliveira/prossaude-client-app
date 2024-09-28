import { ErrorBoundary } from "react-error-boundary";
import LoginInputs from "../../components/interactive/login/LoginInputs";
import Watcher from "../../components/interactive/def/Watcher";
import GenericErrorComponent from "../../components/error/GenericErrorComponent";
export const getServerSideProps = async (): Promise<object> => {
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
export default function LoginPage(): JSX.Element {
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error loading Login Page' />} />
      )}>
      <div role='group' className='pad1pc' id='bgDiv'>
        <main>
          <form
            id='outerLoginCont'
            name='login_form'
            action='check_user_validity'
            encType='application/x-www-form-urlencoded'
            method='post'
            target='_self'
            autoComplete='on'>
            <div role='group' id='loginCont'>
              <section id='logoCont'>
                <img className='fade-in-element' id='logo' src='/img/PROS_Saude_Modelo1-Final.png' alt='logo' />
              </section>
              <section id='headerCont'>
                <div role='group' id='titleCont1'>
                  <h1 id='titleText'>
                    <span role='group' className='fade-in-element' id='spanTitle'>
                      Faça o Login
                    </span>
                  </h1>
                </div>
                <div role='group' id='titleCont2'>
                  <h2 id='subtitleText'>
                    <span role='group' className='fade-in-late-element' id='spanSubtitle'>
                      Informe seus dados de usuário
                    </span>
                  </h2>
                </div>
              </section>
              <LoginInputs />
            </div>
          </form>
        </main>
      </div>
      <Watcher routeCase='login' />
    </ErrorBoundary>
  );
}
