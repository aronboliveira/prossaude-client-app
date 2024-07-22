"use client";

import { useEffect, useRef } from "react";
import { clearDefInvalidMsg, resetPhs } from "@/lib/global/gStyleScript";
import {
  elementNotFound,
  extLine,
  multipleElementsNotFound,
} from "@/lib/global/handlers/errorHandler";
import {
  callbackShowPw,
  callbackSubmitBtn,
} from "@/lib/locals/loginPage/loginController";
import { useRouter } from "next/router";
import { basePath } from "../../../src/pages";
import { nullishAnchor } from "@/lib/global/declarations/types";

export default function LoginInputs(): JSX.Element {
  const router = useRouter();
  const anchorRef = useRef<nullishAnchor>(null);
  useEffect(() => {
    try {
      if (!(anchorRef.current instanceof HTMLAnchorElement))
        throw elementNotFound(
          anchorRef.current,
          "Anchor Reference in Login Page",
          extLine(new Error())
        );
      if (
        /undefined/gi.test(anchorRef.current.href) &&
        !/http:/gi.test(anchorRef.current.href)
      )
        anchorRef.current.href = anchorRef.current.href.replace(
          "undefined",
          `${location.href.replace(location.pathname, "")}`
        );
    } catch (e) {
      console.error(
        `Error executing procedure for adjusting anchor href:\n${
          (e as Error).message
        }`
      );
    }
    const form = document.querySelector("form");
    const inps = Array.from(document.querySelectorAll("input"));
    form instanceof HTMLFormElement && inps.length > 0
      ? clearDefInvalidMsg(form, inps)
      : multipleElementsNotFound(
          extLine(new Error()),
          "argument for clearDefInvalidMsg in DOM initialization",
          form,
          ...inps
        );
    resetPhs(inps, {
      user: "Nome de Usuário",
      pw: "Senha",
    });
  }, []);
  return (
    <section id="inputCont">
      <div role="group" className="loginInputCont1">
        <div role="group" id="loginInputCont2">
          <input
            className="form-control fade-in-element userInput"
            id="user"
            type="text"
            aria-label="email ou usuário"
            placeholder="Nome de Usuário"
            title="Por favor, preencha este
			campo."
            minLength={5}
            maxLength={30}
            data-title="Usuário"
            required
          />
        </div>
      </div>
      <small
        className="customValidityWarn"
        id="userWarn"
        role="textbox"
      ></small>
      <div role="group" className="loginInputCont1">
        <div role="group" className="loginInputCont2">
          <fieldset
            className="form-control flexDiv fade-in-element"
            id="loginInputCont3"
          >
            <input
              className="fade-in-element form-control userInput"
              id="pw"
              type="password"
              autoComplete="password"
              aria-label="senha"
              placeholder="Senha"
              pattern="^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$"
              minLength={1}
              maxLength={30}
              required
            />
            <button
              type="button"
              id="spanShowPw"
              className="halfL fade-in-late-element"
              onClick={ev => callbackShowPw(ev.currentTarget)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-eye-fill"
                viewBox="0 0 16 16"
              >
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
              </svg>
            </button>
          </fieldset>
        </div>
      </div>
      <small className="customValidityWarn" id="pwWarn" role="textbox"></small>
      <nav id="loginBtnCont">
        <a
          id="newAccA"
          className="fade-in-late-element"
          href="#"
          target="_blank"
        >
          Criar Conta
        </a>
        <button
          type="submit"
          className="btn btn-primary fade-in-element"
          id="submitBtn"
        >
          <a
            ref={anchorRef}
            id="submitLogin"
            target="_self"
            href={`${basePath.path}/base`}
            style={{ color: "#ffff" }}
            onClick={ev => {
              const autorizado = true;
              if (autorizado) router.push("/base");
              const loginForm = document.getElementById("outerLoginCont");
              callbackSubmitBtn(
                ev.currentTarget.closest("button"),
                new SubmitEvent("submit", {
                  submitter: loginForm,
                  bubbles: true,
                  cancelable: true,
                  composed: true,
                })
              );
            }}
          >
            Avançar
          </a>
        </button>
      </nav>
    </section>
  );
}
