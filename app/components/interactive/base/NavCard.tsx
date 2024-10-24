"use client";
import { useRouter } from "next/router";
import sMc from "@/styles/modules/mainContainer.module.scss";
import Link from "next/link";
export default function NavCard({ href }: { href: string }): JSX.Element {
  const router = useRouter();
  return (
    <div id={`${href.replaceAll("/", "")}Card`} className={sMc.card} onMouseEnter={() => router.prefetch(href)}>
      <div className={sMc.cardInner}>
        <div className={sMc.cardFront}>
          <Link
            href={/nut/gi.test(href) ? "/edfis" : href}
            className={sMc.cardLink}
            id={`${href.replaceAll("/", "")}_but`}>
            <img
              decoding='async'
              loading='lazy'
              className={sMc.cardImg}
              src={`../img/${/ag/g.test(href) ? "icon-psy" : `PROS_${href.replace("/", "")}_icon`}.webp`}
              alt={`imagem-card-${href.replaceAll("/", "")}`}
            />
          </Link>
        </div>
        <div className={sMc.cardBack}>
          <small className={sMc.cardDescription}>
            Acesse aqui o formulário para{" "}
            {href === "/ag"
              ? "Anamnese Geral e Saúde Mental"
              : href === "/edfis"
              ? "Educação Física"
              : href === "/nut"
              ? "Nutrição"
              : "Odontologia"}
          </small>
        </div>
      </div>
    </div>
  );
}
