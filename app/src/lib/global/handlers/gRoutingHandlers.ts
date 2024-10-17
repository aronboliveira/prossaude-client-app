import { elementNotFound, extLine } from "./errorHandler";
import { pageCases, pageStyleCases } from "../declarations/types";
import { decodeToken } from "../auth";
import { pageProps } from "@/vars";
export function handleLinkChanges(componentCase: pageCases, styleFlag: pageStyleCases): void {
  try {
    if (!decodeToken("", true).ok) location.replace(window.location.origin);
    if (typeof componentCase !== "string") throw new Error(`invalid componentCase argument given to handleLinkChanges`);
    if (typeof styleFlag !== "string") throw new Error(`invalid StyleFlag given to handleLinkChanges`);
    const heads = document.querySelectorAll("head");
    if (heads.length > 1) for (let i = 0; i < heads.length; i++) i > 0 && (heads[i].remove() as void);
    const noscript = document.querySelector("noscript");
    if (noscript instanceof HTMLElement && noscript.tagName === "NOSCRIPT" && noscript.innerText === "")
      noscript.innerText = "You need JavaScript to run this application.";
    try {
      const head = document.querySelector("head");
      if (!(head instanceof HTMLHeadElement)) throw elementNotFound(head, `<head>`, extLine(new Error()));
      if (!head.querySelector('meta[charset="utf-8"]') && !head.querySelector('meta[charset="UTF-8"]'))
        head.prepend(
          Object.assign(document.createElement("meta"), {
            charSet: "UTF-8",
            id: "charsetMeta",
          }),
        );
      if (!head.querySelector('meta[name="viewport"]'))
        head.prepend(
          Object.assign(document.createElement("meta"), {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=3.0, user-scalable=yes",
            id: "viewportMeta",
          }),
        );
      if (!head.querySelector('meta[content="IE=edge"]') && !head.querySelector('meta[content="IE=Edge"]')) {
        head.prepend(
          Object.assign(document.createElement("meta"), {
            httEquip: "X-UA-Compatible",
            content: "IE=edge",
            id: "edgeMeta",
          }),
        );
      }
      if (head.hasChildNodes() && head.lastElementChild && head.firstElementChild) {
        for (const title of head.querySelectorAll("title")) title.remove() as void;
        for (const favicon of [
          ...head.querySelectorAll('link[rel="icon"]'),
          ...head.querySelectorAll('link[rel="apple-touch-icon"]'),
        ])
          favicon.remove() as void;
        for (const canonical of head.querySelectorAll('link[rel="canonical"]')) canonical.remove() as void;
        head.querySelectorAll("meta").forEach((meta, m) => {
          try {
            if (
              /name="description"/gi.test(meta.outerHTML) ||
              /property="og:/gi.test(meta.outerHTML) ||
              /name="twitter:/gi.test(meta.outerHTML)
            )
              meta.remove() as void;
          } catch (e) {
            console.error(`Error executing iteration ${m} for removing local meta tags:${(e as Error).message}`);
          }
        });
        const { base, firstPub, name } = pageProps;
        let origin = pageProps.origin;
        origin = location.origin.endsWith("/") ? location.origin.slice(0, -1) : location.origin;
        switch (componentCase) {
          case "login": {
            const title = "Login — PROSSaúde";
            !head.querySelector("title") &&
              head.firstElementChild!.insertAdjacentHTML(
                `afterend`,
                `
                <!-- Start of automatic insertion -->
                <title>${title}</title>
                <link rel="canonical" href="${base}/" />
                <meta name="description" content="Este é uma página para login no sistema do projeto ${name}" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content=${firstPub} />
                <meta property="og:site_name" content="${name}" />
                <meta property="og:url" content="${base}/" />
                <meta property="og:title" content="${title}" />
                <meta property="og:description" content="Acesse o link para fazer o login no sistema online do Projeto ${name}" />
                <meta property="og:image" content="${base}/img/PROS_Saude_Modelo1-Final.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
                <meta property="og:image:alt" content="logo" />
                <link rel="icon" href="${origin}/favicon_g.ico" id="faviconpross" />
                <link
                  rel="apple-touch-icon"
                  href="${origin}/apple-touch-icon-iphone-60x60-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="60x60"
                  href="${origin}/apple-touch-icon-ipad-76x76-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="114x114"
                  href="${origin}/apple-touch-icon-iphone-retina-120x120-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="144x144"
                  href="${origin}/apple-touch-icon-ipad-retina-152x152-precomposed.png"
                />
                <!-- End of automatic insertion -->
                `,
              );
            document.body.className = "loginBody";
            break;
          }
          case "base": {
            !head.querySelector("title") &&
              head.firstElementChild!.insertAdjacentHTML(
                `afterend`,
                `
                <!-- Start of automatic insertion -->
                <title>Base de Navegação — ${name}</title>
                <link rel="canonical" href="${base}/base/" />
                <meta name="description" content="Este é uma página para navegação entre as subpáginas do sistema do projeto ${name}" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="${firstPub}" />
                <meta property="og:site_name" content="${name}" />
                <meta property="og:url" content="${base}/base/" />
                <meta property="og:title" content="${name} — Tela Base de Navegação" />
                <meta property="og:description" content="Acesse o link para acessar a tela para navegação entre as páginas de preenchimento e trabalho do Projeto ${name}" />
                <meta property="og:image" content="${origin}/img/PROS_Saude_Modelo1-Final.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
                <link rel="icon" href="${origin}/favicon_g.ico" id="faviconpross" />
                <link
                  rel="apple-touch-icon"
                  href="${origin}/img/apple-touch-icon-iphone-60x60-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="60x60"
                  href="${origin}/img/apple-touch-icon-ipad-76x76-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="114x114"
                  href="${origin}/img/apple-touch-icon-iphone-retina-120x120-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="144x144"
                  href="${origin}/img/apple-touch-icon-ipad-retina-152x152-precomposed.png"
                />
                <!-- End of automatic insertion -->
              `,
              );
            document.body.className = "baseBody";
            break;
          }
          case "ag": {
            !head.querySelector("title") &&
              head.firstElementChild!.insertAdjacentHTML(
                `afterend`,
                `
                <!-- Start of automatic insertion -->
                <title>Anamnese Geral &#8211 ${name}</title>
                <link rel="canonical" href="${base}/ag/" />
                <meta name="description" content="Este é um formulário para a Anamnese Geral do projeto PROSSaúde — UFRJ" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="${firstPub}" />
                <meta property="og:site_name" content="${name}" />
                <meta property="og:url" content="${base}/ag/" />
                <meta property="og:title" content="Exame Clínico — ${name}" />
                <meta property="og:description" content="Acesse o link para preencher o formulário dos dados para a Anamnese Geral do Projeto ${name}" />
                <meta property="og:image" content="${origin}/img/PROS_Saude_Modelo1-Final.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
                <link rel="icon" href="${origin}/favicon_g.ico" id="faviconpross" />
                <link
                  rel="apple-touch-icon"
                  href="${origin}/img/apple-touch-icon-iphone-60x60-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="60x60"
                  href="${origin}/img/apple-touch-icon-ipad-76x76-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="114x114"
                  href="${origin}/img/apple-touch-icon-iphone-retina-120x120-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="144x144"
                  href="${origin}/img/apple-touch-icon-ipad-retina-152x152-precomposed.png"
                />
                <!-- End of automatic insertion -->
                `,
              );
            document.body.className = "agBody";
            break;
          }
          case "ed": {
            !head.querySelector("title") &&
              head.firstElementChild!.insertAdjacentHTML(
                `afterend`,
                `
                <!-- Start of automatic insertion -->
                <title>Exame Clínico — Educação Física & Nutrição — ${name}</title>
                <link rel="canonical" href="${base}/edfis/" />
                <meta name="description" content="Este é um formulário para o Exame Clínico de Educação Física do Projeto ${name}" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="${firstPub}" />
                <meta property="og:site_name" content="${name}" />
                <meta property="og:url" content="${base}/edfis/" />
                <meta property="og:title" content="Exame Clínico — Formulário de Educação Física &amp; Nutrição — ${name}" />
                <meta property="og:description" content="Acesse o link para preencher o formulário dos dados para o exame clínico de Educação Física &amp; Nutrição do Projeto ${name}" />
                <meta property="og:image" content="${origin}/img/PROS_edfis_icon.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
                <link rel="icon" href="${origin}/favicon_nut.ico" id="faviconpross" />
                <link
                  rel="apple-touch-icon"
                  href="${origin}/img/apple-touch-icon-iphone-60x60-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="60x60"
                  href="${origin}/img/apple-touch-icon-ipad-76x76-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="114x114"
                  href="${origin}/img/apple-touch-icon-iphone-retina-120x120-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="144x144"
                  href="${origin}/img/apple-touch-icon-ipad-retina-152x152-precomposed.png"
                />
                <!-- End of automatic insertion -->
                `,
              );
            document.body.className = "edfisNutBody";
            break;
          }
          case "od": {
            !head.querySelector("title") &&
              head.firstElementChild!.insertAdjacentHTML(
                `afterend`,
                `
                <!-- Start of automatic insertion -->
                <title>Exame Clínico — Odontologia</title>
                <link rel="canonical" href="${base}/od" />
                <meta name="description" content="Este é um formulário para o Exame Clínico de Odontologia do Projeto ${name}" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="${firstPub}" />
                <meta property="og:site_name" content="${name}" />
                <meta property="og:url" content="${base}/od/" />
                <meta property="og:title" content="Exame Clínico — Formulário de Odontologia — ${name}" />
                <meta property="og:description" content="Acesse o link para preencher o formulário dos dados para o exame clínico de Odontologia do Projeto ${name}" />
                <meta property="og:image" content="${base}/img/pros-od-icon.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
                <link rel="icon" href="${origin}/favicon_od.ico" id="faviconpross" />
                <link
                  rel="apple-touch-icon"
                  href="${origin}/img/apple-touch-icon-iphone-60x60-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="60x60"
                  href="${origin}/img/apple-touch-icon-ipad-76x76-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="114x114"
                  href="${origin}/img/apple-touch-icon-iphone-retina-120x120-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="144x144"
                  href="${origin}/img/apple-touch-icon-ipad-retina-152x152-precomposed.png"
                />
                <!-- End of automatic insertion -->
              `,
              );
            document.body.className = "odBody";
            break;
          }
          case "panel": {
            !head.querySelector("title") &&
              head.firstElementChild!.insertAdjacentHTML(
                `afterend`,
                `
                <!-- Start of automatic insertion -->
                <title>Painel de Trabalho &#8211 ${name}</title>
                <link rel="canonical" href="${base}/panel/" />
                <meta name="description" content="Este é o painel de trabalho principal para o Projeto ${name}" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="${firstPub}" />
                <meta property="og:site_name" content="${name}" />
                <meta property="og:url" content="${base}/panel/" />
                <meta property="og:title" content="Painel de Trabalho — ${name}" />
                <meta property="og:description" content="Acesse o link para preencher acessar o painel de trabalho online do Projeto ${name}" />
                <meta property="og:image" content="${base}/img/PROS_Saude_Modelo1-Final.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
                <link rel="icon" href="${origin}/favicon_g.ico" id="faviconpross" />
                <link
                  rel="apple-touch-icon"
                  href="${origin}/img/apple-touch-icon-iphone-60x60-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="60x60"
                  href="${origin}/img/apple-touch-icon-ipad-76x76-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="114x114"
                  href="${origin}/img/apple-touch-icon-iphone-retina-120x120-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="144x144"
                  href="${origin}/img/apple-touch-icon-ipad-retina-152x152-precomposed.png"
                />
                <!-- End of automatic insertion -->
                `,
              );
            document.body.className = "panelBody";
            break;
          }
          case "recover": {
            !head.querySelector("title") &&
              head.firstElementChild!.insertAdjacentHTML(
                `afterend`,
                `
                <!-- Start of automatic insertion -->
                <title>Recuperação de Senha &#8211 ${name}</title>
                <meta name="description" content="Este é o painel de trabalho principal para o Projeto ${name}" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="${firstPub}" />
                <meta property="og:site_name" content="${name}" />
                <meta property="og:url" content="${base}/recover/" />
                <meta property="og:title" content="Recuperação de Senha — ${name}" />
                <meta property="og:description" content="Acesse o link para preencher acessar a página de recuperação de senha do Projeto ${name}" />
                <meta property="og:image" content="${base}/img/PROS_Saude_Modelo1-Final.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
                <link rel="canonical" href="${base}/recover/" />
                <link rel="icon" href="${origin}/favicon_g.ico" id="faviconpross" />
                <link
                rel="apple-touch-icon"
                href="${origin}/img/apple-touch-icon-iphone-60x60-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="60x60"
                  href="${origin}/img/apple-touch-icon-ipad-76x76-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="114x114"
                  href="${origin}/img/apple-touch-icon-iphone-retina-120x120-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="144x144"
                  href="${origin}/img/apple-touch-icon-ipad-retina-152x152-precomposed.png"
                />
                <!-- End of automatic insertion -->
                `,
              );
            document.body.className = "recoverBody";
            break;
          }
          default:
            console.error(`Invalid componentCase. No description appended.`);
            return;
        }
        const headElements = head.children;
        const elementsById = new Map();
        for (let i = 0; i < headElements.length; i++) {
          const element = headElements[i];
          let elementId = element.id;
          if (!elementId) {
            if (element instanceof HTMLScriptElement && element.src !== "") elementId = element.src;
            else if (element instanceof HTMLLinkElement && element.href !== "") elementId = element.href;
            else if (element instanceof HTMLMetaElement) {
              if (element.name !== "") elementId = element.name;
              else if (element.httpEquiv !== "") elementId = element.httpEquiv;
              else if (element.content !== "") elementId = element.content;
            }
          }
          if (!elementId) continue;
          if (elementsById.has(elementId)) {
            const existingElement = elementsById.get(elementId);
            const currentAttrCount = element.attributes.length;
            const existingAttrCount = existingElement.attributes.length;
            if (currentAttrCount > existingAttrCount) {
              elementsById.set(elementId, element);
              existingElement.remove() as void;
            } else if (currentAttrCount === existingAttrCount) {
              existingElement.remove() as void;
              elementsById.set(elementId, element);
            } else element.remove() as void;
          } else elementsById.set(elementId, element);
        }
      }
    } catch (e) {
      console.error(`Error executing procedure for checking local links and metas:\n${(e as Error).message}`);
    }
  } catch (e) {
    console.error(`Error executing handleLinkChanges:\n${(e as Error).message}`);
  }
}
