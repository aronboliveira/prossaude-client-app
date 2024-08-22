"use client";
import { AppRootContext } from "@/pages/_app";
import { User } from "@/lib/global/declarations/classes";
import { createRoot } from "react-dom/client";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { equalizeParagraphs } from "@/lib/locals/basePage/baseStylescript";
import { expandContent } from "@/lib/global/gStyleScript";
import { parseNotNaN } from "@/lib/global/gModel";
import { targEl } from "@/lib/global/declarations/types";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import UserProfilePanel from "../../user/UserProfilePanel";
import { defUser } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { setFullUser } from "@/redux/slices/userSlice";
import { UserState } from "@/pages/api/ts/serverInterfaces";
let baseRootUser: targEl;
export let experimentalUser: UserState = defUser;
export default function MainContainer(): JSX.Element {
  const context = useContext(AppRootContext);
  const nextRouter = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    experimentalUser = localStorage.getItem("activeUser")
      ? JSON.parse(localStorage.getItem("activeUser")!)
      : defUser;
    if (
      experimentalUser.loadedData.name === "" ||
      /an[oô]nimo/gi.test(experimentalUser.loadedData.name)
    )
      console.warn(
        `Failed to fetch user from local storage. Default user displayed.`
      );
    const user = new User({
      name: experimentalUser.loadedData.name,
      privilege: experimentalUser.loadedData.privilege,
      area: experimentalUser.loadedData.area,
      email: experimentalUser.loadedData.email,
      telephone: experimentalUser.loadedData.telephone,
    });
    dispatch(setFullUser({ v: { loadedData: experimentalUser.loadedData } }));
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
    expandContent(document.getElementById("rootUserInfo"));
    const handleBgResize = (): void => {
      try {
        const bgDiv = document.getElementById("bgDiv");
        if (!(bgDiv instanceof HTMLElement)) {
          console.warn(`Failed to fetch Background Div`);
          return;
        }
        const mainArticle =
          document.querySelector(".main-article") ||
          document.querySelector("nav");
        if (!(mainArticle instanceof HTMLElement)) {
          console.warn(`Failed to fetch MainArticle`);
          return;
        }
        const mainContainer =
          document.querySelector(".main-container") ||
          document.querySelector("main");
        if (!(mainContainer instanceof HTMLElement)) {
          console.warn(`Failed to fetch Main Container`);
          return;
        }
        const cardsSect = document.getElementById("cardsSect");
        if (!(cardsSect instanceof HTMLElement)) {
          console.warn(`Failed to fetch Cards Section`);
          return;
        }
        const panelBtn = document.getElementById("panelBtn");
        const panelSect = document.getElementById("panelSect");
        let factor = 1,
          contFactor = 1,
          numRows = 1,
          factorRows = 0.5;
        const rows = getComputedStyle(cardsSect).gridTemplateRows;
        if (/repeat/g.test(rows))
          numRows =
            parseNotNaN(
              rows
                .slice(0, rows.indexOf(","))
                .replace("repeat(", "")
                .replace(/[^0-9]g/, "")
            ) || 2;
        else numRows = Array.from(rows.matchAll(/\s/g)).length + 1 || 1;
        if (panelBtn instanceof HTMLElement) panelBtn.style.width = "23.2rem";
        if (cardsSect instanceof HTMLElement) cardsSect.style.paddingTop = "0";
        if (panelSect instanceof HTMLElement) panelSect.style.paddingTop = "0";
        if (innerWidth > 520 && innerWidth <= 1025) numRows = 2;
        if (innerWidth <= 1025 && numRows > 1) {
          factor = 1 * numRows * factorRows;
          contFactor = 1 * numRows * factorRows;
          if (panelSect instanceof HTMLElement) {
            panelSect.style.paddingTop = "0";
            panelSect.style.paddingBottom = "0";
            if (panelBtn instanceof HTMLElement) {
              panelBtn.style.width = "23.2rem";
              if (panelBtn.parentElement)
                panelBtn.parentElement!.style.paddingTop = "1%";
            }
          }
        }
        if (
          innerWidth < 930 &&
          numRows > 1 &&
          panelSect instanceof HTMLElement
        ) {
          panelSect.style.paddingTop = "1rem";
          panelSect.style.paddingBottom = "0";
        }
        if (innerWidth <= 850 && numRows > 1) {
          contFactor = 0.94 * numRows * factorRows;
          if (cardsSect instanceof HTMLElement)
            cardsSect.style.paddingTop = "2rem";
          if (panelSect instanceof HTMLElement) {
            panelSect.style.paddingTop = "3rem";
            panelSect.style.paddingBottom = "0";
          }
        }
        if (innerWidth <= 750 && numRows > 1) {
          contFactor = 1 * numRows * factorRows;
          if (panelSect instanceof HTMLElement) {
            panelSect.style.paddingTop = "0";
            panelSect.style.paddingBottom = "3rem";
          }
        }
        if (innerWidth <= 675 && numRows > 1) {
          if (panelSect instanceof HTMLElement) {
            panelSect.style.paddingTop = "0.2rem";
          }
        }
        if (innerWidth <= 600 && numRows > 1) {
          contFactor = 0.93 * numRows * factorRows;
        }
        if (innerWidth <= 592 && numRows > 1) {
          factor = 1.04 * numRows * factorRows;
          contFactor = 1.2 * numRows * factorRows;
          if (panelSect instanceof HTMLElement) {
            panelSect.style.paddingTop = "2rem";
          }
        }
        if (numRows >= 4 && innerWidth <= 520) {
          numRows = 4;
          factorRows = 0.25;
        }
        if (innerWidth <= 520 && numRows > 1) {
          factor = 1.06 * numRows * factorRows;
          contFactor = 1 * numRows * factorRows;
          if (panelSect instanceof HTMLElement) {
            panelSect.style.paddingBottom = "2rem";
            panelSect.style.marginTop = "0";
            if (panelBtn instanceof HTMLElement) panelBtn.style.width = "75vw";
          }
        }
        if (innerWidth <= 448 && numRows > 1) {
          factor = 1.083 * numRows * factorRows;
          contFactor = 1.045 * numRows * factorRows;
          if (panelSect instanceof HTMLElement) {
            panelSect.style.paddingTop = "2rem";
            panelSect.style.paddingBottom = "3rem";
          }
        }
        if (innerWidth <= 415 && numRows > 1) {
          factor = 1.038 * numRows * factorRows;
          contFactor = 1.01 * numRows * factorRows;
          if (panelSect instanceof HTMLElement) {
            panelSect.style.paddingTop = "2rem";
            if (panelBtn instanceof HTMLElement) panelBtn.style.width = "75vw";
          }
        }
        if (innerWidth <= 325 && numRows > 1) {
          factor = 1.038 * numRows * factorRows;
          contFactor = 1.01 * numRows * factorRows;
          if (panelSect instanceof HTMLElement) {
            panelSect.style.paddingTop = "3.5rem";
            if (cardsSect instanceof HTMLElement)
              cardsSect.style.paddingTop = "5rem";
            if (panelBtn instanceof HTMLElement) panelBtn.style.width = "75vw";
          }
        }
        bgDiv.style.height = `${
          parseNotNaN(
            getComputedStyle(mainArticle).height.replace("px", "").trim()
          ) * factor || 1
        }px`;
        mainContainer.style.height = `${
          parseNotNaN(
            getComputedStyle(mainArticle).height.replace("px", "").trim()
          ) * contFactor || 1
        }px`;
      } catch (e) {
        console.error(
          `Error executing handleBgResize:\n${(e as Error).message}`
        );
      }
    };
    handleBgResize();
    addEventListener("resize", handleBgResize);
    return () => removeEventListener("resize", handleBgResize);
  }, []);
  return (
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
              rel="nofollow"
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
              rel="nofollow"
              onClick={() => nextRouter.push("/ag")}
            >
              Geral & Saúde Mental
            </a>
            <small className="mg-1bv460Q fd3el formDesc">
              Acesse aqui o formulário para Anamnese Geral e Saúde Mental
            </small>
          </div>
        </div>
        <div className="card card23v htMinMaxC751Qmin brd-rd2r wid90p750Q htMaxC460Q fd2el">
          <button className="card-hborder transparent-el" id="efAnchoredBtn">
            <a
              className="card-header anchoredBtn noInvert"
              id="ef_but"
              target="_self"
              href="/edfis"
              rel="nofollow"
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
              rel="nofollow"
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
          <button className="card-hborder transparent-el" id="nutAnchoredBtn">
            <a
              className="card-header anchoredBtn noInvert"
              id="nut_but"
              target="_self"
              href="/edfis"
              rel="nofollow"
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
              rel="nofollow"
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
          <button className="card-hborder transparent-el" id="odAnchoredBtn">
            <a
              className="card-header anchoredBtn noInvert"
              id="od_but"
              target="_self"
              href="/od"
              rel="nofollow"
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
              rel="nofollow"
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
            rel="nofollow"
            style={{ color: "#ffff", fontWeight: "600" }}
          >
            Painel de Trabalho
          </a>
        </button>
      </section>
    </main>
  );
}
