"use client";
import { basePath, navigatorVars } from "@/vars";
import { clearDefInvalidMsg, resetPhs } from "@/lib/global/gStyleScript";
import { handleLogin } from "@/lib/global/auth";
import { nullishAnchor, nlFm, nlHtEl, nlSpan } from "@/lib/global/declarations/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { elementNotFound, extLine, inputNotFound, multipleElementsNotFound } from "@/lib/global/handlers/errorHandler";
import { callbackShowPw, callbackSubmitBtn } from "@/lib/locals/loginPage/loginController";
import Link from "next/link";
import { assignFormAttrs } from "@/lib/global/gModel";
import Spinner from "../../icons/Spinner";
import { useRouter } from "next/router";
import { ClickEvaluator } from "@/lib/global/declarations/classes";
import { defUser, setFullUser } from "@/redux/slices/userSlice";
import toast from "react-hot-toast";
import sLp from "@/styles/modules/loginStyles.module.scss";
export default function LoginInputs(): JSX.Element {
  let isSpinning = false;
  const anchorRef = useRef<nullishAnchor>(null),
    formRef = useRef<nlFm>(null),
    spanRef = useRef<nlSpan>(null),
    router = useRouter(),
    [msg, setMsg] = useState<string | JSX.Element>(""),
    formToasted = useRef<boolean>(false),
    serverToasted = useRef<boolean>(false),
    exeLogin = useCallback(
      (resSpan: nlHtEl): void => {
        try {
          if (!(formRef.current instanceof HTMLFormElement)) throw new Error(`Failed to validate form instance`);
          if (!(resSpan instanceof HTMLElement)) throw new Error(`Failed to validate span reference`);
          const uW = document.getElementById("userWarn");
          if (uW instanceof HTMLElement) uW.style.display = "none";
          const spin = (): void => {
            isSpinning = true;
            setMsg(<Spinner fs={true} />);
            const form = document.getElementById("loginCont") ?? formRef.current ?? resSpan.closest("form");
            if (form instanceof HTMLElement) {
              form.style.opacity = "0.3";
              form.style.filter = "grayscale(40%)";
            }
          };
          if (typeof router === "object" && "beforePopState" in router && "push" in router && !isSpinning) {
            spin();
            navigatorVars.pt
              ? toast.promise(new Promise(resolve => setTimeout(() => resolve("Loading..."), 1000)), {
                  loading: "Avaliando dados...",
                  success: (
                    <div>
                      <div>
                        Esta é apenas uma versão de <b>teste estático do sistema.</b>
                      </div>
                      <div>
                        O login irá prosseguir <em>independente da validez do formulário.</em>
                      </div>
                    </div>
                  ),
                  error: <b>Erro!</b>,
                })
              : toast.promise(new Promise(resolve => setTimeout(() => resolve("Loading..."), 1000)), {
                  loading: "Checking data...",
                  success: (
                    <div>
                      <div>
                        This is a <b>client-only, static version of the system</b>
                      </div>
                      The login will be forwarded <em>regardless of the form validity</em>.
                    </div>
                  ),
                  error: <b>Error.</b>,
                });
            router.beforePopState(() => {
              return true;
            });
            setTimeout(() => {
              const spinTime =
                parseFloat(
                  document
                    .getAnimations()
                    .find(a => (a as CSSAnimation).animationName === "spinner-border")
                    ?.timeline?.currentTime?.toString() ?? "",
                ) -
                parseFloat(
                  document
                    .getAnimations()
                    .find(a => (a as CSSAnimation).animationName === "spinner-border")
                    ?.startTime?.toString() ?? "",
                );
              setTimeout(
                () => {
                  localStorage.removeItem("pw");
                  localStorage.setItem("authorized", "true");
                  router.push("/base");
                },
                Number.isFinite(spinTime) ? spinTime * 1.5 : 2000,
              );
            }, 1200);
          } else {
            if (!isSpinning) {
              spin();
              navigatorVars.pt
                ? toast.promise(new Promise(resolve => setTimeout(() => resolve("Loading..."), 1000)), {
                    loading: "Entrando...",
                    success: (
                      <div>
                        <div>
                          Esta é apenas uma versão de <b>teste estático do sistema.</b>
                        </div>
                        <div>
                          O login irá prosseguir <em>independente da validez do formulário.</em>
                        </div>
                      </div>
                    ),
                    error: <b>Erro!</b>,
                  })
                : toast.promise(new Promise(resolve => setTimeout(() => resolve("Loading..."), 1000)), {
                    loading: "Logging in...",
                    success: (
                      <div>
                        <div>
                          This is a <b>client-only, static version of the system</b>
                        </div>
                        The login will be forwarded <em>regardless of the form validity</em>.
                      </div>
                    ),
                    error: <b>Error.</b>,
                  });
              setTimeout(() => (location.href = "/base"), 1000);
            }
          }
        } catch (e) {
          console.error(`Error executing exeLogin:\n${(e as Error).message}`);
        }
      },
      [router, formRef],
    );
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
    const form = formRef.current ?? document.querySelector("form"),
      inps = Array.from(document.querySelectorAll("input"));
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
  useEffect(() => {
    assignFormAttrs(formRef.current ?? document.querySelector("form"));
  });
  useEffect(() => {
    const handleEnter = (ev: KeyboardEvent): void => {
      try {
        if (!anchorRef.current) return;
        if (ev.code === "Enter") {
          anchorRef.current.focus();
          setTimeout(() => {
            if (!anchorRef.current) return;
            anchorRef.current.click();
          }, 200);
        }
      } catch (e) {
        console.error(`Error executing handleEnter:\n${(e as Error).message}`);
      }
    };
    if (!anchorRef.current) return;
    addEventListener("keyup", handleEnter);
    (): void => removeEventListener("keyup", handleEnter);
  }, [anchorRef]);
  useEffect(() => {
    localStorage.setItem("authorized", "false");
    localStorage.setItem("activeUser", "");
  }, []);
  useEffect(() => {
    const untoast = (): void => toast.dismiss();
    addEventListener("popstate", untoast);
    if (typeof msg === "string" && /[a-z]/g.test(msg) && !serverToasted.current) {
      const id = toast.error(msg);
      setTimeout(() => toast.dismiss(id), 1500);
      serverToasted.current = true;
      setTimeout(() => (serverToasted.current = false), 2000);
    }
    return (): void => removeEventListener("popstate", untoast);
  }, [msg]);
  return (
    <form
      ref={formRef}
      id='inputCont'
      name='login_form'
      action='check_user_validity'
      encType='application/x-www-form-urlencoded'
      method='post'
      target='_self'
      autoComplete='on'
      className={`${sLp.inputCont}`}>
      <div role='group' className={`${sLp.loginInputCont1}`}>
        <div role='group'>
          <input
            className={`form-control fade-in-element ${sLp.userInput}`}
            id='user'
            name='user_name'
            type='text'
            aria-label='email ou usuário'
            aria-describedby='userWarn'
            placeholder='Nome de Usuário'
            title='Por favor, preencha este
			          campo.'
            minLength={5}
            maxLength={30}
            data-title='Usuário'
            autoComplete='username'
            required
            autoFocus
            onInput={ev => localStorage.setItem("user", btoa(ev.currentTarget.value))}
          />
        </div>
      </div>
      <small className={`customValidityWarn ${sLp.customValidityWarn}`} id='userWarn'></small>
      <div role='group' className={`${sLp.loginInputCont1}`}>
        <div role='group' className={`${sLp.loginInputCont2}`}>
          <fieldset className={`form-control flexDiv fade-in-element ${sLp.loginInputCont3}`} id='loginInputCont3'>
            <input
              className={`fade-in-element form-control userInput ${sLp.pw} ${sLp.userInput}`}
              id='pw'
              name='pw'
              type='password'
              autoComplete='password'
              aria-label='senha'
              aria-describedby='pwWarn'
              placeholder='Senha'
              pattern='^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?=.{8,})(?:(?!.*\s).)*(?!.*(.).*\1{4,}).*$'
              minLength={8}
              maxLength={30}
              required
              onInput={ev => localStorage.setItem("pw", btoa(ev.currentTarget.value))}
            />
            <button
              type='button'
              id='spanShowPw'
              aria-label='Alterar visualização de senha'
              className={`halfL fadeInLateElement ${sLp.spanShowPw}`}
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
      <small className={`customValidityWarn ${sLp.customValidityWarn}`} id='pwWarn' ref={spanRef}>
        {msg}
      </small>
      <nav className={`${sLp.loginBtnCont}`} id='loginBtnCont'>
        <Link
          id='recover'
          className={`fadeInLateElement ${sLp.recover}`}
          href='/recover'
          rel='nofollow noreferrer'
          target='_self'>
          Esqueci minha senha
        </Link>
        <button
          type='button'
          className={`btn btn-primary fade-in-element ${sLp.submitBtn}`}
          id='submitBtn'
          onClick={ev => {
            ev.preventDefault();
            if (
              ev.currentTarget instanceof Element &&
              ev.currentTarget.firstElementChild instanceof HTMLAnchorElement
            ) {
              localStorage.setItem("shouldTrustNavigate", "true");
              ev.currentTarget.firstElementChild.click();
            }
          }}>
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
              const [message, suspicious] = new ClickEvaluator().evaluateClickMovements(ev);
              if (suspicious || !callbackSubmitBtn) {
                toast.error(message);
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
              const { ok, msg } = callbackSubmitBtn();
              if (!ok) {
                if (formToasted.current) return;
                const toastId = toast.error(msg);
                setTimeout(() => toast.dismiss(toastId), 1500);
                formToasted.current = true;
                setTimeout(() => (formToasted.current = false), 2000);
              }
              setTimeout(() => {
                handleLogin(ev, loginForm, true).then(res => {
                  if (res.valid) {
                    exeLogin(spanRef.current);
                    setFullUser({ v: defUser });
                  } else setMsg(res.message);
                });
              }, 300);
            }}>
            Avançar
          </Link>
        </button>
      </nav>
    </form>
  );
}
