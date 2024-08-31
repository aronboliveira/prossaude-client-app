"use strict";exports.id=941,exports.ids=[941],exports.modules={7859:(e,t,o)=>{o.d(t,{Z:()=>r});var n=o(997);function r(e){let{dispatch:t,state:o}=e;return n.jsx("button",{className:"transparent-el-bg",id:"tipsBtn",onClick:()=>t(!o),children:n.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-question-circle-fill widMax-3r htMax1-5r",viewBox:"0 0 16 16",children:n.jsx("path",{d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"})})})}},6509:(e,t,o)=>{o.a(e,async(e,n)=>{try{o.d(t,{r:()=>p});var r=o(9641),i=o(5163),a=e([i]);function p(e,t){try{if((0,i.TD)("",!0).ok||(console.warn("User token invalid. Redirecting to base page"),window.location.replace(window.location.origin)),"string"!=typeof e)throw Error("invalid componentCase argument given to handleLinkChanges");if("string"!=typeof t)throw Error("invalid StyleFlag given to handleLinkChanges");let o=document.querySelectorAll("head");if(o.length>1)for(let e=0;e<o.length;e++)e>0&&o[e].remove();document.querySelectorAll("meta").forEach(e=>{e instanceof HTMLMetaElement&&"viewport"!==e.name&&"next-head-count"!==e.name&&"theme-color"!==e.name&&!/x-ua-compatible/gi.test(e.name)&&!/charset/gi.test(e.outerHTML)&&!/http-?equiv/gi.test(e.outerHTML)&&e.remove()});let n=document.querySelector("noscript");n instanceof HTMLElement&&"NOSCRIPT"===n.tagName&&""===n.innerText&&(n.innerText="You need JavaScript to run this application.");try{let t=document.querySelector("head");if(!(t instanceof HTMLHeadElement))throw(0,r.MS)(t,"<head>",(0,r.Ji)(Error()));if(document.getElementById("bootstrapLink")||Array.from(document.querySelectorAll("link")).some(e=>{e.outerHTML&&/bootstrap@/gi.test(e.outerHTML)})||t.prepend(Object.assign(document.createElement("link"),{href:"https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",rel:"stylesheet",integrity:"sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN",crossOrigin:"anonymous",id:"bootstrapLink"})),document.getElementById("charsetMeta")||Array.from(document.querySelectorAll("meta")).some(e=>{e.outerHTML&&/utf-8/gi.test(e.outerHTML)})||t.prepend(Object.assign(document.createElement("meta"),{charSet:"UTF-8",id:"charsetMeta"})),document.getElementById("viewportMeta")||Array.from(document.querySelectorAll("meta")).some(e=>{e.outerHTML&&/viewport/gi.test(e.outerHTML)})||t.prepend(Object.assign(document.createElement("meta"),{name:"viewport",content:"width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=3.0, user-scalable=yes",id:"viewportMeta"})),document.getElementById("edgeMeta")||Array.from(document.querySelectorAll("meta")).some(e=>{e.outerHTML&&/x-ua-compatible/gi.test(e.outerHTML)})||t.prepend(Object.assign(document.createElement("meta"),{httEquip:"X-UA-Compatible",content:"IE=edge",id:"edgeMeta"})),t.hasChildNodes()&&t.lastElementChild&&t.firstElementChild){for(let e of t.querySelectorAll("title"))e.remove();for(let e of t.querySelectorAll('link[rel="icon"]'))e.remove();switch(t.querySelectorAll("meta").forEach((e,t)=>{try{(/name="description"/gi.test(e.outerHTML)||/property="og:/gi.test(e.outerHTML)||/name="twitter:/gi.test(e.outerHTML))&&e.remove()}catch(e){console.error(`Error executing iteration ${t} for removing local meta tags:${e.message}`)}}),e){case"login":for(let e of(t.querySelector("title")||t.firstElementChild.insertAdjacentHTML("beforebegin",`
                <link rel="icon" href="/favicon_g.ico" id="faviconpross" />
                <link rel="canonical nofollow noreferrer" href="https://prossaude-client.netlify.app/" />
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
                <title>Login — PROSSa\xfade</title>
                <meta name="description" content="Este \xe9 uma p\xe1gina para login no sistema do projeto PROSSa\xfade — UFRJ" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="2024-07-02" />
                <meta property="og:site_name" content="Login — PROSSa\xfade" />
                <meta property="og:url" content="https://prossaude-client.netlify.app/" />
                <meta property="og:title" content="PROSSa\xfade — UFRJ — Login" />
                <meta property="og:description" content="Acesse o link para fazer o login no sistema online do Projeto PROSSa\xfade, UFRJ" />
                <meta property="og:image" content="https://prossaude-client.netlify.app/img/PROS_Saude_Modelo1-Final.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
                <meta property="og:image:alt" content="logo" />
                `),document.body.className="loginBody",t.querySelectorAll("style")))/global style/gi.test(e.innerText)||/login page/gi.test(e.innerText)||(e.parentElement.append(document.createComment(e.outerHTML)),e.remove());break;case"base":for(let e of(t.querySelector("title")||t.firstElementChild.insertAdjacentHTML("beforebegin",`
                <link rel="icon" href="/favicon_g.ico" id="faviconpross" />
                <link rel="canonical nofollow noreferrer" href="https://prossaude-client.netlify.app/" />
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
                <title>Base de Navega\xe7\xe3o — Pr\xf3-Sa\xfade</title>
                <meta name="description" content="Este \xe9 uma p\xe1gina para navega\xe7\xe3o entre as subp\xe1ginas do sistema do projeto PROSSa\xfade — UFRJ" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="2024-07-02" />
                <meta property="og:site_name" content="PROSSa\xfade — Tela Base de Navega\xe7\xe3o" />
                <meta property="og:url" content="https://prossaude-client.netlify.app/base/" />
                <meta property="og:title" content="PROSSa\xfade — UFRJ — Tela Base de Navega\xe7\xe3o — Formul\xe1rio de Anamnese Geral" />
                <meta property="og:description" content="Acesse o link para acessar a tela para navega\xe7\xe3o entre as p\xe1ginas de preenchimento e trabalho do Projeto PROSSa\xfade, UFRJ" />
                <meta property="og:image" content="https://prossaude-client.netlify.app/img/PROS_Saude_Modelo1-Final.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
              `),document.body.className="baseBody",t.querySelectorAll("style")))/global style/gi.test(e.innerText)||/base page/gi.test(e.innerText)||(e.parentElement.append(document.createComment(e.outerHTML)),e.remove());break;case"ag":t.querySelector("title")||t.firstElementChild.insertAdjacentHTML("beforebegin",`
                <link rel="icon" href="/favicon_g.ico" id="faviconpross" />
                <link rel="canonical nofollow noreferrer" href="https://prossaude-client.netlify.app/" />
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
                <title>Anamnese Geral &#8211 PROSSa\xfade, UFRJ</title>
                <meta name="description" content="Este \xe9 um formul\xe1rio para a Anamnese Geral do projeto PROSSa\xfade — UFRJ" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="2024-07-02" />
                <meta property="og:site_name" content="PROSSa\xfade — Anamnese Geral" />
                <meta property="og:url" content="https://prossaude-client.netlify.app/ag/" />
                <meta property="og:title" content="PROSSa\xfade — UFRJ — Exame Cl\xednico — Formul\xe1rio de Anamnese Geral" />
                <meta property="og:description" content="Acesse o link para preencher o formul\xe1rio dos dados para a Anamnese Geral do Projeto PROSSa\xfade, UFRJ" />
                <meta property="og:image" content="https://prossaude-client.netlify.app/img/PROS_Saude_Modelo1-Final.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
                `),document.body.className="agBody";break;case"ed":t.querySelector("title")||t.firstElementChild.insertAdjacentHTML("beforebegin",`
                <link rel="icon" href="/favicon_nut.ico" id="faviconpross" />
                <link rel="canonical nofollow noreferrer" href="https://prossaude-client.netlify.app/" />
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
                <title>Exame Cl\xednico — Educa\xe7\xe3o F\xedsica & Nutri\xe7\xe3o</title>
                <meta name="description" content="Este \xe9 um formul\xe1rio para o Exame Cl\xednico de Educa\xe7\xe3o F\xedsica do projeto PROSSa\xfade — UFRJ" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="2024-07-02" />
                <meta property="og:site_name" content="PROSSa\xfade — Educa\xe7\xe3o F\xedsica &amp; Nutri\xe7\xe3o" />
                <meta property="og:url" content="https://prossaude-client.netlify.app/edfis/" />
                <meta property="og:title" content="PROSSa\xfade — UFRJ — Exame Cl\xednico — Formul\xe1rio de Educa\xe7\xe3o F\xedsica &amp; Nutri\xe7\xe3o" />
                <meta property="og:description" content="Acesse o link para preencher o formul\xe1rio dos dados para o exame cl\xednico de Educa\xe7\xe3o F\xedsica &amp; Nutri\xe7\xe3o do Projeto PROSSa\xfade, UFRJ" />
                <meta property="og:image" content="https://prossaude-client.netlify.app/img/PROS_edfis_icon.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
                `),document.body.className="edfisNutBody";break;case"od":t.querySelector("title")||t.firstElementChild.insertAdjacentHTML("beforebegin",`
                <title>Exame Cl\xednico — Odontologia</title>
                <link rel="canonical nofollow noreferrer" href="https://prossaude-client.netlify.app/" />
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
                <meta name="description" content="Este \xe9 um formul\xe1rio para o Exame Cl\xednico de Odontologia do projeto PROSSa\xfade — UFRJ" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="2024-07-02" />
                <meta property="og:site_name" content="PROSSa\xfade — Odontologia" />
                <meta property="og:url" content="https://prossaude-client.netlify.app/od/" />
                <meta property="og:title" content="PROSSa\xfade — UFRJ — Exame Cl\xednico — Formul\xe1rio de Odontologia" />
                <meta property="og:description" content="Acesse o link para preencher o formul\xe1rio dos dados para o exame cl\xednico de Odontologia do Projeto PROSSa\xfade, UFRJ" />
                <meta property="og:image" content="https://prossaude-client.netlify.app/img/pros-od-icon.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
              `),document.body.className="odBody";break;case"panel":t.querySelector("title")||t.firstElementChild.insertAdjacentHTML("beforebegin",`
                <title>Painel de Trabalho &#8211 PROSSa\xfade, UFRJ</title>
                <link rel="canonical nofollow noreferrer" href="https://prossaude-client.netlify.app/" />
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
                <meta name="description" content="Este \xe9 o painel de trabalho principal para o projeto PROSSa\xfade — UFRJ" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="2024-07-02" />
                <meta property="og:site_name" content="PROSSa\xfade — Painel de Trabalho" />
                <meta property="og:url" content="https://prossaude-client.netlify.app/panel/" />
                <meta property="og:title" content="PROSSa\xfade — UFRJ — Exame Cl\xednico — Painel de Trabalho" />
                <meta property="og:description" content="Acesse o link para preencher acessar o painel de trabalho online do Projeto PROSSa\xfade, UFRJ" />
                <meta property="og:image" content="https://prossaude-client.netlify.app/img/PROS_Saude_Modelo1-Final.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
                `),document.body.className="panelBody";break;case"recover":t.querySelector("title")||t.firstElementChild.insertAdjacentHTML("beforebegin",`
              <title>Recupera\xe7\xe3o de Senha &#8211 PROSSa\xfade, UFRJ</title>
              <link rel="canonical nofollow noreferrer" href="https://prossaude-client.netlify.app/recover/" />
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
                <meta name="description" content="Este \xe9 o painel de trabalho principal para o projeto PROSSa\xfade — UFRJ" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="2024-07-02" />
                <meta property="og:site_name" content="PROSSa\xfade — Painel de Trabalho" />
                <meta property="og:url" content="https://prossaude-client.netlify.app/recover/" />
                <meta property="og:title" content="PROSSa\xfade — UFRJ — Exame Cl\xednico — Recupera\xe7\xe3o de Senha" />
                <meta property="og:description" content="Acesse o link para preencher acessar a p\xe1gina de recupera\xe7\xe3o de senha do Projeto PROSSa\xfade, UFRJ" />
                <meta property="og:image" content="https://prossaude-client.netlify.app/img/PROS_Saude_Modelo1-Final.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
                `),document.body.className="recoverBody";break;default:console.error("Invalid componentCase. No description appended.");return}}}catch(e){console.error(`Error executing procedure for checking local links and metas:
${e.message}`)}}catch(e){console.error(`Error executing handleLinkChanges:
${e.message}`)}}i=(a.then?(await a)():a)[0],n()}catch(e){n(e)}})},8904:(e,t,o)=>{o.r(t),o.d(t,{default:()=>d});var n=o(8416),r=o.n(n),i=o(6859),a=o.n(i),p=o(4298),c=o.n(p),l=o(997);function s(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),o.push.apply(o,n)}return o}function d(){return(0,l.jsxs)(i.Html,{lang:"pt-BR",children:[(0,l.jsxs)(i.Head,{children:[l.jsx("link",{rel:"apple-touch-icon",href:"img/apple-touch-icon-iphone-60x60-precomposed.png"}),l.jsx("link",{rel:"apple-touch-icon",sizes:"60x60",href:"img/apple-touch-icon-ipad-76x76-precomposed.png"}),l.jsx("link",{rel:"apple-touch-icon",sizes:"114x114",href:"img/apple-touch-icon-iphone-retina-120x120-precomposed.png"}),l.jsx("link",{rel:"apple-touch-icon",sizes:"144x144",href:"img/apple-touch-icon-ipad-retina-152x152-precomposed.png"}),l.jsx("link",{rel:"icon",href:"/favicon_g.ico",id:"faviconpross"}),l.jsx("link",{rel:"canonical nofollow noreferrer",href:"https://prossaude-client.netlify.app/"}),l.jsx("title",{children:"Login — PROSSa\xfade"}),l.jsx("meta",{name:"description",content:"Este \xe9 uma p\xe1gina para login no sistema do projeto PROSSa\xfade — UFRJ"}),l.jsx("meta",{property:"og:type",content:"website"}),l.jsx("meta",{property:"og:website:published_time",content:"2024-07-02"}),l.jsx("meta",{property:"og:site_name",content:"Login — PROSSa\xfade"}),l.jsx("meta",{property:"og:url",content:"https://prossaude-client.netlify.app/"}),l.jsx("meta",{property:"og:title",content:"PROSSa\xfade — UFRJ — Login"}),l.jsx("meta",{property:"og:description",content:"Acesse o link para fazer o login no sistema online do Projeto PROSSa\xfade, UFRJ"}),l.jsx("meta",{property:"og:image",content:"https://prossaude-client.netlify.app/img/PROS_Saude_Modelo1-Final.png"}),l.jsx("meta",{property:"og:image:width",content:"1200"}),l.jsx("meta",{property:"og:image:height",content:"400"}),l.jsx("meta",{property:"og:image:alt",content:"logo"})]}),l.jsx("body",{children:l.jsx(i.Main,{})}),l.jsx(c(),{async:!0,src:"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",integrity:"sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz",crossOrigin:"anonymous",strategy:"lazyOnload"}),l.jsx(i.NextScript,{})]})}d.getInitialProps=async e=>(function(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?s(Object(o),!0).forEach(function(t){r()(e,t,o[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):s(Object(o)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))})}return e})({},await a().getInitialProps(e))},1323:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,o){return o in t?t[o]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,o)):"function"==typeof t&&"default"===o?t:void 0}}})},5244:(e,t)=>{var o;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return o}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(o||(o={}))}};