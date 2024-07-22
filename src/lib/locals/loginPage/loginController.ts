import { checkPasswordPattern } from "../../global/gModel";
import {
  fillCustomValidityWarn,
  highlightChange,
} from "../../global/gStyleScript";
import {
  extLine,
  elementNotFound,
  inputNotFound,
} from "../../global/handlers/errorHandler";
import { targEl } from "../../global/declarations/types";

export function addListenerShowPw(): targEl {
  const spanShowPw = document.getElementById("spanShowPw");

  if (spanShowPw instanceof HTMLElement) {
    spanShowPw.addEventListener("click", () => {
      callbackShowPw(spanShowPw);
    });
  } else
    elementNotFound(
      spanShowPw,
      "spanShowPw in addListenerShowPw()",
      extLine(new Error())
    );
  return spanShowPw;
}

export function callbackShowPw(spanShowPw: targEl): void {
  if (spanShowPw instanceof HTMLElement) {
    const innerIcon = spanShowPw.querySelector(".bi");
    const pwInp = document.getElementById("pw");
    if (pwInp instanceof HTMLInputElement) {
      if (innerIcon?.classList.contains("bi-eye-fill")) {
        pwInp.type = "text";
        spanShowPw.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
        </svg>
        `;
      } else if (innerIcon?.classList.contains("bi-eye-slash-fill")) {
        pwInp.type = "password";
        spanShowPw.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
        </svg>
        `;
      } else console.error(`innerIcon class not validated`);
    } else
      inputNotFound(pwInp, "pwInp in callbackShowPw()", extLine(new Error()));
  } else
    elementNotFound(
      spanShowPw,
      "spanShowPw in callbackShowPw()",
      extLine(new Error())
    );
}

export function addListenerSubmitBtn(): targEl {
  const submitBtn = document.getElementById("submitBtn");
  const loginForm = document.getElementById("outerLoginCont");
  if (
    submitBtn instanceof HTMLButtonElement &&
    loginForm instanceof HTMLFormElement
  ) {
    submitBtn.addEventListener("click", () => {
      callbackSubmitBtn(
        submitBtn,
        new SubmitEvent("submit", {
          submitter: loginForm,
          bubbles: true,
          cancelable: true,
          composed: true,
        })
      );
    });
  } else
    elementNotFound(
      submitBtn,
      "submitBtn in DOM inicialization",
      extLine(new Error())
    );
  return submitBtn;
}

export function callbackSubmitBtn(submitBtn: targEl, ev: SubmitEvent): void {
  if (submitBtn instanceof HTMLButtonElement) {
    const pwInp = document.getElementById("pw");
    const userInp = document.getElementById("user");
    if (pwInp instanceof HTMLInputElement) {
      !/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(
        pwInp.value
      )
        ? (() => {
            ev.preventDefault();
            checkPasswordPattern(pwInp);
            highlightChange(pwInp.parentElement);
            if (!pwInp.checkValidity()) {
              pwInp.placeholder = "Senha inválida";
              fillCustomValidityWarn(pwInp.id ?? "", "Senha inválida");
            }
            setTimeout(() => {
              pwInp.placeholder = "Senha";
            }, 5000);
          })()
        : (() => {
            pwInp.setCustomValidity("");
          })();
    } else
      inputNotFound(
        pwInp,
        "pwInp in callbackSubmitBtn()",
        extLine(new Error())
      );
    if (userInp instanceof HTMLInputElement) {
      const userValue = userInp.value;
      if (userValue.length < 5) {
        ev.preventDefault();
        highlightChange(userInp);
        userInp.setCustomValidity("O usuário deve ter ao mínimo 5 caracteres");
        if (!userInp.checkValidity()) {
          userInp.placeholder = "Usuário inválido";
          fillCustomValidityWarn(userInp.id ?? "", "Usuário inválido");
        }
        setTimeout(() => {
          userInp.placeholder = "Nome de Usuário";
        }, 5000);
      }
    } else
      inputNotFound(
        userInp,
        "userInp in callbackSubmitBtn()",
        extLine(new Error())
      );
  } else
    elementNotFound(
      submitBtn,
      "submitBtn in callbackSubmitBtn()",
      extLine(new Error())
    );
}
