"use client";
import { useRouter } from "next/router";
import sMc from "@/styles/modules/mainContainer.module.scss";
import Link from "next/link";
import { useRef, useEffect, useCallback } from "react";
import { nlHtEl, nlA, nlDiv } from "@/lib/global/declarations/types";
import { compProp, parseNotNaN } from "@/lib/global/gModel";
export default function NavCard({ href }: { href: string }): JSX.Element {
  const router = useRouter(),
    left = ((): number => {
      switch (href) {
        case "/ag":
          return 73.3;
        case "/edfis":
          return 80;
        case "/od":
          return 109.3;
        case "/nut":
          return 166.7;
        default:
          return 200 - 20 * href.length;
      }
    })(),
    title = ((): JSX.Element => {
      switch (href) {
        case "/ag":
          return (
            <b className={sMc.cardName}>
              <b>Anamnese Geral</b>
            </b>
          );
        case "/edfis":
          return <b className={sMc.cardName}>Educação Física</b>;
        case "/nut":
          return <b className={sMc.cardName}>Nutrição</b>;
        case "/od":
          return <b className={sMc.cardName}>Odontologia</b>;
        default:
          return <></>;
      }
    })(),
    add = (() => {
      switch (href) {
        case "/ag":
          return (
            <>
              <span>Formulário Geral</span>
              <hr />
              <span>Saúde Mental</span>
            </>
          );
        case "/edfis":
          return (
            <>
              <span>Formulário de Atividades Físicas</span>
              <hr />
              <span>Formulário de Medidas Corporais</span>
            </>
          );
        case "/nut":
          return (
            <>
              <span>Formulário de Atividades Físicas</span>
              <hr />
              <span>Formulário de Medidas Corporais</span>
            </>
          );
        case "/od":
          return (
            <>
              <span>Formulário de Avaliação Dentária</span>
              <hr />
              <span>Formulário de Recomendações de Tratamento</span>
            </>
          );
        default:
          return <></>;
      }
    })(),
    back = (() => {
      switch (href) {
        case "/ag":
          return (
            <fieldset className={`${sMc.addTextBack}`}>
              <button className={`btn btn-info card-hborder transparentEl ${sMc.btnBack}`} id='agAnchoredBtn'>
                <Link
                  className='card-header anchoredBtn noInvert'
                  id='ag_but'
                  target='_self'
                  href='/ag'
                  rel='nofollow'
                  style={{ fontWeight: "bold" }}>
                  Acesse aqui
                </Link>
              </button>
              <div className={sMc.cardAddTextBack} style={{ fontWeight: 700 }}>
                {add}
              </div>
            </fieldset>
          );
        case "/edfis":
          return (
            <fieldset className={`${sMc.addTextBack}`}>
              <button
                className={`btn btn-info card-hborder transparentEl ${sMc.btnBack}`}
                id='agAnchoredBtn'
                style={{ background: "linear-gradient(90deg, rgba(225, 165, 55, 0.871), rgb(238, 176, 60))" }}>
                <Link
                  className='card-header anchoredBtn noInvert'
                  id='ed_but'
                  target='_self'
                  href='/edfis'
                  rel='nofollow'
                  style={{ fontWeight: "bold" }}>
                  Acesse aqui
                </Link>
              </button>
              <div className={sMc.cardAddTextBack} style={{ fontWeight: 700 }}>
                {add}
              </div>
            </fieldset>
          );
        case "/nut":
          return (
            <fieldset className={`${sMc.addTextBack}`}>
              <button className={`btn btn-success card-hborder transparentEl ${sMc.btnBack}`} id='agAnchoredBtn'>
                <Link
                  className='card-header anchoredBtn noInvert'
                  id='nut_but'
                  target='_self'
                  href='/edfis'
                  rel='nofollow'
                  style={{ fontWeight: "bold" }}>
                  Acesse aqui
                </Link>
              </button>
              <div className={sMc.cardAddTextBack} style={{ fontWeight: 700 }}>
                {add}
              </div>
            </fieldset>
          );
        case "/od":
          return (
            <fieldset className={`${sMc.addTextBack}`}>
              <button className={`btn btn-primary card-hborder transparentEl ${sMc.btnBack}`} id='agAnchoredBtn'>
                <Link
                  className='card-header anchoredBtn noInvert'
                  id='ed_but'
                  target='_self'
                  href='/od'
                  rel='nofollow'
                  style={{ fontWeight: "bold" }}>
                  Acesse aqui
                </Link>
              </button>
              <div className={sMc.cardAddTextBack} style={{ fontWeight: 700 }}>
                {add}
              </div>
            </fieldset>
          );
        default:
          return <></>;
      }
    })(),
    r = useRef<nlDiv>(null),
    a = useRef<nlA>(null),
    imgRef = useRef<HTMLImageElement | null>(null),
    innerRef = useRef<nlDiv>(null),
    descRef = useRef<nlHtEl>(null),
    addRef = useRef<nlDiv>(null),
    backRef = useRef<nlDiv>(null),
    turned = useRef<boolean>(false),
    handleResize = useCallback((): void => {
      if (!(r.current instanceof HTMLElement)) return;
      const cardHt = parseNotNaN(compProp(r.current, "height")),
        cardWd = parseNotNaN(compProp(r.current, "width"));
      try {
        if (!(imgRef.current instanceof HTMLElement)) return;
        imgRef.current.style.marginBottom = `${cardHt * 0.1}px`;
      } catch (e) {
        return;
      }
      try {
        if (!(a.current instanceof HTMLElement)) return;
        const newBot = parseNotNaN(compProp(a.current, "height"));
        if (!Number.isFinite(newBot) || newBot < 0) return;
      } catch (e) {
        return;
      }
      try {
        if (!(descRef.current instanceof HTMLElement)) return;
        const cStyle = getComputedStyle(descRef.current);
        if (cStyle.position !== "relative" && cStyle.float === "none") return;
        descRef.current.style.left = `${cardWd * 0.3}px`;
        descRef.current.style.top = href === "/od" ? `-${cardHt * 0.12}px` : `-${cardHt * 0.165}px`;
      } catch (e) {
        return;
      }
      try {
        if (!(addRef.current instanceof HTMLElement)) return;
        const cSt = getComputedStyle(addRef.current);
        if (cSt.position !== "relative" && cSt.float === "none") return;
        addRef.current.style.top = `-${cardHt * 0.08}px`;
      } catch (e) {
        return;
      }
    }, [a, descRef, r, addRef, imgRef]),
    step = 1,
    totalDuration = 1000,
    intervalDuration = totalDuration / 120,
    bgCircleMove = useCallback((el: HTMLElement): void => {
      try {
        if (el.dataset.animating === "true") return;
        const background = getComputedStyle(el).backgroundImage;
        if (!(/at/g.test(background) && /%/.test(background))) return;
        const percentageHalf = background.slice(0, background.indexOf("%")),
          firstHalf = percentageHalf.slice(percentageHalf.lastIndexOf(" ") + 1),
          noPercentageFirstHalf = percentageHalf.slice(0, percentageHalf.indexOf("at") + 3),
          secondHalf = background.slice(background.indexOf("%")),
          iniPercentage = parseNotNaN(firstHalf.replace(/[^0-9]/g, "").trim());
        if (!Number.isFinite(iniPercentage)) return;
        let percentage = parseNotNaN(firstHalf.replace(/[^0-9]/g, "").trim()),
          isDecreasing = true;
        el.dataset.animating = "true";
        const intervalId = setInterval(() => {
          if (!el) {
            clearInterval(intervalId);
            return;
          }
          if (isDecreasing) {
            percentage -= step;
            if (percentage <= 0) isDecreasing = false;
          } else {
            percentage += step;
            if (percentage >= iniPercentage) {
              clearInterval(intervalId);
              el.dataset.animating = "false";
              return;
            }
          }
          el.style.backgroundImage = `${noPercentageFirstHalf}${percentage}${secondHalf}`;
        }, intervalDuration);
        setTimeout(() => {
          clearInterval(intervalId);
          el.style.backgroundImage = `radial-gradient(circle at 120% center, rgba(80, 157, 80, 0.516), rgb(33, 109, 135))`;
        }, totalDuration * 2 + 100);
      } catch (e) {
        return;
      }
    }, []),
    hideDesc = useCallback((): void => {
      try {
        if (!(r.current instanceof HTMLElement)) return;
        if (!(descRef.current instanceof HTMLElement)) return;
        turned.current = !turned.current;
        if (turned.current) descRef.current.style.opacity = "0";
        else descRef.current.style.opacity = "1";
        setTimeout(() => {
          if (descRef.current) descRef.current.style.opacity = "1";
        }, 500);
      } catch (e) {
        return;
      }
    }, [r, descRef]);
  useEffect(() => {
    setTimeout(() => {
      const imgs = Array.from(document.querySelectorAll(".cardImg")),
        measures: Array<{
          width: number;
          height: number;
        }> = imgs.map(img => {
          try {
            if (!(img instanceof HTMLImageElement)) throw new Error(`Failed to validate instance`);
            return {
              width: Math.max(parseNotNaN(compProp(img, "width")), img.width),
              height: Math.max(parseNotNaN(compProp(img, "height")), img.height),
            };
          } catch (e) {
            return { width: 0, height: 0 };
          }
        }),
        largest = Math.max(...Array.from(measures.values()).map(m => m.width)),
        tallest = Math.max(...Array.from(measures.values()).map(m => m.height));
      imgs.forEach(img => {
        try {
          if (!(img instanceof HTMLImageElement)) return;
          if (
            largest <= 0 ||
            tallest <= 0 ||
            largest < parseNotNaN(compProp(img, "width")) ||
            tallest < parseNotNaN(compProp(img, "height"))
          )
            return;
          img.width = largest;
          img.height = tallest;
        } catch (e) {
          return;
        }
      });
    }, 300);
  }, []);
  useEffect(() => {
    handleResize();
    addEventListener("resize", handleResize);
    return (): void => removeEventListener("resize", handleResize);
  }, [handleResize]);
  return (
    <div
      id={`${href.replaceAll("/", "")}Card`}
      className={sMc.card}
      onMouseEnter={() => router.prefetch(href)}
      ref={r}
      data-turned={turned.current}>
      <div
        className={sMc.cardInner}
        ref={innerRef}
        onMouseEnter={ev => {
          const t = ev.currentTarget;
          if (t.classList.contains("flipped")) t.classList.remove("flipped");
          if (t.classList.contains("noFlipped")) t.classList.remove("noFlipped");
          t.dataset.touch = "false";
          t.style.transform = "";
          hideDesc();
        }}
        onTouchStart={ev => {
          hideDesc();
          ev.currentTarget.dataset.touch = "true";
          ev.stopPropagation();
          if (!innerRef.current) return;
          innerRef.current.classList.add("flipped");
          innerRef.current.classList.remove("noFlipped");
        }}>
        <figure
          className={sMc.cardFront}
          onTouchStart={ev => {
            try {
              const t = ev.currentTarget;
              const img = t.querySelector("img");
              if (!(img instanceof HTMLElement)) return;
              img.style.transition = `transform ease-in-out 1s`;
              img.style.transitionDelay = "250ms";
              img.style.transform = "rotateZ(1turn)";
              setTimeout(() => (img.style.transform = "rotateZ(0)"), 1250);
              bgCircleMove(t);
            } catch (e) {
              return;
            }
          }}>
          <Link
            href={/nut/gi.test(href) ? "/edfis" : href}
            className={sMc.cardLink}
            ref={a}
            id={`${href.replaceAll("/", "")}_but`}
            onMouseEnter={ev => bgCircleMove(ev.currentTarget)}>
            <img
              ref={imgRef}
              decoding='async'
              loading='eager'
              className={`cardImg ${sMc.cardImg}`}
              src={`../img/${/ag/g.test(href) ? "icon-psy" : `PROS_${href.replace("/", "")}_icon`}.webp`}
              alt={`imagem-card-${href.replaceAll("/", "")}`}
            />
          </Link>
          <figcaption style={{ display: "flex" }}>
            <small
              ref={descRef}
              className={sMc.cardDescription}
              style={{ left: `${left > 0 ? left : 120}%`, position: "relative" }}>
              {title}
            </small>
          </figcaption>
          <div ref={addRef} className={sMc.cardAddTextFront}>
            {add}
          </div>
        </figure>
        <div
          ref={backRef}
          className={sMc.cardBack}
          onTouchStart={ev => {
            ev.stopPropagation();
            if (!innerRef.current) return;
            innerRef.current.classList.remove("flipped");
            innerRef.current.classList.add("noFlipped");
          }}>
          {back}
        </div>
      </div>
    </div>
  );
}
