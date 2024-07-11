import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useContext } from "react";
import { handleLinkChanges } from "@/lib/global/handlers/gRoutingHandlers";
import { User } from "@/lib/global/declarations/classes";
import { createRoot } from "react-dom/client";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { equalizeParagraphs } from "@/lib/locals/basePage/baseStylescript";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { expandContent } from "@/lib/global/gStyleScript";
import { useRouter } from "next/router";
import { AppRootContext } from "./_app";
import { targEl } from "@/lib/global/declarations/types";
import UserProfilePanel from "../../components/user/UserProfilePanel";

let baseRootUser: targEl;

export default function BasePage(): JSX.Element {
  const context = useContext(AppRootContext);
  const nextRouter = useRouter();
  useEffect(() => {
    handleLinkChanges("base", "Base Page Style");
    const user = new User("Coordenador", "psicologia", "João Almeida");
    baseRootUser = document.getElementById("rootUserInfo");
    baseRootUser instanceof HTMLElement && !context.roots.baseRootedUser
      ? (context.roots.baseRootedUser = createRoot(baseRootUser))
      : setTimeout(() => {
          baseRootUser = document.getElementById("rootUserInfo");
          !baseRootUser &&
            elementNotFound(
              baseRootUser,
              "Root for user painel",
              extLine(new Error())
            );
        }, 2000);
    typeof context.roots.baseRootedUser === "object"
      ? context.roots.baseRootedUser.render(
          <UserProfilePanel user={user} router={nextRouter} />
        )
      : elementNotFound(
          `${JSON.stringify(context.roots.baseRootedUser)}`,
          "Root instance for User panel",
          extLine(new Error())
        );
    equalizeParagraphs(Array.from(document.querySelectorAll("small")));
    syncAriaStates(document.querySelectorAll("*"));
    expandContent(document.getElementById("rootUserInfo"));
  }, []);
  return (
    <ErrorBoundary FallbackComponent={() => <div>Erro!</div>}>
      <div id="bgDiv">
        <nav className="main-article flexNoWC widFullView widAt750Q htFullView htAuto750Q noMargin">
          <header className="header-main-container bolded ht10 flexAlItCt noMargin bolded flexJBt flexNoWC900Q pd1r900Q htAt900Q htpd-2vQ460 pdL2r rGap1v mg-0lm601Q bolded">
            <h1 className="header-main-text bolded txaCt noInvert">
              Menu Inicial — PROS-Saúde: UFRJ
            </h1>
            <div
              role="group"
              className="flexNoW flexAlItCt cGap1v flexAlItE600Q cGap3v600Q contFitW flexNoWC460Q"
              id="divUserPanel"
            >
              <section className="form-control mgr-1_5v widThird flexNoW rGap2v flexBasis25 mg-t1-2v mg-0bQ460 widMinFit mg-0b600Q noInvert mg-05b forceInvert">
                <div
                  role="group"
                  className="widFull flexNoW cGap2v rGap1v flexQ460NoWC wsNoW"
                  id="rootUserInfo"
                ></div>
              </section>
            </div>
          </header>
          <main className="main-container gridAlItCt widFull gridAlItBs750Q gridAuto750Q rGap4v750Q">
            <section
              id="cardsSect"
              className="grid4col grid4r750Q gridJICt rGap2v750Q pd-t4v750Q fade-in-early-element"
            >
              <div
                className="card card23v htMinMaxC751Qmin brd-rd2r wid90p750Q htMaxC460Q fd1el"
                style={{ maxWidth: "12rem" }}
              >
                <button
                  className="card-hborder transparent-el fade-in-early-element"
                  id="agAnchoredBtn"
                >
                  <a
                    className="card-header anchoredBtn noInvert"
                    id="ag_but"
                    target="_self"
                    href="/ag"
                    onClick={() => nextRouter.push("/ag")}
                  >
                    <img
                      className="card-img-top"
                      src="../img/icon-psy.png"
                      alt="imagem-card-geral"
                    />
                  </a>
                </button>
                <div className="card-body txAlCt pdT3v flexNoWC rGap2v750Q rGap0-5v fd2el">
                  <a
                    className="card-title bolded btn btn-grey btn-rounded anchoredBtn noInvert"
                    id="ag_but_sec"
                    target="_self"
                    href="/ag"
                    onClick={() => nextRouter.push("/ag")}
                  >
                    Anamnese Geral, Medicina & Saúde Mental
                  </a>
                  <small className="mg-1bv460Q fd3el">
                    Acesse aqui o formulário para Anamnese Geral, Medicina &
                    Saúde Mental
                  </small>
                </div>
              </div>
              <div className="card card23v htMinMaxC751Qmin brd-rd2r wid90p750Q htMaxC460Q fd2el">
                <button
                  className="card-hborder transparent-el"
                  id="efAnchoredBtn"
                >
                  <a
                    className="card-header anchoredBtn noInvert"
                    id="ef_but"
                    target="_self"
                    href="/edfis"
                    onClick={() => nextRouter.push("/edfis")}
                  >
                    <img
                      className="card-img-top"
                      src="../img/PROS_edfis_icon.png"
                      alt="imagem-card-edFis"
                    />
                  </a>
                </button>
                <div className="card-body txAlCt pdT3v flexNoWC rGap2v750Q rGap0-5v fd3el">
                  <a
                    className="card-title bolded btn btn-orange btn-rounded anchoredBtn noInvert"
                    id="ef_but_sec"
                    target="_self"
                    href="/edfis"
                    onClick={() => nextRouter.push("/edfis")}
                  >
                    Educação Física
                  </a>
                  <p>
                    <small className="noInvert fd4el">
                      Acesse aqui o formulário para Educação Física
                    </small>
                  </p>
                </div>
              </div>
              <div className="card card23v htMinMaxC751Qmin brd-rd2r wid90p750Q htMaxC460Q fd4el">
                <button
                  className="card-hborder transparent-el"
                  id="nutAnchoredBtn"
                >
                  <a
                    className="card-header anchoredBtn noInvert"
                    id="nut_but"
                    target="_self"
                    href="/edfis"
                    onClick={() => nextRouter.push("/edfis")}
                  >
                    <img
                      className="card-img-top"
                      src="../img/PROS_nut_icon.png"
                      alt="imagem-card-nut"
                    />
                  </a>
                </button>
                <div className="card-body txAlCt pdT3v flexNoWC rGap2v750Q rGap0-5v fd5el">
                  <a
                    className="card-title bolded btn btn-green btn-rounded anchoredBtn"
                    target="_self"
                    id="nut_but_sec"
                    href="/edfis"
                    onClick={() => nextRouter.push("/edfis")}
                  >
                    Nutrição
                  </a>
                  <p>
                    <small className="noInvert fd6el">
                      Acesse aqui o formulário para Nutrição
                    </small>
                  </p>
                </div>
              </div>
              <div className="card card23v htMinMaxC751Qmin brd-rd2r wid90p750Q htMaxC460Q fd5el">
                <button
                  className="card-hborder transparent-el"
                  id="odAnchoredBtn"
                >
                  <a
                    className="card-header anchoredBtn noInvert"
                    id="od_but"
                    target="_self"
                    href="/od"
                    onClick={() => nextRouter.push("/od")}
                  >
                    <img
                      className="card-img-top"
                      src="../img/pros-od-icon.png"
                      alt="imagem-card-odonto"
                    />
                  </a>
                </button>
                <div className="card-body txAlCt pdT3v flexNoWC rGap2v750Q rGap0-5v fd6el">
                  <a
                    className="card-title bolded btn btn-blue btn-rounded anchoredBtn"
                    id="od_but_sec"
                    target="_self"
                    href="/od"
                    onClick={() => nextRouter.push("/od")}
                  >
                    Odontologia
                  </a>
                  <small className="mg-1bv460Q fade-in-late-element">
                    Acesse aqui o formulário para Odontologia
                  </small>
                </div>
              </div>
            </section>
            <section id="panelSect" className="gridJICt pd-b4v750Q fd2el">
              <button
                type="button"
                id="panelBtn"
                className="btn btn-primary btn-rounded wid80p750Q"
              >
                <a
                  href="/panel"
                  id="panelAnchor"
                  target="_self"
                  style={{ color: "#ffff", fontWeight: "600" }}
                >
                  Painel de Trabalho
                </a>
              </button>
            </section>
          </main>
        </nav>
        <footer></footer>
      </div>
    </ErrorBoundary>
  );
}
