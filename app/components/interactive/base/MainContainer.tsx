"use client";
import { RootCtx } from "@/pages/_app";
import { createRoot } from "react-dom/client";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { equalizeParagraphs } from "@/lib/locals/basePage/baseStylescript";
import { expandContent } from "@/lib/global/gStyleScript";
import { checkContext } from "@/lib/global/gModel";
import { targEl } from "@/lib/global/declarations/types";
import { useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import EnhancedUserProfilePanel from "../../user/EnhancedUserProfilePanel";
import { toast } from "react-hot-toast";
import sMc from "@/styles//modules/mainContainer.module.scss";
import { navigatorVars } from "@/vars";
import NavCard from "./NavCard";
let baseRootUser: targEl;
export default function MainContainer(): JSX.Element {
  const ctx = useContext(RootCtx),
    router = useRouter(),
    toasted = useRef<boolean>(false);
  //TODO REMOVER APÓS TESTE
  checkContext(ctx, "RootCtx", MainContainer);
  useEffect(() => {
    baseRootUser = document.getElementById("rootUserInfo");
    baseRootUser instanceof HTMLElement && !ctx.roots.baseRootedUser
      ? (ctx.roots.baseRootedUser = createRoot(baseRootUser))
      : setTimeout(() => {
          baseRootUser = document.getElementById("rootUserInfo");
          !baseRootUser && elementNotFound(baseRootUser, "Root for user painel", extLine(new Error()));
        }, 2000);
    typeof ctx.roots.baseRootedUser === "object"
      ? ctx.roots.baseRootedUser?.render(<EnhancedUserProfilePanel router={router} />)
      : elementNotFound(
          `${JSON.stringify(ctx.roots.baseRootedUser)}`,
          "Root instance for User panel",
          extLine(new Error()),
        );
    equalizeParagraphs(Array.from(document.querySelectorAll("small")));
    expandContent(document.getElementById("rootUserInfo"));
  }, [ctx.roots, router]);
  useEffect(() => {
    if (!toasted.current)
      toast(
        navigatorVars.pt ? "Navegue pelas páginas através dos cartões!" : "Navigate through the pages using the cards!",
        { icon: "🧭" },
      );
    setTimeout(toast.dismiss, 5000);
    toasted.current = true;
    const untoast = (): void => toast.dismiss();
    addEventListener("popstate", untoast);
    return (): void => removeEventListener("popstate", untoast);
  }, [toasted]);
  return (
    <main className={sMc.mainContainer} id='main-container'>
      <section id='cardsSect' className={sMc.cardsSect}>
        {["/ag", "/edfis", "/nut", "/od"].map(href => (
          <NavCard key={`card__${href}`} href={href} />
        ))}
      </section>
      <section id='panelSect' className={sMc.panelSect} onMouseEnter={() => router.prefetch("/panel")}>
        <button type='button' id='panelBtn' className={`btn btn-primary btn-rounded wid80p750Q ${sMc.panelBtn}`}>
          <Link href='/panel' id='panelAnchor' rel='nofollow' style={{ color: "#ffff", fontWeight: "600" }}>
            Painel de Trabalho
          </Link>
        </button>
      </section>
    </main>
    // const handleBgResize = (): void => {
    //   try {
    //     const bgDiv = document.getElementById("bgDiv");
    //     if (!(bgDiv instanceof HTMLElement)) return;
    //     const mainArticle = document.querySelector(".main-article") || document.querySelector("nav");
    //     if (!(mainArticle instanceof HTMLElement)) return;
    //     const mainContainer = document.querySelector(".main-container") || document.querySelector("main");
    //     if (!(mainContainer instanceof HTMLElement)) return;
    //     const cardsSect = document.getElementById("cardsSect");
    //     if (!(cardsSect instanceof HTMLElement)) return;
    //     const panelBtn = document.getElementById("panelBtn"),
    //       panelSect = document.getElementById("panelSect"),
    //       rows = getComputedStyle(cardsSect).gridTemplateRows;
    //     let factor = 1.1,
    //       contFactor = 1,
    //       numRows = 1,
    //       factorRows = 0.5;
    //     if (/repeat/g.test(rows))
    //       numRows =
    //         parseNotNaN(
    //           rows
    //             .slice(0, rows.indexOf(","))
    //             .replace("repeat(", "")
    //             .replace(/[^0-9]g/, ""),
    //         ) || 2;
    //     else numRows = Array.from(rows.matchAll(/\s/g)).length + 1 || 1;
    //     if (panelBtn instanceof HTMLElement) panelBtn.style.width = "23.2rem";
    //     if (cardsSect instanceof HTMLElement) cardsSect.style.paddingTop = "0";
    //     if (panelSect instanceof HTMLElement) {
    //       panelSect.style.paddingTop = "0";
    //       panelSect.style.paddingBottom = "10rem";
    //     }
    //     if (innerWidth > 520 && innerWidth <= 1025) numRows = 2;
    //     if (innerWidth <= 1025 && numRows > 1) {
    //       /* eslint-disable */
    //       factor = 1 * numRows * factorRows;
    //       contFactor = 1 * numRows * factorRows;
    //       /* estlint-enable */
    //       if (panelSect instanceof HTMLElement) {
    //         panelSect.style.paddingTop = "0";
    //         panelSect.style.paddingBottom = "0";
    //         if (panelBtn instanceof HTMLElement) {
    //           panelBtn.style.width = "23.2rem";
    //           if (panelBtn.parentElement) panelBtn.parentElement!.style.paddingTop = "2rem";
    //         }
    //       }
    //     }
    //     if (innerWidth < 930 && numRows > 1 && panelSect instanceof HTMLElement) {
    //       panelSect.style.paddingTop = "3rem";
    //       panelSect.style.paddingBottom = "0";
    //     }
    //     if (innerWidth <= 850 && numRows > 1) {
    //       contFactor = 0.94 * numRows * factorRows;
    //       if (cardsSect instanceof HTMLElement) cardsSect.style.paddingTop = "2rem";
    //       if (panelSect instanceof HTMLElement) {
    //         panelSect.style.paddingTop = "4rem";
    //         panelSect.style.paddingBottom = "0";
    //       }
    //     }
    //     if (innerWidth <= 750 && numRows > 1) {
    //       /* estlint-disable */
    //       contFactor = 1 * numRows * factorRows;
    //       /* estlint-enable */
    //       if (panelSect instanceof HTMLElement) {
    //         panelSect.style.paddingTop = "1rem";
    //         panelSect.style.paddingBottom = "3rem";
    //       }
    //     }
    //     if (innerWidth <= 675 && numRows > 1) {
    //       if (panelSect instanceof HTMLElement) {
    //         panelSect.style.paddingTop = "1rem";
    //       }
    //     }
    //     if (innerWidth <= 600 && numRows > 1) {
    //       contFactor = 0.93 * numRows * factorRows;
    //     }
    //     if (innerWidth <= 592 && numRows > 1) {
    //       factor = 1.08 * numRows * factorRows;
    //       contFactor = 1.2 * numRows * factorRows;
    //       if (panelSect instanceof HTMLElement) {
    //         panelSect.style.paddingTop = "1.5rem";
    //       }
    //     }
    //     if (numRows >= 4 && innerWidth <= 520) {
    //       numRows = 4;
    //       factorRows = 0.25;
    //     }
    //     if (innerWidth <= 520 && numRows > 1) {
    //       /* eslint-disable */
    //       factor = 1.06 * numRows * factorRows;
    //       contFactor = 1 * numRows * factorRows;
    //       /* estlint-enable */
    //       if (panelSect instanceof HTMLElement) {
    //         panelSect.style.paddingBottom = "2rem";
    //         panelSect.style.marginTop = "0";
    //         if (panelBtn instanceof HTMLElement) panelBtn.style.width = "75vw";
    //       }
    //     }
    //     if (innerWidth <= 448 && numRows > 1) {
    //       factor = 1.083 * numRows * factorRows;
    //       contFactor = 1.045 * numRows * factorRows;
    //       if (panelSect instanceof HTMLElement) {
    //         panelSect.style.paddingTop = "2rem";
    //         panelSect.style.paddingBottom = "2rem";
    //       }
    //     }
    //     if (innerWidth <= 415 && numRows > 1) {
    //       factor = 1.038 * numRows * factorRows;
    //       contFactor = 1.01 * numRows * factorRows;
    //       if (panelSect instanceof HTMLElement) {
    //         panelSect.style.paddingTop = "2rem";
    //         if (panelBtn instanceof HTMLElement) panelBtn.style.width = "75vw";
    //       }
    //     }
    //     if (innerWidth <= 325 && numRows > 1) {
    //       factor = 1.038 * numRows * factorRows;
    //       contFactor = 1.01 * numRows * factorRows;
    //       if (panelSect instanceof HTMLElement) {
    //         panelSect.style.paddingTop = "3.5rem";
    //         if (cardsSect instanceof HTMLElement) cardsSect.style.paddingTop = "5rem";
    //         if (panelBtn instanceof HTMLElement) panelBtn.style.width = "75vw";
    //       }
    //     }
    //     bgDiv.style.height = `${
    //       parseNotNaN(getComputedStyle(mainArticle).height.replace("px", "").trim()) * factor || 1
    //     }px`;
    //     mainContainer.style.height = `${
    //       parseNotNaN(getComputedStyle(mainArticle).height.replace("px", "").trim()) * contFactor || 1
    //     }px`;
    //   } catch (e) {
    //     console.error(`Error executing handleBgResize:\n${(e as Error).message}`);
    //   }
    // };
    // handleBgResize();
    // addEventListener("resize", handleBgResize);
    // return (): void => removeEventListener("resize", handleBgResize);
    // <main className='main-container gridAlItCt widFull gridAlItBs750Q gridAuto750Q rGap4v750Q'>
    //   <section id='cardsSect' className='grid4col grid4r750Q gridJICt rGap2v750Q pd-t4v750Q fadeInEarlyElement'>
    //     <div
    //       onMouseEnter={() => router.prefetch("/ag")}
    //       className='card card23v htMinMaxC751Qmin brd_rd2r wid90p750Q htMaxC460Q fd1el'
    //       style={{ maxWidth: "12rem" }}>
    //       <button className='card-hborder transparentEl fadeInEarlyElement' id='agAnchoredBtn'>
    //         <Link
    //           className='card-header anchoredBtn noInvert'
    //           id='ag_but'
    //           target='_self'
    //           href='/ag'
    //           rel='nofollow'
    //           onClick={() => router.push("/ag")}>
    //           <img
    //             decoding='async'
    //             loading='lazy'
    //             className='card-img-top'
    //             src='../img/icon-psy.png'
    //             alt='imagem-card-geral'
    //           />
    //         </Link>
    //       </button>
    //       <div className='card-body txAlCt pdT3v flexNoWC rGap2v750Q rGap0_5v fd2el'>
    //         <Link
    //           className='card-title bolded btn btn-grey btn-rounded anchoredBtn noInvert'
    //           id='ag_but_sec'
    //           target='_self'
    //           href='/ag'
    //           rel='nofollow'
    //           onClick={() => router.push("/ag")}>
    //           Geral & Saúde Mental
    //         </Link>
    //         <small className='mg__1bv460Q fd3el formDesc'>
    //           Acesse aqui o formulário para Anamnese Geral e Saúde Mental
    //         </small>
    //       </div>
    //     </div>
    //     <div
    //       className='card card23v htMinMaxC751Qmin brd_rd2r wid90p750Q htMaxC460Q fd2el'
    //       onMouseEnter={() => router.prefetch("/edfis")}>
    //       <button className='card-hborder transparentEl' id='efAnchoredBtn'>
    //         <Link
    //           className='card-header anchoredBtn noInvert'
    //           id='ef_but'
    //           target='_self'
    //           href='/edfis'
    //           rel='nofollow'
    //           onClick={() => router.push("/edfis")}>
    //           <img
    //             decoding='async'
    //             loading='lazy'
    //             className='card-img-top'
    //             src='../img/PROS_edfis_icon.webp'
    //             alt='imagem-card-edFis'
    //           />
    //         </Link>
    //       </button>
    //       <div className='card-body txAlCt pdT3v flexNoWC rGap2v750Q rGap0_5v fd3el'>
    //         <Link
    //           className='card-title bolded btn btn-orange btn-rounded anchoredBtn noInvert'
    //           id='ef_but_sec'
    //           target='_self'
    //           href='/edfis'
    //           rel='nofollow'
    //           onClick={() => router.push("/edfis")}>
    //           Educação Física
    //         </Link>
    //         <p>
    //           <small className='noInvert fd4el'>Acesse aqui o formulário para Educação Física</small>
    //         </p>
    //       </div>
    //     </div>
    //     <div
    //       className='card card23v htMinMaxC751Qmin brd_rd2r wid90p750Q htMaxC460Q fd4el'
    //       onMouseEnter={() => router.prefetch("/edfis")}>
    //       <button className='card-hborder transparentEl' id='nutAnchoredBtn'>
    //         <Link
    //           className='card-header anchoredBtn noInvert'
    //           id='nut_but'
    //           target='_self'
    //           href='/edfis'
    //           rel='nofollow'
    //           onClick={() => router.push("/edfis")}>
    //           <img
    //             decoding='async'
    //             loading='lazy'
    //             className='card-img-top'
    //             src='../img/PROS_nut_icon.webp'
    //             alt='imagem-card-nut'
    //           />
    //         </Link>
    //       </button>
    //       <div className='card-body txAlCt pdT3v flexNoWC rGap2v750Q rGap0_5v fd5el'>
    //         <Link
    //           className='card-title bolded btn btn-green btn-rounded anchoredBtn'
    //           target='_self'
    //           id='nut_but_sec'
    //           href='/edfis'
    //           rel='nofollow'
    //           onClick={() => router.push("/edfis")}>
    //           Nutrição
    //         </Link>
    //         <p>
    //           <small className='noInvert fd6el'>Acesse aqui o formulário para Nutrição</small>
    //         </p>
    //       </div>
    //     </div>
    //     <div
    //       className='card card23v htMinMaxC751Qmin brd_rd2r wid90p750Q htMaxC460Q fd5el'
    //       onMouseEnter={() => router.prefetch("/od")}>
    //       <button className='card-hborder transparentEl' id='odAnchoredBtn'>
    //         <Link
    //           className='card-header anchoredBtn noInvert'
    //           id='od_but'
    //           target='_self'
    //           href='/od'
    //           rel='nofollow'
    //           onClick={() => router.push("/od")}>
    //           <img
    //             decoding='async'
    //             loading='lazy'
    //             className='card-img-top'
    //             src='../img/pros-od-icon.webp'
    //             alt='imagem-card-odonto'
    //           />
    //         </Link>
    //       </button>
    //       <div className='card-body txAlCt pdT3v flexNoWC rGap2v750Q rGap0_5v fd6el'>
    //         <Link
    //           className='card-title bolded btn btn-blue btn-rounded anchoredBtn'
    //           id='od_but_sec'
    //           target='_self'
    //           href='/od'
    //           rel='nofollow'
    //           onClick={() => router.push("/od")}>
    //           Odontologia
    //         </Link>
    //         <small className='mg__1bv460Q fadeInLateElement'>Acesse aqui o formulário para Odontologia</small>
    //       </div>
    //     </div>
    //   </section>
    //   <section id='panelSect' className='gridJICt pd__b4v750Q fd2el' onMouseEnter={() => router.prefetch("/panel")}>
    //     <button type='button' id='panelBtn' className='btn btn-primary btn-rounded wid80p750Q'>
    //       <Link
    //         href='/panel'
    //         id='panelAnchor'
    //         target='_self'
    //         rel='nofollow'
    //         style={{ color: "#ffff", fontWeight: "600" }}>
    //         Painel de Trabalho
    //       </Link>
    //     </button>
    //   </section>
    // </main>
  );
}
