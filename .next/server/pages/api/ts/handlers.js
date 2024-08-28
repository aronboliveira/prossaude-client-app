"use strict";(()=>{var e={};e.id=347,e.ids=[347],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},5311:e=>{e.exports=import("@reduxjs/toolkit/react")},9915:e=>{e.exports=import("js-cookie")},2880:e=>{e.exports=import("jwt-decode")},8471:(e,a,t)=>{t.a(e,async(e,r)=>{try{t.r(a),t.d(a,{decodeToken:()=>d,handleDelete:()=>g,handleFetch:()=>u,handleLogin:()=>l,handleSubmit:()=>c});var o=t(2880),n=t(9915),i=t(5730),s=e([o,n,i]);function d(e){let a=arguments.length>1&&void 0!==arguments[1]&&arguments[1];try{if(!a){let a=(0,o.jwtDecode)(e);return{ok:!0,res:a}}return{ok:!0,res:{loadedData:{id:"",name:"Jo\xe3o Almeida",privilege:"coordinator",area:"psychology",origin:"psy",activityDay:"quarta-feira",beginningSemester:i.VO,beginningDay:new Date().getDate().toString(),cpf:0,email:"joaoteste@gmail.com",telephone:"+55 (21) 90000-0000",authorized:!0,external:!1}}}}catch(e){return console.error(`Error executing decodeToken:
${e.message}`),{ok:!1,res:{}}}}async function l(e,a){let t=!(arguments.length>2)||void 0===arguments[2]||arguments[2],r=arguments.length>3?arguments[3]:void 0,o=404,i,s=document.getElementById("res-span")||document.getElementById("pwWarn");try{if("object"!=typeof e)throw Error("Error validating typeof ev");if("boolean"!=typeof t)throw Error("Error validating typeof UNDER_TEST");e.preventDefault();let l=e.currentTarget instanceof HTMLButtonElement&&e.currentTarget.querySelector("a")?e.currentTarget.querySelector("a"):e.currentTarget,c=()=>{"object"==typeof r&&"beforePopState"in r&&"push"in r?(r.beforePopState(()=>(s&&(s.innerText="Logging in..."),!0)),l instanceof HTMLAnchorElement?r.push(l.href):r.push("/base")):(s&&(s.innerText="Logging in..."),l instanceof HTMLAnchorElement?location.href=l.href:location.href="/base")};if(t)localStorage.setItem("activeUser",JSON.stringify(d("",!0).res)),c();else{let e=await fetch("../api/django/check_user_validity",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Array.isArray(a)?a.map(e=>[e[0],e[1]]):a.entries())});if(!e.ok)throw o=e.status,Error("Error validating user from API");let t=await e.json();if(200!==e.status&&s instanceof HTMLElement){s.innerText=`Failed to validate login: Error code ${e.status}`,console.warn(`Error on processing HTTP Response:
`),console.warn(t),o=e.status,i=t;return}if(console.log(`Fetch was sucessfull: ${e.status}
JSON Data:`),console.log(t),!("access"in t)){s&&(s.innerText="Failed to validate login: Error processing server response."),console.warn(`Error on processing JSONified HTTP Response:
`),console.warn(t),o=e.status,i=t;return}n.default.set("accessToken",t.access,{secure:!0,sameSite:"strict",path:"/"}),n.default.set("refreshToken",t.access,{secure:!0,sameSite:"strict",path:"/"});let{ok:r,res:l}=d(t);if(!r){s&&(s.innerText="Failed to validate login: Error validating token."),console.warn(`Error processing tokens :
`),console.warn(l),o=e.status,i=t;return}localStorage.setItem("activeUser",JSON.stringify(l)),c()}}catch(e){console.error(`Error executing handleFetchStuds:
${e.message}`),s&&(s.innerText=`Failed to validate login: Error code ${o}`),console.warn(`Error on processing HTTP Response:
${i}`)}}async function c(e,a){let t=!(arguments.length>2)||void 0===arguments[2]||arguments[2];try{if("string"!=typeof e)throw Error("Error validating apiRoute type");if(!("login"===e||"base"===e||"ag"===e||"cons"===e||"ed"===e||"od"===e||"panel"===e||"patients"===e||"profs"===e||"studs"===e||"schedule"===e||"recover"===e))throw Error("Invalidating route for API argumented to handler");if("boolean"!=typeof t)throw Error("Error validating typeof UNDER_TEST");let r=Array.isArray(a)?JSON.stringify(a.map(e=>[e[0],e[1]])):a instanceof Map?JSON.stringify(a.entries()):JSON.stringify(a);if(t)console.log(`Submit handled:
${r}`);else{let a=await fetch(`../django/submit_${e}_form/`,{method:"POST",headers:{"Content-Type":"application/json"},body:r});if(!a.ok)throw Error("Error posting Table to API");let t=await a.json();console.log(`Data fetched:
${t}`),console.log(`Submit handled:
${r}`)}}catch(e){console.error(`Error executing handleSubmit:
${e.message}`)}}async function u(e,a){let t=!(arguments.length>2)||void 0===arguments[2]||arguments[2],r=(()=>{switch(e){case"profs":return[{idf:"156.789.99-00",name:"Jo\xe3o Almeida dos Santos",area:"Odontologia & Coordena\xe7\xe3o",email:"almeida.joao@gmail.com",tel:"+55 21 99988-7766",start_day:"2020-01-08",end_day:"Presente",day:"Quarta-feira & Sexta-Feira",external:!1},{idf:"156.789.99-00",name:"J\xe9ssica Bonif\xe1cio Barbosa",area:"Educa\xe7\xe3o F\xedsica",email:"jess.barb@gmail.com",tel:"+55 21 91516-7788",start_day:"2020-01-08",end_day:"Presente",day:"Inativa",external:!1},{idf:"129.222.333-11",name:"Gislayne Duarte Tavares",area:"Nutri\xe7\xe3o & Supervis\xe3o",email:"gislayne1994@gmail.com",tel:"+55 11 91010-6689",start_day:"2020-01-08",end_day:"Presente",day:"Sexta-Feira",external:!0},{idf:"158.354.458-12",name:"Andr\xe9 Alfredo Gusm\xe3o",area:"Educa\xe7\xe3o F\xedsica",email:"andregus@gmail.com",tel:"+55 31 92015-6678",start_day:"2020-01-08",end_day:"Presente",day:"Quarta-Feira",external:!1},{idf:"158.555.459-19",name:"Aline dos Santos Wanderhaus",area:"Odontologia",email:"aliwander@outlook.com",tel:"+55 11 92299-6779",start_day:"2020-01-08",end_day:"2021-01-08",day:"Inativo",external:!0}];case"studs":return[{name:"Maria Eduarda Augusta",email:"mariaeduarda2001@gmail.com",tel:"+55 11 99887-2233",area:" Odontologia",day:"Sexta-feira",start_day:"2023-07-25",end_day:"Presente",dre:"123456789",cpf:"123.456.789-12"},{name:"Josefina Guedes Pereira",email:"josefinaguedes@gmail.com",tel:"+55 22 99777-1111",area:"Odontologia",day:"Quarta-feira",start_day:"2023-07-25",end_day:"Presente",dre:"987654321"},{name:"Augusto Duarte Fonseca",email:"",tel:"+55 21 922334-2233",area:"Educa\xe7\xe3o F\xedsica",day:"Quarta-feira",start_day:"2023-07-25",end_day:"Presente",dre:"111222333",cpf:"789.123.456-78"}];case"patients":return[{name:"Jos\xe9 Oliveira Mariano",email:"jfulaninhom@gmail.com",tel:"+55 21 90000-0000",next_appointed_day:"2024-10-05",treatment_beg:"2020-01-08",treatment_end:"2028-01-08",current_status:"Em emerg\xeancia",signature:new File([],"test"),historic:[{type:"anamnese",day:"2024-03-08",prof:"Jo\xe3o Almeida dos Santos",stud:"Maria Eduarda Augusta",notes:"Sinais de c\xe1rie agravada"},{type:"rcarie",day:"2024-05-10",prof:"Jo\xe3o Almeida dos Santos",stud:"Josefina Guedes Pereira",notes:"Remo\xe7\xe3o de C\xe1rie no dente 32"}],idf:"123.456.789-10"},{name:"Roberta Theodora Oliveira",email:"rtheo@outlook.com",tel:"+55 21 98000-0000",next_appointed_day:"2024-12-05",treatment_beg:"2022-01-08",treatment_end:"2028-03-08",current_status:"Em Avalia\xe7\xe3o Inicial",signature:new File([],"test"),historic:[{type:"exodontia",day:"2024-07-05",prof:"Aline dos Santos Wanderhaus",stud:"Maria Eduarda Augusta",notes:"Exodontia do dente 31"},{type:"profilaxia",day:"2024-10-05",prof:"Jo\xe3o Almeida dos Santos",stud:"Maria Eduarda Augusta",notes:"Sinais de c\xe1lculo no dente 24"}],idf:"103.444.252-15"},{name:"Natasha Roffman Nogueira",email:"nathnog@hotmail.com",tel:"+55 21 93042-0250",next_appointed_day:"05/11/2024-11-05",treatment_beg:"2023-01-08",treatment_end:"2027-03-08",current_status:"Alta Geral",signature:new File([],"test"),historic:[{type:"suplementacao",day:"2023-01-10",prof:"Gislayne Duarte Tavares",stud:"Augusto Duarte Fonseca",notes:"Necessidade de aumento de Vitamina C"},{type:"suplementacao",day:"2023-05-10",prof:"Andr\xe9 Alfredo Gusm\xe3o",stud:"Augusto Duarte Fonseca",notes:"Maior balan\xe7o proteico"},{type:"raspagem",day:"2024-01-10",prof:"Aline dos Santos Wanderhaus",stud:"Josefina Guedes Pereira",notes:"T\xe1rtaro nos incisivos inferiores"}],idf:"153.408.251-01"}];default:return[{idf:"156.789.99-00",name:"Jo\xe3o Almeida dos Santos",area:"Odontologia & Coordena\xe7\xe3o",email:"almeida.joao@gmail.com",tel:"+55 21 99988-7766",start_day:"2020-01-08",end_day:"Presente",day:"Quarta-feira & Sexta-Feira"},{idf:"156.789.99-00",name:"J\xe9ssica Bonif\xe1cio Barbosa",area:"Educa\xe7\xe3o F\xedsica",email:"jess.barb@gmail.com",tel:"+55 21 91516-7788",start_day:"2020-01-08",end_day:"2020-10-08",day:"Inativa"},{idf:"129.222.333-11",name:"Gislayne Duarte Tavares",area:"Nutri\xe7\xe3o & Supervis\xe3o",email:"gislayne1994@gmail.com",tel:"+55 11 91010-6689",start_day:"2020-01-08",end_day:"Presente",day:"Sexta-Feira"},{idf:"158.354.458-12",name:"Andr\xe9 Alfredo Gusm\xe3o",area:"Educa\xe7\xe3o F\xedsica",email:"andregus@gmail.com",tel:"+55 31 92015-6678",start_day:"2020-01-08",end_day:"Presente",day:"Quarta-Feira"},{idf:"158.555.459-19",name:"Aline dos Santos Wanderhaus",area:"Odontologia",email:"aliwander@outlook.com",tel:"+55 11 92299-6779",start_day:"2020-01-08",end_day:"Presente",day:"Inativo"}]}})();try{if("boolean"!=typeof t)throw Error("Error validating typeof UNDER_TEST");if("string"!=typeof e)throw Error("Error validating apiRoute type");if(!("login"===e||"base"===e||"ag"===e||"cons"===e||"ed"===e||"od"===e||"panel"===e||"patients"===e||"profs"===e||"studs"===e))throw Error("Invalidating route for API argumented to handler");if("string"!=typeof a)throw Error("Error validating typeof apiSufix");if("_table"!==a)throw Error("Invalidating sufix for route in API argumented to handler");if(t)return r;{let t=await fetch(`../api/django/${e}${a}`,{method:"GET",headers:{"Content-type":"application/json"}});if(!t.ok)throw Error("Error fetching Students Table from API");let r=await t.json();return console.log(`Data fetched:
${r}`),JSON.parse(r)}}catch(e){return console.error(`Error executing handleFetch:
${e.message}`),r}}async function g(e){let a=!(arguments.length>1)||void 0===arguments[1]||arguments[1];try{if("string"!=typeof e)throw Error("Error validating apiRoute type");if(!("login"===e||"base"===e||"ag"===e||"cons"===e||"ed"===e||"od"===e||"panel"===e||"patients"===e||"profs"===e||"studs"===e))throw Error("Invalidating route for API argumented to handler");if("boolean"!=typeof a)throw Error("Error validating typeof UNDER_TEST");if(a)console.log("Handled delete test");else{let a=await fetch(`../api/django/${e}_table`,{method:"DELETE",headers:{"Content-type":"application/json"}});if(!a.ok)throw Error("Error deleting Students Table from API");let t=await a.json();console.log(`Data fetched:
${t}`)}}catch(e){console.error(`Error executing handleDelete:
${e.message}`)}}[o,n,i]=s.then?(await s)():s,r()}catch(e){r(e)}})},5730:(e,a,t)=>{t.a(e,async(e,r)=>{try{t.d(a,{VO:()=>i});var o=t(5311),n=e([o]);o=(n.then?(await n)():n)[0];let i=6>new Date().getMonth()?`${new Date().getFullYear()}.1`:`${new Date().getFullYear()}.2`,s={loadedData:{id:"",name:"An\xf4nimo",privilege:"student",area:"general",origin:"general",activityDay:"quarta-feira",beginningSemester:i,beginningDay:new Date().getDate().toString(),cpf:0,email:"",telephone:"0000-0000",authorized:!1}},d=(0,o.createSlice)({name:"user",initialState:s,reducers:{setFullUser(e,a){e.loadedData=a.payload.v.loadedData},deleteUser(e){e.loadedData=s.loadedData},setUserId(e,a){e.loadedData.id=a.payload.v},setUserName(e,a){e.loadedData.name=a.payload.v},setUserPrivilege(e,a){e.loadedData.privilege=a.payload.v},setUserArea(e,a){e.loadedData.area=a.payload.v},setUserOrigin(e,a){e.loadedData.origin=a.payload.v},setUserBeginningSemester(e,a){e.loadedData.beginningSemester=a.payload.v},setUserBeginningDay(e,a){e.loadedData.beginningDay=a.payload.v},setUserActivityDay(e,a){e.loadedData.activityDay=a.payload.v},setUserCpf(e,a){e.loadedData.cpf=a.payload.v},setUserEmail(e,a){e.loadedData.email=a.payload.v},setUserTelephone(e,a){e.loadedData.telephone=a.payload.v},setUserAuthorized(e,a){e.loadedData.authorized=a.payload.v},setUserDre(e,a){e.loadedData.dre=a.payload.v},setUserCurrSemester(e,a){e.loadedData.id=a.payload.v},setUserExternal(e,a){e.loadedData.external=a.payload.v}}}),{setFullUser:l,deleteUser:c,setUserId:u,setUserName:g,setUserPrivilege:f,setUserArea:m,setUserOrigin:p,setUserBeginningSemester:y,setUserBeginningDay:h,setUserActivityDay:E,setUserCpf:v,setUserEmail:S,setUserTelephone:A,setUserAuthorized:_,setUserDre:D,setUserCurrSemester:P,setUserExternal:w}=d.actions;d.reducer,r()}catch(e){r(e)}})},6249:(e,a)=>{Object.defineProperty(a,"l",{enumerable:!0,get:function(){return function e(a,t){return t in a?a[t]:"then"in a&&"function"==typeof a.then?a.then(a=>e(a,t)):"function"==typeof a&&"default"===t?a:void 0}}})},2218:(e,a,t)=>{t.a(e,async(e,r)=>{try{t.r(a),t.d(a,{config:()=>c,default:()=>l,routeModule:()=>u});var o=t(1802),n=t(7153),i=t(6249),s=t(8471),d=e([s]);s=(d.then?(await d)():d)[0];let l=(0,i.l)(s,"default"),c=(0,i.l)(s,"config"),u=new o.PagesAPIRouteModule({definition:{kind:n.x.PAGES_API,page:"/api/ts/handlers",pathname:"/api/ts/handlers",bundlePath:"",filename:""},userland:s});r()}catch(e){r(e)}})},7153:(e,a)=>{var t;Object.defineProperty(a,"x",{enumerable:!0,get:function(){return t}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(t||(t={}))},1802:(e,a,t)=>{e.exports=t(145)}};var a=require("../../../webpack-api-runtime.js");a.C(e);var t=a(a.s=2218);module.exports=t})();