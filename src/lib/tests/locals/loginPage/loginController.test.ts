//v1.0.0
import { InputType } from "zlib";
import {
  addListenerShowPw,
  callbackShowPw,
  evaluateClickMovements,
  clickAttempt,
  callbackSubmitBtn,
  tryDetails,
} from "../../../locals/loginPage/loginController";
import { BootstrapIconClass, DOMEvent, EventTargetMethod } from "../../testVars";
import { targEl } from "@/lib/global/declarations/types";
describe("addListenerShowPw", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = `
      <span id="spanShowPw"></span>
    `;
  });
  it("should add an event listener to the span element", (): void => {
    const span = document.getElementById("spanShowPw");
    if (span) {
      addListenerShowPw();
      expect(jest.spyOn<HTMLElement, EventTargetMethod>(span, "addEventListener")).toHaveBeenCalledWith<
        [DOMEvent, any]
      >("click", expect.any(Function) as any);
    } else throw new Error("spanShowPw element not found");
  });
  it("should throw an error if the span element is not found", (): void => {
    document.body.innerHTML = "";
    expect((): targEl => addListenerShowPw()).toThrow("Element not found: spanShowPw in addListenerShowPw()");
  });
});
describe("callbackShowPw", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = `
      <span id="spanShowPw">
        <svg class="bi bi-eye-fill"></svg>
      </span>
      <input type="password" id="pw" />
    `;
  });
  it("should change password input type to text and switch the icon to eye-slash", (): void => {
    const span = document.getElementById("spanShowPw");
    callbackShowPw(span);
    expect((document.getElementById("pw") as HTMLInputElement)?.type).toBe<InputType>("text");
    expect(span?.querySelector(".bi")?.outerHTML).toContain<BootstrapIconClass>("bi-eye-slash-fill");
  });
  it("should change password input type back to password and switch the icon to eye-fill", (): void => {
    document.body.innerHTML = `
      <span id="spanShowPw">
        <svg class="bi bi-eye-slash-fill"></svg>
      </span>
      <input type="text" id="pw" />
    `;
    const span = document.getElementById("spanShowPw")!;
    callbackShowPw(span);
    expect((document.getElementById("pw") as HTMLInputElement)?.type).toBe<InputType>("password");
    expect(span.querySelector(".bi")?.outerHTML).toContain<BootstrapIconClass>("bi-eye-fill");
  });
  it("should throw an error if the password input is not found", (): void => {
    document.body.innerHTML = `<span id="spanShowPw"></span>`;
    expect((): void => callbackShowPw(document.getElementById("spanShowPw"))).toThrow(
      "Element not found: pwInp in callbackShowPw()"
    );
  });
});
describe("evaluateClickMovements", (): void => {
  let mockEvent: any;
  beforeEach((): void => {
    mockEvent = {
      movementX: 0,
      movementY: 0,
      isTrusted: true,
      clientX: 100,
      clientY: 100,
    };
    clickAttempt.shouldEvaluateClient = false;
    clickAttempt.shouldEvaluateTime = false;
    clickAttempt.clientAttempt = 0;
    clickAttempt.lastClickTime = 0;
  });
  it("should return an error message for an untrusted event", (): void => {
    mockEvent.isTrusted = false;
    const [message, suspicious] = evaluateClickMovements(mockEvent);
    expect(message).toBe<string>("Evento de mouse não confiável. Por favor aguarde para tentar novamente.");
    expect(suspicious).toBe<boolean>(true);
  });
  it("should return an error message if the mouse is moved", (): void => {
    mockEvent.movementX = 5;
    const [message, suspicious] = evaluateClickMovements(mockEvent);
    expect(message).toBe<string>("Movimento de mouse não confiável. Por favor aguarde para tentar novamente.");
    expect(suspicious).toBe<boolean>(true);
  });
  it("should validate the attempt if no movement is detected", (): void => {
    const [message, suspicious] = evaluateClickMovements(mockEvent);
    expect(message).toBe<string>("Attempt validated.");
    expect(suspicious).toBe<boolean>(false);
  });
  it("should track clientX and clientY movements", (): void => {
    clickAttempt.shouldEvaluateClient = true;
    clickAttempt.clientAttempt = 2;
    clickAttempt.lastClickX = 100;
    clickAttempt.lastClickY = 100;
    const [message, suspicious] = evaluateClickMovements(mockEvent);
    expect(message).toBe<string>("Deslocamento de mouse não confiável. Por favor aguarde para tentar novamente.");
    expect(suspicious).toBe<boolean>(true);
  });
});
describe("callbackSubmitBtn", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = `
      <input type="text" id="user" />
      <input type="password" id="pw" />
      <button id="submitBtn"></button>
    `;
    tryDetails.attempts = 0;
    tryDetails.timeAcc = 0;
  });
  it("should validate the user input and password successfully", (): void => {
    (document.getElementById("pw") as HTMLInputElement).value = "ValidUser";
    (document.getElementById("pw") as HTMLInputElement).value = "ValidPassword1!";
    expect(callbackSubmitBtn()).toBe<boolean>(true);
  });
  it("should set an invalid custom message for an invalid user input", (): void => {
    const userInput = document.getElementById("user") as HTMLInputElement;
    userInput.value = "usr";
    expect(callbackSubmitBtn()).toBe<boolean>(false);
    expect(userInput.placeholder).toBe<string>("Usuário inválido");
  });
  it("should disable the submit button after 4 attempts", (): void => {
    const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
    tryDetails.attempts = 5;
    callbackSubmitBtn();
    expect(submitBtn.disabled).toBe<boolean>(true);
    jest.advanceTimersByTime(3000);
    expect(submitBtn.disabled).toBe<boolean>(false);
  });
  it("should throw an error if the user input is not found", (): void => {
    document.body.innerHTML = `<input type="password" id="pw" />`;
    expect(callbackSubmitBtn).toThrow("Element not found: userInp in callbackSubmitBtn()");
  });
});
