(()=>{var e={};e.id=405,e.ids=[405],e.modules={7544:(e,t,r)=>{e.exports=r(6745)},6880:(e,t,r)=>{"use strict";r.a(e,async(e,n)=>{try{r.d(t,{Z:()=>p});var o=r(6237),s=r(6960),i=r(5163),a=r(6689),l=r(9641),c=r(8771),u=r(997),d=e([o]);function p(){let e=(0,a.useRef)(null);return(0,a.useEffect)(()=>{try{if(!(e.current instanceof HTMLAnchorElement))throw(0,l.MS)(e.current,"Anchor Reference in Login Page",(0,l.Ji)(Error()));/undefined/gi.test(e.current.href)&&!/http:/gi.test(e.current.href)&&(e.current.href=e.current.href.replace("undefined",`${location.href.replace(location.pathname,"")}`))}catch(e){console.error(`Error executing procedure for adjusting anchor href:
${e.message}`)}let t=document.querySelector("form"),r=Array.from(document.querySelectorAll("input"));t instanceof HTMLFormElement&&r.length>0?(0,s.vC)(t,r):(0,l.IB)((0,l.Ji)(Error()),"argument for clearDefInvalidMsg in DOM initialization",t,...r),(0,s.bq)(r,{user:"Nome de Usu\xe1rio",pw:"Senha"})},[]),(0,u.jsxs)("section",{id:"inputCont",children:[u.jsx("div",{role:"group",className:"loginInputCont1",children:u.jsx("div",{role:"group",id:"loginInputCont2",children:u.jsx("input",{className:"form-control fade-in-element userInput",id:"user",name:"user_name",type:"text","aria-label":"email ou usu\xe1rio",placeholder:"Nome de Usu\xe1rio",title:"Por favor, preencha este\r campo.",minLength:5,maxLength:30,"data-title":"Usu\xe1rio",autoComplete:"username",required:!0})})}),u.jsx("small",{className:"customValidityWarn",id:"userWarn",role:"textbox"}),u.jsx("div",{role:"group",className:"loginInputCont1",children:u.jsx("div",{role:"group",className:"loginInputCont2",children:(0,u.jsxs)("fieldset",{className:"form-control flexDiv fade-in-element",id:"loginInputCont3",children:[u.jsx("input",{className:"fade-in-element form-control userInput",id:"pw",name:"pw",type:"password",autoComplete:"password","aria-label":"senha",placeholder:"Senha",pattern:"^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$",minLength:1,maxLength:30,required:!0}),u.jsx("button",{type:"button",id:"spanShowPw",className:"halfL fade-in-late-element",onClick:e=>(0,c.dg)(e.currentTarget),children:(0,u.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-eye-fill",viewBox:"0 0 16 16",children:[u.jsx("path",{d:"M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"}),u.jsx("path",{d:"M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"})]})})]})})}),u.jsx("small",{className:"customValidityWarn",id:"pwWarn",role:"textbox"}),(0,u.jsxs)("nav",{id:"loginBtnCont",children:[u.jsx("a",{id:"recover",className:"fade-in-late-element",href:"/recover",rel:"nofollow noreferrer",target:"_self",children:"Esqueci minha senha"}),u.jsx("button",{type:"submit",className:"btn btn-primary fade-in-element",id:"submitBtn",children:u.jsx("a",{ref:e,id:"submitLogin",rel:"nofollow noreferrer",target:"_self",href:`${o.basePath.path}/base`,style:{color:"#ffff"},onClick:e=>{let t="";try{let e=document.getElementById("user");if(!(e instanceof HTMLInputElement))throw(0,l.Nv)(e,"Validation of User name element",(0,l.Ji)(Error()));t=e.value}catch(e){console.error(`Error executing fetch of user name from element:
${e.message}`)}let r="";try{let e=document.getElementById("pw");if(!(e instanceof HTMLInputElement))throw(0,l.Nv)(e,"Validation of password element instance",(0,l.Ji)(Error()));r=e.value}catch(e){console.error(`Error:${e.message}`)}(0,i.jc)(e,[t,r],!0),(0,c.dH)(e.currentTarget.closest("button"),new SubmitEvent("submit",{submitter:document.getElementById("outerLoginCont"),bubbles:!0,cancelable:!0,composed:!0}))},children:"Avan\xe7ar"})})]})]})}o=(d.then?(await d)():d)[0],n()}catch(e){n(e)}})},6745:(e,t,r)=>{"use strict";var n=r(8416);function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return u}});let s=r(167),i=r(997),a=s._(r(6689)),l=r(9642);async function c(e){let{Component:t,ctx:r}=e;return{pageProps:await (0,l.loadGetInitialProps)(t,r)}}class u extends a.default.Component{render(){let{Component:e,pageProps:t}=this.props;return(0,i.jsx)(e,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach(function(t){n(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({},t))}}u.origGetInitialProps=c,u.getInitialProps=c,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8771:(e,t,r)=>{"use strict";r.d(t,{dH:()=>a,dg:()=>i});var n=r(3849),o=r(6960),s=r(9641);function i(e){if(e instanceof HTMLElement){let t=e.querySelector(".bi"),r=document.getElementById("pw");r instanceof HTMLInputElement?t?.classList.contains("bi-eye-fill")?(r.type="text",e.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
        </svg>
        `):t?.classList.contains("bi-eye-slash-fill")?(r.type="password",e.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
        </svg>
        `):console.error("innerIcon class not validated"):(0,s.Nv)(r,"pwInp in callbackShowPw()",(0,s.Ji)(Error()))}else(0,s.MS)(e,"spanShowPw in callbackShowPw()",(0,s.Ji)(Error()))}function a(e,t){if(e instanceof HTMLButtonElement){let e=document.getElementById("pw"),r=document.getElementById("user");e instanceof HTMLInputElement?/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(e.value)?e.setCustomValidity(""):(t.preventDefault(),(0,n.aX)(e),(0,o.Ob)(e.parentElement),e.checkValidity()||(e.placeholder="Senha inv\xe1lida",(0,o.ak)(e.id??"","Senha inv\xe1lida")),setTimeout(()=>{e.placeholder="Senha"},5e3)):(0,s.Nv)(e,"pwInp in callbackSubmitBtn()",(0,s.Ji)(Error())),r instanceof HTMLInputElement?r.value.length<5&&(t.preventDefault(),(0,o.Ob)(r),r.setCustomValidity("O usu\xe1rio deve ter ao m\xednimo 5 caracteres"),r.checkValidity()||(r.placeholder="Usu\xe1rio inv\xe1lido",(0,o.ak)(r.id??"","Usu\xe1rio inv\xe1lido")),setTimeout(()=>{r.placeholder="Nome de Usu\xe1rio"},5e3)):(0,s.Nv)(r,"userInp in callbackSubmitBtn()",(0,s.Ji)(Error()))}else(0,s.MS)(e,"submitBtn in callbackSubmitBtn()",(0,s.Ji)(Error()))}},6237:(e,t,r)=>{"use strict";r.a(e,async(e,n)=>{try{r.r(t),r.d(t,{basePath:()=>f,default:()=>p});var o=r(979),s=r(6812),i=r(7849),a=r(9641),l=r(6689),c=r(2200),u=r(997),d=e([s,c]);[s,c]=d.then?(await d)():d;let f={path:"",ph:"undefined"};function p(){let e=(0,l.useContext)(o.AppRootContext);return(0,l.useEffect)(()=>{try{let t=document.getElementById("__next");if(!(t instanceof HTMLElement))throw(0,a.MS)(t,"__next",(0,a.Ji)(Error()));if(e.roots.nextRoot)return;if(e.roots.nextRoot||(e.roots.nextRoot=(0,i.createRoot)(t)),!("_internalRoot"in e.roots.nextRoot))throw Error("nextRoot not validated as a Root")}catch(e){console.error(`Error executing procedure for :${e.message}`)}},[]),u.jsx(s.ErrorBoundary,{FallbackComponent:()=>u.jsx("div",{children:"Erro!"}),children:u.jsx(c.default,{})})}n()}catch(e){n(e)}})},2200:(e,t,r)=>{"use strict";r.a(e,async(e,n)=>{try{r.r(t),r.d(t,{default:()=>c});var o=r(6812),s=r(6880),i=r(3899),a=r(997),l=e([o,s,i]);function c(){return(0,a.jsxs)(o.ErrorBoundary,{FallbackComponent:()=>a.jsx("div",{children:"Erro!"}),children:[a.jsx("div",{role:"group",className:"pad1pc",id:"bgDiv",children:a.jsx("main",{children:a.jsx("form",{id:"outerLoginCont",name:"login_form",action:"check_user_validity",encType:"application/x-www-form-urlencoded",method:"post",target:"_self",autoComplete:"on",children:(0,a.jsxs)("div",{role:"group",id:"loginCont",children:[a.jsx("section",{id:"logoCont",children:a.jsx("img",{className:"fade-in-element",id:"logo",src:"./img/PROS_Saude_Modelo1-Final.png",alt:"logo"})}),(0,a.jsxs)("section",{id:"headerCont",children:[a.jsx("div",{role:"group",id:"titleCont1",children:a.jsx("h1",{id:"titleText",children:a.jsx("span",{role:"group",className:"fade-in-element",id:"spanTitle",children:"Fa\xe7a o Login"})})}),a.jsx("div",{role:"group",id:"titleCont2",children:a.jsx("h2",{id:"subtitleText",children:a.jsx("span",{role:"group",className:"fade-in-late-element",id:"spanSubtitle",children:"Informe seus dados de usu\xe1rio"})})})]}),a.jsx(s.Z,{})]})})})}),a.jsx(i.Z,{routeCase:"login"})]})}[o,s,i]=l.then?(await l)():l,n()}catch(e){n(e)}})},1323:(e,t)=>{"use strict";Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},1496:(e,t,r)=>{"use strict";r.a(e,async(e,n)=>{try{r.r(t),r.d(t,{config:()=>h,default:()=>d,getServerSideProps:()=>m,getStaticPaths:()=>f,getStaticProps:()=>p,reportWebVitals:()=>g,routeModule:()=>j,unstable_getServerProps:()=>y,unstable_getServerSideProps:()=>w,unstable_getStaticParams:()=>v,unstable_getStaticPaths:()=>b,unstable_getStaticProps:()=>x});var o=r(7093),s=r(5244),i=r(1323),a=r(8904),l=r(979),c=r(6237),u=e([c]);c=(u.then?(await u)():u)[0];let d=(0,i.l)(c,"default"),p=(0,i.l)(c,"getStaticProps"),f=(0,i.l)(c,"getStaticPaths"),m=(0,i.l)(c,"getServerSideProps"),h=(0,i.l)(c,"config"),g=(0,i.l)(c,"reportWebVitals"),x=(0,i.l)(c,"unstable_getStaticProps"),b=(0,i.l)(c,"unstable_getStaticPaths"),v=(0,i.l)(c,"unstable_getStaticParams"),y=(0,i.l)(c,"unstable_getServerProps"),w=(0,i.l)(c,"unstable_getServerSideProps"),j=new o.PagesRouteModule({definition:{kind:s.x.PAGES,page:"/index",pathname:"/",bundlePath:"",filename:""},components:{App:l.default,Document:a.default},userland:c});n()}catch(e){n(e)}})},5244:(e,t)=>{"use strict";var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},3903:e=>{"use strict";e.exports=require("core-js/modules/es.regexp.flags.js")},2785:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},1423:e=>{"use strict";e.exports=require("path")},6689:e=>{"use strict";e.exports=require("react")},7849:e=>{"use strict";e.exports=require("react-dom/client")},997:e=>{"use strict";e.exports=require("react/jsx-runtime")},6812:e=>{"use strict";e.exports=import("react-error-boundary")},4210:e=>{e.exports=function(e,t,r){if("function"==typeof e?e===t:e.has(t))return arguments.length<3?t:r;throw TypeError("Private element is not present on this object")},e.exports.__esModule=!0,e.exports.default=e.exports},8912:e=>{e.exports=function(e,t){return t.get?t.get.call(e):t.value},e.exports.__esModule=!0,e.exports.default=e.exports},3448:e=>{e.exports=function(e,t,r){if(t.set)t.set.call(e,r);else{if(!t.writable)throw TypeError("attempted to set read only private field");t.value=r}},e.exports.__esModule=!0,e.exports.default=e.exports},468:(e,t,r)=>{var n=r(8912),o=r(9537);e.exports=function(e,t){var r=o(t,e);return n(e,r)},e.exports.__esModule=!0,e.exports.default=e.exports},9537:(e,t,r)=>{var n=r(4210);e.exports=function(e,t){return e.get(n(e,t))},e.exports.__esModule=!0,e.exports.default=e.exports},5661:(e,t,r)=>{var n=r(3448),o=r(9537);e.exports=function(e,t,r){var s=o(t,e);return n(e,s,r),r},e.exports.__esModule=!0,e.exports.default=e.exports}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[859,811,786],()=>r(1496));module.exports=n})();