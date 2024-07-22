"use strict";(()=>{var e={};e.id=405,e.ids=[405],e.modules={6880:(e,t,r)=>{r.a(e,async(e,n)=>{try{r.d(t,{Z:()=>p});var a=r(6689),o=r(6960),i=r(9641),s=r(8771),l=r(1163),c=r(6237),d=r(997),u=e([c]);function p(){let e=(0,l.useRouter)(),t=(0,a.useRef)(null);return(0,a.useEffect)(()=>{try{if(!(t.current instanceof HTMLAnchorElement))throw(0,i.MS)(t.current,"Anchor Reference in Login Page",(0,i.Ji)(Error()));/undefined/gi.test(t.current.href)&&!/http:/gi.test(t.current.href)&&(t.current.href=t.current.href.replace("undefined",`${location.href.replace(location.pathname,"")}`))}catch(e){console.error(`Error executing procedure for adjusting anchor href:
${e.message}`)}let e=document.querySelector("form"),r=Array.from(document.querySelectorAll("input"));e instanceof HTMLFormElement&&r.length>0?(0,o.vC)(e,r):(0,i.IB)((0,i.Ji)(Error()),"argument for clearDefInvalidMsg in DOM initialization",e,...r),(0,o.bq)(r,{user:"Nome de Usu\xe1rio",pw:"Senha"})},[]),(0,d.jsxs)("section",{id:"inputCont",children:[d.jsx("div",{role:"group",className:"loginInputCont1",children:d.jsx("div",{role:"group",id:"loginInputCont2",children:d.jsx("input",{className:"form-control fade-in-element userInput",id:"user",type:"text","aria-label":"email ou usu\xe1rio",placeholder:"Nome de Usu\xe1rio",title:"Por favor, preencha este\r campo.",minLength:5,maxLength:30,"data-title":"Usu\xe1rio",required:!0})})}),d.jsx("small",{className:"customValidityWarn",id:"userWarn",role:"textbox"}),d.jsx("div",{role:"group",className:"loginInputCont1",children:d.jsx("div",{role:"group",className:"loginInputCont2",children:(0,d.jsxs)("fieldset",{className:"form-control flexDiv fade-in-element",id:"loginInputCont3",children:[d.jsx("input",{className:"fade-in-element form-control userInput",id:"pw",type:"password",autoComplete:"password","aria-label":"senha",placeholder:"Senha",pattern:"^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$",minLength:1,maxLength:30,required:!0}),d.jsx("button",{type:"button",id:"spanShowPw",className:"halfL fade-in-late-element",onClick:e=>(0,s.dg)(e.currentTarget),children:(0,d.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-eye-fill",viewBox:"0 0 16 16",children:[d.jsx("path",{d:"M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"}),d.jsx("path",{d:"M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"})]})})]})})}),d.jsx("small",{className:"customValidityWarn",id:"pwWarn",role:"textbox"}),(0,d.jsxs)("nav",{id:"loginBtnCont",children:[d.jsx("a",{id:"newAccA",className:"fade-in-late-element",href:"#",target:"_blank",children:"Criar Conta"}),d.jsx("button",{type:"submit",className:"btn btn-primary fade-in-element",id:"submitBtn",children:d.jsx("a",{ref:t,id:"submitLogin",target:"_self",href:`${c.basePath.path}/base`,style:{color:"#ffff"},onClick:t=>{e.push("/base");let r=document.getElementById("outerLoginCont");(0,s.dH)(t.currentTarget.closest("button"),new SubmitEvent("submit",{submitter:r,bubbles:!0,cancelable:!0,composed:!0}))},children:"Avan\xe7ar"})})]})]})}c=(u.then?(await u)():u)[0],n()}catch(e){n(e)}})},8771:(e,t,r)=>{r.d(t,{dH:()=>s,dg:()=>i});var n=r(3849),a=r(6960),o=r(9641);function i(e){if(e instanceof HTMLElement){let t=e.querySelector(".bi"),r=document.getElementById("pw");r instanceof HTMLInputElement?t?.classList.contains("bi-eye-fill")?(r.type="text",e.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
        </svg>
        `):t?.classList.contains("bi-eye-slash-fill")?(r.type="password",e.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
        </svg>
        `):console.error("innerIcon class not validated"):(0,o.Nv)(r,"pwInp in callbackShowPw()",(0,o.Ji)(Error()))}else(0,o.MS)(e,"spanShowPw in callbackShowPw()",(0,o.Ji)(Error()))}function s(e,t){if(e instanceof HTMLButtonElement){let e=document.getElementById("pw"),r=document.getElementById("user");e instanceof HTMLInputElement?/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(e.value)?e.setCustomValidity(""):(t.preventDefault(),(0,n.aX)(e),(0,a.Ob)(e.parentElement),e.checkValidity()||(e.placeholder="Senha inv\xe1lida",(0,a.ak)(e.id??"","Senha inv\xe1lida")),setTimeout(()=>{e.placeholder="Senha"},5e3)):(0,o.Nv)(e,"pwInp in callbackSubmitBtn()",(0,o.Ji)(Error())),r instanceof HTMLInputElement?r.value.length<5&&(t.preventDefault(),(0,a.Ob)(r),r.setCustomValidity("O usu\xe1rio deve ter ao m\xednimo 5 caracteres"),r.checkValidity()||(r.placeholder="Usu\xe1rio inv\xe1lido",(0,a.ak)(r.id??"","Usu\xe1rio inv\xe1lido")),setTimeout(()=>{r.placeholder="Nome de Usu\xe1rio"},5e3)):(0,o.Nv)(r,"userInp in callbackSubmitBtn()",(0,o.Ji)(Error()))}else(0,o.MS)(e,"submitBtn in callbackSubmitBtn()",(0,o.Ji)(Error()))}},6237:(e,t,r)=>{r.a(e,async(e,n)=>{try{r.r(t),r.d(t,{basePath:()=>m,default:()=>p});var a=r(6812),o=r(2200),i=r(6689),s=r(979),l=r(7849),c=r(9641),d=r(997),u=e([a,o]);[a,o]=u.then?(await u)():u;let m={path:"",ph:"undefined"};function p(){let e=(0,i.useContext)(s.AppRootContext);return(0,i.useEffect)(()=>{try{let t=document.getElementById("__next");if(!(t instanceof HTMLElement))throw(0,c.MS)(t,"__next",(0,c.Ji)(Error()));if(e.roots.nextRoot)return;if(e.roots.nextRoot||(e.roots.nextRoot=(0,l.createRoot)(t)),!("_internalRoot"in e.roots.nextRoot))throw Error("nextRoot not validated as a Root")}catch(e){console.error(`Error executing procedure for :${e.message}`)}},[]),d.jsx(a.ErrorBoundary,{FallbackComponent:()=>d.jsx("div",{children:"Erro!"}),children:d.jsx(o.default,{})})}n()}catch(e){n(e)}})},2200:(e,t,r)=>{r.a(e,async(e,n)=>{try{r.r(t),r.d(t,{default:()=>c});var a=r(6812),o=r(6880),i=r(3899),s=r(997),l=e([a,o,i]);function c(){return(0,s.jsxs)(a.ErrorBoundary,{FallbackComponent:()=>s.jsx("div",{children:"Erro!"}),children:[s.jsx("div",{role:"group",className:"pad1pc",id:"bgDiv",children:s.jsx("main",{children:s.jsx("form",{id:"outerLoginCont",name:"outerLoginContFormName",action:"#",method:"post",target:"_self",children:(0,s.jsxs)("div",{role:"group",id:"loginCont",children:[s.jsx("section",{id:"logoCont",children:s.jsx("img",{className:"fade-in-element",id:"logo",src:"./img/PROS_Saude_Modelo1-Final.png",alt:"logo"})}),(0,s.jsxs)("section",{id:"headerCont",children:[s.jsx("div",{role:"group",id:"titleCont1",children:s.jsx("h1",{id:"titleText",children:s.jsx("span",{role:"group",className:"fade-in-element",id:"spanTitle",children:"Fa\xe7a o Login"})})}),s.jsx("div",{role:"group",id:"titleCont2",children:s.jsx("h2",{id:"subtitleText",children:s.jsx("span",{role:"group",className:"fade-in-late-element",id:"spanSubtitle",children:"Informe seus dados de usu\xe1rio"})})})]}),s.jsx(o.Z,{})]})})})}),s.jsx(i.Z,{routeCase:"login"})]})}[a,o,i]=l.then?(await l)():l,n()}catch(e){n(e)}})},1496:(e,t,r)=>{r.a(e,async(e,n)=>{try{r.r(t),r.d(t,{config:()=>g,default:()=>u,getServerSideProps:()=>h,getStaticPaths:()=>m,getStaticProps:()=>p,reportWebVitals:()=>f,routeModule:()=>j,unstable_getServerProps:()=>S,unstable_getServerSideProps:()=>w,unstable_getStaticParams:()=>v,unstable_getStaticPaths:()=>b,unstable_getStaticProps:()=>x});var a=r(7093),o=r(5244),i=r(1323),s=r(8904),l=r(979),c=r(6237),d=e([c]);c=(d.then?(await d)():d)[0];let u=(0,i.l)(c,"default"),p=(0,i.l)(c,"getStaticProps"),m=(0,i.l)(c,"getStaticPaths"),h=(0,i.l)(c,"getServerSideProps"),g=(0,i.l)(c,"config"),f=(0,i.l)(c,"reportWebVitals"),x=(0,i.l)(c,"unstable_getStaticProps"),b=(0,i.l)(c,"unstable_getStaticPaths"),v=(0,i.l)(c,"unstable_getStaticParams"),S=(0,i.l)(c,"unstable_getServerProps"),w=(0,i.l)(c,"unstable_getServerSideProps"),j=new a.PagesRouteModule({definition:{kind:o.x.PAGES,page:"/index",pathname:"/",bundlePath:"",filename:""},components:{App:l.default,Document:s.default},userland:c});n()}catch(e){n(e)}})},3903:e=>{e.exports=require("core-js/modules/es.regexp.flags.js")},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},1423:e=>{e.exports=require("path")},6689:e=>{e.exports=require("react")},6405:e=>{e.exports=require("react-dom")},7849:e=>{e.exports=require("react-dom/client")},997:e=>{e.exports=require("react/jsx-runtime")},6812:e=>{e.exports=import("react-error-boundary")},7147:e=>{e.exports=require("fs")},2781:e=>{e.exports=require("stream")},9796:e=>{e.exports=require("zlib")}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[859,60,725],()=>r(1496));module.exports=n})();