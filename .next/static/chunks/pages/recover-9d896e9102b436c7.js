(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[317],{2434:function(e,r,n){"use strict";n.d(r,{Z:function(){return i}});var t=n(7294),a=n(5893);function i(e){var r=e.renderError,n=e.onClick,i=(0,t.useRef)(null);return(0,a.jsxs)("article",{role:"alert",id:"errorDlgDiv",ref:i,children:[(0,a.jsx)("h2",{className:"mg-2bv widHalf",children:(0,a.jsx)("strong",{children:"Oops, algo deu errado! \uD83D\uDE28"})}),(0,a.jsx)("h4",{children:r.message}),(0,a.jsx)("small",{children:"Feche a janela e tente novamente ou recarregue a p\xe1gina!"}),(0,a.jsx)("br",{}),(0,a.jsx)("button",{className:"btn btn-warning bolded widFull mg-1t",id:"retryRenderBtn",onClick:n,children:"Fechar"})]})}},1033:function(e,r,n){"use strict";n.r(r),n.d(r,{default:function(){return x}});var t=n(4511),a=n(3899),i=n(9137),o=n(4035),c=n(5163),s=n(7294),l=n(7812),d=n(2434),u=n(6960),f=n(5893);function m(e){var r=e.dispatch,n=e.state,a=void 0===n||n,i=(0,s.useRef)(null),c=function(){r(!a),!a&&i.current instanceof HTMLDialogElement&&i.current.close()};return(0,s.useEffect)(function(){a&&i.current instanceof HTMLDialogElement&&i.current.showModal(),(0,o.Ej)([].concat((0,l.Z)(i.current.querySelectorAll("*")),[i.current]));var e=function(e){"Escape"===e.key&&c()};return addEventListener("keydown",e),function(){return removeEventListener("keydown",e)}},[i]),(0,f.jsx)(f.Fragment,{children:a&&(0,f.jsx)("dialog",{role:"alertdialog",ref:i,className:"modal-content modal-content-fit wid80",id:"recover-alert",onClick:function(e){(0,u.ki)(e,e.currentTarget).some(function(e){return!0===e})&&(e.currentTarget.close(),r(!a))},children:(0,f.jsx)(t.SV,{FallbackComponent:function(){return(0,f.jsx)(d.Z,{renderError:Error("Erro carregando a janela modal!"),onClick:c})},children:(0,f.jsxs)("section",{role:"alert",className:"flexNoWC flexJtC flexAlItCt rGap2v",children:[(0,f.jsxs)("div",{role:"group",className:"flexJtC flexAlItCt flexNoWC wsBs noInvert",children:[(0,f.jsx)("p",{children:(0,f.jsx)("b",{children:"Solicita\xe7\xe3o enviada!"})}),(0,f.jsx)("p",{children:"Verifique a caixa de entrada do seu e-mail para os pr\xf3ximos passos."})]}),(0,f.jsx)("button",{className:"btn btn-secondary bolded",onClick:c,children:"Fechar"})]})})})})}function h(){var e=(0,s.useState)(!1),r=e[0],n=e[1];return(0,f.jsxs)("form",{id:"recover-form",name:"recover_form",method:"post",action:"",encType:"application/x-www-form-urlencoded",onSubmit:function(e){return(0,o.G$)(e).then(function(r){e.preventDefault(),r[0]&&(0,c.ip)("recover",r[2],!0)})},children:[(0,f.jsxs)("section",{id:"recover-titles",className:"recover-sect",children:[(0,f.jsx)("h1",{children:"Recupera\xe7\xe3o de Senha"}),(0,f.jsx)("p",{children:"Forne\xe7a as informa\xe7\xf5es solicitadas para prosseguir!"})]}),(0,f.jsx)("section",{id:"recover-entries",className:"recover-sect",children:(0,f.jsxs)("fieldset",{id:"recover-email__fs",className:"recover-entries__fs",children:[(0,f.jsx)("label",{htmlFor:"recover-email__inp",id:"recover-email__lab",className:"form-label",children:"E-mail:"}),(0,f.jsx)("input",{type:"email",placeholder:"Digite aqui o seu e-mail",id:"recover-email__inp",className:"form-control minText patternText",autoComplete:"email",minLength:5,"data-reqlength":"5","data-pattern":"@","data-flags":"g",required:!0,onInput:function(e){return(0,o.ar)(e.currentTarget)}})]})}),(0,f.jsxs)("section",{id:"recover-cta-sect",className:"recover-sect",children:[(0,f.jsx)("button",{type:"submit",id:"submit-recover",className:"btn btn-info",onClick:function(e){e.preventDefault(),n(!0)},children:"Enviar"}),(0,f.jsx)("button",{type:"reset",id:"login-return",className:"btn btn-primary",children:(0,f.jsx)("a",{href:"/",id:"login-anchor",children:"Retornar"})})]}),(0,f.jsx)("div",{id:"modal-div",children:r&&(0,f.jsx)(m,{dispatch:n,state:r})})]})}function x(){return(0,f.jsxs)(t.SV,{FallbackComponent:function(){return(0,f.jsx)(i.Z,{message:"Error loading Recover Password Page!"})},children:[(0,f.jsx)("div",{id:"bgDiv",children:(0,f.jsx)(h,{})}),(0,f.jsx)(a.Z,{routeCase:"recover"})]})}},5846:function(e,r,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/recover",function(){return n(1033)}])}},function(e){e.O(0,[600,854,899,888,774,179],function(){return e(e.s=5846)}),_N_E=e.O()}]);