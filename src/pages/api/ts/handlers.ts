import {
  rMouseEvent,
  targEl,
  pageCases,
} from "@/lib/global/declarations/types";
import { NextRouter } from "next/router";

export async function handleLogin(
  ev: rMouseEvent,
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
      const res = await fetch("../api/django/check_user_validity");
      if (!res.ok) throw new Error(`Error validating user from API`);
      const data = await res.json();
      console.log(data);
      const resSpan =
        document.getElementById("res-span") ||
        document.getElementById("pwWarn");
      if (res.status !== 200 && resSpan instanceof HTMLElement)
        resSpan.innerText = data.message;
      exeLogin(resSpan);
    } else exeLogin(document.getElementById("pwWarn"));
  } catch (e) {
    console.error(`Error executing handleFetchStuds:\n${(e as Error).message}`);
  }
}

export async function handleSubmit(
  apiRoute: pageCases,
  formData:
    | Array<[string, string]>
    | { [k: string]: string }
    | Map<string, string>,
  UNDER_TEST: boolean = true
): Promise<void> {
  try {
    if (typeof apiRoute !== "string")
      throw new Error(`Error validating typeof apiRoute`);
    if (typeof UNDER_TEST !== "boolean")
      throw new Error(`Error validating typeof UNDER_TEST`);
    const body = (() => {
      if (Array.isArray(formData)) {
        return JSON.stringify(formData.map(entry => [entry[0], entry[1]]));
      } else {
        return formData instanceof Map
          ? JSON.stringify(formData.entries())
          : JSON.stringify(formData);
      }
    })();
    if (!UNDER_TEST) {
      const resApiRoute = `../django/submit_${apiRoute}_form/`;
      const res = await fetch(resApiRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      if (!res.ok) throw new Error(`Error posting Table to API`);
      const data = await res.json();
      console.log(data);
    } else
      console.log(`Submit handled:
    ${body}`);
  } catch (e) {
    console.error(`Error executing handleSubmit:\n${(e as Error).message}`);
  }
}

export async function handleFetchStuds(
  UNDER_TEST: boolean = true
): Promise<void> {
  try {
    const res = await fetch("../api/django/studs_table");
    if (!res.ok) throw new Error(`Error fetching Students Table from API`);
    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.error(`Error executing handleFetchStuds:\n${(e as Error).message}`);
  }
}

export async function handleFetchProfs(
  UNDER_TEST: boolean = true
): Promise<void> {
  try {
    const res = await fetch("../api/django/profs_table");
    if (!res.ok) throw new Error(`Error fetching Professionals Table from API`);
    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.error(`Error executing handleFetchProfs:\n${(e as Error).message}`);
  }
}

export async function handleFetchPacs(
  UNDER_TEST: boolean = true
): Promise<void> {
  try {
    const res = await fetch("../api/django/patients_table");
    if (!res.ok) throw new Error(`Error fetching Patients Table from API`);
    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.error(`Error executing handleFetchPacs:\n${(e as Error).message}`);
  }
}