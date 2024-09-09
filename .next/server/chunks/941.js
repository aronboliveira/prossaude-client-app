"use strict";exports.id=941,exports.ids=[941],exports.modules={7859:(e,t,o)=>{o.d(t,{Z:()=>i});var n=o(997);function i(e){let{dispatch:t,state:o}=e;return n.jsx("button",{className:"transparent-el-bg",id:"tipsBtn",onClick:()=>t(!o),children:n.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-question-circle-fill widMax-3r htMax1-5r",viewBox:"0 0 16 16",children:n.jsx("path",{d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"})})})}},6509:(e,t,o)=>{o.a(e,async(e,n)=>{try{o.d(t,{r:()=>c});var i=o(9641),r=o(5163),a=o(1243),p=e([r]);function c(e,t){try{if((0,r.TD)("",!0).ok||(console.warn("User token invalid. Redirecting to base page"),window.location.replace(window.location.origin)),"string"!=typeof e)throw Error("invalid componentCase argument given to handleLinkChanges");if("string"!=typeof t)throw Error("invalid StyleFlag given to handleLinkChanges");let o=document.querySelectorAll("head");if(o.length>1)for(let e=0;e<o.length;e++)e>0&&o[e].remove();let n=document.querySelector("noscript");n instanceof HTMLElement&&"NOSCRIPT"===n.tagName&&""===n.innerText&&(n.innerText="You need JavaScript to run this application.");try{let t=document.querySelector("head");if(!(t instanceof HTMLHeadElement))throw(0,i.MS)(t,"<head>",(0,i.Ji)(Error()));if(t.querySelector('meta[charset="utf-8"]')||t.querySelector('meta[charset="UTF-8"]')||t.prepend(Object.assign(document.createElement("meta"),{charSet:"UTF-8",id:"charsetMeta"})),t.querySelector('meta[name="viewport"]')||t.prepend(Object.assign(document.createElement("meta"),{name:"viewport",content:"width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=3.0, user-scalable=yes",id:"viewportMeta"})),t.querySelector('meta[content="IE=edge"]')||t.querySelector('meta[content="IE=Edge"]')||t.prepend(Object.assign(document.createElement("meta"),{httEquip:"X-UA-Compatible",content:"IE=edge",id:"edgeMeta"})),t.hasChildNodes()&&t.lastElementChild&&t.firstElementChild){for(let e of t.querySelectorAll("title"))e.remove();for(let e of[...t.querySelectorAll('link[rel="icon"]'),...t.querySelectorAll('link[rel="apple-touch-icon"]')])e.remove();for(let e of t.querySelectorAll('link[rel="canonical"]'))e.remove();t.querySelectorAll("meta").forEach((e,t)=>{try{(/name="description"/gi.test(e.outerHTML)||/property="og:/gi.test(e.outerHTML)||/name="twitter:/gi.test(e.outerHTML))&&e.remove()}catch(e){console.error(`Error executing iteration ${t} for removing local meta tags:${e.message}`)}});let{base:o,firstPub:n,name:i}=a.pageProps,r=a.pageProps.origin;switch(r=location.origin.endsWith("/")?location.origin.slice(0,-1):location.origin,e){case"login":{let e="Login — PROSSa\xfade";t.querySelector("title")||t.firstElementChild.insertAdjacentHTML("afterend",`
                <!-- Start of automatic insertion -->
                <title>${e}</title>
                <link rel="canonical" href="${o}/" />
                <meta name="description" content="Este \xe9 uma p\xe1gina para login no sistema do projeto ${i}" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content=${n} />
                <meta property="og:site_name" content="${i}" />
                <meta property="og:url" content="${o}/" />
                <meta property="og:title" content="${e}" />
                <meta property="og:description" content="Acesse o link para fazer o login no sistema online do Projeto ${i}" />
                <meta property="og:image" content="${o}/img/PROS_Saude_Modelo1-Final.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
                <meta property="og:image:alt" content="logo" />
                <link rel="icon" href="${r}/favicon_g.ico" id="faviconpross" />
                <link
                  rel="apple-touch-icon"
                  href="${r}/apple-touch-icon-iphone-60x60-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="60x60"
                  href="${r}/apple-touch-icon-ipad-76x76-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="114x114"
                  href="${r}/apple-touch-icon-iphone-retina-120x120-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="144x144"
                  href="${r}/apple-touch-icon-ipad-retina-152x152-precomposed.png"
                />
                <!-- End of automatic insertion -->
                `),document.body.className="loginBody";break}case"base":t.querySelector("title")||t.firstElementChild.insertAdjacentHTML("afterend",`
                <!-- Start of automatic insertion -->
                <title>Base de Navega\xe7\xe3o — ${i}</title>
                <link rel="canonical" href="${o}/base/" />
                <meta name="description" content="Este \xe9 uma p\xe1gina para navega\xe7\xe3o entre as subp\xe1ginas do sistema do projeto ${i}" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="${n}" />
                <meta property="og:site_name" content="${i}" />
                <meta property="og:url" content="${o}/base/" />
                <meta property="og:title" content="${i} — Tela Base de Navega\xe7\xe3o" />
                <meta property="og:description" content="Acesse o link para acessar a tela para navega\xe7\xe3o entre as p\xe1ginas de preenchimento e trabalho do Projeto ${i}" />
                <meta property="og:image" content="${r}/img/PROS_Saude_Modelo1-Final.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
                <link rel="icon" href="${r}/favicon_g.ico" id="faviconpross" />
                <link
                  rel="apple-touch-icon"
                  href="${r}/img/apple-touch-icon-iphone-60x60-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="60x60"
                  href="${r}/img/apple-touch-icon-ipad-76x76-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="114x114"
                  href="${r}/img/apple-touch-icon-iphone-retina-120x120-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="144x144"
                  href="${r}/img/apple-touch-icon-ipad-retina-152x152-precomposed.png"
                />
                <!-- End of automatic insertion -->
              `),document.body.className="baseBody";break;case"ag":t.querySelector("title")||t.firstElementChild.insertAdjacentHTML("afterend",`
                <!-- Start of automatic insertion -->
                <title>Anamnese Geral &#8211 ${i}</title>
                <link rel="canonical" href="${o}/ag/" />
                <meta name="description" content="Este \xe9 um formul\xe1rio para a Anamnese Geral do projeto PROSSa\xfade — UFRJ" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="${n}" />
                <meta property="og:site_name" content="${i}" />
                <meta property="og:url" content="${o}/ag/" />
                <meta property="og:title" content="Exame Cl\xednico — ${i}" />
                <meta property="og:description" content="Acesse o link para preencher o formul\xe1rio dos dados para a Anamnese Geral do Projeto ${i}" />
                <meta property="og:image" content="${r}/img/PROS_Saude_Modelo1-Final.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
                <link rel="icon" href="${r}/favicon_g.ico" id="faviconpross" />
                <link
                  rel="apple-touch-icon"
                  href="${r}/img/apple-touch-icon-iphone-60x60-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="60x60"
                  href="${r}/img/apple-touch-icon-ipad-76x76-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="114x114"
                  href="${r}/img/apple-touch-icon-iphone-retina-120x120-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="144x144"
                  href="${r}/img/apple-touch-icon-ipad-retina-152x152-precomposed.png"
                />
                <!-- End of automatic insertion -->
                `),document.body.className="agBody";break;case"ed":t.querySelector("title")||t.firstElementChild.insertAdjacentHTML("afterend",`
                <!-- Start of automatic insertion -->
                <title>Exame Cl\xednico — Educa\xe7\xe3o F\xedsica & Nutri\xe7\xe3o — ${i}</title>
                <link rel="canonical" href="${o}/edfis/" />
                <meta name="description" content="Este \xe9 um formul\xe1rio para o Exame Cl\xednico de Educa\xe7\xe3o F\xedsica do Projeto ${i}" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="${n}" />
                <meta property="og:site_name" content="${i}" />
                <meta property="og:url" content="${o}/edfis/" />
                <meta property="og:title" content="Exame Cl\xednico — Formul\xe1rio de Educa\xe7\xe3o F\xedsica &amp; Nutri\xe7\xe3o — ${i}" />
                <meta property="og:description" content="Acesse o link para preencher o formul\xe1rio dos dados para o exame cl\xednico de Educa\xe7\xe3o F\xedsica &amp; Nutri\xe7\xe3o do Projeto ${i}" />
                <meta property="og:image" content="${r}/img/PROS_edfis_icon.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
                <link rel="icon" href="${r}/favicon_nut.ico" id="faviconpross" />
                <link
                  rel="apple-touch-icon"
                  href="${r}/img/apple-touch-icon-iphone-60x60-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="60x60"
                  href="${r}/img/apple-touch-icon-ipad-76x76-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="114x114"
                  href="${r}/img/apple-touch-icon-iphone-retina-120x120-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="144x144"
                  href="${r}/img/apple-touch-icon-ipad-retina-152x152-precomposed.png"
                />
                <!-- End of automatic insertion -->
                `),document.body.className="edfisNutBody";break;case"od":t.querySelector("title")||t.firstElementChild.insertAdjacentHTML("afterend",`
                <!-- Start of automatic insertion -->
                <title>Exame Cl\xednico — Odontologia</title>
                <link rel="canonical" href="${o}/od" />
                <meta name="description" content="Este \xe9 um formul\xe1rio para o Exame Cl\xednico de Odontologia do Projeto ${i}" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="${n}" />
                <meta property="og:site_name" content="${i}" />
                <meta property="og:url" content="${o}/od/" />
                <meta property="og:title" content="Exame Cl\xednico — Formul\xe1rio de Odontologia — ${i}" />
                <meta property="og:description" content="Acesse o link para preencher o formul\xe1rio dos dados para o exame cl\xednico de Odontologia do Projeto ${i}" />
                <meta property="og:image" content="${o}/img/pros-od-icon.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
                <link rel="icon" href="${r}/favicon_od.ico" id="faviconpross" />
                <link
                  rel="apple-touch-icon"
                  href="${r}/img/apple-touch-icon-iphone-60x60-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="60x60"
                  href="${r}/img/apple-touch-icon-ipad-76x76-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="114x114"
                  href="${r}/img/apple-touch-icon-iphone-retina-120x120-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="144x144"
                  href="${r}/img/apple-touch-icon-ipad-retina-152x152-precomposed.png"
                />
                <!-- End of automatic insertion -->
              `),document.body.className="odBody";break;case"panel":t.querySelector("title")||t.firstElementChild.insertAdjacentHTML("afterend",`
                <!-- Start of automatic insertion -->
                <title>Painel de Trabalho &#8211 ${i}</title>
                <link rel="canonical" href="${o}/panel/" />
                <meta name="description" content="Este \xe9 o painel de trabalho principal para o Projeto ${i}" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="${n}" />
                <meta property="og:site_name" content="${i}" />
                <meta property="og:url" content="${o}/panel/" />
                <meta property="og:title" content="Painel de Trabalho — ${i}" />
                <meta property="og:description" content="Acesse o link para preencher acessar o painel de trabalho online do Projeto ${i}" />
                <meta property="og:image" content="${o}/img/PROS_Saude_Modelo1-Final.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
                <link rel="icon" href="${r}/favicon_g.ico" id="faviconpross" />
                <link
                  rel="apple-touch-icon"
                  href="${r}/img/apple-touch-icon-iphone-60x60-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="60x60"
                  href="${r}/img/apple-touch-icon-ipad-76x76-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="114x114"
                  href="${r}/img/apple-touch-icon-iphone-retina-120x120-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="144x144"
                  href="${r}/img/apple-touch-icon-ipad-retina-152x152-precomposed.png"
                />
                <!-- End of automatic insertion -->
                `),document.body.className="panelBody";break;case"recover":t.querySelector("title")||t.firstElementChild.insertAdjacentHTML("afterend",`
                <!-- Start of automatic insertion -->
                <title>Recupera\xe7\xe3o de Senha &#8211 ${i}</title>
                <meta name="description" content="Este \xe9 o painel de trabalho principal para o Projeto ${i}" />
                <meta property="og:type" content="website" />
                <meta property="og:website:published_time" content="${n}" />
                <meta property="og:site_name" content="${i}" />
                <meta property="og:url" content="${o}/recover/" />
                <meta property="og:title" content="Recupera\xe7\xe3o de Senha — ${i}" />
                <meta property="og:description" content="Acesse o link para preencher acessar a p\xe1gina de recupera\xe7\xe3o de senha do Projeto ${i}" />
                <meta property="og:image" content="${o}/img/PROS_Saude_Modelo1-Final.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="400" />
                <link rel="canonical" href="${o}/recover/" />
                <link rel="icon" href="${r}/favicon_g.ico" id="faviconpross" />
                <link
                rel="apple-touch-icon"
                href="${r}/img/apple-touch-icon-iphone-60x60-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="60x60"
                  href="${r}/img/apple-touch-icon-ipad-76x76-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="114x114"
                  href="${r}/img/apple-touch-icon-iphone-retina-120x120-precomposed.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="144x144"
                  href="${r}/img/apple-touch-icon-ipad-retina-152x152-precomposed.png"
                />
                <!-- End of automatic insertion -->
                `),document.body.className="recoverBody";break;default:console.error("Invalid componentCase. No description appended.");return}let p=t.children,c=new Map;for(let e=0;e<p.length;e++){let t=p[e],o=t.id;if(!o&&(t instanceof HTMLScriptElement&&""!==t.src?o=t.src:t instanceof HTMLLinkElement&&""!==t.href?o=t.href:t instanceof HTMLMetaElement&&(""!==t.name?o=t.name:""!==t.httpEquiv?o=t.httpEquiv:""!==t.content&&(o=t.content))),o){if(c.has(o)){let e=c.get(o),n=t.attributes.length,i=e.attributes.length;n>i?(c.set(o,t),e.remove()):n===i?(e.remove(),c.set(o,t)):t.remove()}else c.set(o,t)}}}}catch(e){console.error(`Error executing procedure for checking local links and metas:
${e.message}`)}}catch(e){console.error(`Error executing handleLinkChanges:
${e.message}`)}}r=(p.then?(await p)():p)[0],n()}catch(e){n(e)}})},1243:(e,t,o)=>{o.d(t,{pageProps:()=>n});let n={base:"https://prossaude-client.netlify.app",origin:"",name:"PROSSa\xfade — UFRJ",firstPub:"2024-07-02T18:00:00Z"}},8904:(e,t,o)=>{o.r(t),o.d(t,{default:()=>x,getStaticProps:()=>u});var n=o(8416),i=o.n(n),r=o(1243),a=o(6859),p=o.n(a),c=o(4298),l=o.n(c),s=o(1423),m=o.n(s),d=o(7147),g=o(997);function h(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),o.push.apply(o,n)}return o}async function u(){let e=m().join(process.cwd(),"../../package.json");return{props:{deps:JSON.parse(await d.promises.readFile(e,"utf-8"))}}}function x(e){let{deps:t}=e,{name:o,base:n,origin:i,firstPub:p}=r.pageProps;return(0,g.jsxs)(a.Html,{lang:"pt-BR",children:[(0,g.jsxs)(a.Head,{children:[g.jsx("meta",{name:"robots",content:"index, follow"}),g.jsx("meta",{httpEquiv:"X-UA-Compatible",content:"IE=edge"}),g.jsx("meta",{httpEquiv:"Content-Type",content:"text/html; charset=UTF-8"}),g.jsx("meta",{name:"generator",content:`Next.js ${t?.dependencies?.next||t?.devDependencies?.next||"14.2.4"} + TypeScript ${t?.dependencies?.typescript||t?.devDependencies?.typescript||"5.5.3"}`}),g.jsx("link",{rel:"canonical",href:`${n}`}),g.jsx("meta",{name:"description",content:`Este \xe9 uma p\xe1gina para login no sistema do Projeto ${o}`}),g.jsx("meta",{property:"og:type",content:"website"}),g.jsx("meta",{property:"og:website:published_time",content:`${p}`}),g.jsx("meta",{property:"og:site_name",content:`${o}`}),g.jsx("meta",{property:"og:url",content:`${n}`}),g.jsx("meta",{property:"og:title",content:`Login — ${o}`}),g.jsx("meta",{property:"og:description",content:`Acesse o link para fazer o login no sistema online do Projeto ${o}`}),g.jsx("meta",{property:"og:image",content:`${n}/img/PROS_Saude_Modelo1-Final.png`}),g.jsx("meta",{property:"og:image:width",content:"1200"}),g.jsx("meta",{property:"og:image:height",content:"400"}),g.jsx("meta",{property:"og:image:alt",content:"logo"}),g.jsx("link",{rel:"alternate",type:"application/json+oembed",href:`${n}/oembed.json`}),g.jsx("link",{rel:"alternate",type:"text/xml+oembed",href:`${n}/oembed.xml`}),g.jsx("link",{rel:"alternate",type:"application/rss+xml",title:"RSS Feed for PROSSa\xfade",href:`${n}/rss.xml`}),g.jsx("link",{rel:"EditURI",type:"application/rsd+xml",title:"RSD",href:`${n}/xmlrpc.php?rsd`}),g.jsx("link",{rel:"icon",href:"/favicon_g.ico",id:"faviconpross"}),g.jsx("link",{rel:"apple-touch-icon",href:`${i}/img/apple-touch-icon-iphone-60x60-precomposed.png`}),g.jsx("link",{rel:"apple-touch-icon",sizes:"60x60",href:`${i}/apple-touch-icon-ipad-76x76-precomposed.png`}),g.jsx("link",{rel:"apple-touch-icon",sizes:"114x114",href:`${i}/apple-touch-icon-iphone-retina-120x120-precomposed.png`}),g.jsx("link",{rel:"apple-touch-icon",sizes:"144x144",href:`${i}/apple-touch-icon-ipad-retina-152x152-precomposed.png`}),g.jsx("link",{href:"https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",rel:"stylesheet",integrity:"sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN",crossOrigin:"anonymous",id:"bootstrapLink"})]}),(0,g.jsxs)("body",{children:[g.jsx(a.Main,{}),g.jsx(l(),{defer:!0,src:"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",integrity:"sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz",crossOrigin:"anonymous",strategy:"lazyOnload"}),g.jsx(l(),{defer:!0,type:"application/ld+json",crossOrigin:"anonymous",strategy:"beforeInteractive",id:"ld_json",dangerouslySetInnerHTML:{__html:`
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "${o}",
            description:
              "Este \xe9 uma p\xe1gina para login no sistema do Projeto ${o}",
            publisher: {
              "@type": "Organization",
              name: "PROSSa\xfade",
              url: "${n}/",
              logo: "${n}/img/PROS_Saude_Modelo1-Final.png",
            },`}})]}),g.jsx(a.NextScript,{})]})}x.getInitialProps=async e=>(function(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?h(Object(o),!0).forEach(function(t){i()(e,t,o[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):h(Object(o)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))})}return e})({},await p().getInitialProps(e))},1323:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,o){return o in t?t[o]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,o)):"function"==typeof t&&"default"===o?t:void 0}}})},5244:(e,t)=>{var o;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return o}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(o||(o={}))}};