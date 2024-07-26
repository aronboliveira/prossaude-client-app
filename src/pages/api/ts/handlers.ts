import {
  rMouseEvent,
  targEl,
  formCases,
  fetchSuffixes,
} from "@/lib/global/declarations/types";
import {
  PacInfo,
  ProfInfo,
  StudInfo,
} from "@/lib/locals/panelPage/declarations/interfacesCons";
import { NextRouter } from "next/router";

export async function handleLogin(
  ev: rMouseEvent,
  userData: [string, string],
  UNDER_TEST: boolean = true,
  router?: NextRouter
): Promise<void> {
  try {
    if (typeof ev !== "object") throw new Error(`Error validating typeof ev`);
    if (typeof UNDER_TEST !== "boolean")
      throw new Error(`Error validating typeof UNDER_TEST`);
    ev.preventDefault();
    const targ =
      ev.currentTarget instanceof HTMLButtonElement &&
      ev.currentTarget.querySelector("a")
        ? ev.currentTarget.querySelector("a")!
        : ev.currentTarget;
    const exeLogin = (alert: targEl): void => {
      if (
        typeof router === "object" &&
        "beforePopState" in router &&
        "push" in router
      ) {
        router.beforePopState(() => {
          if (alert instanceof HTMLElement) alert.innerText = "Logging in...";
          return true;
        });
        targ instanceof HTMLAnchorElement
          ? router.push(targ.href)
          : router.push("/base");
      } else {
        if (alert instanceof HTMLElement) alert.innerText = "Logging in...";
        targ instanceof HTMLAnchorElement
          ? (location.href = targ.href)
          : (location.href = "/base");
      }
    };
    if (!UNDER_TEST) {
      const res = await fetch("../api/django/check_user_validity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData.map(entry => [entry[0], entry[1]])),
      });
      if (!res.ok) throw new Error(`Error validating user from API`);
      const data = await res.json();
      console.log(data);
      const resSpan =
        document.getElementById("res-span") ||
        document.getElementById("pwWarn");
      if (res.status !== 200 && resSpan instanceof HTMLElement) {
        resSpan.innerText = data.message;
        return;
      }
      exeLogin(resSpan);
    } else exeLogin(document.getElementById("pwWarn"));
  } catch (e) {
    console.error(`Error executing handleFetchStuds:\n${(e as Error).message}`);
  }
}

export async function handleSubmit(
  apiRoute: formCases,
  formData:
    | Array<[string, string | File]>
    | { [k: string]: string | File }
    | Map<string, string | File>,
  UNDER_TEST: boolean = true
): Promise<void> {
  try {
    if (typeof apiRoute !== "string")
      throw new Error(`Error validating apiRoute type`);
    if (
      !(
        apiRoute === "login" ||
        apiRoute === "base" ||
        apiRoute === "ag" ||
        apiRoute === "cons" ||
        apiRoute === "ed" ||
        apiRoute === "od" ||
        apiRoute === "panel" ||
        apiRoute === "patients" ||
        apiRoute === "profs" ||
        apiRoute === "studs"
      )
    )
      throw new Error(`Invalidating route for API argumented to handler`);
    if (typeof UNDER_TEST !== "boolean")
      throw new Error(`Error validating typeof UNDER_TEST`);
    const body = (() => {
      if (Array.isArray(formData))
        return JSON.stringify(formData.map(entry => [entry[0], entry[1]]));
      else {
        return formData instanceof Map
          ? JSON.stringify(formData.entries())
          : JSON.stringify(formData);
      }
    })();
    if (!UNDER_TEST) {
      const res = await fetch(`../django/submit_${apiRoute}_form/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      if (!res.ok) throw new Error(`Error posting Table to API`);
      const data = await res.json();
      console.log(`Data fetched:\n${data}`);
      console.log(`Submit handled:\n${body}`);
    } else console.log(`Submit handled:\n${body}`);
  } catch (e) {
    console.error(`Error executing handleSubmit:\n${(e as Error).message}`);
  }
}

export async function handleFetch(
  apiRoute: formCases,
  apiSufix: fetchSuffixes,
  UNDER_TEST: boolean = true
): Promise<(ProfInfo | StudInfo | PacInfo)[]> {
  const arrJSONResTest: (ProfInfo | StudInfo | PacInfo)[] = (() => {
    switch (apiRoute) {
      case "profs":
        return [
          {
            idf: "156.789.99-00",
            name: "João Almeida dos Santos",
            area: "Odontologia & Coordenação",
            email: "almeida.joao@gmail.com",
            tel: "+55 21 99988-7766",
            interv: "08/01/2020 – Presente",
            day: "Quarta-feira & Sexta-Feira",
          },
          {
            idf: "156.789.99-00",
            name: "Jéssica Bonifácio Barbosa",
            area: "Educação Física",
            email: "jess.barb@gmail.com",
            tel: "+55 21 91516-7788",
            interv: "08/01/2020 – 08/10/2020",
            day: "Inativa",
          },
          {
            idf: "129.222.333-11",
            name: "Gislayne Duarte Tavares",
            area: "Nutrição & Supervisão",
            email: "gislayne1994@gmail.com",
            tel: "+55 11 91010-6689",
            interv: "08/01/2020 – Presente",
            day: "Sexta-Feira",
          },
          {
            idf: "158.354.458-12",
            name: "André Alfredo Gusmão",
            area: "Educação Física",
            email: "andregus@gmail.com",
            tel: "+55 31 92015-6678",
            interv: "08/01/2020 – Presente",
            day: "Quarta-Feira",
          },
          {
            idf: "158.555.459-19",
            name: "Aline dos Santos Wanderhaus",
            area: "Odontologia",
            email: "aliwander@outlook.com",
            tel: "+55 11 92299-6779",
            interv: "08/01/2020 – 08/01/2021",
            day: "Inativo",
          },
        ];
      case "studs":
        return [
          {
            name: "Maria Eduarda Augusta",
            email: "mariaeduarda2001@gmail.com",
            tel: "+55 11 99887-2233",
            area: " Odontologia",
            day: "Sexta-feira",
            interv: "25/07/2023 – Presente",
            dre: "123456789",
            cpf: "123.456.789-12",
          },
          {
            name: "Josefina Guedes Pereira",
            email: "josefinaguedes@gmail.com",
            tel: "+55 22 99777-1111",
            area: "Odontologia",
            day: "Quarta-feira",
            interv: "25/07/2023 – Presente",
            dre: "987654321",
          },
          {
            name: "Augusto Duarte Fonseca",
            email: "",
            tel: "+55 21 922334-2233",
            area: "Educação Física",
            day: "Quarta-feira",
            interv: "25/07/2023 – Presente",
            dre: "111222333",
            cpf: "789.123.456-78",
          },
        ];
      case "patients":
        return [
          {
            name: "José Oliveira Mariano",
            email: "jfulaninhom@gmail.com",
            tel: "+55 21 90000-0000",
            next_appointed_day: "05/10/2024",
            treatment_period: "08/01/2020 – 08/01/2028",
            current_status: "Em emergência",
            signature: new File([], "test"),
            historic: {},
            idf: "123.456.789-10",
          },
          {
            name: "Roberta Theodora Oliveira",
            email: "rtheo@outlook.com",
            tel: "+55 21 98000-0000",
            next_appointed_day: "05/12/2024",
            treatment_period: "08/01/2020 – 08/01/2028",
            current_status: "Em Avaliação Inicial",
            signature: new File([], "test"),
            historic: {},
            idf: "103.444.252-15",
          },
          {
            name: "Natasha Roffman Nogueira",
            email: "nathnog@hotmail.com",
            tel: "+55 21 93042-0250",
            next_appointed_day: "05/11/2024",
            treatment_period: "08/01/2020 – 08/01/2028",
            current_status: "Alta Geral",
            signature: new File([], "test"),
            historic: {},
            idf: "153.408.251-01",
          },
        ];
      default:
        return [
          {
            idf: "156.789.99-00",
            name: "João Almeida dos Santos",
            area: "Odontologia & Coordenação",
            email: "almeida.joao@gmail.com",
            tel: "+55 21 99988-7766",
            interv: "08/01/2020 – Presente",
            day: "Quarta-feira & Sexta-Feira",
          },
          {
            idf: "156.789.99-00",
            name: "Jéssica Bonifácio Barbosa",
            area: "Educação Física",
            email: "jess.barb@gmail.com",
            tel: "+55 21 91516-7788",
            interv: "08/01/2020 – 08/10/2020",
            day: "Inativa",
          },
          {
            idf: "129.222.333-11",
            name: "Gislayne Duarte Tavares",
            area: "Nutrição & Supervisão",
            email: "gislayne1994@gmail.com",
            tel: "+55 11 91010-6689",
            interv: "08/01/2020 – Presente",
            day: "Sexta-Feira",
          },
          {
            idf: "158.354.458-12",
            name: "André Alfredo Gusmão",
            area: "Educação Física",
            email: "andregus@gmail.com",
            tel: "+55 31 92015-6678",
            interv: "08/01/2020 – Presente",
            day: "Quarta-Feira",
          },
          {
            idf: "158.555.459-19",
            name: "Aline dos Santos Wanderhaus",
            area: "Odontologia",
            email: "aliwander@outlook.com",
            tel: "+55 11 92299-6779",
            interv: "08/01/2020 – 08/01/2021",
            day: "Inativo",
          },
        ];
    }
  })();
  try {
    if (typeof UNDER_TEST !== "boolean")
      throw new Error(`Error validating typeof UNDER_TEST`);
    if (typeof apiRoute !== "string")
      throw new Error(`Error validating apiRoute type`);
    if (
      !(
        apiRoute === "login" ||
        apiRoute === "base" ||
        apiRoute === "ag" ||
        apiRoute === "cons" ||
        apiRoute === "ed" ||
        apiRoute === "od" ||
        apiRoute === "panel" ||
        apiRoute === "patients" ||
        apiRoute === "profs" ||
        apiRoute === "studs"
      )
    )
      throw new Error(`Invalidating route for API argumented to handler`);
    if (typeof apiSufix !== "string")
      throw new Error(`Error validating typeof apiSufix`);
    if (!(apiSufix === "_table"))
      throw new Error(
        `Invalidating sufix for route in API argumented to handler`
      );
    if (!UNDER_TEST) {
      const res = await fetch(`../api/django/${apiRoute}${apiSufix}`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
      if (!res.ok) throw new Error(`Error fetching Students Table from API`);
      const data = await res.json();
      console.log(`Data fetched:\n${data}`);
      return JSON.parse(data);
    } else {
      console.log("Handled fetch test");
      console.log(arrJSONResTest);
      return arrJSONResTest;
    }
  } catch (e) {
    console.error(`Error executing handleFetch:\n${(e as Error).message}`);
    return arrJSONResTest;
  }
}

export async function handleDelete(
  apiRoute: formCases,
  UNDER_TEST: boolean = true
): Promise<void> {
  try {
    if (typeof apiRoute !== "string")
      throw new Error(`Error validating apiRoute type`);
    if (
      !(
        apiRoute === "login" ||
        apiRoute === "base" ||
        apiRoute === "ag" ||
        apiRoute === "cons" ||
        apiRoute === "ed" ||
        apiRoute === "od" ||
        apiRoute === "panel" ||
        apiRoute === "patients" ||
        apiRoute === "profs" ||
        apiRoute === "studs"
      )
    )
      throw new Error(`Invalidating route for API argumented to handler`);
    if (typeof UNDER_TEST !== "boolean")
      throw new Error(`Error validating typeof UNDER_TEST`);
    if (!UNDER_TEST) {
      //TODO DEFINIR LÓGICA PARA ELIMINAR ROW AO INVÉS DA TABLE
      const res = await fetch(`../api/django/${apiRoute}_table`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      });
      if (!res.ok) throw new Error(`Error deleting Students Table from API`);
      const data = await res.json();
      console.log(`Data fetched:\n${data}`);
    } else console.log("Handled delete test");
  } catch (e) {
    console.error(`Error executing handleDelete:\n${(e as Error).message}`);
  }
}
//Stud para studs
//Prof para profs
//Pac para patients

// <caption className="caption-t">
// <strong>
//   <small role="textbox" className="noInvert">
//     <em className="noInvert">
//       Lista Recuperada da Ficha de Pacientes registrados. Acesse
//       <samp>
//         <a> ROTA_PLACEHOLDER </a>
//       </samp>
//       para cadastrar
//     </em>
//   </small>
// </strong>
// </caption>
// <colgroup>
// <col></col>
// <col></col>
// <col></col>
// <col></col>
// <col></col>
// <col></col>
// <col></col>
// {userClass === "coordenador" && <col></col>}
// {userClass === "coordenador" && <col></col>}
// {userClass === "coordenador" && <col></col>}
// {userClass === "coordenador" && <col></col>}
// {shouldShowAlocBtn && <col></col>}
// </colgroup>
// <thead className="thead-dark">
// <tr id={`avPacs-rowUnfilled0`}>
//   {userClass === "coordenador" && <th scope="col">CPF</th>}
//   <th scope="col">Nome</th>
//   <th scope="col">E-mail</th>
//   <th scope="col">Telefone</th>
//   <th scope="col">Próximo Dia de Consulta</th>
//   <th scope="col">Período de Acompanhamento</th>
//   {userClass === "coordenador" && <th scope="col">Assinatura</th>}
//   <th scope="col">Status</th>
//   <th scope="col">Histórico</th>
//   {userClass === "coordenador" && <th scope="col">Alteração</th>}
//   {userClass === "coordenador" && <th scope="col">Exclusão</th>}
//   {shouldShowAlocBtn && (
//     <th className="alocCel" scope="col">
//       Alocação
//     </th>
//   )}
// </tr>
// </thead>
// <tbody className="pacTbody" ref={tbodyRef}>
// <tr id={`avPacs-rowUnfilled0`}>
//   {userClass === "coordenador" && (
//     <th scope="row" className={`tagPhUnfilledTextPac`}>
//       <output
//         className={`tagPhAvPac tagPhAvPacUnfilled0`}
//         id={`tagPhUnfilledTextPac-rowUnfilled0`}
//         data-title={`UnfilledText Paciente Linha Unfilled0`}
//         data-aloc={`UnfilledText-pac`}
//       >
//         123.456.789-10
//       </output>
//     </th>
//   )}
//   <td className={`celUnfilled0Pac`}>
//     <output
//       className={`tagPhAvPac tagPhAvPacUnfilled0`}
//       id={`outpUnfilledTextPac-rowUnfilled0`}
//       data-title={`UnfilledText Paciente Linha Unfilled0`}
//       data-aloc={`UnfilledText-pac`}
//     >
//       José Oliveira Mariano
//     </output>
//   </td>
//   <td className={`celUnfilled0Pac`}>
//     <output
//       className={`tagPhAvPac tagPhAvPacUnfilled0`}
//       id={`outpUnfilledTextPac-rowUnfilled0`}
//       data-title={`UnfilledText Paciente Linha Unfilled0`}
//       data-aloc={`UnfilledText-pac`}
//     >
//       <address>
//         <a
//           href={`mailto:jfulaninhom@gmail.com`}
//           target="_blank"
//           rel="nofollow"
//           id={`emaila-Pac-rowUnfilled0`}
//         >
//           jfulaninhom@gmail.com
//         </a>
//       </address>
//     </output>
//   </td>
//   <td className="celTelPac">
//     <output
//       className={`tagPhAvPac tagPhAvPacUnfilled0`}
//       id="tagP4TelPacUnfilled0"
//       data-title="Telefone Paciente Linha Unfilled0"
//       data-aloc={`UnfilledText-pac`}
//     >
//       +55 21 90000-0000
//     </output>
//   </td>
//   <td className="celUnfilledTextPac">
//     <output
//       className="tagPhAvPac tagPhAvPacUnfilled0"
//       id="tagP4UnfilledTextPacUnfilled0"
//       data-title={`Próximo dia de atendimento de Paciente Linha Unfilled0`}
//       data-aloc={`UnfilledText-pac`}
//     >
//       05/05/2024
//     </output>
//   </td>
//   <td className="celIntervPac">
//     <div role="group" className="flexAlItCt cGap1v noInvert">
//       <output
//         className="tagPhAvPac tagPhAvPacUnfilled0"
//         id="tagP4IntervPacUnfilled0"
//         data-title="Intervalo de Atendimento Paciente Linha Unfilled0"
//         data-aloc={`UnfilledText-pac`}
//       >
//         08/01/2020 – 08/01/2028
//       </output>
//     </div>
//   </td>
//   {userClass === "coordenador" && (
//     <td className="celSignPac">
//       <div role="group" className="flexAlItCt flexJC cGap1v noInvert">
//         <output
//           className="tagPhAvPac tagPhAvPacUnfilled0"
//           id="tagP4AstPacUnfilled0"
//           data-title="Assinatura de Paciente Linha Unfilled0"
//           data-aloc={`UnfilledText-pac`}
//         >
//           <a
//             className="astAnchor"
//             id="tagPhAstPacUnfilled0"
//             href="../img/teste-exame-clinico.pdf"
//             download
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               fill="currentColor"
//               className="bi bi-filetype-pdf"
//               viewBox="0 0 16 16"
//             >
//               <path
//                 fill-rule="evenodd"
//                 d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.183.185.522m1.217-1.333v3.999h1.46q.602 0 .998-.237a1.45 1.45 0 0 0 .595-.689q.196-.45.196-1.084 0-.63-.196-1.075a1.43 1.43 0 0 0-.589-.68q-.396-.234-1.005-.234zm.791.645h.563q.371 0 .609.152a.9.9 0 0 1 .354.454q.118.302.118.753a2.3 2.3 0 0 1-.068.592 1.1 1.1 0 0 1-.196.422.8.8 0 0 1-.334.252 1.3 1.3 0 0 1-.483.082h-.563zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638z"
//               />
//             </svg>
//           </a>
//         </output>
//       </div>
//     </td>
//   )}
//   <td>
//     <div role="group" className="flexAlItCt cGap1v noInvert">
//       <output
//         className="outpPacStatus tagPhAvPac tagPhAvPacUnfilled0"
//         id="tagP4StatusUnfilled0"
//         data-title="Status de Paciente Linha Unfilled0"
//         data-aloc={`UnfilledText-pac`}
//       >
//         Em emergência
//       </output>
//     </div>
//   </td>
//   <td className="previousRegstPac">
//     <button
//       type="button"
//       id="btnPacPrevCons-rowUnfilled0"
//       className="btn btn-info flexJC flexAlItCt wsNoW opaquelightEl"
//       ref={btnPrevListRef}
//       onClick={() => {
//         if (typeof shouldDisplayPrevList === "boolean")
//           togglePacPrevList(shouldDisplayPrevList);
//       }}
//     >
//       <small role="textbox" className="bolded">
//         Atendimentos Anteriores
//       </small>
//     </button>
//     {shouldDisplayPrevList && (
//       <PrevConsList
//         setDisplayPrevList={setDisplayPrevList}
//         shouldDisplayPrevList={shouldDisplayPrevList}
//       />
//     )}
//   </td>
//   {userClass === "coordenador" && (
//     <td className="celAlterProf">
//       <button
//         type="button"
//         id="btnAlterRegstStud"
//         className="btn btn-info btnAffectRegst btnAlterRegst opaquelightEl widFull"
//         onClick={() => toggleDisplayRowData(shouldDisplayRowData)}
//       >
//         <span role="textbox" className="bolded fontLightWt">
//           Alterar
//         </span>
//       </button>
//       {shouldDisplayRowData && (
//         <AlterFieldList
//           setDisplayRowData={setDisplayRowData}
//           tabRef={tabPacRef}
//           shouldDisplayRowData={shouldDisplayRowData}
//         />
//       )}
//     </td>
//   )}
//   {userClass === "coordenador" && (
//     <td>
//       <FormExcludeBtn context="Pac" />
//     </td>
//   )}
//   {shouldShowAlocBtn && (
//     <td className="alocCel">
//       <div role="group" className="widFull flexAlItCt flexJC">
//         <button
//           type="button"
//           className="btnAlocPac btn btn-success widFull flexJC flexAlItCt wsNoW opaquelightEl"
//           id="btnAlocPacUnfilled0"
//           ref={alocBtnRef}
//         >
//           <span role="textbox">Alocar</span>
//         </button>
//       </div>
//     </td>
//   )}
// </tr>
// </tbody>

// useEffect(() => {
//   try {
//     if (!(tbodyRef.current instanceof HTMLTableSectionElement))
//       throw elementNotFound(
//         tbodyRef.current,
//         `Validation of Table Body instance`,
//         extLine(new Error())
//       );
//     handleFetch("patients", "_table", true).then(res => {
//       res.forEach(pac =>
//         pacs.push({
//           name: pac.name,
//           tel: pac.tel,
//           email: pac.email,
//           next_appointed_day: (pac as PacInfo)["next_appointed_day"],
//           treatment_period: (pac as PacInfo)["treatment_period"],
//           current_status: (pac as PacInfo)["current_status"],
//           signature: (pac as PacInfo)["signature"],
//           historic: (pac as PacInfo)["historic"],
//         })
//       );
//       try {
//         if (!(tabPacRef.current instanceof HTMLElement))
//           throw elementNotFound(
//             tabPacRef.current,
//             `Validation of Table reference`,
//             extLine(new Error())
//           );
//         if (!(tbodyRef.current instanceof HTMLElement))
//           throw elementNotFound(
//             tbodyRef.current,
//             `Validation of Table Body Reference`,
//             extLine(new Error())
//           );
//         if (
//           panelRoots[`${tbodyRef.current.id}`] &&
//           !(panelRoots[`${tbodyRef.current.id}`] as any)["__internalRoot"]
//         ) {
//           setTimeout(() => {
//             try {
//               if (!(tabPacRef.current instanceof HTMLElement))
//                 throw elementNotFound(
//                   tabPacRef.current,
//                   `Validation of Table reference`,
//                   extLine(new Error())
//                 );
//               if (!(tbodyRef.current instanceof HTMLElement))
//                 throw elementNotFound(
//                   tbodyRef.current,
//                   `Validation of Table Body Reference`,
//                   extLine(new Error())
//                 );
//               if (tbodyRef.current.querySelector("tr")) return;
//               panelRoots[`${tbodyRef.current.id}`]?.unmount();
//               delete panelRoots[`${tbodyRef.current.id}`];
//               tbodyRef.current.remove();
//               if (!panelRoots[`${tabPacRef.current.id}`])
//                 panelRoots[`${tabPacRef.current.id}`] = createRoot(
//                   tabPacRef.current
//                 );
//               panelRoots[`${tabPacRef.current.id}`]?.render(
//                 <ErrorBoundary
//                   FallbackComponent={() => (
//                     <GenericErrorComponent message="Error reloading replacement for table body" />
//                   )}
//                 >
//                   <caption className="caption-t">
//                     <strong>
//                       <small role="textbox" className="noInvert">
//                         <em className="noInvert">
//                           Lista Recuperada da Ficha de Pacientes registrados.
//                           Acesse
//                           <samp>
//                             <a> ROTA_PLACEHOLDER </a>
//                           </samp>
//                           para cadastrar
//                         </em>
//                       </small>
//                     </strong>
//                   </caption>
//                   <colgroup>
//                     <col></col>
//                     <col></col>
//                     <col></col>
//                     <col></col>
//                     <col></col>
//                     <col></col>
//                     <col></col>
//                     {userClass === "coordenador" && <col></col>}
//                     {userClass === "coordenador" && <col></col>}
//                     {userClass === "coordenador" && <col></col>}
//                     {userClass === "coordenador" && <col></col>}
//                     {shouldShowAlocBtn && <col></col>}
//                   </colgroup>
//                   <thead className="thead-dark">
//                     <tr id={`avPacs-rowUnfilled0`}>
//                       {userClass === "coordenador" && <th scope="col">CPF</th>}
//                       <th scope="col">Nome</th>
//                       <th scope="col">E-mail</th>
//                       <th scope="col">Telefone</th>
//                       <th scope="col">Próximo Dia de Consulta</th>
//                       <th scope="col">Período de Acompanhamento</th>
//                       {userClass === "coordenador" && (
//                         <th scope="col">Assinatura</th>
//                       )}
//                       <th scope="col">Status</th>
//                       <th scope="col">Histórico</th>
//                       {userClass === "coordenador" && (
//                         <th scope="col">Alteração</th>
//                       )}
//                       {userClass === "coordenador" && (
//                         <th scope="col">Exclusão</th>
//                       )}
//                       {shouldShowAlocBtn && (
//                         <th className="alocCel" scope="col">
//                           Alocação
//                         </th>
//                       )}
//                     </tr>
//                   </thead>
//                   <tbody className="pacTbody" ref={tbodyRef}></tbody>
//                 </ErrorBoundary>
//               );
//               if (!panelRoots[`${tbodyRef.current.id}`])
//                 panelRoots[`${tbodyRef.current.id}`] = createRoot(
//                   tbodyRef.current
//                 );
//             } catch (e) {
//               console.error(
//                 `Error executing scheduled rendering of Table Body Content Replacement:\n${
//                   (e as Error).message
//                 }`
//               );
//             }
//             if (document) {
//             }
//           }, 1000);
//         } else
//           panelRoots[`${tbodyRef.current.id}`] = createRoot(tbodyRef.current);
//         const pacRows = pacs.map((pac, i) => <PacRow />);
//       } catch (e) {
//         console.error(
//           `Error executing rendering of Table Body Content:\n${
//             (e as Error).message
//           }`
//         );
//       }
//     });
//   } catch (e) {
//     console.error(
//       `Error executing useEffect for Table Body Reference:\n${
//         (e as Error).message
//       }`
//     );
//   }
// }, [tbodyRef]);
