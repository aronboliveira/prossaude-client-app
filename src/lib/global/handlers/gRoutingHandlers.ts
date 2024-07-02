import { pageCases, pageStyleCases } from "../declarations/types";
import { elementNotFound, extLine } from "./errorHandler";

export function handleLinkChanges(
  componentCase: pageCases,
  styleFlag: pageStyleCases
): void {
  try {
    if (typeof componentCase !== "string")
      throw new Error(
        `invalid componentCase argument given to handleLinkChanges`
      );
    if (typeof styleFlag !== "string")
      throw new Error(`invalid StyleFlag given to handleLinkChanges`);
    const heads = document.querySelectorAll("head");
    if (heads.length > 1)
      for (let i = 0; i < heads.length; i++) i > 0 && heads[i].remove();
    document.querySelectorAll("meta").forEach(meta => {
      meta instanceof HTMLMetaElement &&
        meta.name !== "viewport" &&
        meta.name !== "next-head-count" &&
        meta.name !== "theme-color" &&
        !/x-ua-compatible/gi.test(meta.name) &&
        !/charset/gi.test(meta.outerHTML) &&
        !/http-?equiv/gi.test(meta.outerHTML) &&
        meta.remove();
    });
    const noscript = document.querySelector("noscript");
    if (
      noscript instanceof HTMLElement &&
      noscript.tagName === "NOSCRIPT" &&
      noscript.innerText === ""
    )
      noscript.innerText = "You need JavaScript to run this application.";
    try {
      const head = document.querySelector("head");
      if (!(head instanceof HTMLHeadElement))
        throw elementNotFound(head, `<head>`, extLine(new Error()));
      if (
        !document.getElementById("bootstrapLink") &&
        !Array.from(document.querySelectorAll("link")).some(link => {
          link.outerHTML && /bootstrap@/gi.test(link.outerHTML);
        })
      ) {
        head.prepend(
          Object.assign(document.createElement("link"), {
            href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
            rel: "stylesheet",
            integrity:
              "sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN",
            crossOrigin: "anonymous",
            id: "bootstrapLink",
          })
        );
      }
      if (
        !document.getElementById("charsetMeta") &&
        !Array.from(document.querySelectorAll("meta")).some(meta => {
          meta.outerHTML && /utf-8/gi.test(meta.outerHTML!);
        })
      ) {
        head.prepend(
          Object.assign(document.createElement("meta"), {
            charSet: "UTF-8",
            id: "charsetMeta",
          })
        );
      }
      if (
        !document.getElementById("viewportMeta") &&
        !Array.from(document.querySelectorAll("meta")).some(meta => {
          meta.outerHTML && /viewport/gi.test(meta.outerHTML!);
        })
      ) {
        head.prepend(
          Object.assign(document.createElement("meta"), {
            name: "viewport",
            content:
              "width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=3.0, user-scalable=yes",
            id: "viewportMeta",
          })
        );
      }
      if (
        !document.getElementById("edgeMeta") &&
        !Array.from(document.querySelectorAll("meta")).some(meta => {
          meta.outerHTML && /x-ua-compatible/gi.test(meta.outerHTML!);
        })
      ) {
        head.prepend(
          Object.assign(document.createElement("meta"), {
            httEquip: "X-UA-Compatible",
            content: "IE=edge",
            id: "edgeMeta",
          })
        );
      }
      if (
        head.hasChildNodes() &&
        head.lastElementChild &&
        head.firstElementChild
      ) {
        for (const title of head.querySelectorAll("title")) title.remove();
        for (const favicon of head.querySelectorAll('link[rel="icon"]'))
          favicon.remove();
        head.querySelectorAll("meta").forEach((meta, m) => {
          try {
            if (
              /name="description"/gi.test(meta.outerHTML) ||
              /property="og:/gi.test(meta.outerHTML) ||
              /name="twitter:/gi.test(meta.outerHTML)
            )
              meta.remove();
          } catch (e) {
            console.error(
              `Error executing iteration ${m} for removing local meta tags:${
                (e as Error).message
              }`
            );
          }
        });
        switch (componentCase) {
          case "login": {
            !head.querySelector("title") &&
              head.firstElementChild!.insertAdjacentHTML(
                `beforebegin`,
                `
                <link rel="icon" href="/favicon_g.ico" id="faviconpross" />
                <link rel="canonical" href="https://prossaude-client.netlify.app/" />
                <link
                rel="apple-touch-icon"
                href="img/apple-touch-icon-iphone-60x60-precomposed.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="60x60"
                href="img/apple-touch-icon-ipad-76x76-precomposed.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="114x114"
                href="img/apple-touch-icon-iphone-retina-120x120-precomposed.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="144x144"
                href="img/apple-touch-icon-ipad-retina-152x152-precomposed.png"
              />
                <title>Login — PROSSaúde</title>
                <meta name="description" content="Este é uma página para login no sistema do projeto PROSSaúde — UFRJ" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="2024-07-02" />
                <meta property="og:site_name" content="Login — PROSSaúde" />
                <meta property="og:url" content="https://prossaude-client.netlify.app/" />
                <meta property="og:title" content="PROSSaúde — UFRJ — Login" />
                <meta property="og:description" content="Acesse o link para fazer o login no sistema online do Projeto PROSSaúde, UFRJ" />
                <meta property="og:image" content="https://prossaude-client.netlify.app/img/PROS_Saude_Modelo1-Final.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
                <meta property="og:image:alt" content="logo" />
                `
              );
            document.body.className = "loginBody";
            for (const stylesheet of head.querySelectorAll("style")) {
              if (
                !/global style/gi.test(stylesheet.innerText) &&
                !/login page/gi.test(stylesheet.innerText)
              ) {
                stylesheet.parentElement!.append(
                  document.createComment(stylesheet.outerHTML)
                );
                stylesheet.remove();
              }
            }
            break;
          }
          case "base": {
            !head.querySelector("title") &&
              head.firstElementChild!.insertAdjacentHTML(
                `beforebegin`,
                `
                <link rel="icon" href="/favicon_g.ico" id="faviconpross" />
                <link rel="canonical" href="https://prossaude-client.netlify.app/" />
                <link
                rel="apple-touch-icon"
                href="img/apple-touch-icon-iphone-60x60-precomposed.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="60x60"
                href="img/apple-touch-icon-ipad-76x76-precomposed.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="114x114"
                href="img/apple-touch-icon-iphone-retina-120x120-precomposed.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="144x144"
                href="img/apple-touch-icon-ipad-retina-152x152-precomposed.png"
              />
                <title>Base de Navegação — Pró-Saúde</title>
                <meta name="description" content="Este é uma página para navegação entre as subpáginas do sistema do projeto PROSSaúde — UFRJ" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="2024-07-02" />
                <meta property="og:site_name" content="PROSSaúde — Tela Base de Navegação" />
                <meta property="og:url" content="https://prossaude-client.netlify.app/base/" />
                <meta property="og:title" content="PROSSaúde — UFRJ — Tela Base de Navegação — Formulário de Anamnese Geral" />
                <meta property="og:description" content="Acesse o link para acessar a tela para navegação entre as páginas de preenchimento e trabalho do Projeto PROSSaúde, UFRJ" />
                <meta property="og:image" content="https://prossaude-client.netlify.app/img/PROS_Saude_Modelo1-Final.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
              `
              );
            document.body.className = "baseBody";
            for (const stylesheet of head.querySelectorAll("style")) {
              if (
                !/global style/gi.test(stylesheet.innerText) &&
                !/base page/gi.test(stylesheet.innerText)
              ) {
                stylesheet.parentElement!.append(
                  document.createComment(stylesheet.outerHTML)
                );
                stylesheet.remove();
              }
            }
            break;
          }
          case "ag": {
            !head.querySelector("title") &&
              head.firstElementChild!.insertAdjacentHTML(
                `beforebegin`,
                `
                <link rel="icon" href="/favicon_g.ico" id="faviconpross" />
                <link rel="canonical" href="https://prossaude-client.netlify.app/" />
                <link
                rel="apple-touch-icon"
                href="img/apple-touch-icon-iphone-60x60-precomposed.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="60x60"
                href="img/apple-touch-icon-ipad-76x76-precomposed.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="114x114"
                href="img/apple-touch-icon-iphone-retina-120x120-precomposed.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="144x144"
                href="img/apple-touch-icon-ipad-retina-152x152-precomposed.png"
              />
                <title>Anamnese Geral &#8211 PROSSaúde, UFRJ</title>
                <meta name="description" content="Este é um formulário para a Anamnese Geral do projeto PROSSaúde — UFRJ" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="2024-07-02" />
                <meta property="og:site_name" content="PROSSaúde — Anamnese Geral" />
                <meta property="og:url" content="https://prossaude-client.netlify.app/ag/" />
                <meta property="og:title" content="PROSSaúde — UFRJ — Exame Clínico — Formulário de Anamnese Geral" />
                <meta property="og:description" content="Acesse o link para preencher o formulário dos dados para a Anamnese Geral do Projeto PROSSaúde, UFRJ" />
                <meta property="og:image" content="https://prossaude-client.netlify.app/img/PROS_Saude_Modelo1-Final.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
                `
              );
            document.body.className = "agBody";
            break;
          }
          case "edfis": {
            !head.querySelector("title") &&
              head.firstElementChild!.insertAdjacentHTML(
                `beforebegin`,
                `
                <link rel="icon" href="/favicon_nut.ico" id="faviconpross" />
                <link rel="canonical" href="https://prossaude-client.netlify.app/" />
                <link
                rel="apple-touch-icon"
                href="img/apple-touch-icon-iphone-60x60-precomposed.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="60x60"
                href="img/apple-touch-icon-ipad-76x76-precomposed.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="114x114"
                href="img/apple-touch-icon-iphone-retina-120x120-precomposed.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="144x144"
                href="img/apple-touch-icon-ipad-retina-152x152-precomposed.png"
              />
                <title>Exame Clínico — Educação Física & Nutrição</title>
                <meta name="description" content="Este é um formulário para o Exame Clínico de Educação Física do projeto PROSSaúde — UFRJ" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="2024-07-02" />
                <meta property="og:site_name" content="PROSSaúde — Educação Física &amp; Nutrição" />
                <meta property="og:url" content="https://prossaude-client.netlify.app/edfis/" />
                <meta property="og:title" content="PROSSaúde — UFRJ — Exame Clínico — Formulário de Educação Física &amp; Nutrição" />
                <meta property="og:description" content="Acesse o link para preencher o formulário dos dados para o exame clínico de Educação Física &amp; Nutrição do Projeto PROSSaúde, UFRJ" />
                <meta property="og:image" content="https://prossaude-client.netlify.app/img/PROS_edfis_icon.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
                `
              );
            document.body.className = "edfisNutBody";
            break;
          }
          case "od": {
            !head.querySelector("title") &&
              head.firstElementChild!.insertAdjacentHTML(
                `beforebegin`,
                `
                <title>Exame Clínico — Odontologia</title>
                <link rel="canonical" href="https://prossaude-client.netlify.app/" />
                <link rel="icon" href="/favicon_od.ico" id="faviconpross" />
                <link
                rel="apple-touch-icon"
                href="img/apple-touch-icon-iphone-60x60-precomposed.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="60x60"
                href="img/apple-touch-icon-ipad-76x76-precomposed.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="114x114"
                href="img/apple-touch-icon-iphone-retina-120x120-precomposed.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="144x144"
                href="img/apple-touch-icon-ipad-retina-152x152-precomposed.png"
              />
                <meta name="description" content="Este é um formulário para o Exame Clínico de Odontologia do projeto PROSSaúde — UFRJ" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="2024-07-02" />
                <meta property="og:site_name" content="PROSSaúde — Odontologia" />
                <meta property="og:url" content="https://prossaude-client.netlify.app/od/" />
                <meta property="og:title" content="PROSSaúde — UFRJ — Exame Clínico — Formulário de Odontologia" />
                <meta property="og:description" content="Acesse o link para preencher o formulário dos dados para o exame clínico de Odontologia do Projeto PROSSaúde, UFRJ" />
                <meta property="og:image" content="https://prossaude-client.netlify.app/img/pros-od-icon.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
              `
              );
            document.body.className = "odBody";
            break;
          }
          case "panel": {
            !head.querySelector("title") &&
              head.firstElementChild!.insertAdjacentHTML(
                `beforebegin`,
                `
                <title>Painel de Trabalho &#8211 PROSSaúde, UFRJ</title>
                <link rel="canonical" href="https://prossaude-client.netlify.app/" />
                <link rel="icon" href="/favicon_g.ico" id="faviconpross" />
                <link
                rel="apple-touch-icon"
                href="img/apple-touch-icon-iphone-60x60-precomposed.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="60x60"
                href="img/apple-touch-icon-ipad-76x76-precomposed.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="114x114"
                href="img/apple-touch-icon-iphone-retina-120x120-precomposed.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="144x144"
                href="img/apple-touch-icon-ipad-retina-152x152-precomposed.png"
              />
                <meta name="description" content="Este é o painel de trabalho principal para o projeto PROSSaúde — UFRJ" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="2024-07-02" />
                <meta property="og:site_name" content="PROSSaúde — Painel de Trabalho" />
                <meta property="og:url" content="https://prossaude-client.netlify.app/panel/" />
                <meta property="og:title" content="PROSSaúde — UFRJ — Exame Clínico — Formulário de Anamnese Geral" />
                <meta property="og:description" content="Acesse o link para preencher acessar o painel de trabalho online do Projeto PROSSaúde, UFRJ" />
                <meta property="og:image" content="https://prossaude-client.netlify.app/img/PROS_Saude_Modelo1-Final.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
                `
              );
            document.body.className = "panelBody";
            break;
          }
          default:
            console.error(`Invalid componentCase. No description appended.`);
            return;
        }
      }
    } catch (e) {
      console.error(
        `Error executing procedure for checking local links and metas:\n${
          (e as Error).message
        }`
      );
    }
  } catch (e) {
    console.error(
      `Error executing handleLinkChanges:\n${(e as Error).message}`
    );
  }
}
