(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[326],{2434:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(7294),l=n(5893);function o(e){var t=e.renderError,n=e.onClick,o=(0,r.useRef)(null);return(0,l.jsxs)("article",{role:"alert",id:"errorDlgDiv",ref:o,children:[(0,l.jsx)("h2",{className:"mg-2bv widHalf",children:(0,l.jsx)("strong",{children:"Oops, algo deu errado! \uD83D\uDE28"})}),(0,l.jsx)("h4",{children:t.message}),(0,l.jsx)("small",{children:"Feche a janela e tente novamente ou recarregue a p\xe1gina!"}),(0,l.jsx)("br",{}),(0,l.jsx)("button",{className:"btn btn-warning bolded widFull mg-1t",id:"retryRenderBtn",onClick:n,children:"Fechar"})]})}},8326:function(e,t,n){"use strict";n.d(t,{Z:function(){return b}});var r=n(7812),l=n(9641),o=n(4035),a=n(7294),s=n(4511),i=n(2434),c=n(3849),d=n(6960),u=n(9137),h=n(5893);function m(e){var t=e.setPropDlg,n=e.shouldDisplayPropDlg,i=void 0===n||n,m=(0,a.useRef)(null),p=(0,a.useRef)(null),f=(0,a.useRef)(null),x=(0,a.useRef)(null),g=(0,a.useState)("userName")[1],v=function(e){if(f.current||(f.current=document.getElementById("userPropsNewValue")),x.current instanceof HTMLSelectElement&&(f.current instanceof HTMLInputElement||f.current instanceof HTMLSelectElement)){g(e),f.current.value="";var t=function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"text",n=!(arguments.length>1)||void 0===arguments[1]||arguments[1],r=!(arguments.length>2)||void 0===arguments[2]||arguments[2],l=document.createElement("input");return(e=l.classList).add.apply(e,["form-control"]),Object.assign(l,{id:"userPropsNewValue",type:t}),n&&(l.placeholder="Insira aqui o novo valor"),r&&(l.classList.add("minText"),l.minLength=2),f.current.parentElement.replaceChild(l,f.current),f.current=l,l},n=function(){var e,t=document.createElement("select");return(e=t.classList).add.apply(e,["form-select"]),t.id="userPropsNewValue",t.style.maxWidth=getComputedStyle(f.current).width,f.current.parentElement.replaceChild(t,f.current),f.current=t,t};switch(x.current.value){case"userName":var r=t();r.autocomplete="given-name",r.autocapitalize="true",r.addEventListener("input",function(){(0,c.SU)(r)});break;case"userClass":var o=n(),a=document.createElement("option");a.value="coord",a.textContent="Coordenador";var s=document.createElement("option");s.value="profExt",s.textContent="Membro Externo";var i=document.createElement("option");i.value="profInt",i.textContent="Membro Interno";var d=document.createElement("option");d.value="stud",d.textContent="Extensionista / Estudante",o.appendChild(a),o.appendChild(s),o.appendChild(i),o.appendChild(d);break;case"userArea":var u=n(),h=document.createElement("option");h.value="edFis",h.textContent="Educa\xe7\xe3o F\xedsica";var m=document.createElement("option");m.value="nutr",m.textContent="Nutri\xe7\xe3o";var p=document.createElement("option");p.value="odonto",p.textContent="Odontologia",u.appendChild(h),u.appendChild(m),u.appendChild(p);break;case"userEmail":var v=t("email");v.autocomplete="email",v.addEventListener("input",function(){(0,c.Cb)(v)}),v.addEventListener("click",function(){(0,c.Cb)(v)});break;case"userTel":var b=t("tel");b.autocomplete="tel",b.addEventListener("input",function(){(0,c.Mr)(b)});break;default:t()}}(0,l.IB)((0,l.Ji)(Error()),"Entry elements for changing type of user property input",x.current,f.current)};return(0,a.useEffect)(function(){if(m.current instanceof HTMLDialogElement){m.current.showModal(),(0,o.Ej)([].concat((0,r.Z)(m.current.querySelectorAll("*")),[m.current]));var e=document.getElementById("userPropsNewValue");null==e||e.addEventListener("input",function(){(0,c.SU)(e)})}else(0,l.MS)(m.current,"Dialog for userProps request",(0,l.Ji)(Error()))},[m]),(0,a.useEffect)(function(){},[f,m]),(0,h.jsx)(s.SV,{FallbackComponent:function(){return(0,h.jsx)(u.Z,{message:"Erro carregando modal de altera\xe7\xe3o de dados de usu\xe1rio!"})},children:i&&(0,h.jsxs)("dialog",{ref:m,className:"modal-content-fit flexAlItCt flexNoWC",id:"alterUsePropDlg",onClick:function(e){if((0,d.ki)(e,e.currentTarget).some(function(e){return!0===e})){var n;t(!i),null===(n=e.currentTarget.closest("dialog"))||void 0===n||n.close()}},children:[(0,h.jsxs)("section",{className:"flexNoW cGap2v widFull mg-3b",children:[(0,h.jsx)("h3",{className:"bolded",children:"Formul\xe1rio de Altera\xe7\xe3o"}),(0,h.jsx)("button",{className:"btn btn-close",onClick:function(){var e;t(!i),m.current instanceof HTMLDialogElement&&(null===(e=m.current)||void 0===e||e.close())}})]}),(0,h.jsxs)("fieldset",{className:"flexNoWC widFull mg-2bv",children:[(0,h.jsx)("label",{className:"bolded",htmlFor:"userPropsOps",children:"Op\xe7\xf5es de Altera\xe7\xe3o:"}),(0,h.jsxs)("select",{id:"userPropsOps",className:"form-select",onChange:function(){return v(f.current.value)},ref:x,children:[(0,h.jsx)("option",{value:"userName",children:"Nome"}),(0,h.jsx)("option",{value:"userClass",children:"Classe"}),(0,h.jsx)("option",{value:"userArea",children:"\xc1rea"}),(0,h.jsx)("option",{value:"userEmail",children:"E-mail"}),(0,h.jsx)("option",{value:"userTel",children:"Telefone"})]})]}),(0,h.jsxs)("fieldset",{className:"flexNoWC widFull mg-2bv",children:[(0,h.jsx)("label",{className:"bolded",htmlFor:"userPropsNewValue",children:"Novo valor:"}),(0,h.jsx)("input",{type:"text",id:"userPropsNewValue",className:"form-control minText",placeholder:"Insira aqui o novo valor",autoComplete:"given-name",autoCapitalize:"true",minLength:2,ref:f})]}),(0,h.jsxs)("fieldset",{className:"flexNoWC widFull mg-2bv",children:[(0,h.jsx)("label",{className:"bolded",htmlFor:"userPropJust",children:"Raz\xe3o:"}),(0,h.jsx)("input",{type:"text",id:"userPropJust",className:"form-control minText",minLength:2,placeholder:"Insira aqui a justificativa"})]}),(0,h.jsx)("button",{type:"button",id:"submitNewPropBtn",className:"btn btn-info widHalf bolded mg-1t",ref:p,onClick:function(e){(0,o.G$)(e.currentTarget,e.currentTarget.closest("dialog")).then(function(e){return e[0]&&t(!i)})},children:"Enviar"})]})})}function p(e){var t=e.setContact,n=e.shouldDisplayContact,s=void 0===n||n,i=(0,a.useRef)(null),c=(0,a.useRef)(null);return(0,a.useEffect)(function(){i.current instanceof HTMLDialogElement?(i.current.showModal(),(0,o.Ej)([].concat((0,r.Z)(i.current.querySelectorAll("*")),[i.current]))):(0,l.MS)(i.current,"Dialog for contact request",(0,l.Ji)(Error()))},[i]),(0,h.jsx)(h.Fragment,{children:s&&(0,h.jsxs)("dialog",{ref:i,className:"modal-content-fit flexAlItCt flexNoWC",id:"contactDlg",onClick:function(e){if((0,d.ki)(e,e.currentTarget).some(function(e){return!0===e})){var n;t(!s),null===(n=e.currentTarget.closest("dialog"))||void 0===n||n.close()}},children:[(0,h.jsxs)("div",{className:"flexNoW cGap2v widFull mg-3b",children:[(0,h.jsx)("h3",{className:"bolded",children:"Formul\xe1rio de Contato"}),(0,h.jsx)("button",{className:"btn btn-close",onClick:function(){var e;t(!s),i.current instanceof HTMLDialogElement&&(null===(e=i.current)||void 0===e||e.close())}})]}),(0,h.jsxs)("div",{className:"flexNoWC widFull mg-2bv",children:[(0,h.jsx)("label",{className:"bolded",htmlFor:"contactOps",children:"Raz\xe3o de contato"}),(0,h.jsxs)("select",{id:"contactOps",className:"form-select",children:[(0,h.jsx)("option",{value:"problema",children:"Problemas na Aplica\xe7\xe3o"}),(0,h.jsx)("option",{value:"duvida",children:"D\xfavidas sobre o Sistema"}),(0,h.jsx)("option",{value:"outro",children:"Outros"})]})]}),(0,h.jsxs)("div",{className:"flexNoWC widFull mg-2bv",children:[(0,h.jsx)("label",{className:"bolded",htmlFor:"contactObs",children:"Detalhes"}),(0,h.jsx)("textarea",{id:"contactObs",className:"form-control minText",minLength:2})]}),(0,h.jsx)("button",{type:"button",id:"submitContactBtn",className:"btn btn-info widHalf bolded mg-1t",ref:c,onClick:function(e){(0,o.G$)(e.currentTarget,e.currentTarget.closest("dialog")).then(function(e){return e[0]&&t(!s)})},children:"Enviar"})]})})}var f=n(6237),x=n(1163);function g(e){var t=e.user,n=e.setDropdown,c=e.setPropDlg,d=e.setContact,g=e.setUserDlg,v=e.shouldShowDropdown,b=e.shouldDisplayPropDlg,j=e.shouldDisplayContact,w=e.shouldDisplayUserDlg,C=e.router,N=(0,a.useRef)(null),E=(0,x.useRouter)();return(0,a.useEffect)(function(){N.current instanceof HTMLDialogElement?(N.current.showModal(),(0,o.Ej)([].concat((0,r.Z)(N.current.querySelectorAll("*")),[N.current]))):(0,l.MS)(N.current,"Dialog for user panel",(0,l.Ji)(Error()))},[N]),(0,h.jsx)(s.SV,{FallbackComponent:function(){return(0,h.jsx)(u.Z,{message:"Erro carregando janela modal"})},children:(0,h.jsx)("dialog",{className:"bdPo noInvert modal-content-fit forceInvert",ref:N,children:(0,h.jsxs)(s.SV,{FallbackComponent:function(){return(0,h.jsx)(i.Z,{renderError:Error("Erro carregando a janela modal!"),onClick:function(){var e;null===(e=N.current)||void 0===e||e.close(),g(!w),n(!v)}})},children:[(0,h.jsx)("button",{className:"btn btn-close htMax0-1r widFull",onClick:function(){var e;null===(e=N.current)||void 0===e||e.close(),g(!w),n(!v)}}),(0,h.jsx)("hr",{className:"noInvert"}),(0,h.jsxs)("dl",{className:"mg-0b",children:[(0,h.jsx)("dt",{children:"Classe:"}),(0,h.jsx)("dd",{id:"classLoginDlg","data-title":"Classe de Usu\xe1rio ativo",children:"".concat(t.userClass.slice(0,1).toUpperCase()).concat(t.userClass.slice(1),"\n    ")}),(0,h.jsx)("dt",{children:"\xc1rea:"}),(0,h.jsx)("dd",{children:"".concat(t.userArea.slice(0,1).toUpperCase()).concat(t.userArea.slice(1))}),(0,h.jsx)("dt",{children:"E-mail:"}),(0,h.jsx)("dd",{children:"".concat(t.userEmail)}),(0,h.jsx)("dt",{children:"Telefone:"}),(0,h.jsx)("dd",{children:"".concat(t.userTel)})]}),(0,h.jsxs)("div",{id:"alterUserPropDivDlg",className:"flexJSt cGap1v mg-1-3b",children:[(0,h.jsx)("span",{className:"bolded mg-04t",children:"Altera\xe7\xe3o"}),(0,h.jsx)("button",{type:"button",className:"transparent-el-bg",id:"alterUserPropBtnDlg",onClick:function(){c(!b)},children:(0,h.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-gear widMax-5r htMax0-3r",viewBox:"0 0 16 16",children:[(0,h.jsx)("path",{d:"M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"}),(0,h.jsx)("path",{d:"M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"})]})}),b&&(0,h.jsx)(m,{setPropDlg:c,shouldDisplayPropDlg:b})]}),(0,h.jsxs)("div",{id:"logoutDivDlg",className:"flexJSt cGap1v noInvert",children:[(0,h.jsx)("span",{className:"bolded mg-04t noInvert",children:"Logout"}),(0,h.jsxs)("button",{type:"button",className:"transparent-el-bg noInvert",id:"logoutBtnDlg",style:{position:"relative"},children:[(0,h.jsx)("a",{id:"logoutAnchorDlg",target:"_self",href:"".concat(f.basePath||location.href.replace(location.pathname,""),"/login"),style:{zIndex:"10",position:"absolute",color:"transparent"},onClick:function(){C?C.push("/login"):E.push("/login")},children:"LOGIN"}),(0,h.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-door-open widMax-5r",viewBox:"0 0 16 16",children:[(0,h.jsx)("path",{d:"M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"}),(0,h.jsx)("path",{d:"M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z"})]})]})]}),(0,h.jsxs)("div",{id:"logoutDivDlg",className:"flexJSt cGap1v mg-1t noInvert",children:[(0,h.jsx)("span",{className:"bolded noInvert",children:"Contato"}),(0,h.jsx)("button",{type:"button",className:"transparent-el-bg noInvert",id:"contactBtnDlg",onClick:function(){d(!j)},children:(0,h.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-info-circle htMax0-1r",viewBox:"0 0 16 16",children:[(0,h.jsx)("path",{d:"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"}),(0,h.jsx)("path",{d:"m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"})]})})]}),j&&(0,h.jsx)(p,{setContact:function(){d(!j)},shouldDisplayContact:j})]})})})}function v(e){var t=e.user,n=e.router,s=e.setDropdown,i=e.shouldShowDropdown,c=(0,a.useRef)(null),d=(0,a.useState)(!1),u=d[0],f=d[1],x=(0,a.useState)(!1),v=x[0],b=x[1],j=(0,a.useState)(!1),w=j[0],C=j[1];return(0,a.useEffect)(function(){c.current instanceof HTMLElement?(0,o.Ej)([].concat((0,r.Z)(c.current.querySelectorAll("*")),[c.current])):(0,l.MS)(c.current,"Popover for user panel",(0,l.Ji)(Error()))},[c]),(0,h.jsxs)("div",{className:"po posAb lowPo userPo",ref:c,children:[(0,h.jsxs)("div",{className:"hPo noInvert",children:[(0,h.jsx)("div",{id:"logoutDiv",className:"flexJSt cGap1v mg-05b noInvert",children:(0,h.jsx)("button",{type:"button",className:"transparent-el-bg noInvert",id:"contactBtn",onClick:function(){C(!w)},children:(0,h.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-window-stack htMax0-1r",viewBox:"0 0 16 16",children:[(0,h.jsx)("path",{d:"M4.5 6a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M6 6a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"}),(0,h.jsx)("path",{d:"M12 1a2 2 0 0 1 2 2 2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2 2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zM2 12V5a2 2 0 0 1 2-2h9a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1m1-4v5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8zm12-1V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2z"})]})})}),(0,h.jsx)("h3",{className:"hPo noInvert d-ibl brd-nulled brd-b-no pd-no pd0",children:"Informa\xe7\xf5es de Usu\xe1rio"})]}),(0,h.jsxs)("div",{className:"bdPo noInvert",children:[(0,h.jsxs)("dl",{className:"mg-0b",children:[(0,h.jsx)("dt",{children:"Classe:"}),(0,h.jsx)("dd",{id:"classLogin","data-title":"Classe de Usu\xe1rio ativo",children:"".concat(t.userClass.slice(0,1).toUpperCase()).concat(t.userClass.slice(1),"\n          ")}),(0,h.jsx)("dt",{children:"\xc1rea:"}),(0,h.jsx)("dd",{children:"".concat(t.userArea.slice(0,1).toUpperCase()).concat(t.userArea.slice(1))}),(0,h.jsx)("dt",{children:"E-mail:"}),(0,h.jsx)("dd",{children:"".concat(t.userEmail)}),(0,h.jsx)("dt",{children:"Telefone:"}),(0,h.jsx)("dd",{children:"".concat(t.userTel)})]}),(0,h.jsxs)("div",{id:"alterUserPropDiv",className:"flexJSt cGap1v mg-1-3b",children:[(0,h.jsx)("span",{className:"bolded mg-04t",children:"Altera\xe7\xe3o"}),(0,h.jsx)("button",{type:"button",className:"transparent-el-bg",id:"alterUserPropBtn",onClick:function(){b(!v)},children:(0,h.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-gear widMax-5r htMax0-3r",viewBox:"0 0 16 16",children:[(0,h.jsx)("path",{d:"M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"}),(0,h.jsx)("path",{d:"M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"})]})}),v&&(0,h.jsx)(m,{setPropDlg:b,shouldDisplayPropDlg:v})]}),(0,h.jsxs)("div",{id:"logoutDiv",className:"flexJSt cGap1v noInvert",children:[(0,h.jsx)("span",{className:"bolded mg-04t noInvert",children:"Logout"}),(0,h.jsxs)("button",{type:"button",className:"transparent-el-bg noInvert",id:"logoutBtn",style:{position:"relative"},children:[(0,h.jsx)("a",{id:"logoutAnchor",target:"_self",style:{zIndex:"10",position:"absolute",color:"transparent"},href:"".concat(location.href.replace(location.pathname,""),"/login"),onClick:function(){console.log("clicado"),n.push("/login")},children:"LOGIN"}),(0,h.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-door-open widMax-5r",viewBox:"0 0 16 16",children:[(0,h.jsx)("path",{d:"M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"}),(0,h.jsx)("path",{d:"M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z"})]})]})]}),(0,h.jsxs)("div",{id:"logoutDiv",className:"flexJSt cGap1v mg-1t noInvert",children:[(0,h.jsx)("span",{className:"bolded noInvert",children:"Contato"}),(0,h.jsx)("button",{type:"button",className:"transparent-el-bg noInvert",id:"contactBtn",onClick:function(){f(!u)},children:(0,h.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-info-circle htMax0-1r",viewBox:"0 0 16 16",children:[(0,h.jsx)("path",{d:"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"}),(0,h.jsx)("path",{d:"m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"})]})})]})]}),u&&(0,h.jsx)(p,{setContact:f,shouldDisplayContact:u}),w&&(0,h.jsx)(g,{user:t,setDropdown:s,setPropDlg:b,setContact:f,setUserDlg:C,shouldShowDropdown:void 0!==i&&i,shouldDisplayContact:u,shouldDisplayPropDlg:v,shouldDisplayUserDlg:w,callLogout:function(){},router:n})]})}function b(e){var t=e.user,n=e.router,s=(0,a.useRef)(null),i=(0,a.useState)(!1),c=i[0],d=i[1];(0,a.useEffect)(function(){s.current instanceof HTMLElement?(0,o.Ej)([].concat((0,r.Z)(s.current.querySelectorAll("*")),[s.current])):(0,l.MS)(s.current,"JSX for user panel",(0,l.Ji)(Error()))},[s]);var u=/psi/gi.test(t.userArea)?"psi":t.userArea,m="../img/PROS_icon.png";switch(u){case"odontologia":m="../img/pros-od-icon.png";break;case"educa\xe7\xe3o f\xedsica":m="../img/pros_edfis_icon.png";break;case"nutri\xe7\xe3o":m="../img/pros_nut_icon.png";break;case"psi":m="../img/icon-psy.png";break;default:m="../img/PROS_icon.png"}return(0,h.jsxs)("span",{className:"posRl flexNoW flexNoW900Q cGap0-5v rGap1v900Q contFitW noInvert",ref:s,children:[(0,h.jsx)("output",{id:"nameLogin","data-title":"Usu\xe1rio ativo",children:"".concat(t.userName)}),(0,h.jsx)("span",{id:"contProfileImg",className:"profileIcon",children:(0,h.jsx)("img",{src:m,className:"profileIcon mg-03rb",id:"profileIconImg","data-container":"body","data-toggle":"popover",title:"Informa\xe7\xf5es de Usu\xe1rio","data-placement":"bottom",onClick:function(){d(!c)},alt:"User img"})}),c&&(0,h.jsx)(v,{user:t,setDropdown:d,shouldShowDropdown:c,router:n})]})}},6237:function(e,t,n){"use strict";n.r(t),n.d(t,{basePath:function(){return d},default:function(){return u}});var r=n(4511),l=n(1042),o=n(7294),a=n(6923),s=n(745),i=n(9641),c=n(5893),d={path:"",ph:"undefined"};function u(){var e=(0,o.useContext)(a.AppRootContext);return(0,o.useEffect)(function(){try{var t=document.getElementById("__next");if(!(t instanceof HTMLElement))throw(0,i.MS)(t,"__next",(0,i.Ji)(Error()));if(e.roots.nextRoot)return;if(e.roots.nextRoot||(e.roots.nextRoot=(0,s.createRoot)(t)),!("_internalRoot"in e.roots.nextRoot))throw Error("nextRoot not validated as a Root")}catch(e){console.error("Error executing procedure for :".concat(e.message))}},[]),(0,c.jsx)(r.SV,{FallbackComponent:function(){return(0,c.jsx)("div",{children:"Erro!"})},children:(0,c.jsx)(l.default,{})})}},1042:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return m}});var r=n(4511),l=n(7294),o=n(6960),a=n(9641),s=n(3849),i=n(1163),c=n(6237),d=n(5893);function u(){var e=(0,i.useRouter)(),t=(0,l.useRef)(null);return(0,l.useEffect)(function(){try{if(!(t.current instanceof HTMLAnchorElement))throw(0,a.MS)(t.current,"Anchor Reference in Login Page",(0,a.Ji)(Error()));/undefined/gi.test(t.current.href)&&!/http:/gi.test(t.current.href)&&(t.current.href=t.current.href.replace("undefined","".concat(location.href.replace(location.pathname,""))))}catch(e){console.error("Error executing procedure for adjusting anchor href:\n".concat(e.message))}var e=document.querySelector("form"),n=Array.from(document.querySelectorAll("input"));e instanceof HTMLFormElement&&n.length>0?(0,o.vC)(e,n):a.IB.apply(void 0,[(0,a.Ji)(Error()),"argument for clearDefInvalidMsg in DOM initialization",e].concat(n)),(0,o.bq)(n,{user:"Nome de Usu\xe1rio",pw:"Senha"})},[]),(0,d.jsxs)("section",{id:"inputCont",children:[(0,d.jsx)("div",{role:"group",className:"loginInputCont1",children:(0,d.jsx)("div",{role:"group",id:"loginInputCont2",children:(0,d.jsx)("input",{className:"form-control fade-in-element userInput",id:"user",type:"text","aria-label":"email ou usu\xe1rio",placeholder:"Nome de Usu\xe1rio",title:"Por favor, preencha este\r campo.",minLength:5,maxLength:30,"data-title":"Usu\xe1rio",required:!0})})}),(0,d.jsx)("small",{className:"customValidityWarn",id:"userWarn",role:"textbox"}),(0,d.jsx)("div",{role:"group",className:"loginInputCont1",children:(0,d.jsx)("div",{role:"group",className:"loginInputCont2",children:(0,d.jsxs)("fieldset",{className:"form-control flexDiv fade-in-element",id:"loginInputCont3",children:[(0,d.jsx)("input",{className:"fade-in-element form-control userInput",id:"pw",type:"password",autoComplete:"password","aria-label":"senha",placeholder:"Senha",pattern:"^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$",minLength:1,maxLength:30,required:!0}),(0,d.jsx)("button",{type:"button",id:"spanShowPw",className:"halfL fade-in-late-element",onClick:function(e){return function(e){if(e instanceof HTMLElement){var t=e.querySelector(".bi"),n=document.getElementById("pw");n instanceof HTMLInputElement?null!=t&&t.classList.contains("bi-eye-fill")?(n.type="text",e.innerHTML='\n        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">\n          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>\n          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>\n        </svg>\n        '):null!=t&&t.classList.contains("bi-eye-slash-fill")?(n.type="password",e.innerHTML='\n        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">\n          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>\n          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>\n        </svg>\n        '):console.error("innerIcon class not validated"):(0,a.Nv)(n,"pwInp in callbackShowPw()",(0,a.Ji)(Error()))}else(0,a.MS)(e,"spanShowPw in callbackShowPw()",(0,a.Ji)(Error()))}(e.currentTarget)},children:(0,d.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-eye-fill",viewBox:"0 0 16 16",children:[(0,d.jsx)("path",{d:"M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"}),(0,d.jsx)("path",{d:"M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"})]})})]})})}),(0,d.jsx)("small",{className:"customValidityWarn",id:"pwWarn",role:"textbox"}),(0,d.jsxs)("nav",{id:"loginBtnCont",children:[(0,d.jsx)("a",{id:"newAccA",className:"fade-in-late-element",href:"#",target:"_blank",children:"Criar Conta"}),(0,d.jsx)("button",{type:"submit",className:"btn btn-primary fade-in-element",id:"submitBtn",children:(0,d.jsx)("a",{ref:t,id:"submitLogin",target:"_self",href:"".concat(c.basePath.path,"/base"),style:{color:"#ffff"},onClick:function(t){e.push("/base");var n=document.getElementById("outerLoginCont");!function(e,t){if(e instanceof HTMLButtonElement){var n,r=document.getElementById("pw"),l=document.getElementById("user");(r instanceof HTMLInputElement?/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(r.value)?r.setCustomValidity(""):function(){if(t.preventDefault(),(0,s.aX)(r),(0,o.Ob)(r.parentElement),!r.checkValidity()){var e;r.placeholder="Senha inv\xe1lida",(0,o.ak)(null!==(e=r.id)&&void 0!==e?e:"","Senha inv\xe1lida")}setTimeout(function(){r.placeholder="Senha"},5e3)}():(0,a.Nv)(r,"pwInp in callbackSubmitBtn()",(0,a.Ji)(Error())),l instanceof HTMLInputElement)?l.value.length<5&&(t.preventDefault(),(0,o.Ob)(l),l.setCustomValidity("O usu\xe1rio deve ter ao m\xednimo 5 caracteres"),l.checkValidity()||(l.placeholder="Usu\xe1rio inv\xe1lido",(0,o.ak)(null!==(n=l.id)&&void 0!==n?n:"","Usu\xe1rio inv\xe1lido")),setTimeout(function(){l.placeholder="Nome de Usu\xe1rio"},5e3)):(0,a.Nv)(l,"userInp in callbackSubmitBtn()",(0,a.Ji)(Error()))}else(0,a.MS)(e,"submitBtn in callbackSubmitBtn()",(0,a.Ji)(Error()))}(t.currentTarget.closest("button"),new SubmitEvent("submit",{submitter:n,bubbles:!0,cancelable:!0,composed:!0}))},children:"Avan\xe7ar"})})]})]})}var h=n(3899);function m(){return(0,d.jsxs)(r.SV,{FallbackComponent:function(){return(0,d.jsx)("div",{children:"Erro!"})},children:[(0,d.jsx)("div",{role:"group",className:"pad1pc",id:"bgDiv",children:(0,d.jsx)("main",{children:(0,d.jsx)("form",{id:"outerLoginCont",name:"outerLoginContFormName",action:"#",method:"post",target:"_self",children:(0,d.jsxs)("div",{role:"group",id:"loginCont",children:[(0,d.jsx)("section",{id:"logoCont",children:(0,d.jsx)("img",{className:"fade-in-element",id:"logo",src:"./img/PROS_Saude_Modelo1-Final.png",alt:"logo"})}),(0,d.jsxs)("section",{id:"headerCont",children:[(0,d.jsx)("div",{role:"group",id:"titleCont1",children:(0,d.jsx)("h1",{id:"titleText",children:(0,d.jsx)("span",{role:"group",className:"fade-in-element",id:"spanTitle",children:"Fa\xe7a o Login"})})}),(0,d.jsx)("div",{role:"group",id:"titleCont2",children:(0,d.jsx)("h2",{id:"subtitleText",children:(0,d.jsx)("span",{role:"group",className:"fade-in-late-element",id:"spanSubtitle",children:"Informe seus dados de usu\xe1rio"})})})]}),(0,d.jsx)(u,{})]})})})}),(0,d.jsx)(h.Z,{routeCase:"login"})]})}},1163:function(e,t,n){e.exports=n(8194)}}]);