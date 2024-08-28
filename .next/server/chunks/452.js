"use strict";exports.id=452,exports.ids=[452],exports.modules={2434:(e,t,n)=>{n.d(t,{Z:()=>l});var a=n(6689),r=n(997);function l(e){let{renderError:t,onClick:n}=e,l=(0,a.useRef)(null);return(0,r.jsxs)("article",{role:"alert",id:"errorDlgDiv",ref:l,children:[r.jsx("h2",{className:"mg-2bv widHalf",children:r.jsx("strong",{children:"Oops, algo deu errado! \uD83D\uDE28"})}),r.jsx("h4",{children:t.message}),r.jsx("small",{children:"Feche a janela e tente novamente ou recarregue a p\xe1gina!"}),r.jsx("br",{}),r.jsx("button",{className:"btn btn-warning bolded widFull mg-1t",id:"retryRenderBtn",onClick:n,children:"Fechar"})]})}},6880:(e,t,n)=>{n.a(e,async(e,a)=>{try{n.d(t,{Z:()=>m});var r=n(6237),l=n(6960),o=n(5163),s=n(6689),i=n(9641),c=n(8771),d=n(997),u=e([r,l,o,c]);function m(){let e=(0,s.useRef)(null);return(0,s.useEffect)(()=>{try{if(!(e.current instanceof HTMLAnchorElement))throw(0,i.MS)(e.current,"Anchor Reference in Login Page",(0,i.Ji)(Error()));/undefined/gi.test(e.current.href)&&!/http:/gi.test(e.current.href)&&(e.current.href=e.current.href.replace("undefined",`${location.href.replace(location.pathname,"")}`))}catch(e){console.error(`Error executing procedure for adjusting anchor href:
${e.message}`)}let t=document.querySelector("form"),n=Array.from(document.querySelectorAll("input"));t instanceof HTMLFormElement&&n.length>0?(0,l.vC)(t,n):(0,i.IB)((0,i.Ji)(Error()),"argument for clearDefInvalidMsg in DOM initialization",t,...n),(0,l.bq)(n,{user:"Nome de Usu\xe1rio",pw:"Senha"})},[]),(0,d.jsxs)("section",{id:"inputCont",children:[d.jsx("div",{role:"group",className:"loginInputCont1",children:d.jsx("div",{role:"group",id:"loginInputCont2",children:d.jsx("input",{className:"form-control fade-in-element userInput",id:"user",name:"user_name",type:"text","aria-label":"email ou usu\xe1rio",placeholder:"Nome de Usu\xe1rio",title:"Por favor, preencha este\r campo.",minLength:5,maxLength:30,"data-title":"Usu\xe1rio",autoComplete:"username",required:!0})})}),d.jsx("small",{className:"customValidityWarn",id:"userWarn",role:"textbox"}),d.jsx("div",{role:"group",className:"loginInputCont1",children:d.jsx("div",{role:"group",className:"loginInputCont2",children:(0,d.jsxs)("fieldset",{className:"form-control flexDiv fade-in-element",id:"loginInputCont3",children:[d.jsx("input",{className:"fade-in-element form-control userInput",id:"pw",name:"pw",type:"password",autoComplete:"password","aria-label":"senha",placeholder:"Senha",pattern:"^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?=.{8,})(?:(?!.*\\s).)*(?!.*(.).*\\1{4,}).*$",minLength:8,maxLength:30,required:!0}),d.jsx("button",{type:"button",id:"spanShowPw",className:"halfL fade-in-late-element",onClick:e=>(0,c.dg)(e.currentTarget),children:(0,d.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-eye-fill",viewBox:"0 0 16 16",children:[d.jsx("path",{d:"M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"}),d.jsx("path",{d:"M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"})]})})]})})}),d.jsx("small",{className:"customValidityWarn",id:"pwWarn",role:"textbox"}),(0,d.jsxs)("nav",{id:"loginBtnCont",children:[d.jsx("a",{id:"recover",className:"fade-in-late-element",href:"/recover",rel:"nofollow noreferrer",target:"_self",children:"Esqueci minha senha"}),d.jsx("button",{type:"submit",className:"btn btn-primary fade-in-element",id:"submitBtn",onClick:e=>e.preventDefault(),children:d.jsx("a",{href:`${r.basePath.path}/base`,ref:e,id:"submitLogin",rel:"nofollow noreferrer",target:"_self",style:{color:"#ffff"},onClick:e=>{e.preventDefault();let t=new FormData,n="";try{let e=document.getElementById("user");if(!(e instanceof HTMLInputElement))throw(0,i.Nv)(e,"Validation of User name element",(0,i.Ji)(Error()));n=e.value}catch(e){console.error(`Error executing fetch of user name from element:
${e.message}`)}t.append("username",n);let a="";try{let e=document.getElementById("pw");if(!(e instanceof HTMLInputElement))throw(0,i.Nv)(e,"Validation of password element instance",(0,i.Ji)(Error()));a=e.value}catch(e){console.error(`Error reading password value:${e.message}`)}t.append("password",a);let[r,l]=(0,c.Rm)(e);if(l||!c.dH){alert(r);let t=e.currentTarget.parentElement,n="";(t instanceof HTMLButtonElement||t instanceof HTMLInputElement)&&(t.disabled=!0,n=t.id),setTimeout(()=>{let t=e.currentTarget?.parentElement||document.getElementById(n);(t instanceof HTMLButtonElement||t instanceof HTMLInputElement)&&(t.disabled=!1)},3e3);return}(0,c.dH)(),alert("This is a client only, static, test execution. The login will be forwarded regardless of the form validity."),setTimeout(()=>(0,o.jc)(e,t,!0),3e3)},children:"Avan\xe7ar"})})]})]})}[r,l,o,c]=u.then?(await u)():u,a()}catch(e){a(e)}})},2734:(e,t,n)=>{n.a(e,async(e,a)=>{try{n.d(t,{Z:()=>d});var r=n(9641),l=n(6960),o=n(6689),s=n(4035),i=n(997),c=e([l,s]);function d(e){let{setContact:t,shouldDisplayContact:n=!0}=e,a=(0,o.useRef)(null),c=(0,o.useRef)(null);return(0,o.useEffect)(()=>{a.current instanceof HTMLDialogElement?(a.current.showModal(),(0,s.Ej)([...a.current.querySelectorAll("*"),a.current])):(0,r.MS)(a.current,"Dialog for contact request",(0,r.Ji)(Error()))},[a]),i.jsx(i.Fragment,{children:n&&(0,i.jsxs)("dialog",{ref:a,className:"modal-content-fit flexAlItCt flexNoWC",id:"contactDlg",onClick:e=>{(0,l.ki)(e,e.currentTarget).some(e=>!0===e)&&(t(!n),e.currentTarget.closest("dialog")?.close())},children:[(0,i.jsxs)("div",{className:"flexNoW cGap2v widFull mg-3b",children:[i.jsx("h3",{className:"bolded",children:"Formul\xe1rio de Contato"}),i.jsx("button",{className:"btn btn-close",onClick:()=>{t(!n),a.current instanceof HTMLDialogElement&&a.current?.close()}})]}),(0,i.jsxs)("div",{className:"flexNoWC widFull mg-2bv",children:[i.jsx("label",{className:"bolded",htmlFor:"contactOps",children:"Raz\xe3o de contato"}),(0,i.jsxs)("select",{id:"contactOps",className:"form-select",children:[i.jsx("option",{value:"problema",children:"Problemas na Aplica\xe7\xe3o"}),i.jsx("option",{value:"duvida",children:"D\xfavidas sobre o Sistema"}),i.jsx("option",{value:"outro",children:"Outros"})]})]}),(0,i.jsxs)("div",{className:"flexNoWC widFull mg-2bv",children:[i.jsx("label",{className:"bolded",htmlFor:"contactObs",children:"Detalhes"}),i.jsx("textarea",{id:"contactObs",className:"form-control minText",minLength:2})]}),i.jsx("button",{type:"button",id:"submitContactBtn",className:"btn btn-info widHalf bolded mg-1t",ref:c,onClick:e=>{(0,s.G$)(e,e.currentTarget.closest("dialog")).then(e=>e[0]&&t(!n))},children:"Enviar"})]})})}[l,s]=c.then?(await c)():c,a()}catch(e){a(e)}})},6168:(e,t,n)=>{n.a(e,async(e,a)=>{try{n.d(t,{Z:()=>v});var r=n(6812),l=n(6237),o=n(9641),s=n(4035),i=n(6689),c=n(1163),d=n(2734),u=n(2434),m=n(9137),h=n(4402),p=n(1664),g=n.n(p),x=n(997),f=e([r,l,s,d,h]);function v(e){let{user:t,setDropdown:n,setPropDlg:a,setContact:p,setUserDlg:f,shouldShowDropdown:v,shouldDisplayPropDlg:b,shouldDisplayContact:j,shouldDisplayUserDlg:w,router:E}=e,C=(0,i.useRef)(null),N=(0,c.useRouter)();return(0,i.useEffect)(()=>{C.current instanceof HTMLDialogElement?(C.current.showModal(),(0,s.Ej)([...C.current.querySelectorAll("*"),C.current])):(0,o.MS)(C.current,"Dialog for user panel",(0,o.Ji)(Error()))},[C]),x.jsx(r.ErrorBoundary,{FallbackComponent:()=>x.jsx(m.Z,{message:"Erro carregando janela modal"}),children:x.jsx("dialog",{className:"bdPo noInvert modal-content-fit forceInvert",ref:C,children:(0,x.jsxs)(r.ErrorBoundary,{FallbackComponent:()=>x.jsx(u.Z,{renderError:Error("Erro carregando a janela modal!"),onClick:()=>{C.current?.close(),f(!w),n(!v)}}),children:[x.jsx("button",{className:"btn btn-close htMax0-1r widFull",onClick:()=>{C.current?.close(),f(!w),n(!v)}}),x.jsx("hr",{className:"noInvert"}),(0,x.jsxs)("dl",{className:"mg-0b",children:[x.jsx("dt",{children:"Classe:"}),x.jsx("dd",{id:"classLoginDlg","data-title":"Classe de Usu\xe1rio ativo",children:`${t.userClass.slice(0,1).toUpperCase()}${t.userClass.slice(1)}
    `}),x.jsx("dt",{children:"\xc1rea:"}),x.jsx("dd",{children:`${t.userArea.slice(0,1).toUpperCase()}${t.userArea.slice(1)}`}),x.jsx("dt",{children:"E-mail:"}),x.jsx("dd",{children:`${t.userEmail}`}),x.jsx("dt",{children:"Telefone:"}),x.jsx("dd",{children:`${t.userTel}`})]}),(0,x.jsxs)("div",{id:"alterUserPropDivDlg",className:"flexJSt cGap1v mg-1-3b",children:[x.jsx("span",{className:"bolded mg-04t",children:"Altera\xe7\xe3o"}),x.jsx("button",{type:"button",className:"transparent-el-bg",id:"alterUserPropBtnDlg",onClick:()=>{a(!b)},children:(0,x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-gear widMax-5r htMax0-3r",viewBox:"0 0 16 16",children:[x.jsx("path",{d:"M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"}),x.jsx("path",{d:"M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"})]})}),b&&x.jsx(h.Z,{setPropDlg:a,shouldDisplayPropDlg:b})]}),(0,x.jsxs)("div",{id:"logoutDivDlg",className:"flexJSt cGap1v noInvert",children:[x.jsx("span",{className:"bolded mg-04t noInvert",children:"Logout"}),(0,x.jsxs)("button",{type:"button",className:"transparent-el-bg noInvert",id:"logoutBtnDlg",style:{position:"relative"},children:[x.jsx(g(),{id:"logoutAnchorDlg",target:"_self",rel:"nofollow",href:`${l.basePath||location.href.replace(location.pathname,"")}/login`,style:{zIndex:"10",position:"absolute",color:"transparent"},onClick:()=>{E?E.push("/login"):N.push("/login")},children:"LOGIN"}),(0,x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-door-open widMax-5r",viewBox:"0 0 16 16",children:[x.jsx("path",{d:"M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"}),x.jsx("path",{d:"M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z"})]})]})]}),(0,x.jsxs)("div",{id:"logoutDivDlg",className:"flexJSt cGap1v mg-1t noInvert",children:[x.jsx("span",{className:"bolded noInvert",children:"Contato"}),x.jsx("button",{type:"button",className:"transparent-el-bg noInvert",id:"contactBtnDlg",onClick:()=>{p(!j)},children:(0,x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-info-circle htMax0-1r",viewBox:"0 0 16 16",children:[x.jsx("path",{d:"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"}),x.jsx("path",{d:"m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"})]})})]}),j&&x.jsx(d.Z,{setContact:()=>{p(!j)},shouldDisplayContact:j})]})})})}[r,l,s,d,h]=f.then?(await f)():f,a()}catch(e){a(e)}})},6922:(e,t,n)=>{n.a(e,async(e,a)=>{try{n.d(t,{Z:()=>p});var r=n(9641),l=n(4035),o=n(6689),s=n(2734),i=n(6168),c=n(4402),d=n(1664),u=n.n(d),m=n(997),h=e([l,s,i,c]);function p(e){let{user:t,router:n,setDropdown:a,shouldShowDropdown:d=!1}=e,h=(0,o.useRef)(null),{0:p,1:g}=(0,o.useState)(!1),{0:x,1:f}=(0,o.useState)(!1),{0:v,1:b}=(0,o.useState)(!1);return(0,o.useEffect)(()=>{h.current instanceof HTMLElement?(0,l.Ej)([...h.current.querySelectorAll("*"),h.current]):(0,r.MS)(h.current,"Popover for user panel",(0,r.Ji)(Error()))},[h]),(0,m.jsxs)("div",{className:"po posAb lowPo userPo",ref:h,children:[(0,m.jsxs)("div",{className:"hPo noInvert",children:[m.jsx("div",{id:"logoutDiv",className:"flexJSt cGap1v mg-05b noInvert",children:m.jsx("button",{type:"button",className:"transparent-el-bg noInvert",id:"contactBtn",onClick:()=>{b(!v)},children:(0,m.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-window-stack htMax0-1r",viewBox:"0 0 16 16",children:[m.jsx("path",{d:"M4.5 6a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M6 6a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"}),m.jsx("path",{d:"M12 1a2 2 0 0 1 2 2 2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2 2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zM2 12V5a2 2 0 0 1 2-2h9a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1m1-4v5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8zm12-1V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2z"})]})})}),m.jsx("h3",{className:"hPo noInvert d-ibl brd-nulled brd-b-no pd-no pd0",children:"Informa\xe7\xf5es de Usu\xe1rio"})]}),(0,m.jsxs)("div",{className:"bdPo noInvert",children:[(0,m.jsxs)("dl",{className:"mg-0b",children:[m.jsx("dt",{children:"Classe:"}),m.jsx("dd",{id:"classLogin","data-title":"Classe de Usu\xe1rio ativo",children:`${t.userClass.slice(0,1).toUpperCase()}${t.userClass.slice(1)}
          `}),m.jsx("dt",{children:"\xc1rea:"}),m.jsx("dd",{children:`${t.userArea.slice(0,1).toUpperCase()}${t.userArea.slice(1)}`}),m.jsx("dt",{children:"E-mail:"}),m.jsx("dd",{children:`${t.userEmail}`}),m.jsx("dt",{children:"Telefone:"}),m.jsx("dd",{children:`${t.userTel}`})]}),(0,m.jsxs)("div",{id:"alterUserPropDiv",className:"flexJSt cGap1v mg-1-3b",children:[m.jsx("span",{className:"bolded mg-04t",children:"Altera\xe7\xe3o"}),m.jsx("button",{type:"button",className:"transparent-el-bg",id:"alterUserPropBtn",onClick:()=>{f(!x)},children:(0,m.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-gear widMax-5r htMax0-3r",viewBox:"0 0 16 16",children:[m.jsx("path",{d:"M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"}),m.jsx("path",{d:"M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"})]})}),x&&m.jsx(c.Z,{setPropDlg:f,shouldDisplayPropDlg:x})]}),(0,m.jsxs)("div",{id:"logoutDiv",className:"flexJSt cGap1v noInvert",children:[m.jsx("span",{className:"bolded mg-04t noInvert",children:"Logout"}),(0,m.jsxs)("button",{type:"button",className:"transparent-el-bg noInvert",id:"logoutBtn",style:{position:"relative"},children:[m.jsx(u(),{id:"logoutAnchor",target:"_self",rel:"nofollow",style:{zIndex:"10",position:"absolute",color:"transparent"},href:`${location.href.replace(location.pathname,"")}/login`,onClick:()=>{n.push("/login")},children:"LOGIN"}),(0,m.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-door-open widMax-5r",viewBox:"0 0 16 16",children:[m.jsx("path",{d:"M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"}),m.jsx("path",{d:"M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z"})]})]})]}),(0,m.jsxs)("div",{id:"logoutDiv",className:"flexJSt cGap1v mg-1t noInvert",children:[m.jsx("span",{className:"bolded noInvert",children:"Contato"}),m.jsx("button",{type:"button",className:"transparent-el-bg noInvert",id:"contactBtn",onClick:()=>{g(!p)},children:(0,m.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-info-circle htMax0-1r",viewBox:"0 0 16 16",children:[m.jsx("path",{d:"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"}),m.jsx("path",{d:"m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"})]})})]})]}),p&&m.jsx(s.Z,{setContact:g,shouldDisplayContact:p}),v&&m.jsx(i.Z,{user:t,setDropdown:a,setPropDlg:f,setContact:g,setUserDlg:b,shouldShowDropdown:d,shouldDisplayContact:p,shouldDisplayPropDlg:x,shouldDisplayUserDlg:v,callLogout:()=>{},router:n})]})}[l,s,i,c]=h.then?(await h)():h,a()}catch(e){a(e)}})},7452:(e,t,n)=>{n.a(e,async(e,a)=>{try{n.d(t,{Z:()=>d});var r=n(9641),l=n(4035),o=n(6689),s=n(6922),i=n(997),c=e([l,s]);function d(e){let{user:t,router:n}=e,a=(0,o.useRef)(null),{0:c,1:d}=(0,o.useState)(!1);(0,o.useEffect)(()=>{a.current instanceof HTMLElement?(0,l.Ej)([...a.current.querySelectorAll("*"),a.current]):(0,r.MS)(a.current,"JSX for user panel",(0,r.Ji)(Error()))},[a]);let u=/psi/gi.test(t.userArea)?"psi":t.userArea,m="../img/PROS_icon.png";switch(u){case"odontologia":m="../img/pros-od-icon.png";break;case"educa\xe7\xe3o f\xedsica":m="../img/pros_edfis_icon.png";break;case"nutri\xe7\xe3o":m="../img/pros_nut_icon.png";break;case"psi":m="../img/icon-psy.png";break;default:m="../img/PROS_icon.png"}return(0,i.jsxs)("span",{className:"posRl flexNoW flexNoW900Q cGap0-5v rGap1v900Q contFitW noInvert",ref:a,children:[i.jsx("output",{id:"nameLogin","data-title":"Usu\xe1rio ativo",children:`${t.userName}`}),i.jsx("span",{id:"contProfileImg",className:"profileIcon",children:i.jsx("img",{src:m,className:"profileIcon mg-03rb",id:"profileIconImg","data-container":"body","data-toggle":"popover",title:"Informa\xe7\xf5es de Usu\xe1rio","data-placement":"bottom",onClick:()=>{d(!c)},alt:"User img"})}),c&&i.jsx(s.Z,{user:t,setDropdown:d,shouldShowDropdown:c,router:n})]})}[l,s]=c.then?(await c)():c,a()}catch(e){a(e)}})},4402:(e,t,n)=>{n.a(e,async(e,a)=>{try{n.d(t,{Z:()=>h});var r=n(6812),l=n(6960),o=n(6689),s=n(4035),i=n(9137),c=n(3849),d=n(9641),u=n(997),m=e([r,l,s,c]);function h(e){let{setPropDlg:t,shouldDisplayPropDlg:n=!0}=e,a=(0,o.useRef)(null),m=(0,o.useRef)(null),h=(0,o.useRef)(null),p=(0,o.useRef)(null),{1:g}=(0,o.useState)("userName"),x=e=>{if(h.current||(h.current=document.getElementById("userPropsNewValue")),p.current instanceof HTMLSelectElement&&(h.current instanceof HTMLInputElement||h.current instanceof HTMLSelectElement)){g(e),h.current.value="";let t=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"text",t=!(arguments.length>1)||void 0===arguments[1]||arguments[1],n=!(arguments.length>2)||void 0===arguments[2]||arguments[2],a=document.createElement("input");return a.classList.add("form-control"),Object.assign(a,{id:"userPropsNewValue",type:e}),t&&(a.placeholder="Insira aqui o novo valor"),n&&(a.classList.add("minText"),a.minLength=2),h.current.parentElement.replaceChild(a,h.current),h.current=a,a},n=()=>{let e=document.createElement("select");return e.classList.add("form-select"),e.id="userPropsNewValue",e.style.maxWidth=getComputedStyle(h.current).width,h.current.parentElement.replaceChild(e,h.current),h.current=e,e};switch(p.current.value){case"userName":let a=t();a.autocomplete="given-name",a.autocapitalize="true",a.addEventListener("input",()=>{(0,c.SU)(a)});break;case"userClass":let r=n(),l=document.createElement("option");l.value="coord",l.textContent="Coordenador";let o=document.createElement("option");o.value="profExt",o.textContent="Membro Externo";let s=document.createElement("option");s.value="profInt",s.textContent="Membro Interno";let i=document.createElement("option");i.value="stud",i.textContent="Extensionista / Estudante",r.appendChild(l),r.appendChild(o),r.appendChild(s),r.appendChild(i);break;case"userArea":let d=n(),u=document.createElement("option");u.value="edFis",u.textContent="Educa\xe7\xe3o F\xedsica";let m=document.createElement("option");m.value="nutr",m.textContent="Nutri\xe7\xe3o";let x=document.createElement("option");x.value="odonto",x.textContent="Odontologia",d.appendChild(u),d.appendChild(m),d.appendChild(x);break;case"userEmail":let f=t("email");f.autocomplete="email",f.addEventListener("input",()=>{(0,c.Cb)(f)}),f.addEventListener("click",()=>{(0,c.Cb)(f)});break;case"userTel":let v=t("tel");v.autocomplete="tel",v.addEventListener("input",()=>{(0,c.Mr)(v)});break;default:t()}}(0,d.IB)((0,d.Ji)(Error()),"Entry elements for changing type of user property input",p.current,h.current)};return(0,o.useEffect)(()=>{if(a.current instanceof HTMLDialogElement){a.current.showModal(),(0,s.Ej)([...a.current.querySelectorAll("*"),a.current]);let e=document.getElementById("userPropsNewValue");e?.addEventListener("input",()=>{c.SU(e)})}else(0,d.MS)(a.current,"Dialog for userProps request",(0,d.Ji)(Error()))},[a]),(0,o.useEffect)(()=>{},[h,a]),u.jsx(r.ErrorBoundary,{FallbackComponent:()=>u.jsx(i.Z,{message:"Erro carregando modal de altera\xe7\xe3o de dados de usu\xe1rio!"}),children:n&&(0,u.jsxs)("dialog",{ref:a,className:"modal-content-fit flexAlItCt flexNoWC",id:"alterUsePropDlg",onClick:e=>{(0,l.ki)(e,e.currentTarget).some(e=>!0===e)&&(t(!n),e.currentTarget.closest("dialog")?.close())},children:[(0,u.jsxs)("section",{className:"flexNoW cGap2v widFull mg-3b",children:[u.jsx("h3",{className:"bolded",children:"Formul\xe1rio de Altera\xe7\xe3o"}),u.jsx("button",{className:"btn btn-close",onClick:()=>{t(!n),a.current instanceof HTMLDialogElement&&a.current?.close()}})]}),(0,u.jsxs)("fieldset",{className:"flexNoWC widFull mg-2bv",children:[u.jsx("label",{className:"bolded",htmlFor:"userPropsOps",children:"Op\xe7\xf5es de Altera\xe7\xe3o:"}),(0,u.jsxs)("select",{id:"userPropsOps",className:"form-select",onChange:()=>x(h.current.value),ref:p,children:[u.jsx("option",{value:"userName",children:"Nome"}),u.jsx("option",{value:"userClass",children:"Classe"}),u.jsx("option",{value:"userArea",children:"\xc1rea"}),u.jsx("option",{value:"userEmail",children:"E-mail"}),u.jsx("option",{value:"userTel",children:"Telefone"})]})]}),(0,u.jsxs)("fieldset",{className:"flexNoWC widFull mg-2bv",children:[u.jsx("label",{className:"bolded",htmlFor:"userPropsNewValue",children:"Novo valor:"}),u.jsx("input",{type:"text",id:"userPropsNewValue",className:"form-control minText",placeholder:"Insira aqui o novo valor",autoComplete:"given-name",autoCapitalize:"true",minLength:2,ref:h})]}),(0,u.jsxs)("fieldset",{className:"flexNoWC widFull mg-2bv",children:[u.jsx("label",{className:"bolded",htmlFor:"userPropJust",children:"Raz\xe3o:"}),u.jsx("input",{type:"text",id:"userPropJust",className:"form-control minText",minLength:2,placeholder:"Insira aqui a justificativa"})]}),u.jsx("button",{type:"button",id:"submitNewPropBtn",className:"btn btn-info widHalf bolded mg-1t",ref:m,onClick:e=>{(0,s.G$)(e,e.currentTarget.closest("dialog")).then(e=>e[0]&&t(!n))},children:"Enviar"})]})})}[r,l,s,c]=m.then?(await m)():m,a()}catch(e){a(e)}})},8771:(e,t,n)=>{n.a(e,async(e,a)=>{try{n.d(t,{Rm:()=>c,dH:()=>d,dg:()=>i});var r=n(3849),l=n(6960),o=n(9641),s=e([r,l]);function i(e){if(e instanceof HTMLElement){let t=e.querySelector(".bi"),n=document.getElementById("pw");n instanceof HTMLInputElement?t?.classList.contains("bi-eye-fill")?(n.type="text",e.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
        </svg>
        `):t?.classList.contains("bi-eye-slash-fill")?(n.type="password",e.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
        </svg>
        `):console.error("innerIcon class not validated"):(0,o.Nv)(n,"pwInp in callbackShowPw()",(0,o.Ji)(Error()))}else(0,o.MS)(e,"spanShowPw in callbackShowPw()",(0,o.Ji)(Error()))}[r,l]=s.then?(await s)():s;let u={shouldEvaluateTime:!1,shouldEvaluateClient:!1,clientAttempt:0,lastClickTime:0,lastClickX:0,lastClickY:0};function c(e){let t=!0;try{if(!("movementX"in e))throw Error("Invalid instance for Event");if(!e.isTrusted)return["Evento de mouse n\xe3o confi\xe1vel. Por favor aguarde para tentar novamente.",t];if(!(0===e.movementX&&0===e.movementY))return["Movimento de mouse n\xe3o confi\xe1vel. Por favor aguarde para tentar novamente.",t];if(u.shouldEvaluateTime){let e=new Date().getTime();if(e-u.lastClickTime<100)return["Mouse interval tracked as suspicious. Please retry later.",t];u.lastClickTime=e}if(u.shouldEvaluateTime=!0,u.shouldEvaluateClient&&u.clientAttempt>1&&e.clientX===u.lastClickX&&e.clientY===u.lastClickY)return["Deslocamento de mouse n\xe3o confi\xe1vel. Por favor aguarde para tentar novamente.",t];return u.shouldEvaluateClient=!0,u.clientAttempt+=1,t=!1,["Attempt validated.",t]}catch(e){return console.error(`Error executing evaluateClickMovements:${e.message}`),["N\xe3o foi poss\xedvel validar a solicita\xe7\xe3o. Por favor aguarde para tentar novamente.",t]}}let m={attempts:0,timeAcc:0};function d(){try{if(m.attempts+=1,m.attempts>0){if(m.timeAcc+=new Date().getTime(),m.attempts>4){let e=document.getElementById("submitBtn")||document.querySelector('a[href*="/base"]');(e instanceof HTMLButtonElement||e instanceof HTMLInputElement)&&(e.disabled=!0),alert("Tentativas excedidas para o intervalo de tempo. Aguarde para tentat novamente."),setTimeout(()=>{let e=document.getElementById("submitBtn")||document.querySelector('a[href*="/base"]');(e instanceof HTMLButtonElement||e instanceof HTMLInputElement)&&(e.disabled=!1)},3e3)}setTimeout(()=>{m.attempts=0},1e4)}let e=document.getElementById("pw"),t=document.getElementById("user");if(!(t instanceof HTMLInputElement))throw(0,o.Nv)(t,"userInp in callbackSubmitBtn()",(0,o.Ji)(Error()));if(!(e instanceof HTMLInputElement))throw(0,o.Nv)(e,"pwInp in callbackSubmitBtn()",(0,o.Ji)(Error()));if(t.value.length<5||t.value.length>30||/\s/g.test(t.value)||!t.checkValidity()){t.placeholder="Usu\xe1rio inv\xe1lida",(0,l.Ob)(t);let e="";t.value.length<5&&(e+="O usu\xe1rio deve ter ao m\xednimo 5 caracteres!\n"),t.value.length>30&&(e+="O usu\xe1rio deve ter no m\xe1ximo 30 caracteres!\n"),/\s/g.test(t.value)&&(e+="O usu\xe1rio n\xe3o pode ter espa\xe7os!\n");let n=t.validity;return(n.badInput||n.typeMismatch)&&(e+="Tipo de entrada indevida\n"),n.patternMismatch&&(e+="Padr\xe3o solicitado n\xe3o cumprido\n"),(n.tooShort||n.valueMissing)&&(e+="Entrada com falta de caracteres\n"),n.tooLong&&(t.placeholder+="Entrada com excesso de caracteres\n"),t.setCustomValidity(e),(0,l.ak)(t.id??"",e),setTimeout(()=>t.placeholder="Nome de Usu\xe1rio",5e3),!1}e.setCustomValidity(""),(0,r.aX)(e),(0,l.Ob)(e.parentElement);let n=e.value;if(n.length<8||n.length>30||!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?=.{8,})(?:(?!.*\s).)*(?!.*(.).*\1{4,}).*$/.test(n)||!e.checkValidity()){e.placeholder="Senha inv\xe1lida";let a="";setTimeout(()=>{e.placeholder="Senha"},5e3),n.length<8&&(a+="A senha deve conter ao menos 8 caracteres\n"),n.length>30&&(a+="A senha deve conter no m\xe1ximo 8 caracteres\n"),/\s/.test(n)&&(a+="Espa\xe7os em branco n\xe3o permitidos\n"),/[a-zA-Z]/.test(n)?(/[A-Z]/g.test(n)||(a+="A senha deve ter ao menos um caractere mai\xfasculo\n"),/[a-z]/g.test(n)||(a+="A senha deve ter ao menos um caractere min\xfasculo\n")):a+="A senha deve conter pelo menos um caractere alfab\xe9tico\n",/[0-9]/g.test(n)||(a+="A senha deve conter pelo menos um n\xfamero\n"),/[^a-zA-Z0-9]/.test(n)||(a+="A senha deve conter ao menos um caractere especial ou simb\xf3lico.");let r=e.validity;return(r.badInput||r.typeMismatch)&&(a+="Tipo de entrada indevida\n"),r.patternMismatch&&(a+="Padr\xe3o solicitado n\xe3o cumprido\n"),(r.tooShort||r.valueMissing)&&(a+="Entrada com falta de caracteres\n"),r.tooLong&&(t.placeholder+="Entrada com excesso de caracteres\n"),e.setCustomValidity(a),(0,l.ak)(e.id??"",a),!1}return!0}catch(e){return console.error(`Error executing callbackSubmitBtn:
${e.message}`),!1}}a()}catch(e){a(e)}})},6237:(e,t,n)=>{n.a(e,async(e,a)=>{try{n.r(t),n.d(t,{basePath:()=>h,default:()=>m});var r=n(979),l=n(6812),o=n(7849),s=n(9641),i=n(6689),c=n(2200),d=n(997),u=e([r,l,c]);[r,l,c]=u.then?(await u)():u;let h={path:"",ph:"undefined"};function m(){let e=(0,i.useContext)(r.AppRootContext);return(0,i.useEffect)(()=>{try{let t=document.getElementById("__next");if(!(t instanceof HTMLElement))throw(0,s.MS)(t,"__next",(0,s.Ji)(Error()));if(e.roots.nextRoot)return;if(e.roots.nextRoot||(e.roots.nextRoot=(0,o.createRoot)(t)),!("_internalRoot"in e.roots.nextRoot))throw Error("nextRoot not validated as a Root")}catch(e){console.error(`Error executing procedure for :${e.message}`)}},[]),d.jsx(l.ErrorBoundary,{FallbackComponent:()=>d.jsx("div",{children:"Erro!"}),children:d.jsx(c.default,{})})}a()}catch(e){a(e)}})},2200:(e,t,n)=>{n.a(e,async(e,a)=>{try{n.r(t),n.d(t,{default:()=>d});var r=n(6812),l=n(6880),o=n(3899),s=n(9137),i=n(997),c=e([r,l,o]);function d(){return(0,i.jsxs)(r.ErrorBoundary,{FallbackComponent:()=>i.jsx(r.ErrorBoundary,{FallbackComponent:()=>i.jsx(s.Z,{message:"Error loading Login Page"})}),children:[i.jsx("div",{role:"group",className:"pad1pc",id:"bgDiv",children:i.jsx("main",{children:i.jsx("form",{id:"outerLoginCont",name:"login_form",action:"check_user_validity",encType:"application/x-www-form-urlencoded",method:"post",target:"_self",autoComplete:"on",children:(0,i.jsxs)("div",{role:"group",id:"loginCont",children:[i.jsx("section",{id:"logoCont",children:i.jsx("img",{className:"fade-in-element",id:"logo",src:"./img/PROS_Saude_Modelo1-Final.png",alt:"logo"})}),(0,i.jsxs)("section",{id:"headerCont",children:[i.jsx("div",{role:"group",id:"titleCont1",children:i.jsx("h1",{id:"titleText",children:i.jsx("span",{role:"group",className:"fade-in-element",id:"spanTitle",children:"Fa\xe7a o Login"})})}),i.jsx("div",{role:"group",id:"titleCont2",children:i.jsx("h2",{id:"subtitleText",children:i.jsx("span",{role:"group",className:"fade-in-late-element",id:"spanSubtitle",children:"Informe seus dados de usu\xe1rio"})})})]}),i.jsx(l.Z,{})]})})})}),i.jsx(o.Z,{routeCase:"login"})]})}[r,l,o]=c.then?(await c)():c,a()}catch(e){a(e)}})}};