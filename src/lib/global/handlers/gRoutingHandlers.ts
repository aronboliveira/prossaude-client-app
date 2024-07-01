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
    [
      ...document.querySelectorAll("style"),
      ...document.querySelectorAll('link[rel="stylesheet"]'),
    ].forEach((stylesheet, i) => {
      try {
        if (
          !(
            stylesheet instanceof HTMLStyleElement ||
            stylesheet instanceof HTMLLinkElement
          )
        )
          throw elementNotFound(
            stylesheet,
            `validation of styleSheet instance`,
            extLine(new Error())
          );
        if (
          !(
            stylesheet.innerText.includes("Bootstrap") ||
            stylesheet.outerHTML.includes("bootstrap@")
          ) &&
          !/Global Styles/gi.test(stylesheet.innerText) &&
          !new RegExp(styleFlag, "gi").test(stylesheet.innerText)
        )
          stylesheet.remove();
      } catch (e) {
        console.error(
          `Error executing iteration ${i} for reading stylesheets props:\n${
            (e as Error).message
          }`
        );
      }
    });
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
                <title>Login — PROSSaúde</title>
                <meta name="description" content="Este é uma página para login no sistema do projeto PROSSaúde — UFRJ" />
                <meta property="og:type" content="website" aria-hidden="false" />
                <meta property="og:website:published_time" content="#" aria-hidden="false" />
                <meta property="og:site_name" content="Login — PROSSaúde" aria-hidden="false" />
                <meta property="og:url" content="# aria-hidden="false" />
                <meta property="og:title" content="PROSSaúde — UFRJ — Login" aria-hidden="false" />
                <meta property="og:description" content="Acesse o link para fazer o login no sistema online do Projeto PROSSaúde, UFRJ" aria-hidden="false" />
                <meta property="og:image" content="./img/PROS_Saude_Modelo1-Final.jpg" aria-hidden="false" />
                <meta property="og:image:width" content="1200" aria-hidden="false" />
                <meta property="og:image:height" content="400" aria-hidden="false" />
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
                <title>Base de Navegação — Pró-Saúde</title>
                <meta name="description" content="Este é uma página para navegação entre as subpáginas do sistema do projeto PROSSaúde — UFRJ" />
                <meta property="og:type" content="website" aria-hidden="false" />
                <meta property="og:website:published_time" content="#" aria-hidden="false" />
                <meta property="og:site_name" content="PROSSaúde — Tela Base de Navegação" aria-hidden="false" />
                <meta property="og:url" content="# aria-hidden="false" />
                <meta property="og:title" content="PROSSaúde — UFRJ — Tela Base de Navegação — Formulário de Anamnese Geral" aria-hidden="false" />
                <meta property="og:description" content="Acesse o link para acessar a tela para navegação entre as páginas de preenchimento e trabalho do Projeto PROSSaúde, UFRJ" aria-hidden="false" />
                <meta property="og:image" content="./img/PROS_Saude_Modelo1-Final.jpg" aria-hidden="false" />
                <meta property="og:image:width" content="1200" aria-hidden="false" />
                <meta property="og:image:height" content="400" aria-hidden="false" />
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
                <title>Anamnese Geral &#8211 PROSSaúde, UFRJ</title>
                <meta name="description" content="Este é um formulário para a Anamnese Geral do projeto PROSSaúde — UFRJ" />
                <meta property="og:type" content="website" aria-hidden="false" />
                <meta property="og:website:published_time" content="#" aria-hidden="false" />
                <meta property="og:site_name" content="PROSSaúde — Anamnese Geral" aria-hidden="false" />
                <meta property="og:url" content="# aria-hidden="false" />
                <meta property="og:title" content="PROSSaúde — UFRJ — Exame Clínico — Formulário de Anamnese Geral" aria-hidden="false" />
                <meta property="og:description" content="Acesse o link para preencher o formulário dos dados para a Anamnese Geral do Projeto PROSSaúde, UFRJ" aria-hidden="false" />
                <meta property="og:image" content="./img/PROS_Saude_Modelo1-Final.jpg" aria-hidden="false" />
                <meta property="og:image:width" content="1200" aria-hidden="false" />
                <meta property="og:image:height" content="400" aria-hidden="false" />
                `
              );
            document.body.className = "agBody";
            for (const stylesheet of head.querySelectorAll("style")) {
              if (
                !/global style/gi.test(stylesheet.innerText) &&
                !/ag page/gi.test(stylesheet.innerText)
              ) {
                stylesheet.parentElement!.append(
                  document.createComment(stylesheet.outerHTML)
                );
                stylesheet.remove();
              }
            }
            break;
          }
          case "edfis": {
            !head.querySelector("title") &&
              head.firstElementChild!.insertAdjacentHTML(
                `beforebegin`,
                `
                <link rel="icon" href="/favicon_nut.ico" id="faviconpross" />
                <title>Exame Clínico — Educação Física & Nutrição</title>
                <meta name="description" content="Este é um formulário para o Exame Clínico de Educação Física do projeto PROSSaúde — UFRJ" />
                <meta property="og:type" content="website" aria-hidden="false" />
                <meta property="og:website:published_time" content="#" aria-hidden="false" />
                <meta property="og:site_name" content="PROSSaúde — Educação Física &amp; Nutrição" aria-hidden="false" />
                <meta property="og:url" content="#" aria-hidden="false" />
                <meta property="og:title" content="PROSSaúde — UFRJ — Exame Clínico — Formulário de Educação Física &amp; Nutrição" aria-hidden="false" />
                <meta property="og:description" content="Acesse o link para preencher o formulário dos dados para o exame clínico de Educação Física &amp; Nutrição do Projeto PROSSaúde, UFRJ" aria-hidden="false" />
                <meta property="og:image" content="./img/PROS_Saude_Modelo1-Final.jpg" aria-hidden="false" />
                <meta property="og:image:width" content="1200" aria-hidden="false" />
                <meta property="og:image:height" content="400" aria-hidden="false" />
                `
              );
            document.body.className = "edfisNutBody";
            for (const stylesheet of head.querySelectorAll("style")) {
              if (
                !/global style/gi.test(stylesheet.innerText) &&
                (!/en page/gi.test(stylesheet.innerText) ||
                  /edfisnut page/gi.test(stylesheet.innerText))
              ) {
                stylesheet.parentElement!.append(
                  document.createComment(stylesheet.outerHTML)
                );
                stylesheet.remove();
              }
            }
            break;
          }
          case "od": {
            !head.querySelector("title") &&
              head.firstElementChild!.insertAdjacentHTML(
                `beforebegin`,
                `
                <title aria-hidden="false">Exame Clínico — Odontologia</title>
                <link rel="icon" href="/favicon_od.ico" id="faviconpross" aria-hidden="false">
                <meta name="description" content="Este é um formulário para o Exame Clínico de Odontologia do projeto PROSSaúde — UFRJ" aria-hidden="false" />
                <meta property="og:type" content="website" aria-hidden="false" />
                <meta property="og:website:published_time" content="#" aria-hidden="false" />
                <meta property="og:site_name" content="PROSSaúde — Odontologia" aria-hidden="false" />
                <meta property="og:url" content="#" aria-hidden="false" />
                <meta property="og:title" content="PROSSaúde — UFRJ — Exame Clínico — Formulário de Odontologia" aria-hidden="false" />
                <meta property="og:description" content="Acesse o link para preencher o formulário dos dados para o exame clínico de Odontologia do Projeto PROSSaúde, UFRJ" aria-hidden="false" />
                <meta property="og:image" content="./PROS_Saude_Modelo1-Final.jpg" aria-hidden="false" />
                <meta property="og:image:width" content="1200" aria-hidden="false" />
                <meta property="og:image:height" content="400" aria-hidden="false" />
              `
              );
            document.body.className = "odBody";
            for (const stylesheet of head.querySelectorAll("style")) {
              if (
                !/global style/gi.test(stylesheet.innerText) &&
                (!/od page/gi.test(stylesheet.innerText) ||
                  /odont page/gi.test(stylesheet.innerText))
              ) {
                stylesheet.parentElement!.append(
                  document.createComment(stylesheet.outerHTML)
                );
                stylesheet.remove();
              }
            }
            break;
          }
          case "panel": {
            !head.querySelector("title") &&
              head.firstElementChild!.insertAdjacentHTML(
                `beforebegin`,
                `
                <title>Painel de Trabalho &#8211 PROSSaúde, UFRJ</title>
                <link rel="icon" href="/favicon_g.ico" id="faviconpross" />
                <meta name="description" content="Este é o painel de trabalho principal para o projeto PROSSaúde — UFRJ" />
                <meta property="og:type" content="website" aria-hidden="false" />
                <meta property="og:website:published_time" content="#" aria-hidden="false" />
                <meta property="og:site_name" content="PROSSaúde — Painel de Trabalho" aria-hidden="false" />
                <meta property="og:url" content="# aria-hidden="false" />
                <meta property="og:title" content="PROSSaúde — UFRJ — Exame Clínico — Formulário de Anamnese Geral" aria-hidden="false" />
                <meta property="og:description" content="Acesse o link para preencher acessar o painel de trabalho online do Projeto PROSSaúde, UFRJ" aria-hidden="false" />
                <meta property="og:image" content="./img/PROS_Saude_Modelo1-Final.jpg" aria-hidden="false" />
                <meta property="og:image:width" content="1200" aria-hidden="false" />
                <meta property="og:image:height" content="400" aria-hidden="false" />
                `
              );
            document.body.className = "panelBody";
            for (const stylesheet of head.querySelectorAll("style")) {
              if (
                !/global style/gi.test(stylesheet.innerText) &&
                !/panel page/gi.test(stylesheet.innerText)
              ) {
                stylesheet.parentElement!.append(
                  document.createComment(stylesheet.outerHTML)
                );
                stylesheet.remove();
              }
            }
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
