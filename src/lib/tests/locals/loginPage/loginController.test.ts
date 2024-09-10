//v1.0.0
import {
  addListenerShowPw,
  callbackShowPw,
  evaluateClickMovements,
  clickAttempt,
  callbackSubmitBtn,
  tryDetails,
} from "../../../locals/loginPage/loginController";
describe("addListenerShowPw", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <span id="spanShowPw"></span>
    `;
  });
  it("should add an event listener to the span element", () => {
    const span = document.getElementById("spanShowPw");
    if (span) {
      const spy = jest.spyOn(span, "addEventListener");
      addListenerShowPw();
      expect(spy).toHaveBeenCalledWith("click", expect.any(Function));
    } else throw new Error("spanShowPw element not found");
  });
  it("should throw an error if the span element is not found", () => {
    document.body.innerHTML = "";
    expect(() => addListenerShowPw()).toThrow(
      "Element not found: spanShowPw in addListenerShowPw()"
    );
  });
});
describe("callbackShowPw", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <span id="spanShowPw">
        <svg class="bi bi-eye-fill"></svg>
      </span>
      <input type="password" id="pw" />
    `;
  });
  it("should change password input type to text and switch the icon to eye-slash", () => {
    const span = document.getElementById("spanShowPw");
    callbackShowPw(span);
    expect((document.getElementById("pw") as HTMLInputElement)?.type).toBe(
      "text"
    );
    expect(span?.querySelector(".bi")?.outerHTML).toContain(
      "bi-eye-slash-fill"
    );
  });
  it("should change password input type back to password and switch the icon to eye-fill", () => {
    document.body.innerHTML = `
      <span id="spanShowPw">
        <svg class="bi bi-eye-slash-fill"></svg>
      </span>
      <input type="text" id="pw" />
    `;
    const span = document.getElementById("spanShowPw")!;
    callbackShowPw(span);
    expect((document.getElementById("pw") as HTMLInputElement)?.type).toBe(
      "password"
    );
    expect(span.querySelector(".bi")?.outerHTML).toContain("bi-eye-fill");
  });
  it("should throw an error if the password input is not found", () => {
    document.body.innerHTML = `<span id="spanShowPw"></span>`;
    expect(() => callbackShowPw(document.getElementById("spanShowPw"))).toThrow(
      "Element not found: pwInp in callbackShowPw()"
    );
  });
});
describe("evaluateClickMovements", () => {
  let mockEvent: any;
  beforeEach(() => {
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
  it("should return an error message for an untrusted event", () => {
    mockEvent.isTrusted = false;
    const [message, suspicious] = evaluateClickMovements(mockEvent);
    expect(message).toBe(
      "Evento de mouse não confiável. Por favor aguarde para tentar novamente."
    );
    expect(suspicious).toBe(true);
  });
  it("should return an error message if the mouse is moved", () => {
    mockEvent.movementX = 5;
    const [message, suspicious] = evaluateClickMovements(mockEvent);
    expect(message).toBe(
      "Movimento de mouse não confiável. Por favor aguarde para tentar novamente."
    );
    expect(suspicious).toBe(true);
  });
  it("should validate the attempt if no movement is detected", () => {
    const [message, suspicious] = evaluateClickMovements(mockEvent);
    expect(message).toBe("Attempt validated.");
    expect(suspicious).toBe(false);
  });
  it("should track clientX and clientY movements", () => {
    clickAttempt.shouldEvaluateClient = true;
    clickAttempt.clientAttempt = 2;
    clickAttempt.lastClickX = 100;
    clickAttempt.lastClickY = 100;
    const [message, suspicious] = evaluateClickMovements(mockEvent);
    expect(message).toBe(
      "Deslocamento de mouse não confiável. Por favor aguarde para tentar novamente."
    );
    expect(suspicious).toBe(true);
  });
});
describe("callbackSubmitBtn", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input type="text" id="user" />
      <input type="password" id="pw" />
      <button id="submitBtn"></button>
    `;
    tryDetails.attempts = 0;
    tryDetails.timeAcc = 0;
  });
  it("should validate the user input and password successfully", () => {
    (document.getElementById("pw") as HTMLInputElement).value = "ValidUser";
    (document.getElementById("pw") as HTMLInputElement).value =
      "ValidPassword1!";
    expect(callbackSubmitBtn()).toBe(true);
  });
  it("should set an invalid custom message for an invalid user input", () => {
    const userInput = document.getElementById("user") as HTMLInputElement;
    userInput.value = "usr";
    expect(callbackSubmitBtn()).toBe(false);
    expect(userInput.placeholder).toBe("Usuário inválido");
  });
  it("should disable the submit button after 4 attempts", () => {
    const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
    tryDetails.attempts = 5;
    callbackSubmitBtn();
    expect(submitBtn.disabled).toBe(true);
    jest.advanceTimersByTime(3000);
    expect(submitBtn.disabled).toBe(false);
  });
  it("should throw an error if the user input is not found", () => {
    document.body.innerHTML = `<input type="password" id="pw" />`;
    expect(callbackSubmitBtn).toThrowError(
      "Element not found: userInp in callbackSubmitBtn()"
    );
  });
});
