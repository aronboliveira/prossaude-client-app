"use strict";(()=>{var e={};e.id=698,e.ids=[698],e.modules={6385:(e,t,r)=>{r.a(e,async(e,a)=>{try{let v;r.d(t,{Z:()=>b});var n=r(979),l=r(8962),o=r(7849),s=r(9641),d=r(5234),i=r(6960),c=r(3849),m=r(6689),p=r(1163),h=r(7452),f=r(5674),u=r(3291),g=r(997),x=e([n,d,i,c,h,f,u]);[n,d,i,c,h,f,u]=x.then?(await x)():x;let y=f.nE;function b(){let e=(0,m.useContext)(n.AppRootContext),t=(0,p.useRouter)(),r=(0,u.useDispatch)();return(0,m.useEffect)(()=>{y=localStorage.getItem("activeUser")?JSON.parse(localStorage.getItem("activeUser")):f.nE,(""===y.loadedData.name||/an[oô]nimo/gi.test(y.loadedData.name))&&console.warn("Failed to fetch user from local storage. Default user displayed.");let a=Object.freeze(new l.n5({name:y.loadedData.name,privilege:y.loadedData.privilege,area:y.loadedData.area,email:y.loadedData.email,telephone:y.loadedData.telephone}));localStorage.setItem("activeUser",JSON.stringify(a)),r((0,f.NW)({v:{loadedData:y.loadedData}})),(v=document.getElementById("rootUserInfo"))instanceof HTMLElement&&!e.roots.baseRootedUser?e.roots.baseRootedUser=(0,o.createRoot)(v):setTimeout(()=>{(v=document.getElementById("rootUserInfo"))||(0,s.MS)(v,"Root for user painel",(0,s.Ji)(Error()))},2e3),"object"==typeof e.roots.baseRootedUser?e.roots.baseRootedUser.render(g.jsx(h.Z,{user:a,router:t})):(0,s.MS)(`${JSON.stringify(e.roots.baseRootedUser)}`,"Root instance for User panel",(0,s.Ji)(Error())),(0,d.k)(Array.from(document.querySelectorAll("small"))),(0,i.Dz)(document.getElementById("rootUserInfo"));let n=()=>{try{let e=document.getElementById("bgDiv");if(!(e instanceof HTMLElement)){console.warn("Failed to fetch Background Div");return}let t=document.querySelector(".main-article")||document.querySelector("nav");if(!(t instanceof HTMLElement)){console.warn("Failed to fetch MainArticle");return}let r=document.querySelector(".main-container")||document.querySelector("main");if(!(r instanceof HTMLElement)){console.warn("Failed to fetch Main Container");return}let a=document.getElementById("cardsSect");if(!(a instanceof HTMLElement)){console.warn("Failed to fetch Cards Section");return}let n=document.getElementById("panelBtn"),l=document.getElementById("panelSect"),o=1,s=1,d=1,i=.5,m=getComputedStyle(a).gridTemplateRows;d=/repeat/g.test(m)?(0,c.b8)(m.slice(0,m.indexOf(",")).replace("repeat(","").replace(/[^0-9]g/,""))||2:Array.from(m.matchAll(/\s/g)).length+1||1,n instanceof HTMLElement&&(n.style.width="23.2rem"),a instanceof HTMLElement&&(a.style.paddingTop="0"),l instanceof HTMLElement&&(l.style.paddingTop="0"),innerWidth>520&&innerWidth<=1025&&(d=2),innerWidth<=1025&&d>1&&(o=1*d*i,s=1*d*i,l instanceof HTMLElement&&(l.style.paddingTop="0",l.style.paddingBottom="0",n instanceof HTMLElement&&(n.style.width="23.2rem",n.parentElement&&(n.parentElement.style.paddingTop="1%")))),innerWidth<930&&d>1&&l instanceof HTMLElement&&(l.style.paddingTop="1rem",l.style.paddingBottom="0"),innerWidth<=850&&d>1&&(s=.94*d*i,a instanceof HTMLElement&&(a.style.paddingTop="2rem"),l instanceof HTMLElement&&(l.style.paddingTop="3rem",l.style.paddingBottom="0")),innerWidth<=750&&d>1&&(s=1*d*i,l instanceof HTMLElement&&(l.style.paddingTop="0",l.style.paddingBottom="3rem")),innerWidth<=675&&d>1&&l instanceof HTMLElement&&(l.style.paddingTop="0.2rem"),innerWidth<=600&&d>1&&(s=.93*d*i),innerWidth<=592&&d>1&&(o=1.04*d*i,s=1.2*d*i,l instanceof HTMLElement&&(l.style.paddingTop="2rem")),d>=4&&innerWidth<=520&&(d=4,i=.25),innerWidth<=520&&d>1&&(o=1.06*d*i,s=1*d*i,l instanceof HTMLElement&&(l.style.paddingBottom="2rem",l.style.marginTop="0",n instanceof HTMLElement&&(n.style.width="75vw"))),innerWidth<=448&&d>1&&(o=1.083*d*i,s=1.045*d*i,l instanceof HTMLElement&&(l.style.paddingTop="2rem",l.style.paddingBottom="3rem")),innerWidth<=415&&d>1&&(o=1.038*d*i,s=1.01*d*i,l instanceof HTMLElement&&(l.style.paddingTop="2rem",n instanceof HTMLElement&&(n.style.width="75vw"))),innerWidth<=325&&d>1&&(o=1.038*d*i,s=1.01*d*i,l instanceof HTMLElement&&(l.style.paddingTop="3.5rem",a instanceof HTMLElement&&(a.style.paddingTop="5rem"),n instanceof HTMLElement&&(n.style.width="75vw"))),e.style.height=`${(0,c.b8)(getComputedStyle(t).height.replace("px","").trim())*o||1}px`,r.style.height=`${(0,c.b8)(getComputedStyle(t).height.replace("px","").trim())*s||1}px`}catch(e){console.error(`Error executing handleBgResize:
${e.message}`)}};return n(),addEventListener("resize",n),()=>removeEventListener("resize",n)},[]),(0,g.jsxs)("main",{className:"main-container gridAlItCt widFull gridAlItBs750Q gridAuto750Q rGap4v750Q",children:[(0,g.jsxs)("section",{id:"cardsSect",className:"grid4col grid4r750Q gridJICt rGap2v750Q pd-t4v750Q fade-in-early-element",children:[(0,g.jsxs)("div",{className:"card card23v htMinMaxC751Qmin brd-rd2r wid90p750Q htMaxC460Q fd1el",style:{maxWidth:"12rem"},children:[g.jsx("button",{className:"card-hborder transparent-el fade-in-early-element",id:"agAnchoredBtn",children:g.jsx("a",{className:"card-header anchoredBtn noInvert",id:"ag_but",target:"_self",href:"/ag",rel:"nofollow",onClick:()=>t.push("/ag"),children:g.jsx("img",{className:"card-img-top",src:"../img/icon-psy.png",alt:"imagem-card-geral"})})}),(0,g.jsxs)("div",{className:"card-body txAlCt pdT3v flexNoWC rGap2v750Q rGap0-5v fd2el",children:[g.jsx("a",{className:"card-title bolded btn btn-grey btn-rounded anchoredBtn noInvert",id:"ag_but_sec",target:"_self",href:"/ag",rel:"nofollow",onClick:()=>t.push("/ag"),children:"Geral & Sa\xfade Mental"}),g.jsx("small",{className:"mg-1bv460Q fd3el formDesc",children:"Acesse aqui o formul\xe1rio para Anamnese Geral e Sa\xfade Mental"})]})]}),(0,g.jsxs)("div",{className:"card card23v htMinMaxC751Qmin brd-rd2r wid90p750Q htMaxC460Q fd2el",children:[g.jsx("button",{className:"card-hborder transparent-el",id:"efAnchoredBtn",children:g.jsx("a",{className:"card-header anchoredBtn noInvert",id:"ef_but",target:"_self",href:"/edfis",rel:"nofollow",onClick:()=>t.push("/edfis"),children:g.jsx("img",{className:"card-img-top",src:"../img/PROS_edfis_icon.png",alt:"imagem-card-edFis"})})}),(0,g.jsxs)("div",{className:"card-body txAlCt pdT3v flexNoWC rGap2v750Q rGap0-5v fd3el",children:[g.jsx("a",{className:"card-title bolded btn btn-orange btn-rounded anchoredBtn noInvert",id:"ef_but_sec",target:"_self",href:"/edfis",rel:"nofollow",onClick:()=>t.push("/edfis"),children:"Educa\xe7\xe3o F\xedsica"}),g.jsx("p",{children:g.jsx("small",{className:"noInvert fd4el",children:"Acesse aqui o formul\xe1rio para Educa\xe7\xe3o F\xedsica"})})]})]}),(0,g.jsxs)("div",{className:"card card23v htMinMaxC751Qmin brd-rd2r wid90p750Q htMaxC460Q fd4el",children:[g.jsx("button",{className:"card-hborder transparent-el",id:"nutAnchoredBtn",children:g.jsx("a",{className:"card-header anchoredBtn noInvert",id:"nut_but",target:"_self",href:"/edfis",rel:"nofollow",onClick:()=>t.push("/edfis"),children:g.jsx("img",{className:"card-img-top",src:"../img/PROS_nut_icon.png",alt:"imagem-card-nut"})})}),(0,g.jsxs)("div",{className:"card-body txAlCt pdT3v flexNoWC rGap2v750Q rGap0-5v fd5el",children:[g.jsx("a",{className:"card-title bolded btn btn-green btn-rounded anchoredBtn",target:"_self",id:"nut_but_sec",href:"/edfis",rel:"nofollow",onClick:()=>t.push("/edfis"),children:"Nutri\xe7\xe3o"}),g.jsx("p",{children:g.jsx("small",{className:"noInvert fd6el",children:"Acesse aqui o formul\xe1rio para Nutri\xe7\xe3o"})})]})]}),(0,g.jsxs)("div",{className:"card card23v htMinMaxC751Qmin brd-rd2r wid90p750Q htMaxC460Q fd5el",children:[g.jsx("button",{className:"card-hborder transparent-el",id:"odAnchoredBtn",children:g.jsx("a",{className:"card-header anchoredBtn noInvert",id:"od_but",target:"_self",href:"/od",rel:"nofollow",onClick:()=>t.push("/od"),children:g.jsx("img",{className:"card-img-top",src:"../img/pros-od-icon.png",alt:"imagem-card-odonto"})})}),(0,g.jsxs)("div",{className:"card-body txAlCt pdT3v flexNoWC rGap2v750Q rGap0-5v fd6el",children:[g.jsx("a",{className:"card-title bolded btn btn-blue btn-rounded anchoredBtn",id:"od_but_sec",target:"_self",href:"/od",rel:"nofollow",onClick:()=>t.push("/od"),children:"Odontologia"}),g.jsx("small",{className:"mg-1bv460Q fade-in-late-element",children:"Acesse aqui o formul\xe1rio para Odontologia"})]})]})]}),g.jsx("section",{id:"panelSect",className:"gridJICt pd-b4v750Q fd2el",children:g.jsx("button",{type:"button",id:"panelBtn",className:"btn btn-primary btn-rounded wid80p750Q",children:g.jsx("a",{href:"/panel",id:"panelAnchor",target:"_self",rel:"nofollow",style:{color:"#ffff",fontWeight:"600"},children:"Painel de Trabalho"})})})]})}a()}catch(e){a(e)}})},5234:(e,t,r)=>{r.a(e,async(e,a)=>{try{r.d(t,{k:()=>s});var n=r(3849),l=r(9641),o=e([n]);function s(e){if(Array.isArray(e)&&e.length>0&&e.every(e=>e instanceof HTMLElement)){let t=(0,n.b8)(window.getComputedStyle(document.documentElement).fontSize),r=Math.min(...e.map(e=>(0,n.b8)(getComputedStyle(e).width)));e.forEach(e=>{r/t!=0&&(e.style.width=(r/t).toFixed(3))})}else(0,l.ex)(e,"Text Elements for equalizeParagraphs()",(0,l.Ji)(Error()))}n=(o.then?(await o)():o)[0],a()}catch(e){a(e)}})},3359:(e,t,r)=>{r.a(e,async(e,a)=>{try{r.r(t),r.d(t,{default:()=>i});var n=r(6812),l=r(6385),o=r(3899),s=r(997),d=e([n,l,o]);function i(){return s.jsx(n.ErrorBoundary,{FallbackComponent:()=>s.jsx("div",{children:"Erro!"}),children:(0,s.jsxs)("div",{id:"bgDiv",children:[(0,s.jsxs)("nav",{className:"main-article flexNoWC widFullView widAt750Q htFullView htAuto750Q noMargin",children:[(0,s.jsxs)("header",{className:"header-main-container bolded ht10 flexAlItCt noMargin bolded flexJBt flexNoWC900Q pd1r900Q htAt900Q htpd-2vQ460 pdL2r rGap1v mg-0lm601Q bolded",children:[s.jsx("h1",{className:"header-main-text bolded txaCt noInvert",children:"Menu Inicial — PROS-Sa\xfade: UFRJ"}),s.jsx("div",{role:"group",className:"flexNoW flexAlItCt cGap1v flexAlItE600Q cGap3v600Q contFitW flexNoWC460Q",id:"divUserPanel",children:s.jsx("section",{className:"form-control mgr-1_5v widThird flexNoW rGap2v flexBasis25 mg-t1-2v mg-0bQ460 widMinFit mg-0b600Q noInvert mg-05b forceInvert",children:s.jsx("div",{role:"group",className:"widFull flexNoW cGap2v rGap1v flexQ460NoWC wsNoW",id:"rootUserInfo"})})})]}),s.jsx(l.Z,{})]}),s.jsx("footer",{}),s.jsx(o.Z,{routeCase:"base"})]})})}[n,l,o]=d.then?(await d)():d,a()}catch(e){a(e)}})},7959:(e,t,r)=>{r.a(e,async(e,a)=>{try{r.r(t),r.d(t,{config:()=>u,default:()=>m,getServerSideProps:()=>f,getStaticPaths:()=>h,getStaticProps:()=>p,reportWebVitals:()=>g,routeModule:()=>N,unstable_getServerProps:()=>y,unstable_getServerSideProps:()=>j,unstable_getStaticParams:()=>v,unstable_getStaticPaths:()=>b,unstable_getStaticProps:()=>x});var n=r(7093),l=r(5244),o=r(1323),s=r(8904),d=r(979),i=r(3359),c=e([d,i]);[d,i]=c.then?(await c)():c;let m=(0,o.l)(i,"default"),p=(0,o.l)(i,"getStaticProps"),h=(0,o.l)(i,"getStaticPaths"),f=(0,o.l)(i,"getServerSideProps"),u=(0,o.l)(i,"config"),g=(0,o.l)(i,"reportWebVitals"),x=(0,o.l)(i,"unstable_getStaticProps"),b=(0,o.l)(i,"unstable_getStaticPaths"),v=(0,o.l)(i,"unstable_getStaticParams"),y=(0,o.l)(i,"unstable_getServerProps"),j=(0,o.l)(i,"unstable_getServerSideProps"),N=new n.PagesRouteModule({definition:{kind:l.x.PAGES,page:"/base",pathname:"/base",bundlePath:"",filename:""},components:{App:d.default,Document:s.default},userland:i});a()}catch(e){a(e)}})},3903:e=>{e.exports=require("core-js/modules/es.regexp.flags.js")},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},1423:e=>{e.exports=require("path")},6689:e=>{e.exports=require("react")},6405:e=>{e.exports=require("react-dom")},7849:e=>{e.exports=require("react-dom/client")},997:e=>{e.exports=require("react/jsx-runtime")},3258:e=>{e.exports=import("@reduxjs/toolkit")},5311:e=>{e.exports=import("@reduxjs/toolkit/react")},9915:e=>{e.exports=import("js-cookie")},2880:e=>{e.exports=import("jwt-decode")},6812:e=>{e.exports=import("react-error-boundary")},3291:e=>{e.exports=import("react-redux")},7147:e=>{e.exports=require("fs")},2781:e=>{e.exports=require("stream")},9796:e=>{e.exports=require("zlib")}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[803,120,811,786,452],()=>r(7959));module.exports=a})();