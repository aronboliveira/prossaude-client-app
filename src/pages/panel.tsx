import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useState, useContext } from "react";
import { handleLinkChanges } from "@/lib/global/handlers/gRoutingHandlers";
import { createRoot } from "react-dom/client";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { isClickOutside } from "@/lib/global/gStyleScript";
import { User } from "@/lib/global/declarations/classes";
import { useRouter } from "next/router";
import { DataProvider } from "@/lib/locals/panelPage/declarations/classesCons";
import { voidVal } from "@/lib/global/declarations/types";
import { AppRootContext } from "./_app";
import UserProfilePanel from "../../components/user/UserProfilePanel";
import FallbackedMainPanel from "../../components/mainPanel/FallbackedMainPanel";
import ErrorMainDiv from "../../components/error/ErrorMainDiv";
import GenericErrorComponent from "../../components/error/GenericErrorComponent";
import PanelTips from "../../components/interactive/panel/PanelTips";

export const fillScheduleState = { acc: 0 };
export const formData: { [key: string]: string } = {};
export const user = await (async () => {
  let userName = "João Almeida",
    userArea = "psicologia",
    userClass = "coordenador",
    userEmail = "almeida.joao@gmail.com",
    userTel = "+55 21 99988-7766";
  try {
    const res = await fetch("/user.json", {
      method: "GET",
    });
    if (!res.ok) throw new Error(`Failed to get proper response from server.`);
    const fetchedUser = await res.json();
    if (!fetchedUser) throw new Error(`Failed to parse fetched data.`);
    return Object.freeze(
      new User(
        fetchedUser._class,
        fetchedUser._area,
        fetchedUser._name,
        fetchedUser._email,
        fetchedUser._tel
      )
    );
  } catch (err) {
    console.error(`FETCH ERROR:
    ${(err as Error).message}`);
    return Object.freeze(
      new User(userClass, userArea, userName, userEmail, userTel)
    );
  }
})();
export let globalDataProvider: DataProvider | voidVal = undefined;

export default function PanelPage(): JSX.Element {
  const [mounted, setMounted] = useState<boolean>(false);
  const [shouldShowTips, setTips] = useState<boolean>(false);
  const nextRouter = useRouter();
  const context = useContext(AppRootContext);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    globalDataProvider = new DataProvider(sessionStorage);
    handleLinkChanges("panel", "Panel Page Style");
    const selDiv = document.getElementById("formSelDiv");
    if (selDiv instanceof HTMLElement && !selDiv.querySelector("select")) {
      selDiv.innerHTML = ``;
      if (!context.roots.rootSel) context.roots.rootSel = createRoot(selDiv);
      context.roots.rootSel.render(<ErrorMainDiv />);
    } else
      setTimeout(() => {
        !document.getElementById("formSelDiv")?.querySelector("select") &&
          elementNotFound(
            selDiv,
            "selDiv during DOM initialization",
            extLine(new Error())
          );
      }, 2000);
    const profileSpan = document.getElementById("rootUserInfo");
    if (profileSpan instanceof HTMLElement) {
      if (!context.roots.userRoot)
        context.roots.userRoot = createRoot(profileSpan);
      if (!profileSpan.hasChildNodes())
        context.roots.userRoot.render(
          <UserProfilePanel user={user} router={nextRouter} />
        );
      setTimeout(() => {
        if (!profileSpan.querySelector("img"))
          context.roots.userRoot.render(
            <GenericErrorComponent message="Erro renderizando painel de usuário" />
          );
      }, 2000);
    } else
      setTimeout(() => {
        !document.getElementById("rootUserInfo")?.querySelector("img") &&
          elementNotFound(
            profileSpan,
            "profileSpan during DOM initialization",
            extLine(new Error())
          );
      }, 2000);
    syncAriaStates(document.querySelectorAll("*"));
    document
      .getElementById("tipsDlg")
      ?.addEventListener("click", function (click) {
        const clickOutside = isClickOutside(
          click,
          document.getElementById("tipsDlg")!
        );
        clickOutside.some(point => point === true) &&
          this instanceof HTMLDialogElement &&
          this.close();
      });
  }, []);
  return !mounted ? (
    <></>
  ) : (
    <ErrorBoundary FallbackComponent={() => <div>Erro!</div>}>
      <div role="group" className="pad1pc" id="bgDiv">
        <header className="flexJBt flexAlItSt flexNoWC600Q flexAlItCt600Q pd-2vQ460 rGap1v mg-0lm601Q pd-1rbm601Q">
          <div
            role="group"
            className="flexNoW flexAlItSE flexSimple flexQ900NoWC flexAlItSt900Q"
          >
            <h1 className="bolded mg-1t noInvert mgr-1v">
              <strong className="noInvert">Painel de Trabalho</strong>
            </h1>
            <button
              className="transparent-el-bg mg-2bv noInvert"
              id="tipsBtn"
              title="Dúvidas"
              onClick={() => setTips(!shouldShowTips)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-question-circle-fill widMax-3r htMax1-5r"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
              </svg>
            </button>
            {shouldShowTips && (
              <PanelTips state={shouldShowTips} dispatch={setTips} />
            )}
          </div>
          <hr className="widFull d-no d-bl600Q" />
          <div
            role="group"
            className="flexNoW flexNoWC600Q flexAlItCt cGap1v flexAlItSt600Q form-control contFitW"
          >
            <section className="form-control noMargin widThird flexNoW rGap2v flexBasis25 mg-0bQ460 widMinFit mg-0b600Q noInvert">
              <div
                role="group"
                className="widFull flexNoW cGap2v rGap1v flexQ460NoWC wsNoW"
                id="rootUserInfo"
              >
                <UserProfilePanel user={user} router={nextRouter} />
              </div>
            </section>
          </div>
          <hr className="widFull d-no d-bl600Q" />
        </header>
        <main>
          <section className="flexColumn" id="registSect">
            <div role="group" id="panelDiv">
              <div role="group" id="formSelDiv" className="form-padded--nosb">
                <FallbackedMainPanel
                  mainRoot={context.roots.rootSel}
                  userClass={user.userClass}
                  renderError={new Error(`Erro carregando Painel Principal!`)}
                  defOp={"agenda"}
                />
              </div>
              <div role="group" id="pacDiv" className="form-padded"></div>
            </div>
          </section>
        </main>
      </div>
      <div role="group" id="rootDlgList"></div>
      <canvas id="chreference" hidden>
        0
      </canvas>
    </ErrorBoundary>
  );
}
