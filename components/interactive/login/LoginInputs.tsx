"use client";
import { basePath } from "../../../src/pages";
import { clearDefInvalidMsg, resetPhs } from "@/lib/global/gStyleScript";
import { handleLogin } from "@/pages/api/ts/handlers";
import { nullishAnchor } from "@/lib/global/declarations/types";
import { useEffect, useRef } from "react";
import { elementNotFound, extLine, inputNotFound, multipleElementsNotFound } from "@/lib/global/handlers/errorHandler";
import { callbackShowPw, callbackSubmitBtn, evaluateClickMovements } from "@/lib/locals/loginPage/loginController";
import Link from "next/link";
import { assignFormAttrs } from "@/lib/global/gModel";
export default function LoginInputs(): JSX.Element {
  const anchorRef = useRef<nullishAnchor>(null);
  useEffect(() => {
    try {
      if (!(anchorRef.current instanceof HTMLAnchorElement))
        throw elementNotFound(anchorRef.current, "Anchor Reference in Login Page", extLine(new Error()));
      if (/undefined/gi.test(anchorRef.current.href) && !/http:/gi.test(anchorRef.current.href))
        anchorRef.current.href = anchorRef.current.href.replace(
          "undefined",
          `${location.href.replace(location.pathname, "")}`,
        );
    } catch (e) {
      console.error(`Error executing procedure for adjusting anchor href:\n${(e as Error).message}`);
    }
    const form = document.querySelector("form");
    const inps = Array.from(document.querySelectorAll("input"));
    assignFormAttrs(form);
    form instanceof HTMLFormElement && inps.length > 0
      ? clearDefInvalidMsg(form, inps)
      : multipleElementsNotFound(
          extLine(new Error()),
          "argument for clearDefInvalidMsg in DOM initialization",
          form,
          ...inps,
        );
    resetPhs(inps, {
      user: "Nome de Usuário",
      pw: "Senha",
    });
  }, []);
  return (
    <section id='inputCont'>
      <div role='group' className='loginInputCont1'>
        <div role='group' id='loginInputCont2'>
          <input
            className='form-control fade-in-element userInput'
            id='user'
            name='user_name'
            type='text'
            aria-label='email ou usuário'
            placeholder='Nome de Usuário'
            title='Por favor, preencha este
			      campo.'
            minLength={5}
            maxLength={30}
            data-title='Usuário'
            autoComplete='username'
            required
          />
        </div>
      </div>
      <small className='customValidityWarn' id='userWarn' role='textbox'></small>
      <div role='group' className='loginInputCont1'>
        <div role='group' className='loginInputCont2'>
          <fieldset className='form-control flexDiv fade-in-element' id='loginInputCont3'>
            <input
              className='fade-in-element form-control userInput'
              id='pw'
              name='pw'
              type='password'
              autoComplete='password'
              aria-label='senha'
              placeholder='Senha'
              pattern='^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?=.{8,})(?:(?!.*\s).)*(?!.*(.).*\1{4,}).*$'
              minLength={8}
              maxLength={30}
              required
            />
            <button
              type='button'
              id='spanShowPw'
              className='halfL fade-in-late-element'
              onClick={ev => callbackShowPw(ev.currentTarget)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-eye-fill'
                viewBox='0 0 16 16'>
                <path d='M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0' />
                <path d='M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7' />
              </svg>
            </button>
          </fieldset>
        </div>
      </div>
      <small className='customValidityWarn' id='pwWarn' role='textbox'></small>
      <nav id='loginBtnCont'>
        <Link id='recover' className='fade-in-late-element' href='/recover' rel='nofollow noreferrer' target='_self'>
          Esqueci minha senha
        </Link>
        <button
          type='submit'
          className='btn btn-primary fade-in-element'
          id='submitBtn'
          onClick={ev => ev.preventDefault()}>
          <Link
            href={`${basePath.path}/base`}
            ref={anchorRef}
            id='submitLogin'
            rel='nofollow noreferrer'
            target='_self'
            style={{ color: "#ffff" }}
            onClick={ev => {
              ev.preventDefault();
              const loginForm = new FormData();
              let userName = "";
              try {
                const usernameEl = document.getElementById("user");
                if (!(usernameEl instanceof HTMLInputElement))
                  throw inputNotFound(usernameEl, `Validation of User name element`, extLine(new Error()));
                userName = usernameEl.value;
              } catch (e) {
                console.error(`Error executing fetch of user name from element:\n${(e as Error).message}`);
              }
              loginForm.append("username", userName);
              let pw = "";
              try {
                const pwEl = document.getElementById("pw");
                if (!(pwEl instanceof HTMLInputElement))
                  throw inputNotFound(pwEl, `Validation of password element instance`, extLine(new Error()));
                pw = pwEl.value;
              } catch (e) {
                console.error(`Error reading password value:${(e as Error).message}`);
              }
              loginForm.append("password", pw);
              const [message, suspicious] = evaluateClickMovements(ev);
              if (suspicious || !callbackSubmitBtn) {
                alert(message);
                const parent = ev.currentTarget.parentElement;
                let parentIdf = "";
                if (parent instanceof HTMLButtonElement || parent instanceof HTMLInputElement) {
                  parent.disabled = true;
                  parentIdf = parent.id;
                }
                setTimeout(() => {
                  const parent = ev.currentTarget?.parentElement || document.getElementById(parentIdf);
                  if (parent instanceof HTMLButtonElement || parent instanceof HTMLInputElement)
                    parent.disabled = false;
                }, 3000);
                return;
              }
              callbackSubmitBtn();
              setTimeout(() => {
                handleLogin(ev, loginForm, true);
              }, 300);
              alert(
                "This is a client only, static, test execution. The login will be forwarded regardless of the form validity.",
              );
            }}>
            Avançar
          </Link>
        </button>
      </nav>
    </section>
  );
}
