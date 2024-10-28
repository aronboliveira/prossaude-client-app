import { formCases, fetchSuffixes } from "@/lib/global/declarations/types";
import { PacInfo, ProfInfo, StudInfo } from "@/lib/global/declarations/interfacesCons";
export async function handleSubmit(
  apiRoute: formCases,
  formData: FormData | Array<[string, string | File]> | { [k: string]: string | File } | Map<string, string | File>,
  UNDER_TEST: boolean = true,
): Promise<void> {
  try {
    if (typeof apiRoute !== "string") throw new Error(`Error validating apiRoute type`);
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
        apiRoute === "studs" ||
        apiRoute === "schedule" ||
        apiRoute === "recover"
      )
    )
      throw new Error(`Invalidating route for API argumented to handler`);
    if (typeof UNDER_TEST !== "boolean") throw new Error(`Error validating typeof UNDER_TEST`);
    const body = ((): string => {
      if (Array.isArray(formData)) return JSON.stringify(formData.map(entry => [entry[0], entry[1]]));
      else {
        return formData instanceof Map ? JSON.stringify(formData.entries()) : JSON.stringify(formData);
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
    }
  } catch (e) {
    return;
  }
}
export async function handleFetch(
  apiRoute: formCases,
  apiSufix: fetchSuffixes,
  UNDER_TEST: boolean = true,
): Promise<(ProfInfo | StudInfo | PacInfo)[]> {
  const arrJSONResTest: (ProfInfo | StudInfo | PacInfo)[] = ((): any => {
    switch (apiRoute) {
      case "profs":
        return [
          {
            idf: "156.789.99-00",
            name: "João Almeida dos Santos",
            area: "Odontologia & Coordenação",
            email: "almeida.joao@gmail.com",
            tel: "+55 21 99988-7766",
            start_day: "2020-01-08",
            end_day: "Presente",
            day: "Quarta-feira & Sexta-Feira",
            external: false,
          },
          {
            idf: "156.789.99-00",
            name: "Jéssica Bonifácio Barbosa",
            area: "Educação Física",
            email: "jess.barb@gmail.com",
            tel: "+55 21 91516-7788",
            start_day: "2020-01-08",
            end_day: "Presente",
            day: "Inativa",
            external: false,
          },
          {
            idf: "129.222.333-11",
            name: "Gislayne Duarte Tavares",
            area: "Nutrição & Supervisão",
            email: "gislayne1994@gmail.com",
            tel: "+55 11 91010-6689",
            start_day: "2020-01-08",
            end_day: "Presente",
            day: "Sexta-Feira",
            external: true,
          },
          {
            idf: "158.354.458-12",
            name: "André Alfredo Gusmão",
            area: "Educação Física",
            email: "andregus@gmail.com",
            tel: "+55 31 92015-6678",
            start_day: "2020-01-08",
            end_day: "Presente",
            day: "Quarta-Feira",
            external: false,
          },
          {
            idf: "158.555.459-19",
            name: "Aline dos Santos Wanderhaus",
            area: "Odontologia",
            email: "aliwander@outlook.com",
            tel: "+55 11 92299-6779",
            start_day: "2020-01-08",
            end_day: "2021-01-08",
            day: "Inativo",
            external: true,
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
            start_day: "2023-07-25",
            end_day: "Presente",
            dre: "123456789",
            cpf: "123.456.789-12",
          },
          {
            name: "Josefina Guedes Pereira",
            email: "josefinaguedes@gmail.com",
            tel: "+55 22 99777-1111",
            area: "Odontologia",
            day: "Quarta-feira",
            start_day: "2023-07-25",
            end_day: "Presente",
            dre: "987654321",
          },
          {
            name: "Augusto Duarte Fonseca",
            email: "",
            tel: "+55 21 922334-2233",
            area: "Educação Física",
            day: "Quarta-feira",
            start_day: "2023-07-25",
            end_day: "Presente",
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
            next_appointed_day: "2024-10-05",
            treatment_beg: "2020-01-08",
            treatment_end: "2028-01-08",
            current_status: "Em emergência",
            signature: new File([], "test"),
            historic: [
              {
                type: "anamnese",
                day: "2024-03-08",
                prof: "João Almeida dos Santos",
                stud: "Maria Eduarda Augusta",
                notes: "Sinais de cárie agravada",
              },
              {
                type: "rcarie",
                day: "2024-05-10",
                prof: "João Almeida dos Santos",
                stud: "Josefina Guedes Pereira",
                notes: "Remoção de Cárie no dente 32",
              },
            ],
            idf: "123.456.789-10",
          },
          {
            name: "Roberta Theodora Oliveira",
            email: "rtheo@outlook.com",
            tel: "+55 21 98000-0000",
            next_appointed_day: "2024-12-05",
            treatment_beg: "2022-01-08",
            treatment_end: "2028-03-08",
            current_status: "Em Avaliação Inicial",
            signature: new File([], "test"),
            historic: [
              {
                type: "exodontia",
                day: "2024-07-05",
                prof: "Aline dos Santos Wanderhaus",
                stud: "Maria Eduarda Augusta",
                notes: "Exodontia do dente 31",
              },
              {
                type: "profilaxia",
                day: "2024-10-05",
                prof: "João Almeida dos Santos",
                stud: "Maria Eduarda Augusta",
                notes: "Sinais de cálculo no dente 24",
              },
            ],
            idf: "103.444.252-15",
          },
          {
            name: "Natasha Roffman Nogueira",
            email: "nathnog@hotmail.com",
            tel: "+55 21 93042-0250",
            next_appointed_day: "05/11/2024-11-05",
            treatment_beg: "2023-01-08",
            treatment_end: "2027-03-08",
            current_status: "Alta Geral",
            signature: new File([], "test"),
            historic: [
              {
                type: "suplementacao",
                day: "2023-01-10",
                prof: "Gislayne Duarte Tavares",
                stud: "Augusto Duarte Fonseca",
                notes: "Necessidade de aumento de Vitamina C",
              },
              {
                type: "suplementacao",
                day: "2023-05-10",
                prof: "André Alfredo Gusmão",
                stud: "Augusto Duarte Fonseca",
                notes: "Maior balanço proteico",
              },
              {
                type: "raspagem",
                day: "2024-01-10",
                prof: "Aline dos Santos Wanderhaus",
                stud: "Josefina Guedes Pereira",
                notes: "Tártaro nos incisivos inferiores",
              },
            ],
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
            start_day: "2020-01-08",
            end_day: "Presente",
            day: "Quarta-feira & Sexta-Feira",
          },
          {
            idf: "156.789.99-00",
            name: "Jéssica Bonifácio Barbosa",
            area: "Educação Física",
            email: "jess.barb@gmail.com",
            tel: "+55 21 91516-7788",
            start_day: "2020-01-08",
            end_day: "2020-10-08",
            day: "Inativa",
          },
          {
            idf: "129.222.333-11",
            name: "Gislayne Duarte Tavares",
            area: "Nutrição & Supervisão",
            email: "gislayne1994@gmail.com",
            tel: "+55 11 91010-6689",
            start_day: "2020-01-08",
            end_day: "Presente",
            day: "Sexta-Feira",
          },
          {
            idf: "158.354.458-12",
            name: "André Alfredo Gusmão",
            area: "Educação Física",
            email: "andregus@gmail.com",
            tel: "+55 31 92015-6678",
            start_day: "2020-01-08",
            end_day: "Presente",
            day: "Quarta-Feira",
          },
          {
            idf: "158.555.459-19",
            name: "Aline dos Santos Wanderhaus",
            area: "Odontologia",
            email: "aliwander@outlook.com",
            tel: "+55 11 92299-6779",
            start_day: "2020-01-08",
            end_day: "Presente",
            day: "Inativo",
          },
        ];
    }
  })();
  try {
    if (typeof UNDER_TEST !== "boolean") throw new Error(`Error validating typeof UNDER_TEST`);
    if (typeof apiRoute !== "string") throw new Error(`Error validating apiRoute type`);
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
    if (typeof apiSufix !== "string") throw new Error(`Error validating typeof apiSufix`);
    if (!(apiSufix === "_table")) throw new Error(`Invalidating sufix for route in API argumented to handler`);
    if (!UNDER_TEST) {
      const res = await fetch(`../api/django/${apiRoute}${apiSufix}`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
      if (!res.ok) throw new Error(`Error fetching Students Table from API`);
      const data = await res.json();
      return JSON.parse(data);
    } else return arrJSONResTest;
  } catch (e) {
    return arrJSONResTest;
  }
}
export async function handleDelete(apiRoute: formCases, UNDER_TEST: boolean = true): Promise<void> {
  try {
    if (typeof apiRoute !== "string") throw new Error(`Error validating apiRoute type`);
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
    if (typeof UNDER_TEST !== "boolean") throw new Error(`Error validating typeof UNDER_TEST`);
    if (!UNDER_TEST) {
      const res = await fetch(`../api/django/${apiRoute}_table`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      });
      if (!res.ok) throw new Error(`Error deleting Students Table from API`);
    }
  } catch (e) {
    return;
  }
}
