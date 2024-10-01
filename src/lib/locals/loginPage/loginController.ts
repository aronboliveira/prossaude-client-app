import { checkPasswordPattern } from "../../global/gModel";
import { targEl } from "../../global/declarations/types";
import { fillCustomValidityWarn, highlightChange } from "../../global/gStyleScript";
import { extLine, elementNotFound, inputNotFound } from "../../global/handlers/errorHandler";
export function addListenerShowPw(): targEl {
  const spanShowPw = document.getElementById("spanShowPw");

  if (spanShowPw instanceof HTMLElement) {
    spanShowPw.addEventListener("click", () => {
      callbackShowPw(spanShowPw);
    });
  } else elementNotFound(spanShowPw, "spanShowPw in addListenerShowPw()", extLine(new Error()));
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
    } else inputNotFound(pwInp, "pwInp in callbackShowPw()", extLine(new Error()));
  } else elementNotFound(spanShowPw, "spanShowPw in callbackShowPw()", extLine(new Error()));
}
export const clickAttempt: {
  shouldEvaluateTime: boolean;
  shouldEvaluateClient: boolean;
  clientAttempt: number;
  lastClickTime: number;
  lastClickX: number;
  lastClickY: number;
} = {
  shouldEvaluateTime: false,
  shouldEvaluateClient: false,
  clientAttempt: 0,
  lastClickTime: 0,
  lastClickX: 0,
  lastClickY: 0,
};
export const tryDetails: {
  attempts: number;
  timeAcc: number;
} = {
  attempts: 0,
  timeAcc: 0,
};
export function callbackSubmitBtn(): boolean {
  try {
    tryDetails.attempts += 1;
    if (tryDetails.attempts > 0) {
      tryDetails.timeAcc += new Date().getTime();
      if (tryDetails.attempts > 4) {
        const submitBtn = document.getElementById("submitBtn") || document.querySelector('a[href*="/base"]');
        if (submitBtn instanceof HTMLButtonElement || submitBtn instanceof HTMLInputElement) submitBtn.disabled = true;
        alert("Tentativas excedidas para o intervalo de tempo. Aguarde para tentat novamente.");
        setTimeout(() => {
          const submitBtn = document.getElementById("submitBtn") || document.querySelector('a[href*="/base"]');
          if (submitBtn instanceof HTMLButtonElement || submitBtn instanceof HTMLInputElement)
            submitBtn.disabled = false;
        }, 3000);
      }
      setTimeout(() => {
        tryDetails.attempts = 0;
      }, 10000);
    }
    const pwInp = document.getElementById("pw");
    const userInp = document.getElementById("user");
    if (!(userInp instanceof HTMLInputElement))
      throw inputNotFound(userInp, "userInp in callbackSubmitBtn()", extLine(new Error()));

    if (!(pwInp instanceof HTMLInputElement))
      throw inputNotFound(pwInp, "pwInp in callbackSubmitBtn()", extLine(new Error()));
    if (
      userInp.value.length < 5 ||
      userInp.value.length > 30 ||
      /\s/g.test(userInp.value) ||
      !userInp.checkValidity()
    ) {
      userInp.placeholder = "Usuário inválido";
      highlightChange(userInp);
      let message = "";
      if (userInp.value.length < 5) message += "O usuário deve ter ao mínimo 5 caracteres!\n";
      if (userInp.value.length > 30) message += "O usuário deve ter no máximo 30 caracteres!\n";
      if (/\s/g.test(userInp.value)) message += "O usuário não pode ter espaços!\n";
      const v = userInp.validity;
      if (v.badInput || v.typeMismatch) message += "Tipo de entrada indevida\n";
      if (v.patternMismatch) message += "Padrão solicitado não cumprido\n";
      if (v.tooShort || v.valueMissing) message += "Entrada com falta de caracteres\n";
      if (v.tooLong) message += "Entrada com excesso de caracteres\n";
      userInp.setCustomValidity(message);
      fillCustomValidityWarn(userInp.id ?? "", message);
      console.warn(message);
      setTimeout(() => (userInp.placeholder = "Nome de Usuário"), 5000);
      return false;
    }
    checkPasswordPattern(pwInp);
    highlightChange(pwInp.parentElement);
    const pw = pwInp.value;
    if (
      pw.length < 8 ||
      pw.length > 30 ||
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?=.{8,})(?:(?!.*\s).)*(?!.*(.).*\1{4,}).*$/.test(pw) ||
      !pwInp.checkValidity()
    ) {
      pwInp.placeholder = "Senha inválida";
      let message = "";
      setTimeout(() => {
        pwInp.placeholder = "Senha";
      }, 5000);
      if (pw.length < 8) message += "A senha deve conter ao menos 8 caracteres\n";
      if (pw.length > 30) message += "A senha deve conter no máximo 8 caracteres\n";
      if (/\s/.test(pw)) message += "Espaços em branco não permitidos\n";
      if (/[a-zA-Z]/.test(pw)) {
        if (!/[A-Z]/g.test(pw)) message += "A senha deve ter ao menos um caractere maiúsculo\n";
        if (!/[a-z]/g.test(pw)) message += "A senha deve ter ao menos um caractere minúsculo\n";
      } else message += "A senha deve conter pelo menos um caractere alfabético\n";
      if (!/[0-9]/g.test(pw)) message += "A senha deve conter pelo menos um número\n";
      if (!/[^a-zA-Z0-9]/.test(pw)) message += "A senha deve conter ao menos um caractere especial ou simbólico.";
      const v = pwInp.validity;
      if (v.badInput || v.typeMismatch) message += "Tipo de entrada indevida\n";
      if (v.patternMismatch) message += "Padrão solicitado não cumprido\n";
      if (v.tooShort || v.valueMissing) message += "Entrada com falta de caracteres\n";
      if (v.tooLong) userInp.placeholder += "Entrada com excesso de caracteres\n";
      pwInp.setCustomValidity(message);
      fillCustomValidityWarn(pwInp.id ?? "", message);
      console.warn(message);
      return false;
    }
    return true;
  } catch (e) {
    console.error(`Error executing callbackSubmitBtn:\n${(e as Error).message}`);
    return false;
  }
}
