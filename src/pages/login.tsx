import { ErrorBoundary } from "react-error-boundary";
import LoginInputs from "../../components/interactive/login/LoginInputs";
import Watcher from "../../components/interactive/def/Watcher";

export default function LoginPage(): JSX.Element {
  return (
    <ErrorBoundary FallbackComponent={() => <div>Erro!</div>}>
      <div role="group" className="pad1pc" id="bgDiv">
        <main>
          <form
            id="outerLoginCont"
            name="login_form"
            action="check_user_validity"
            encType="application/x-www-form-urlencoded"
            method="post"
            target="_self"
            autoComplete="on"
          >
            <div role="group" id="loginCont">
              <section id="logoCont">
                <img
                  className="fade-in-element"
                  id="logo"
                  src="./img/PROS_Saude_Modelo1-Final.png"
                  alt="logo"
                />
              </section>
              <section id="headerCont">
                <div role="group" id="titleCont1">
                  <h1 id="titleText">
                    <span
                      role="group"
                      className="fade-in-element"
                      id="spanTitle"
                    >
                      Faça o Login
                    </span>
                  </h1>
                </div>
                <div role="group" id="titleCont2">
                  <h2 id="subtitleText">
                    <span
                      role="group"
                      className="fade-in-late-element"
                      id="spanSubtitle"
                    >
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
      <Watcher routeCase="login" />
    </ErrorBoundary>
  );
}
