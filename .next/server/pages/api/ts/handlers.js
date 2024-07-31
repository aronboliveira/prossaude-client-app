"use strict";(()=>{var e={};e.id=347,e.ids=[347],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6249:(e,a)=>{Object.defineProperty(a,"l",{enumerable:!0,get:function(){return function e(a,t){return t in a?a[t]:"then"in a&&"function"==typeof a.then?a.then(a=>e(a,t)):"function"==typeof a&&"default"===t?a:void 0}}})},5749:(e,a,t)=>{t.r(a),t.d(a,{config:()=>f,default:()=>c,routeModule:()=>m});var r={};t.r(r),t.d(r,{handleDelete:()=>u,handleFetch:()=>l,handleLogin:()=>d,handleSubmit:()=>s});var o=t(1802),n=t(7153),i=t(6249);async function d(e,a){let t=!(arguments.length>2)||void 0===arguments[2]||arguments[2],r=arguments.length>3?arguments[3]:void 0;try{if("object"!=typeof e)throw Error("Error validating typeof ev");if("boolean"!=typeof t)throw Error("Error validating typeof UNDER_TEST");e.preventDefault();let o=e.currentTarget instanceof HTMLButtonElement&&e.currentTarget.querySelector("a")?e.currentTarget.querySelector("a"):e.currentTarget,n=e=>{"object"==typeof r&&"beforePopState"in r&&"push"in r?(r.beforePopState(()=>(e instanceof HTMLElement&&(e.innerText="Logging in..."),!0)),o instanceof HTMLAnchorElement?r.push(o.href):r.push("/base")):(e instanceof HTMLElement&&(e.innerText="Logging in..."),o instanceof HTMLAnchorElement?location.href=o.href:location.href="/base")};if(t)n(document.getElementById("pwWarn"));else{let e=await fetch("../api/django/check_user_validity",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a.map(e=>[e[0],e[1]]))});if(!e.ok)throw Error("Error validating user from API");let t=await e.json();console.log(t);let r=document.getElementById("res-span")||document.getElementById("pwWarn");if(200!==e.status&&r instanceof HTMLElement){r.innerText=t.message;return}n(r)}}catch(e){console.error(`Error executing handleFetchStuds:
${e.message}`)}}async function s(e,a){let t=!(arguments.length>2)||void 0===arguments[2]||arguments[2];try{if("string"!=typeof e)throw Error("Error validating apiRoute type");if(!("login"===e||"base"===e||"ag"===e||"cons"===e||"ed"===e||"od"===e||"panel"===e||"patients"===e||"profs"===e||"studs"===e||"schedule"===e))throw Error("Invalidating route for API argumented to handler");if("boolean"!=typeof t)throw Error("Error validating typeof UNDER_TEST");let r=Array.isArray(a)?JSON.stringify(a.map(e=>[e[0],e[1]])):a instanceof Map?JSON.stringify(a.entries()):JSON.stringify(a);if(t)console.log(`Submit handled:
${r}`);else{let a=await fetch(`../django/submit_${e}_form/`,{method:"POST",headers:{"Content-Type":"application/json"},body:r});if(!a.ok)throw Error("Error posting Table to API");let t=await a.json();console.log(`Data fetched:
${t}`),console.log(`Submit handled:
${r}`)}}catch(e){console.error(`Error executing handleSubmit:
${e.message}`)}}async function l(e,a){let t=!(arguments.length>2)||void 0===arguments[2]||arguments[2],r=(()=>{switch(e){case"profs":return[{idf:"156.789.99-00",name:"Jo\xe3o Almeida dos Santos",area:"Odontologia & Coordena\xe7\xe3o",email:"almeida.joao@gmail.com",tel:"+55 21 99988-7766",start_day:"2020-01-08",end_day:"Presente",day:"Quarta-feira & Sexta-Feira",external:!1},{idf:"156.789.99-00",name:"J\xe9ssica Bonif\xe1cio Barbosa",area:"Educa\xe7\xe3o F\xedsica",email:"jess.barb@gmail.com",tel:"+55 21 91516-7788",start_day:"2020-01-08",end_day:"Presente",day:"Inativa",external:!1},{idf:"129.222.333-11",name:"Gislayne Duarte Tavares",area:"Nutri\xe7\xe3o & Supervis\xe3o",email:"gislayne1994@gmail.com",tel:"+55 11 91010-6689",start_day:"2020-01-08",end_day:"Presente",day:"Sexta-Feira",external:!0},{idf:"158.354.458-12",name:"Andr\xe9 Alfredo Gusm\xe3o",area:"Educa\xe7\xe3o F\xedsica",email:"andregus@gmail.com",tel:"+55 31 92015-6678",start_day:"2020-01-08",end_day:"Presente",day:"Quarta-Feira",external:!1},{idf:"158.555.459-19",name:"Aline dos Santos Wanderhaus",area:"Odontologia",email:"aliwander@outlook.com",tel:"+55 11 92299-6779",start_day:"2020-01-08",end_day:"2021-01-08",day:"Inativo",external:!0}];case"studs":return[{name:"Maria Eduarda Augusta",email:"mariaeduarda2001@gmail.com",tel:"+55 11 99887-2233",area:" Odontologia",day:"Sexta-feira",start_day:"2023-07-25",end_day:"Presente",dre:"123456789",cpf:"123.456.789-12"},{name:"Josefina Guedes Pereira",email:"josefinaguedes@gmail.com",tel:"+55 22 99777-1111",area:"Odontologia",day:"Quarta-feira",start_day:"2023-07-25",end_day:"Presente",dre:"987654321"},{name:"Augusto Duarte Fonseca",email:"",tel:"+55 21 922334-2233",area:"Educa\xe7\xe3o F\xedsica",day:"Quarta-feira",start_day:"2023-07-25",end_day:"Presente",dre:"111222333",cpf:"789.123.456-78"}];case"patients":return[{name:"Jos\xe9 Oliveira Mariano",email:"jfulaninhom@gmail.com",tel:"+55 21 90000-0000",next_appointed_day:"2024-10-05",treatment_beg:"2020-01-08",treatment_end:"2028-01-08",current_status:"Em emerg\xeancia",signature:new File([],"test"),historic:[{type:"anamnese",day:"2024-03-08",prof:"Jo\xe3o Almeida dos Santos",stud:"Maria Eduarda Augusta",notes:"Sinais de c\xe1rie agravada"},{type:"rcarie",day:"2024-05-10",prof:"Jo\xe3o Almeida dos Santos",stud:"Josefina Guedes Pereira",notes:"Remo\xe7\xe3o de C\xe1rie no dente 32"}],idf:"123.456.789-10"},{name:"Roberta Theodora Oliveira",email:"rtheo@outlook.com",tel:"+55 21 98000-0000",next_appointed_day:"2024-12-05",treatment_beg:"2022-01-08",treatment_end:"2028-03-08",current_status:"Em Avalia\xe7\xe3o Inicial",signature:new File([],"test"),historic:[{type:"exodontia",day:"2024-07-05",prof:"Aline dos Santos Wanderhaus",stud:"Maria Eduarda Augusta",notes:"Exodontia do dente 31"},{type:"profilaxia",day:"2024-10-05",prof:"Jo\xe3o Almeida dos Santos",stud:"Maria Eduarda Augusta",notes:"Sinais de c\xe1lculo no dente 24"}],idf:"103.444.252-15"},{name:"Natasha Roffman Nogueira",email:"nathnog@hotmail.com",tel:"+55 21 93042-0250",next_appointed_day:"05/11/2024-11-05",treatment_beg:"2023-01-08",treatment_end:"2027-03-08",current_status:"Alta Geral",signature:new File([],"test"),historic:[{type:"suplementacao",day:"2023-01-10",prof:"Gislayne Duarte Tavares",stud:"Augusto Duarte Fonseca",notes:"Necessidade de aumento de Vitamina C"},{type:"suplementacao",day:"2023-05-10",prof:"Andr\xe9 Alfredo Gusm\xe3o",stud:"Augusto Duarte Fonseca",notes:"Maior balan\xe7o proteico"},{type:"raspagem",day:"2024-01-10",prof:"Aline dos Santos Wanderhaus",stud:"Josefina Guedes Pereira",notes:"T\xe1rtaro nos incisivos inferiores"}],idf:"153.408.251-01"}];default:return[{idf:"156.789.99-00",name:"Jo\xe3o Almeida dos Santos",area:"Odontologia & Coordena\xe7\xe3o",email:"almeida.joao@gmail.com",tel:"+55 21 99988-7766",start_day:"2020-01-08",end_day:"Presente",day:"Quarta-feira & Sexta-Feira"},{idf:"156.789.99-00",name:"J\xe9ssica Bonif\xe1cio Barbosa",area:"Educa\xe7\xe3o F\xedsica",email:"jess.barb@gmail.com",tel:"+55 21 91516-7788",start_day:"2020-01-08",end_day:"2020-10-08",day:"Inativa"},{idf:"129.222.333-11",name:"Gislayne Duarte Tavares",area:"Nutri\xe7\xe3o & Supervis\xe3o",email:"gislayne1994@gmail.com",tel:"+55 11 91010-6689",start_day:"2020-01-08",end_day:"Presente",day:"Sexta-Feira"},{idf:"158.354.458-12",name:"Andr\xe9 Alfredo Gusm\xe3o",area:"Educa\xe7\xe3o F\xedsica",email:"andregus@gmail.com",tel:"+55 31 92015-6678",start_day:"2020-01-08",end_day:"Presente",day:"Quarta-Feira"},{idf:"158.555.459-19",name:"Aline dos Santos Wanderhaus",area:"Odontologia",email:"aliwander@outlook.com",tel:"+55 11 92299-6779",start_day:"2020-01-08",end_day:"Presente",day:"Inativo"}]}})();try{if("boolean"!=typeof t)throw Error("Error validating typeof UNDER_TEST");if("string"!=typeof e)throw Error("Error validating apiRoute type");if(!("login"===e||"base"===e||"ag"===e||"cons"===e||"ed"===e||"od"===e||"panel"===e||"patients"===e||"profs"===e||"studs"===e))throw Error("Invalidating route for API argumented to handler");if("string"!=typeof a)throw Error("Error validating typeof apiSufix");if("_table"!==a)throw Error("Invalidating sufix for route in API argumented to handler");if(t)return r;{let t=await fetch(`../api/django/${e}${a}`,{method:"GET",headers:{"Content-type":"application/json"}});if(!t.ok)throw Error("Error fetching Students Table from API");let r=await t.json();return console.log(`Data fetched:
${r}`),JSON.parse(r)}}catch(e){return console.error(`Error executing handleFetch:
${e.message}`),r}}async function u(e){let a=!(arguments.length>1)||void 0===arguments[1]||arguments[1];try{if("string"!=typeof e)throw Error("Error validating apiRoute type");if(!("login"===e||"base"===e||"ag"===e||"cons"===e||"ed"===e||"od"===e||"panel"===e||"patients"===e||"profs"===e||"studs"===e))throw Error("Invalidating route for API argumented to handler");if("boolean"!=typeof a)throw Error("Error validating typeof UNDER_TEST");if(a)console.log("Handled delete test");else{let a=await fetch(`../api/django/${e}_table`,{method:"DELETE",headers:{"Content-type":"application/json"}});if(!a.ok)throw Error("Error deleting Students Table from API");let t=await a.json();console.log(`Data fetched:
${t}`)}}catch(e){console.error(`Error executing handleDelete:
${e.message}`)}}let c=(0,i.l)(r,"default"),f=(0,i.l)(r,"config"),m=new o.PagesAPIRouteModule({definition:{kind:n.x.PAGES_API,page:"/api/ts/handlers",pathname:"/api/ts/handlers",bundlePath:"",filename:""},userland:r})},7153:(e,a)=>{var t;Object.defineProperty(a,"x",{enumerable:!0,get:function(){return t}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(t||(t={}))},1802:(e,a,t)=>{e.exports=t(145)}};var a=require("../../../webpack-api-runtime.js");a.C(e);var t=a(a.s=5749);module.exports=t})();