"use client";
import { RootCtx } from "@/pages/_app";
import { createRoot } from "react-dom/client";
import { equalizeParagraphs } from "@/lib/locals/basePage/baseStylescript";
import { expandContent } from "@/lib/global/gStyleScript";
import { targEl } from "@/lib/global/declarations/types";
import { useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import EnhancedUserProfilePanel from "../../user/EnhancedUserProfilePanel";
import { toast } from "react-hot-toast";
import sMc from "@/styles//modules/mainContainer.module.scss";
import { navigatorVars, reloader } from "@/vars";
import NavCard from "./NavCard";
import useMount from "@/lib/hooks/useMount";
let baseRootUser: targEl;
export default function MainContainer(): JSX.Element {
  const ctx = useContext(RootCtx),
    router = useRouter(),
    toasted = useRef<boolean>(false),
    mounted = useMount();
  useEffect(() => {
    if (!mounted) return;
    try {
      setTimeout(() => {
        const bg = document.getElementById("bgDiv");
        if (!(bg instanceof HTMLElement)) return;
        if (!/gradient/gi.test(getComputedStyle(bg).background) && reloader.canReloadBase) {
          reloader.canReloadBase = false;
          router.reload();
        }
      }, 200);
    } catch (e) {
      return;
    }
  }, [mounted]);
  useEffect(() => {
    baseRootUser = document.getElementById("rootUserInfo");
    baseRootUser instanceof HTMLElement && !ctx.roots.baseRootedUser
      ? (ctx.roots.baseRootedUser = createRoot(baseRootUser))
      : setTimeout(() => {
          baseRootUser = document.getElementById("rootUserInfo");
        }, 2000);
    if (typeof ctx.roots.baseRootedUser === "object")
      ctx.roots.baseRootedUser?.render(<EnhancedUserProfilePanel router={router} />);
    equalizeParagraphs(Array.from(document.querySelectorAll("small")));
    expandContent(document.getElementById("rootUserInfo"));
  }, [ctx.roots, router]);
  useEffect(() => {
    if (!toasted.current)
      toast(
        navigatorVars.pt
          ? "Navegue pelas páginas clicando nas logos ou movendo o mouse sobre os cartões para ver os botões!"
          : "Navigate through the pages clicking on the logos or hovering the cards to show the buttons!",
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
        <button
          type='button'
          id='panelBtn'
          className={`btn btn-primary btn-rounded wid80p750Q ${sMc.panelBtn}`}
          style={{ height: "3.5rem", borderRadius: "1rem" }}
          onTouchStart={ev => {
            try {
              ev.currentTarget.style.backgroundColor = "#0056b3";
              ev.currentTarget.style.transform = "translateY(-0.1rem)";
            } catch (e) {
              return;
            }
          }}>
          <Link href='/panel' id='panelAnchor' rel='nofollow' style={{ color: "#ffff", fontWeight: "600" }}>
            Painel de Trabalho
          </Link>
        </button>
      </section>
    </main>
  );
}
