"use strict";exports.id=452,exports.ids=[452],exports.modules={2434:(e,t,l)=>{l.d(t,{Z:()=>a});var r=l(6689),n=l(997);function a(e){let{renderError:t,onClick:l}=e,a=(0,r.useRef)(null);return(0,n.jsxs)("article",{role:"alert",id:"errorDlgDiv",ref:a,children:[n.jsx("h2",{className:"mg-2bv widHalf",children:n.jsx("strong",{children:"Oops, algo deu errado! \uD83D\uDE28"})}),n.jsx("h4",{children:t.message}),n.jsx("small",{children:"Feche a janela e tente novamente ou recarregue a p\xe1gina!"}),n.jsx("br",{}),n.jsx("button",{className:"btn btn-warning bolded widFull mg-1t",id:"retryRenderBtn",onClick:l,children:"Fechar"})]})}},6880:(e,t,l)=>{l.a(e,async(e,r)=>{try{l.d(t,{Z:()=>h});var n=l(6689),a=l(6960),s=l(9641),o=l(8771),i=l(1163),c=l(6237),d=l(997),u=e([c]);function h(){let e=(0,i.useRouter)(),t=(0,n.useRef)(null);return(0,n.useEffect)(()=>{try{if(!(t.current instanceof HTMLAnchorElement))throw(0,s.MS)(t.current,"Anchor Reference in Login Page",(0,s.Ji)(Error()));/undefined/gi.test(t.current.href)&&!/http:/gi.test(t.current.href)&&(t.current.href=t.current.href.replace("undefined",`${location.href.replace(location.pathname,"")}`))}catch(e){console.error(`Error executing procedure for adjusting anchor href:
${e.message}`)}let e=document.querySelector("form"),l=Array.from(document.querySelectorAll("input"));e instanceof HTMLFormElement&&l.length>0?(0,a.vC)(e,l):(0,s.IB)((0,s.Ji)(Error()),"argument for clearDefInvalidMsg in DOM initialization",e,...l),(0,a.bq)(l,{user:"Nome de Usu\xe1rio",pw:"Senha"})},[]),(0,d.jsxs)("section",{id:"inputCont",children:[d.jsx("div",{role:"group",className:"loginInputCont1",children:d.jsx("div",{role:"group",id:"loginInputCont2",children:d.jsx("input",{className:"form-control fade-in-element userInput",id:"user",type:"text","aria-label":"email ou usu\xe1rio",placeholder:"Nome de Usu\xe1rio",title:"Por favor, preencha este\r campo.",minLength:5,maxLength:30,"data-title":"Usu\xe1rio",required:!0})})}),d.jsx("small",{className:"customValidityWarn",id:"userWarn",role:"textbox"}),d.jsx("div",{role:"group",className:"loginInputCont1",children:d.jsx("div",{role:"group",className:"loginInputCont2",children:(0,d.jsxs)("fieldset",{className:"form-control flexDiv fade-in-element",id:"loginInputCont3",children:[d.jsx("input",{className:"fade-in-element form-control userInput",id:"pw",type:"password",autoComplete:"password","aria-label":"senha",placeholder:"Senha",pattern:"^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$",minLength:1,maxLength:30,required:!0}),d.jsx("button",{type:"button",id:"spanShowPw",className:"halfL fade-in-late-element",onClick:e=>(0,o.dg)(e.currentTarget),children:(0,d.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-eye-fill",viewBox:"0 0 16 16",children:[d.jsx("path",{d:"M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"}),d.jsx("path",{d:"M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"})]})})]})})}),d.jsx("small",{className:"customValidityWarn",id:"pwWarn",role:"textbox"}),(0,d.jsxs)("nav",{id:"loginBtnCont",children:[d.jsx("a",{id:"newAccA",className:"fade-in-late-element",href:"#",target:"_blank",children:"Criar Conta"}),d.jsx("button",{type:"submit",className:"btn btn-primary fade-in-element",id:"submitBtn",children:d.jsx("a",{ref:t,id:"submitLogin",target:"_self",href:`${c.basePath.path}/base`,style:{color:"#ffff"},onClick:t=>{e.push("/base");let l=document.getElementById("outerLoginCont");(0,o.dH)(t.currentTarget.closest("button"),new SubmitEvent("submit",{submitter:l,bubbles:!0,cancelable:!0,composed:!0}))},children:"Avan\xe7ar"})})]})]})}c=(u.then?(await u)():u)[0],r()}catch(e){r(e)}})},2734:(e,t,l)=>{l.d(t,{Z:()=>i});var r=l(6960),n=l(9641),a=l(4035),s=l(6689),o=l(997);function i(e){let{setContact:t,shouldDisplayContact:l=!0}=e,i=(0,s.useRef)(null),c=(0,s.useRef)(null);return(0,s.useEffect)(()=>{i.current instanceof HTMLDialogElement?(i.current.showModal(),(0,a.Ej)([...i.current.querySelectorAll("*"),i.current])):(0,n.MS)(i.current,"Dialog for contact request",(0,n.Ji)(Error()))},[i]),o.jsx(o.Fragment,{children:l&&(0,o.jsxs)("dialog",{ref:i,className:"modal-content-fit flexAlItCt flexNoWC",id:"contactDlg",onClick:e=>{(0,r.ki)(e,e.currentTarget).some(e=>!0===e)&&(t(!l),e.currentTarget.closest("dialog")?.close())},children:[(0,o.jsxs)("div",{className:"flexNoW cGap2v widFull mg-3b",children:[o.jsx("h3",{className:"bolded",children:"Formul\xe1rio de Contato"}),o.jsx("button",{className:"btn btn-close",onClick:()=>{t(!l),i.current instanceof HTMLDialogElement&&i.current?.close()}})]}),(0,o.jsxs)("div",{className:"flexNoWC widFull mg-2bv",children:[o.jsx("label",{className:"bolded",htmlFor:"contactOps",children:"Raz\xe3o de contato"}),(0,o.jsxs)("select",{id:"contactOps",className:"form-select",children:[o.jsx("option",{value:"problema",children:"Problemas na Aplica\xe7\xe3o"}),o.jsx("option",{value:"duvida",children:"D\xfavidas sobre o Sistema"}),o.jsx("option",{value:"outro",children:"Outros"})]})]}),(0,o.jsxs)("div",{className:"flexNoWC widFull mg-2bv",children:[o.jsx("label",{className:"bolded",htmlFor:"contactObs",children:"Detalhes"}),o.jsx("textarea",{id:"contactObs",className:"form-control minText",minLength:2})]}),o.jsx("button",{type:"button",id:"submitContactBtn",className:"btn btn-info widHalf bolded mg-1t",ref:c,onClick:e=>{(0,a.G$)(e.currentTarget,e.currentTarget.closest("dialog")).then(e=>e[0]&&t(!l))},children:"Enviar"})]})})}},6168:(e,t,l)=>{l.a(e,async(e,r)=>{try{l.d(t,{Z:()=>g});var n=l(9641),a=l(4035),s=l(6689),o=l(6812),i=l(2434),c=l(4402),d=l(2734),u=l(9137),h=l(6237),m=l(1163),p=l(997),x=e([o,c,h]);function g(e){let{user:t,setDropdown:l,setPropDlg:r,setContact:x,setUserDlg:g,shouldShowDropdown:f,shouldDisplayPropDlg:v,shouldDisplayContact:b,shouldDisplayUserDlg:j,router:w}=e,C=(0,s.useRef)(null),N=(0,m.useRouter)();return(0,s.useEffect)(()=>{C.current instanceof HTMLDialogElement?(C.current.showModal(),(0,a.Ej)([...C.current.querySelectorAll("*"),C.current])):(0,n.MS)(C.current,"Dialog for user panel",(0,n.Ji)(Error()))},[C]),p.jsx(o.ErrorBoundary,{FallbackComponent:()=>p.jsx(u.Z,{message:"Erro carregando janela modal"}),children:p.jsx("dialog",{className:"bdPo noInvert modal-content-fit forceInvert",ref:C,children:(0,p.jsxs)(o.ErrorBoundary,{FallbackComponent:()=>p.jsx(i.Z,{renderError:Error("Erro carregando a janela modal!"),onClick:()=>{C.current?.close(),g(!j),l(!f)}}),children:[p.jsx("button",{className:"btn btn-close htMax0-1r widFull",onClick:()=>{C.current?.close(),g(!j),l(!f)}}),p.jsx("hr",{className:"noInvert"}),(0,p.jsxs)("dl",{className:"mg-0b",children:[p.jsx("dt",{children:"Classe:"}),p.jsx("dd",{id:"classLoginDlg","data-title":"Classe de Usu\xe1rio ativo",children:`${t.userClass.slice(0,1).toUpperCase()}${t.userClass.slice(1)}
    `}),p.jsx("dt",{children:"\xc1rea:"}),p.jsx("dd",{children:`${t.userArea.slice(0,1).toUpperCase()}${t.userArea.slice(1)}`}),p.jsx("dt",{children:"E-mail:"}),p.jsx("dd",{children:`${t.userEmail}`}),p.jsx("dt",{children:"Telefone:"}),p.jsx("dd",{children:`${t.userTel}`})]}),(0,p.jsxs)("div",{id:"alterUserPropDivDlg",className:"flexJSt cGap1v mg-1-3b",children:[p.jsx("span",{className:"bolded mg-04t",children:"Altera\xe7\xe3o"}),p.jsx("button",{type:"button",className:"transparent-el-bg",id:"alterUserPropBtnDlg",onClick:()=>{r(!v)},children:(0,p.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-gear widMax-5r htMax0-3r",viewBox:"0 0 16 16",children:[p.jsx("path",{d:"M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"}),p.jsx("path",{d:"M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"})]})}),v&&p.jsx(c.Z,{setPropDlg:r,shouldDisplayPropDlg:v})]}),(0,p.jsxs)("div",{id:"logoutDivDlg",className:"flexJSt cGap1v noInvert",children:[p.jsx("span",{className:"bolded mg-04t noInvert",children:"Logout"}),(0,p.jsxs)("button",{type:"button",className:"transparent-el-bg noInvert",id:"logoutBtnDlg",style:{position:"relative"},children:[p.jsx("a",{id:"logoutAnchorDlg",target:"_self",href:`${h.basePath||location.href.replace(location.pathname,"")}/login`,style:{zIndex:"10",position:"absolute",color:"transparent"},onClick:()=>{w?w.push("/login"):N.push("/login")},children:"LOGIN"}),(0,p.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-door-open widMax-5r",viewBox:"0 0 16 16",children:[p.jsx("path",{d:"M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"}),p.jsx("path",{d:"M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z"})]})]})]}),(0,p.jsxs)("div",{id:"logoutDivDlg",className:"flexJSt cGap1v mg-1t noInvert",children:[p.jsx("span",{className:"bolded noInvert",children:"Contato"}),p.jsx("button",{type:"button",className:"transparent-el-bg noInvert",id:"contactBtnDlg",onClick:()=>{x(!b)},children:(0,p.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-info-circle htMax0-1r",viewBox:"0 0 16 16",children:[p.jsx("path",{d:"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"}),p.jsx("path",{d:"m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"})]})})]}),b&&p.jsx(d.Z,{setContact:()=>{x(!b)},shouldDisplayContact:b})]})})})}[o,c,h]=x.then?(await x)():x,r()}catch(e){r(e)}})},6922:(e,t,l)=>{l.a(e,async(e,r)=>{try{l.d(t,{Z:()=>h});var n=l(9641),a=l(4035),s=l(6689),o=l(6168),i=l(2734),c=l(4402),d=l(997),u=e([o,c]);function h(e){let{user:t,router:l,setDropdown:r,shouldShowDropdown:u=!1}=e,h=(0,s.useRef)(null),{0:m,1:p}=(0,s.useState)(!1),{0:x,1:g}=(0,s.useState)(!1),{0:f,1:v}=(0,s.useState)(!1);return(0,s.useEffect)(()=>{h.current instanceof HTMLElement?(0,a.Ej)([...h.current.querySelectorAll("*"),h.current]):(0,n.MS)(h.current,"Popover for user panel",(0,n.Ji)(Error()))},[h]),(0,d.jsxs)("div",{className:"po posAb lowPo userPo",ref:h,children:[(0,d.jsxs)("div",{className:"hPo noInvert",children:[d.jsx("div",{id:"logoutDiv",className:"flexJSt cGap1v mg-05b noInvert",children:d.jsx("button",{type:"button",className:"transparent-el-bg noInvert",id:"contactBtn",onClick:()=>{v(!f)},children:(0,d.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-window-stack htMax0-1r",viewBox:"0 0 16 16",children:[d.jsx("path",{d:"M4.5 6a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M6 6a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"}),d.jsx("path",{d:"M12 1a2 2 0 0 1 2 2 2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2 2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zM2 12V5a2 2 0 0 1 2-2h9a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1m1-4v5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8zm12-1V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2z"})]})})}),d.jsx("h3",{className:"hPo noInvert d-ibl brd-nulled brd-b-no pd-no pd0",children:"Informa\xe7\xf5es de Usu\xe1rio"})]}),(0,d.jsxs)("div",{className:"bdPo noInvert",children:[(0,d.jsxs)("dl",{className:"mg-0b",children:[d.jsx("dt",{children:"Classe:"}),d.jsx("dd",{id:"classLogin","data-title":"Classe de Usu\xe1rio ativo",children:`${t.userClass.slice(0,1).toUpperCase()}${t.userClass.slice(1)}
          `}),d.jsx("dt",{children:"\xc1rea:"}),d.jsx("dd",{children:`${t.userArea.slice(0,1).toUpperCase()}${t.userArea.slice(1)}`}),d.jsx("dt",{children:"E-mail:"}),d.jsx("dd",{children:`${t.userEmail}`}),d.jsx("dt",{children:"Telefone:"}),d.jsx("dd",{children:`${t.userTel}`})]}),(0,d.jsxs)("div",{id:"alterUserPropDiv",className:"flexJSt cGap1v mg-1-3b",children:[d.jsx("span",{className:"bolded mg-04t",children:"Altera\xe7\xe3o"}),d.jsx("button",{type:"button",className:"transparent-el-bg",id:"alterUserPropBtn",onClick:()=>{g(!x)},children:(0,d.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-gear widMax-5r htMax0-3r",viewBox:"0 0 16 16",children:[d.jsx("path",{d:"M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"}),d.jsx("path",{d:"M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"})]})}),x&&d.jsx(c.Z,{setPropDlg:g,shouldDisplayPropDlg:x})]}),(0,d.jsxs)("div",{id:"logoutDiv",className:"flexJSt cGap1v noInvert",children:[d.jsx("span",{className:"bolded mg-04t noInvert",children:"Logout"}),(0,d.jsxs)("button",{type:"button",className:"transparent-el-bg noInvert",id:"logoutBtn",style:{position:"relative"},children:[d.jsx("a",{id:"logoutAnchor",target:"_self",style:{zIndex:"10",position:"absolute",color:"transparent"},href:`${location.href.replace(location.pathname,"")}/login`,onClick:()=>{console.log("clicado"),l.push("/login")},children:"LOGIN"}),(0,d.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-door-open widMax-5r",viewBox:"0 0 16 16",children:[d.jsx("path",{d:"M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"}),d.jsx("path",{d:"M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z"})]})]})]}),(0,d.jsxs)("div",{id:"logoutDiv",className:"flexJSt cGap1v mg-1t noInvert",children:[d.jsx("span",{className:"bolded noInvert",children:"Contato"}),d.jsx("button",{type:"button",className:"transparent-el-bg noInvert",id:"contactBtn",onClick:()=>{p(!m)},children:(0,d.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-info-circle htMax0-1r",viewBox:"0 0 16 16",children:[d.jsx("path",{d:"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"}),d.jsx("path",{d:"m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"})]})})]})]}),m&&d.jsx(i.Z,{setContact:p,shouldDisplayContact:m}),f&&d.jsx(o.Z,{user:t,setDropdown:r,setPropDlg:g,setContact:p,setUserDlg:v,shouldShowDropdown:u,shouldDisplayContact:m,shouldDisplayPropDlg:x,shouldDisplayUserDlg:f,callLogout:()=>{},router:l})]})}[o,c]=u.then?(await u)():u,r()}catch(e){r(e)}})},7452:(e,t,l)=>{l.a(e,async(e,r)=>{try{l.d(t,{Z:()=>d});var n=l(9641),a=l(4035),s=l(6689),o=l(6922),i=l(997),c=e([o]);function d(e){let{user:t,router:l}=e,r=(0,s.useRef)(null),{0:c,1:d}=(0,s.useState)(!1);(0,s.useEffect)(()=>{r.current instanceof HTMLElement?(0,a.Ej)([...r.current.querySelectorAll("*"),r.current]):(0,n.MS)(r.current,"JSX for user panel",(0,n.Ji)(Error()))},[r]);let u=/psi/gi.test(t.userArea)?"psi":t.userArea,h="../img/PROS_icon.png";switch(u){case"odontologia":h="../img/pros-od-icon.png";break;case"educa\xe7\xe3o f\xedsica":h="../img/pros_edfis_icon.png";break;case"nutri\xe7\xe3o":h="../img/pros_nut_icon.png";break;case"psi":h="../img/icon-psy.png";break;default:h="../img/PROS_icon.png"}return(0,i.jsxs)("span",{className:"posRl flexNoW flexNoW900Q cGap0-5v rGap1v900Q contFitW noInvert",ref:r,children:[i.jsx("output",{id:"nameLogin","data-title":"Usu\xe1rio ativo",children:`${t.userName}`}),i.jsx("span",{id:"contProfileImg",className:"profileIcon",children:i.jsx("img",{src:h,className:"profileIcon mg-03rb",id:"profileIconImg","data-container":"body","data-toggle":"popover",title:"Informa\xe7\xf5es de Usu\xe1rio","data-placement":"bottom",onClick:()=>{d(!c)},alt:"User img"})}),c&&i.jsx(o.Z,{user:t,setDropdown:d,shouldShowDropdown:c,router:l})]})}o=(c.then?(await c)():c)[0],r()}catch(e){r(e)}})},4402:(e,t,l)=>{l.a(e,async(e,r)=>{try{l.d(t,{Z:()=>m});var n=l(3849),a=l(6960),s=l(9641),o=l(4035),i=l(6689),c=l(6812),d=l(9137),u=l(997),h=e([c]);function m(e){let{setPropDlg:t,shouldDisplayPropDlg:l=!0}=e,r=(0,i.useRef)(null),h=(0,i.useRef)(null),m=(0,i.useRef)(null),p=(0,i.useRef)(null),{1:x}=(0,i.useState)("userName"),g=e=>{if(m.current||(m.current=document.getElementById("userPropsNewValue")),p.current instanceof HTMLSelectElement&&(m.current instanceof HTMLInputElement||m.current instanceof HTMLSelectElement)){x(e),m.current.value="";let t=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"text",t=!(arguments.length>1)||void 0===arguments[1]||arguments[1],l=!(arguments.length>2)||void 0===arguments[2]||arguments[2],r=document.createElement("input");return r.classList.add("form-control"),Object.assign(r,{id:"userPropsNewValue",type:e}),t&&(r.placeholder="Insira aqui o novo valor"),l&&(r.classList.add("minText"),r.minLength=2),m.current.parentElement.replaceChild(r,m.current),m.current=r,r},l=()=>{let e=document.createElement("select");return e.classList.add("form-select"),e.id="userPropsNewValue",e.style.maxWidth=getComputedStyle(m.current).width,m.current.parentElement.replaceChild(e,m.current),m.current=e,e};switch(p.current.value){case"userName":let r=t();r.autocomplete="given-name",r.autocapitalize="true",r.addEventListener("input",()=>{(0,n.SU)(r)});break;case"userClass":let a=l(),s=document.createElement("option");s.value="coord",s.textContent="Coordenador";let o=document.createElement("option");o.value="profExt",o.textContent="Membro Externo";let i=document.createElement("option");i.value="profInt",i.textContent="Membro Interno";let c=document.createElement("option");c.value="stud",c.textContent="Extensionista / Estudante",a.appendChild(s),a.appendChild(o),a.appendChild(i),a.appendChild(c);break;case"userArea":let d=l(),u=document.createElement("option");u.value="edFis",u.textContent="Educa\xe7\xe3o F\xedsica";let h=document.createElement("option");h.value="nutr",h.textContent="Nutri\xe7\xe3o";let g=document.createElement("option");g.value="odonto",g.textContent="Odontologia",d.appendChild(u),d.appendChild(h),d.appendChild(g);break;case"userEmail":let f=t("email");f.autocomplete="email",f.addEventListener("input",()=>{(0,n.Cb)(f)}),f.addEventListener("click",()=>{(0,n.Cb)(f)});break;case"userTel":let v=t("tel");v.autocomplete="tel",v.addEventListener("input",()=>{(0,n.Mr)(v)});break;default:t()}}(0,s.IB)((0,s.Ji)(Error()),"Entry elements for changing type of user property input",p.current,m.current)};return(0,i.useEffect)(()=>{if(r.current instanceof HTMLDialogElement){r.current.showModal(),(0,o.Ej)([...r.current.querySelectorAll("*"),r.current]);let e=document.getElementById("userPropsNewValue");e?.addEventListener("input",()=>{n.SU(e)})}else(0,s.MS)(r.current,"Dialog for userProps request",(0,s.Ji)(Error()))},[r]),(0,i.useEffect)(()=>{},[m,r]),u.jsx(c.ErrorBoundary,{FallbackComponent:()=>u.jsx(d.Z,{message:"Erro carregando modal de altera\xe7\xe3o de dados de usu\xe1rio!"}),children:l&&(0,u.jsxs)("dialog",{ref:r,className:"modal-content-fit flexAlItCt flexNoWC",id:"alterUsePropDlg",onClick:e=>{(0,a.ki)(e,e.currentTarget).some(e=>!0===e)&&(t(!l),e.currentTarget.closest("dialog")?.close())},children:[(0,u.jsxs)("section",{className:"flexNoW cGap2v widFull mg-3b",children:[u.jsx("h3",{className:"bolded",children:"Formul\xe1rio de Altera\xe7\xe3o"}),u.jsx("button",{className:"btn btn-close",onClick:()=>{t(!l),r.current instanceof HTMLDialogElement&&r.current?.close()}})]}),(0,u.jsxs)("fieldset",{className:"flexNoWC widFull mg-2bv",children:[u.jsx("label",{className:"bolded",htmlFor:"userPropsOps",children:"Op\xe7\xf5es de Altera\xe7\xe3o:"}),(0,u.jsxs)("select",{id:"userPropsOps",className:"form-select",onChange:()=>g(m.current.value),ref:p,children:[u.jsx("option",{value:"userName",children:"Nome"}),u.jsx("option",{value:"userClass",children:"Classe"}),u.jsx("option",{value:"userArea",children:"\xc1rea"}),u.jsx("option",{value:"userEmail",children:"E-mail"}),u.jsx("option",{value:"userTel",children:"Telefone"})]})]}),(0,u.jsxs)("fieldset",{className:"flexNoWC widFull mg-2bv",children:[u.jsx("label",{className:"bolded",htmlFor:"userPropsNewValue",children:"Novo valor:"}),u.jsx("input",{type:"text",id:"userPropsNewValue",className:"form-control minText",placeholder:"Insira aqui o novo valor",autoComplete:"given-name",autoCapitalize:"true",minLength:2,ref:m})]}),(0,u.jsxs)("fieldset",{className:"flexNoWC widFull mg-2bv",children:[u.jsx("label",{className:"bolded",htmlFor:"userPropJust",children:"Raz\xe3o:"}),u.jsx("input",{type:"text",id:"userPropJust",className:"form-control minText",minLength:2,placeholder:"Insira aqui a justificativa"})]}),u.jsx("button",{type:"button",id:"submitNewPropBtn",className:"btn btn-info widHalf bolded mg-1t",ref:h,onClick:e=>{(0,o.G$)(e.currentTarget,e.currentTarget.closest("dialog")).then(e=>e[0]&&t(!l))},children:"Enviar"})]})})}c=(h.then?(await h)():h)[0],r()}catch(e){r(e)}})},8771:(e,t,l)=>{l.d(t,{dH:()=>o,dg:()=>s});var r=l(3849),n=l(6960),a=l(9641);function s(e){if(e instanceof HTMLElement){let t=e.querySelector(".bi"),l=document.getElementById("pw");l instanceof HTMLInputElement?t?.classList.contains("bi-eye-fill")?(l.type="text",e.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
        </svg>
        `):t?.classList.contains("bi-eye-slash-fill")?(l.type="password",e.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
        </svg>
        `):console.error("innerIcon class not validated"):(0,a.Nv)(l,"pwInp in callbackShowPw()",(0,a.Ji)(Error()))}else(0,a.MS)(e,"spanShowPw in callbackShowPw()",(0,a.Ji)(Error()))}function o(e,t){if(e instanceof HTMLButtonElement){let e=document.getElementById("pw"),l=document.getElementById("user");e instanceof HTMLInputElement?/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(e.value)?e.setCustomValidity(""):(t.preventDefault(),(0,r.aX)(e),(0,n.Ob)(e.parentElement),e.checkValidity()||(e.placeholder="Senha inv\xe1lida",(0,n.ak)(e.id??"","Senha inv\xe1lida")),setTimeout(()=>{e.placeholder="Senha"},5e3)):(0,a.Nv)(e,"pwInp in callbackSubmitBtn()",(0,a.Ji)(Error())),l instanceof HTMLInputElement?l.value.length<5&&(t.preventDefault(),(0,n.Ob)(l),l.setCustomValidity("O usu\xe1rio deve ter ao m\xednimo 5 caracteres"),l.checkValidity()||(l.placeholder="Usu\xe1rio inv\xe1lido",(0,n.ak)(l.id??"","Usu\xe1rio inv\xe1lido")),setTimeout(()=>{l.placeholder="Nome de Usu\xe1rio"},5e3)):(0,a.Nv)(l,"userInp in callbackSubmitBtn()",(0,a.Ji)(Error()))}else(0,a.MS)(e,"submitBtn in callbackSubmitBtn()",(0,a.Ji)(Error()))}},6237:(e,t,l)=>{l.a(e,async(e,r)=>{try{l.r(t),l.d(t,{basePath:()=>m,default:()=>h});var n=l(6812),a=l(2200),s=l(6689),o=l(979),i=l(7849),c=l(9641),d=l(997),u=e([n,a]);[n,a]=u.then?(await u)():u;let m={path:"",ph:"undefined"};function h(){let e=(0,s.useContext)(o.AppRootContext);return(0,s.useEffect)(()=>{try{let t=document.getElementById("__next");if(!(t instanceof HTMLElement))throw(0,c.MS)(t,"__next",(0,c.Ji)(Error()));if(e.roots.nextRoot)return;if(e.roots.nextRoot||(e.roots.nextRoot=(0,i.createRoot)(t)),!("_internalRoot"in e.roots.nextRoot))throw Error("nextRoot not validated as a Root")}catch(e){console.error(`Error executing procedure for :${e.message}`)}},[]),d.jsx(n.ErrorBoundary,{FallbackComponent:()=>d.jsx("div",{children:"Erro!"}),children:d.jsx(a.default,{})})}r()}catch(e){r(e)}})},2200:(e,t,l)=>{l.a(e,async(e,r)=>{try{l.r(t),l.d(t,{default:()=>c});var n=l(6812),a=l(6880),s=l(3899),o=l(997),i=e([n,a,s]);function c(){return(0,o.jsxs)(n.ErrorBoundary,{FallbackComponent:()=>o.jsx("div",{children:"Erro!"}),children:[o.jsx("div",{role:"group",className:"pad1pc",id:"bgDiv",children:o.jsx("main",{children:o.jsx("form",{id:"outerLoginCont",name:"outerLoginContFormName",action:"#",method:"post",target:"_self",children:(0,o.jsxs)("div",{role:"group",id:"loginCont",children:[o.jsx("section",{id:"logoCont",children:o.jsx("img",{className:"fade-in-element",id:"logo",src:"./img/PROS_Saude_Modelo1-Final.png",alt:"logo"})}),(0,o.jsxs)("section",{id:"headerCont",children:[o.jsx("div",{role:"group",id:"titleCont1",children:o.jsx("h1",{id:"titleText",children:o.jsx("span",{role:"group",className:"fade-in-element",id:"spanTitle",children:"Fa\xe7a o Login"})})}),o.jsx("div",{role:"group",id:"titleCont2",children:o.jsx("h2",{id:"subtitleText",children:o.jsx("span",{role:"group",className:"fade-in-late-element",id:"spanSubtitle",children:"Informe seus dados de usu\xe1rio"})})})]}),o.jsx(a.Z,{})]})})})}),o.jsx(s.Z,{routeCase:"login"})]})}[n,a,s]=i.then?(await i)():i,r()}catch(e){r(e)}})}};