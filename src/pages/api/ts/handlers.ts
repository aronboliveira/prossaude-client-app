import {
  rMouseEvent,
  targEl,
  formCases,
} from "@/lib/global/declarations/types";
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
      throw new Error(`Error validating typeof apiRoute`);
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
  UNDER_TEST: boolean = true
): Promise<void> {
  try {
    if (typeof UNDER_TEST !== "boolean")
      throw new Error(`Error validating typeof UNDER_TEST`);
    if (!UNDER_TEST) {
      const res = await fetch(`../api/django/${apiRoute}_table`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
      if (!res.ok) throw new Error(`Error fetching Students Table from API`);
      const data = await res.json();
      console.log(`Data fetched:\n${data}`);
    } else console.log("Handled fetch test");
  } catch (e) {
    console.error(`Error executing handleFetch:\n${(e as Error).message}`);
  }
}

export async function handleDelete(
  apiRoute: formCases,
  UNDER_TEST: boolean = true
): Promise<void> {
  try {
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
