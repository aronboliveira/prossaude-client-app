import { jwtDecode } from "jwt-decode";
import { ProfessionalTokenPayload, StudentTokenPayload } from "../locals/basePage/declarations/serverInterfaces";
import { defCurrSemester } from "@/redux/slices/userSlice";
import { rMouseEvent } from "./declarations/types";
import { NextRouter } from "next/router";
import Cookies from "js-cookie";
import { navigatorVars } from "@/vars";
export function decodeToken(
  token: string,
  UNDER_TEST: boolean = false,
): {
  ok: boolean;
  res: object;
} {
  try {
    if (!UNDER_TEST) {
      const decoded = jwtDecode<StudentTokenPayload | ProfessionalTokenPayload>(token);
      return {
        ok: true,
        res: decoded,
      };
    }
    return {
      ok: true,
      res: {
        loadedData: {
          id: "",
          name: "João Almeida",
          privilege: "coordinator",
          area: "psychology",
          origin: "psy",
          activityDay: "quarta-feira",
          beginningSemester: defCurrSemester,
          beginningDay: new Date().getDate().toString(),
          cpf: 0,
          email: "joaoteste@gmail.com",
          telephone: "+55 (21) 90000-0000",
          authorized: true,
          external: false,
        },
      },
    };
  } catch (e) {
    return {
      ok: false,
      res: {},
    };
  }
}
export async function handleLogin(
  ev: rMouseEvent,
  userData: FormData | [string, string],
  UNDER_TEST: boolean = true,
): Promise<{ valid: boolean; message: string }> {
  let status = 404;
  try {
    if (typeof ev !== "object") throw new Error(`Error validating typeof ev`);
    if (typeof UNDER_TEST !== "boolean") throw new Error(`Error validating typeof UNDER_TEST`);
    ev.preventDefault();
    if (!UNDER_TEST) {
      const res = await fetch("../api/django/check_user_validity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          Array.isArray(userData) ? userData.map(entry => [entry[0], entry[1]]) : userData.entries(),
        ),
      });
      if (!res.ok) {
        status = res.status;
        throw new Error(`Error validating user from API`);
      }
      const data = await res.json();
      if (res.status !== 200) {
        status = res.status;
        return {
          valid: false,
          message: `Failed to validate login: Error code ${res.status}`,
        };
      }
      if (!("access" in data)) {
        status = res.status;
        return {
          valid: false,
          message: `Failed to validate login: Error processing server response.`,
        };
      }
      Cookies.set("accessToken", data.access, {
        secure: true,
        sameSite: "strict",
        path: "/",
      });
      Cookies.set("refreshToken", data.access, {
        secure: true,
        sameSite: "strict",
        path: "/",
      });
      const { ok, res: user } = decodeToken(data);
      if (!ok) {
        status = res.status;
        return {
          valid: false,
          message: `Failed to validate login: Error validating token.`,
        };
      }
      localStorage.setItem("activeUser", JSON.stringify(user));
      return {
        valid: true,
        message: navigatorVars.pt ? "Carregando..." : "Loading...",
      };
    } else {
      localStorage.setItem("activeUser", JSON.stringify(decodeToken("", true).res));
      return {
        valid: true,
        message: navigatorVars.pt ? "Carregando..." : "Loading...",
      };
    }
  } catch (e) {
    return {
      valid: false,
      message: navigatorVars.pt
        ? `Falha na validação de login: Código de erro ${status}`
        : `Failed to validate login: Error code ${status}`,
    };
  }
}
export function execLogout(router: NextRouter): void {
  for (const item of ["authorized", "user", "pw", "timer", "loginTime"])
    localStorage.getItem(item) && localStorage.removeItem(item);
  router.push("/login");
}
