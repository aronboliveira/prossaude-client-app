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
            /*//TODO PRECISA MONTAR COMPONENT*/
            name: "",
            email: "",
            tel: "",
            next_appointed_day: "",
            treatment_period: "",
            current_status: "",
            signature: new File([], "test"),
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
