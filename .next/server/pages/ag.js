(()=>{var e={};e.id=927,e.ids=[927],e.modules={7544:(e,t,r)=>{e.exports=r(6745)},6745:(e,t,r)=>{"use strict";var o=r(8416);function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,o)}return r}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return l}});let n=r(167),u=r(997),i=n._(r(6689)),a=r(9642);async function p(e){let{Component:t,ctx:r}=e;return{pageProps:await (0,a.loadGetInitialProps)(t,r)}}class l extends i.default.Component{render(){let{Component:e,pageProps:t}=this.props;return(0,u.jsx)(e,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach(function(t){o(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({},t))}}l.origGetInitialProps=p,l.getInitialProps=p,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1323:(e,t)=>{"use strict";Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},1541:(e,t,r)=>{"use strict";r.a(e,async(e,o)=>{try{r.r(t),r.d(t,{config:()=>x,default:()=>c,getServerSideProps:()=>P,getStaticPaths:()=>f,getStaticProps:()=>d,reportWebVitals:()=>g,routeModule:()=>y,unstable_getServerProps:()=>j,unstable_getServerSideProps:()=>m,unstable_getStaticParams:()=>v,unstable_getStaticPaths:()=>_,unstable_getStaticProps:()=>b});var s=r(7093),n=r(5244),u=r(1323),i=r(8904),a=r(979),p=r(4786),l=e([a,p]);[a,p]=l.then?(await l)():l;let c=(0,u.l)(p,"default"),d=(0,u.l)(p,"getStaticProps"),f=(0,u.l)(p,"getStaticPaths"),P=(0,u.l)(p,"getServerSideProps"),x=(0,u.l)(p,"config"),g=(0,u.l)(p,"reportWebVitals"),b=(0,u.l)(p,"unstable_getStaticProps"),_=(0,u.l)(p,"unstable_getStaticPaths"),v=(0,u.l)(p,"unstable_getStaticParams"),j=(0,u.l)(p,"unstable_getServerProps"),m=(0,u.l)(p,"unstable_getServerSideProps"),y=new s.PagesRouteModule({definition:{kind:n.x.PAGES,page:"/ag",pathname:"/ag",bundlePath:"",filename:""},components:{App:a.default,Document:i.default},userland:p});o()}catch(e){o(e)}})},5244:(e,t)=>{"use strict";var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},3903:e=>{"use strict";e.exports=require("core-js/modules/es.regexp.flags.js")},2785:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},1423:e=>{"use strict";e.exports=require("path")},6689:e=>{"use strict";e.exports=require("react")},6405:e=>{"use strict";e.exports=require("react-dom")},997:e=>{"use strict";e.exports=require("react/jsx-runtime")},3258:e=>{"use strict";e.exports=import("@reduxjs/toolkit")},5311:e=>{"use strict";e.exports=import("@reduxjs/toolkit/react")},9915:e=>{"use strict";e.exports=import("js-cookie")},2880:e=>{"use strict";e.exports=import("jwt-decode")},6812:e=>{"use strict";e.exports=import("react-error-boundary")},3291:e=>{"use strict";e.exports=import("react-redux")},4210:e=>{e.exports=function(e,t,r){if("function"==typeof e?e===t:e.has(t))return arguments.length<3?t:r;throw TypeError("Private element is not present on this object")},e.exports.__esModule=!0,e.exports.default=e.exports},8912:e=>{e.exports=function(e,t){return t.get?t.get.call(e):t.value},e.exports.__esModule=!0,e.exports.default=e.exports},3448:e=>{e.exports=function(e,t,r){if(t.set)t.set.call(e,r);else{if(!t.writable)throw TypeError("attempted to set read only private field");t.value=r}},e.exports.__esModule=!0,e.exports.default=e.exports},468:(e,t,r)=>{var o=r(8912),s=r(9537);e.exports=function(e,t){var r=s(t,e);return o(e,r)},e.exports.__esModule=!0,e.exports.default=e.exports},9537:(e,t,r)=>{var o=r(4210);e.exports=function(e,t){return e.get(o(e,t))},e.exports.__esModule=!0,e.exports.default=e.exports},5661:(e,t,r)=>{var o=r(3448),s=r(9537);e.exports=function(e,t,r){var n=s(t,e);return o(e,n,r),r},e.exports.__esModule=!0,e.exports.default=e.exports}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[803,811,786],()=>r(1541));module.exports=o})();