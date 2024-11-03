import { formCases, fetchSuffixes } from "@/lib/global/declarations/types";
import { PacInfo, ProfInfo, StudInfo } from "@/lib/global/declarations/interfacesCons";
import { navigatorVars } from "@/vars";
import { toast } from "react-hot-toast";
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
): Promise<(ProfInfo | StudInfo | PacInfo)[] | null> {
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
    } else {
      let url;
      switch (apiRoute) {
        case "studs":
          url = "/mocks/studsData.json";
          break;
        case "patients":
          url = "/mocks/pacsData.json";
          break;
        default:
          url = "/mocks/profsData.json";
          break;
      }
      const response = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        method: "GET",
      });
      if (!response.ok)
        throw new Error(
          navigatorVars.pt
            ? `Resposta HTTP inválida. Código ${response.status}`
            : `Invalid HTTP Response. Code ${response.status}`,
        );
      return response.json();
    }
  } catch (e) {
    toast.error(`Error: ${(e as Error).message}`);
    return null;
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
