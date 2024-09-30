//v1.0.0
import {
  updateSimpleProperty,
  cursorCheckTimer,
  opRadioHandler,
  cpbInpHandler,
  deactTextInput,
  doubleClickHandler,
  useCurrentDate,
  searchNextSiblings,
  searchPreviousSiblings,
  searchPreviousSiblingsById,
  changeToAstDigit,
  defineLabId,
  resetarFormulario,
  enableCPFBtn,
  syncAriaStates,
  toggleTips,
  toggleConformDlg,
  validateForm,
  submitForm,
  handleCondtReq,
  handleEventReq,
} from "../../../global/handlers/gHandlers";
import {
  inputNotFound,
  multipleElementsNotFound,
  elementNotFound,
  elementNotPopulated,
} from "../../../global/handlers/errorHandler";
import { handleSubmit } from "../../../../pages/api/ts/handlers";
import { formCases } from "../../../../lib/global/declarations/types";
import {
  BirthRelation,
  CSSColor,
  ErrorHandler,
  HTMLDialogElementMethod,
  HTMLInputElementMethod,
  ISODate,
  InputType,
  PseudoBool,
  PseudoNum,
  SearchFunction,
  TransitionLevel,
  WindowMethods,
} from "../../testVars";
jest.mock(
  "../../../global/handlers/errorHandler",
  (): {
    extLine: jest.Mock<any, any, any>;
    inputNotFound: jest.Mock<any, any, any>;
    multipleElementsNotFound: jest.Mock<any, any, any>;
  } => ({
    extLine: (jest.fn() as jest.Mock).mockReturnValue("test-line"),
    inputNotFound: jest.fn() as jest.Mock,
    multipleElementsNotFound: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("gHandlers Tests", (): void => {
  describe("updateSimpleProperty", (): void => {
    it("should return the checked state for a radio or checkbox input", () => {
      const input = document.createElement("input") as HTMLInputElement;
      input.type = "checkbox" as InputType;
      input.checked = true;
      expect(updateSimpleProperty(input)).toBe<PseudoBool>("true");
    }) as void;
    it("should return the parsed value of a number input", () => {
      const input = document.createElement("input") as HTMLInputElement;
      input.type = "number" as InputType;
      input.value = "123" as PseudoNum;
      expect(updateSimpleProperty(input)).toBe<number>(123);
    }) as void;
    it("should return the text value for a regular input", () => {
      const input = document.createElement("input") as HTMLInputElement;
      input.type = "text" as InputType;
      input.value = "test";
      expect(updateSimpleProperty(input)).toBe<string>("test");
    }) as void;
    it("should call inputNotFound if the element is not recognized", () => {
      const element = document.createElement("div") as HTMLDivElement;
      updateSimpleProperty(element);
      expect(inputNotFound).toHaveBeenCalledWith<Parameters<typeof inputNotFound>>(
        element,
        "el in updateSimpleProperty",
        "test-line"
      );
    }) as void;
  }) as void;
  describe("cursorCheckTimer", (): void => {
    it("should return the start offset after 3 seconds if selection exists", done => {
      document.getSelection = (jest.fn() as jest.Mock as jest.Mock).mockReturnValue({
        focusNode: true,
        getRangeAt: (jest.fn() as jest.Mock as jest.Mock).mockReturnValue({ startOffset: 5 }),
      } as any);
      setTimeout((): void => {
        expect(cursorCheckTimer()).toBe<number>(5);
        done();
      }, 3000);
    }) as void;
    it("should return 0 if no selection exists", () => {
      document.getSelection = (jest.fn() as jest.Mock).mockReturnValue(null) as jest.Mock;
      expect(cursorCheckTimer()).toBe<number>(0);
    }) as void;
  }) as void;
  describe("opRadioHandler", (): void => {
    let keydownEvent: KeyboardEvent;
    let radioYes: HTMLInputElement;
    let radioNo: HTMLInputElement;
    beforeEach((): void => {
      keydownEvent = new KeyboardEvent("keydown", {
        altKey: true,
        key: "y",
      });
      radioYes = document.createElement("input") as HTMLInputElement;
      radioYes.type = "radio" as InputType;
      radioNo = document.createElement("input") as HTMLInputElement;
      radioNo.type = "radio" as InputType;
    }) as void;
    it("should check the 'Yes' radio when alt+y is pressed", () => {
      opRadioHandler(keydownEvent, [radioYes, radioNo]);
      expect(radioYes.checked).toBe<boolean>(true);
    }) as void;
    it("should call multipleElementsNotFound if validation fails", () => {
      const invalidRadio = document.createElement("div") as HTMLDivElement;
      opRadioHandler(keydownEvent, [invalidRadio, radioNo]);
      expect(multipleElementsNotFound).toHaveBeenCalledWith<Parameters<typeof multipleElementsNotFound>>(
        "test-line",
        "validando radioYes id UNDEFINED ID or radiosNo id UNDEFINED ID",
        invalidRadio,
        radioNo
      );
    }) as void;
  }) as void;
  describe("cpbInpHandler", (): void => {
    let radio: HTMLInputElement;
    let event: Event;
    beforeEach((): void => {
      radio = document.createElement("input") as HTMLInputElement;
      radio.type = "radio";
      event = new Event("click");
    }) as void;
    it("should fade in the divAdd element when the radio is checked", () => {
      const divAdd = document.createElement("div") as HTMLDivElement;
      divAdd.classList.add("divAdd");
      radio.id = "testYes";
      radio.checked = true;
      const parentDiv = document.createElement("div") as HTMLDivElement;
      parentDiv.appendChild(radio);
      parentDiv.appendChild(divAdd);
      document.body.appendChild(parentDiv);
      const setTimeoutSpy = jest
        //@ts-ignore
        .spyOn<Window, WindowMethods>(window, "setTimeout")
        //@ts-ignore
        .mockImplementation((callback: (...args: any[]) => void): any => {
          callback() as void;
          return {} as any;
        });
      cpbInpHandler(event, radio);
      expect(setTimeoutSpy).toHaveBeenCalled() as void;
      setTimeoutSpy.mockRestore() as void;
    }) as void;
    it("should set inputs in divAdd to required when radio is checked", () => {
      const divAdd = document.createElement("div") as HTMLDivElement;
      divAdd.classList.add("divAdd");
      radio.id = "testYes";
      radio.checked = true;
      const parentDiv = document.createElement("div") as HTMLDivElement;
      parentDiv.appendChild(radio);
      parentDiv.appendChild(divAdd);
      const textInput = document.createElement("input") as HTMLInputElement;
      textInput.type = "text";
      divAdd.appendChild(textInput);
      document.body.appendChild(parentDiv);
      cpbInpHandler(event, radio);
      expect(textInput.required).toBe<boolean>(true);
    }) as void;
    it("should fade out the divAdd element when the radio is unchecked", () => {
      const divAdd = document.createElement("div") as HTMLDivElement;
      divAdd.classList.add("divAdd");
      radio.id = "testYes";
      radio.checked = false;
      const parentDiv = document.createElement("div") as HTMLDivElement;
      parentDiv.appendChild(radio);
      parentDiv.appendChild(divAdd);
      document.body.appendChild(parentDiv);
      const setTimeoutSpy = jest
        //@ts-ignore
        .spyOn<Window, WindowMethods>(window, "setTimeout")
        //@ts-ignore
        .mockImplementation((callback: (...args: any[]) => void): any => {
          callback() as void;
          return {} as any;
        });
      cpbInpHandler(event, radio);
      expect(setTimeoutSpy).toHaveBeenCalled() as void;
      setTimeoutSpy.mockRestore() as void;
    }) as void;
    it("should call multipleElementsNotFound if the element structure is invalid", () => {
      const multipleElementsNotFoundSpy = jest.spyOn<any, ErrorHandler>(
        require("../../../global/handlers/errorHandler"),
        "multipleElementsNotFound"
      );
      cpbInpHandler(event, radio);
      expect(multipleElementsNotFoundSpy).toHaveBeenCalled() as void;
      multipleElementsNotFoundSpy.mockRestore() as void;
    }) as void;
  }) as void;
  describe("deactTextInput", (): void => {
    let addressInps: HTMLInputElement[], nullRadios: HTMLInputElement[], blockableInput: HTMLInputElement;
    beforeEach((): void => {
      addressInps = [
        document.createElement("input") as HTMLInputElement,
        document.createElement("input") as HTMLInputElement,
      ];
      nullRadios = [
        document.createElement("input") as HTMLInputElement,
        document.createElement("input") as HTMLInputElement,
      ];
      blockableInput = document.createElement("input") as HTMLInputElement;
      const parentDiv1 = document.createElement("div") as HTMLDivElement,
        parentDiv2 = document.createElement("div") as HTMLDivElement,
        grandParentDiv1 = document.createElement("div") as HTMLDivElement,
        grandParentDiv2 = document.createElement("div") as HTMLDivElement;
      parentDiv1.appendChild(blockableInput);
      grandParentDiv1.appendChild(parentDiv1);
      grandParentDiv2.appendChild(parentDiv2);
      blockableInput.classList.add("inpLocNum");
      parentDiv1.appendChild(nullRadios[0]);
      parentDiv2.appendChild(nullRadios[1]);
      grandParentDiv1.appendChild(addressInps[0]);
      grandParentDiv2.appendChild(addressInps[1]);
      document.body.appendChild(grandParentDiv1);
      document.body.appendChild(grandParentDiv2);
    }) as void;
    it("should disable the input when the corresponding radio is clicked", () => {
      nullRadios[0].checked = true;
      deactTextInput(addressInps, nullRadios);
      nullRadios[0].dispatchEvent(new Event("click")) as boolean;
      expect(blockableInput.disabled).toBe<boolean>(true);
    }) as void;
    it("should re-enable the input when the radio is unchecked", () => {
      nullRadios[0].checked = false;
      deactTextInput(addressInps, nullRadios);
      nullRadios[0].dispatchEvent(new Event("click")) as boolean;
      expect(blockableInput.disabled).toBe<boolean>(false);
    }) as void;
  }) as void;
  describe("doubleClickHandler", (): void => {
    let radio: HTMLInputElement;
    beforeEach((): void => {
      radio = document.createElement("input") as HTMLInputElement;
      radio.type = "radio";
    }) as void;
    it("should toggle the radio's checked property and call cpbInpHandler", () => {
      const cpbInpHandlerSpy = jest.spyOn<any, "cpbInpHandler">(
        require("../../../global/handlers/gHandlers"),
        "cpbInpHandler"
      );
      radio.checked = false;
      doubleClickHandler(radio);
      expect(radio.checked).toBe<boolean>(true);
      expect(cpbInpHandlerSpy).toHaveBeenCalledWith<[any, HTMLInputElement]>(expect.any(Event), radio) as void;
      doubleClickHandler(radio);
      expect(radio.checked).toBe<boolean>(false);
      cpbInpHandlerSpy.mockRestore() as void;
    }) as void;
    it("should call inputNotFound if the element is not a checkbox or radio input", () => {
      const inputNotFoundSpy = jest.spyOn<any, ErrorHandler>(
        require("../../../global/handlers/errorHandler"),
        "inputNotFound"
      );
      doubleClickHandler(document.createElement("div") as HTMLDivElement);
      expect(inputNotFoundSpy).toHaveBeenCalled() as void;
      inputNotFoundSpy.mockRestore() as void;
    }) as void;
  }) as void;
  describe("useCurrentDate", (): void => {
    let dateBtn: HTMLButtonElement;
    let event: Event;
    beforeEach((): void => {
      dateBtn = document.createElement("button") as HTMLButtonElement;
      event = new Event("click");
    }) as void;
    it("should set the current date to the target input when the button is clicked", () => {
      const dateInput = document.createElement("input") as HTMLInputElement;
      dateInput.type = "date" as InputType;
      jest
        .spyOn<any, SearchFunction>(require("../../../global/handlers/gHandlers"), "searchPreviousSiblings")
        .mockReturnValue(dateInput) as jest.Mock;
      useCurrentDate(event, dateBtn);
      const currentDate = new Date();
      const expectedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
      expect(dateInput.value).toBe<ISODate>(expectedDate as ISODate);
    }) as void;
    it("should call inputNotFound if the target input is not found", () => {
      const inputNotFoundSpy = jest.spyOn<any, ErrorHandler>(
        require("../../../global/handlers/errorHandler"),
        "inputNotFound"
      );
      jest
        .spyOn<any, SearchFunction>(require("../../../global/handlers/gHandlers"), "searchPreviousSiblings")
        .mockReturnValue(null) as jest.Mock;
      useCurrentDate(event, dateBtn);
      expect(inputNotFoundSpy).toHaveBeenCalled() as void;
      inputNotFoundSpy.mockRestore() as void;
    }) as void;
    it("should call elementNotFound if activation target does not match the button", () => {
      const elementNotFoundSpy = jest.spyOn<any, ErrorHandler>(
        require("../../../global/handlers/errorHandler"),
        "elementNotFound"
      );
      dateBtn.dispatchEvent(new Event("click")) as boolean;
      useCurrentDate(new Event("click"), dateBtn);
      expect(elementNotFoundSpy).toHaveBeenCalled() as void;
      elementNotFoundSpy.mockRestore() as void;
    }) as void;
  }) as void;
  describe("Sibling Search Functions", (): void => {
    let parentElement: HTMLElement, currentElement: HTMLElement;
    beforeEach((): void => {
      parentElement = document.createElement("div") as HTMLDivElement;
      currentElement = document.createElement("div") as HTMLDivElement;
      currentElement.classList.add("currentElement");
      const sibling1 = document.createElement("div") as HTMLDivElement,
        sibling2 = document.createElement("div") as HTMLDivElement;
      sibling2.classList.add("searchedClass");
      parentElement.append(currentElement, sibling1, sibling2);
    }) as void;
    it("should find the next sibling with the specified class", () => {
      expect(searchNextSiblings(currentElement, "searchedClass").classList.contains("searchedClass")).toBe<boolean>(
        true
      );
    }) as void;
    it("should find the previous sibling with the specified class", () => {
      expect(
        searchPreviousSiblings(parentElement.lastElementChild as any, "searchedClass").classList.contains(
          "searchedClass"
        )
      ).toBe<boolean>(true);
    }) as void;
  }) as void;
  describe("searchPreviousSiblingsById", (): void => {
    let parentElement: HTMLElement, currentElement: HTMLElement, targetSibling: HTMLElement;
    beforeEach((): void => {
      parentElement = document.createElement("div") as HTMLDivElement;
      targetSibling = document.createElement("div") as HTMLDivElement;
      targetSibling.id = "targetSibling";
      currentElement = document.createElement("div") as HTMLDivElement;
      parentElement.appendChild(targetSibling);
      parentElement.appendChild(currentElement);
    }) as void;
    it("should return the sibling element with the specified ID", () => {
      expect(searchPreviousSiblingsById(currentElement, "targetSibling")).toBe<HTMLElement>(targetSibling);
    }) as void;
    it("should stop and return when the loop accumulator exceeds 999", () => {
      let tempElement: HTMLElement;
      for (let i = 0; i < 1000; i++) {
        tempElement = document.createElement("div") as HTMLDivElement;
        (document.createElement("div") as HTMLDivElement).appendChild(tempElement);
        expect(searchPreviousSiblingsById(tempElement, "nonexistentId")).toBe<HTMLElement>(tempElement);
      }
    }) as void;
    it("should return the current element if no matching sibling is found", () => {
      expect(searchPreviousSiblingsById(currentElement, "nonexistentId")).toBe<HTMLElement>(currentElement);
    }) as void;
  }) as void;
  describe("changeToAstDigit", (): void => {
    let toFileInpBtn: HTMLButtonElement;
    beforeEach((): void => {
      toFileInpBtn = document.createElement("button") as HTMLButtonElement;
      toFileInpBtn.textContent = "Usar Assinatura Digital";
    }) as void;
    it("should replace the current element with a file input and add listeners", () => {
      const inpAst = document.createElement("input") as HTMLInputElement;
      inpAst.type = "text" as InputType;
      inpAst.classList.add("inpAst");
      toFileInpBtn.parentElement?.insertBefore(inpAst, toFileInpBtn);
      changeToAstDigit(toFileInpBtn);
      const fileInput = toFileInpBtn.previousElementSibling;
      expect(fileInput).toBeDefined() as void;
      expect(fileInput?.tagName).toBe<string>("INPUT");
      expect(fileInput?.getAttribute("type")).toBe<InputType>("file");
    }) as void;
    it("should call elementNotFound if the required element is not found", () => {
      const elementNotFoundSpy = jest.spyOn<any, ErrorHandler>(require("./errorHandler"), "elementNotFound");
      toFileInpBtn.classList.add("tratBtn");
      changeToAstDigit(toFileInpBtn);
      expect(elementNotFoundSpy).toHaveBeenCalled() as void;
      elementNotFoundSpy.mockRestore() as void;
    }) as void;
  }) as void;
  describe("defineLabId", (): void => {
    let labelElement: HTMLLabelElement, buttonElement: HTMLButtonElement, inputElement: HTMLInputElement;
    beforeEach((): void => {
      labelElement = document.createElement("label") as HTMLLabelElement;
      buttonElement = document.createElement("button") as HTMLButtonElement;
      inputElement = document.createElement("input") as HTMLInputElement;
    }) as void;
    it('should set the id of the label element to "spanAstPct" when valid arguments are provided', () => {
      defineLabId(labelElement, buttonElement, inputElement);
      (expect(labelElement.id) as jest.JestMatchers<jest.SpyInstance>).toBe<string>("spanAstPct");
    }) as void;
    it("should call multipleElementsNotFound if the arguments are invalid", () => {
      defineLabId(null, buttonElement, inputElement) as void;
      (expect(multipleElementsNotFound) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    }) as void;
    it("should call elementNotFound if the button or input element is not valid", () => {
      defineLabId(labelElement, document.createElement("div") as HTMLDivElement as any, inputElement);
      (expect(elementNotFound) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    }) as void;
  }) as void;
  describe("resetarFormulario", (): void => {
    let clickEvent: MouseEvent, resetFormBtn: HTMLButtonElement, fileBtns: HTMLButtonElement[];
    beforeEach((): void => {
      resetFormBtn = document.createElement("button") as HTMLButtonElement;
      clickEvent = new MouseEvent("click");
      Object.defineProperty(clickEvent, "target", { value: resetFormBtn }) as MouseEvent;
      fileBtns = [
        document.createElement("button") as HTMLButtonElement,
        document.createElement("button") as HTMLButtonElement,
      ];
      document.body.innerHTML = `
				<form id="formAnamGId"></form>
				<cite contenteditable="true">Old Name</cite>
				<input id="genBirthRelId">
				<input id="genTransId">
			`;
    }) as void;
    afterEach((): void => {
      jest.clearAllMocks() as typeof jest;
    }) as void;
    it("should reset the form and set default values for editable elements", (): void => {
      resetarFormulario(clickEvent, fileBtns);
      expect(document.getElementById("formAnamGId") as HTMLFormElement).toBeTruthy() as void;
      expect(
        (document.querySelector<HTMLElement>('cite[contenteditable="true"]') as HTMLElement).textContent
      ).toBe<string>("--Nome");
      expect((document.getElementById("genBirthRelId") as HTMLInputElement).value).toBe<BirthRelation>("cis");
      expect((document.getElementById("genTransId") as HTMLInputElement).value).toBe<TransitionLevel>("avancado");
    }) as void;
    it('should call changeToAstDigit for buttons with "Retornar" in textContent', (): void => {
      fileBtns[0].textContent = "Retornar à Assinatura Escrita";
      resetarFormulario(clickEvent, fileBtns);
      expect(changeToAstDigit).toHaveBeenCalledWith<Parameters<typeof changeToAstDigit>>(fileBtns[0]) as void;
    }) as void;
    it("should call elementNotFound when form is not found", () => {
      document.getElementById("formAnamGId")?.remove() as void;
      resetarFormulario(clickEvent, fileBtns);
      expect(elementNotFound).toHaveBeenCalled() as void;
    }) as void;
    it("should call multipleElementsNotFound when button elements are invalid", (): void => {
      resetarFormulario(clickEvent, []);
      expect(multipleElementsNotFound).toHaveBeenCalled() as void;
    }) as void;
  }) as void;
  describe("enableCPFBtn", (): void => {
    let cpfBtn: HTMLButtonElement;
    beforeEach((): void => {
      cpfBtn = document.createElement("button") as HTMLButtonElement;
      document.body.appendChild(cpfBtn);
    }) as void;
    afterEach((): void => {
      jest.clearAllMocks() as typeof jest;
    }) as void;
    it("should disable the button if CPF length is less than 11", (): void => {
      expect(cpfBtn.disabled).toBe<boolean>(true);
      expect(cpfBtn.style.backgroundColor).toBe<CSSColor>("gray");
      expect(cpfBtn.style.borderColor).toBe<CSSColor>("gray");
      expect(enableCPFBtn(cpfBtn, "123")).toBe<boolean>(true);
    }) as void;
    it("should enable the button if CPF length is 11 or more", (): void => {
      expect(cpfBtn.disabled).toBe<boolean>(false);
      expect(cpfBtn.style.backgroundColor).toBe<CSSColor>("#0a58ca");
      expect(cpfBtn.style.borderColor).toBe<CSSColor>("#0a58ca");
      expect(enableCPFBtn(cpfBtn, "12345678901")).toBe<boolean>(false);
    }) as void;
    it("should call multipleElementsNotFound if invalid arguments are provided", (): void => {
      enableCPFBtn(null, "123");
      expect(multipleElementsNotFound).toHaveBeenCalled() as void;
    }) as void;
  }) as void;
  describe("syncAriaStates", (): void => {
    let elements: HTMLElement[];
    beforeEach((): void => {
      elements = [
        document.createElement("input") as HTMLInputElement,
        document.createElement("button") as HTMLButtonElement,
        document.createElement("select"),
      ];
    }) as void;
    afterEach((): void => {
      jest.clearAllMocks() as typeof jest;
    }) as void;
    it("should sync aria attributes for elements", (): void => {
      syncAriaStates(elements);
      elements.forEach(el => {
        if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement)
          expect(el.ariaRequired).toBe<PseudoBool>("false");
      }) as void;
    }) as void;
    it("should not modify elements inside the head", (): void => {
      const metaElement = document.createElement("meta");
      document.head.appendChild(metaElement);
      syncAriaStates([metaElement]);
      expect(metaElement.ariaHidden).toBeUndefined() as void;
    }) as void;
    it("should call elementNotPopulated if the elements array is empty", (): void => {
      syncAriaStates([]);
      expect(elementNotPopulated).toHaveBeenCalled() as void;
    }) as void;
  }) as void;
  describe("toggleTips", (): void => {
    let tipsDialog: HTMLDialogElement;
    let tipsBtn: HTMLButtonElement;
    beforeEach((): void => {
      tipsDialog = document.createElement("dialog");
      tipsDialog.id = "tipsDlg";
      document.body.appendChild(tipsDialog);
      tipsBtn = document.createElement("button") as HTMLButtonElement;
      tipsBtn.id = "tipsBtn";
      document.body.appendChild(tipsBtn);
    }) as void;
    afterEach((): void => {
      jest.clearAllMocks() as typeof jest;
    }) as void;
    it("should open the dialog when the button is clicked", (): void => {
      toggleTips();
      tipsBtn.click() as void;
      expect(tipsDialog.open).toBe<boolean>(true);
    }) as void;
    it("should close the dialog when the button is clicked again", (): void => {
      toggleTips();
      tipsBtn.click() as void;
      tipsBtn.click() as void;
      expect(tipsDialog.open).toBe<boolean>(false);
    }) as void;
    it("should call elementNotFound if the tips dialog is not found", (): void => {
      document.getElementById("tipsDlg")?.remove() as void;
      toggleTips();
      expect(elementNotFound).toHaveBeenCalled() as void;
    }) as void;
  }) as void;
  describe("toggleConformDlg", (): void => {
    let conformDlg: HTMLDialogElement;
    let btnConform: HTMLButtonElement;
    beforeEach((): void => {
      conformDlg = document.createElement("dialog");
      conformDlg.id = "conformDlg";
      document.body.appendChild(conformDlg);
      btnConform = document.createElement("button") as HTMLButtonElement;
      btnConform.id = "btnConform";
      document.body.appendChild(btnConform);
      jest.spyOn<HTMLDialogElement, HTMLDialogElementMethod>(conformDlg, "showModal");
      jest.spyOn<HTMLDialogElement, HTMLDialogElementMethod>(conformDlg, "close");
    }) as void;
    afterEach((): void => {
      document.body.innerHTML = "";
      jest.clearAllMocks() as typeof jest;
    }) as void;
    it("should open the dialog when the button is clicked", () => {
      toggleConformDlg();
      btnConform.click() as void;
      expect(conformDlg.showModal).toHaveBeenCalled() as void;
    }) as void;
    it("should close the dialog when clicked outside", () => {
      toggleConformDlg();
      conformDlg.dispatchEvent(new MouseEvent("click")) as boolean;
      expect(conformDlg.close).toHaveBeenCalled() as void;
    }) as void;
    it("should close the dialog when Escape key is pressed", () => {
      toggleConformDlg();
      const escapeEvent = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(escapeEvent) as boolean;
      expect(conformDlg.close).toHaveBeenCalled() as void;
    }) as void;
    it("should call multipleElementsNotFound if conformDlg or btnConform is not found", () => {
      document.getElementById("conformDlg")?.remove() as void;
      toggleConformDlg();
      expect(multipleElementsNotFound).toHaveBeenCalled() as void;
    }) as void;
  }) as void;
  describe("validateForm", (): void => {
    let form: HTMLFormElement;
    let inputText: HTMLInputElement;
    let inputNumber: HTMLInputElement;
    let inputDate: HTMLInputElement;
    let textarea: HTMLTextAreaElement;
    let select: HTMLSelectElement;
    let canvas: HTMLCanvasElement;
    let submitButton: HTMLButtonElement;
    beforeEach((): void => {
      form = document.createElement("form") as HTMLFormElement;
      inputText = document.createElement("input") as HTMLInputElement;
      inputText.type = "text";
      inputText.name = "textInput";
      inputText.value = "valid text";
      inputNumber = document.createElement("input") as HTMLInputElement;
      inputNumber.type = "number";
      inputNumber.name = "numberInput";
      inputNumber.value = "10";
      inputDate = document.createElement("input") as HTMLInputElement;
      inputDate.type = "date";
      inputDate.name = "dateInput";
      inputDate.value = new Date().toISOString().split("T")[0];
      textarea = document.createElement("textarea");
      textarea.name = "textareaInput";
      textarea.value = "valid text";
      select = document.createElement("select");
      select.name = "selectInput";
      const option = document.createElement("option");
      option.value = "valid";
      select.appendChild(option);
      select.value = "valid";
      canvas = document.createElement("canvas");
      submitButton = document.createElement("button") as HTMLButtonElement;
      submitButton.type = "submit";
      form.append(inputText, inputNumber, inputDate, textarea, select, canvas, submitButton);
      document.body.appendChild(form);
    }) as void;
    afterEach((): void => {
      document.body.innerHTML = "";
      jest.clearAllMocks() as typeof jest;
    }) as void;
    it("should validate a form with valid entries", async () => {
      const [isValid, invalidEntries, validEntries] = await validateForm(form, document, false);
      expect(isValid).toBe<boolean>(true);
      expect(invalidEntries).toEqual<never[]>([]);
      expect(validEntries).toEqual<string[][]>([
        ["textInput", "valid text"],
        ["numberInput", "10"],
        ["dateInput", inputDate.value],
        ["textareaInput", "valid text"],
        ["selectInput", "valid"],
      ]);
    }) as void;
    it("should mark invalid entries and return invalid entries list", async () => {
      inputText.value = "";
      inputNumber.value = "abc";
      inputDate.value = "2020-01-01";
      select.value = "";
      const [isValid, invalidEntries] = await validateForm(form, document, false);
      expect(isValid).toBe<boolean>(false);
      expect(invalidEntries).toContain<string>("textInput") as void;
      expect(invalidEntries).toContain<string>("numberInput") as void;
      expect(invalidEntries).toContain<string>("selectInput") as void;
    }) as void;
    it("should validate when submit button is clicked", async () => {
      const submitEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      submitButton.click() as void;
      const [isValid] = await validateForm(submitEvent as any, document, true);
      expect(isValid).toBe<boolean>(true);
    }) as void;
    it("should invalidate form if required fields are empty", async () => {
      inputText.required = true;
      inputText.value = "";
      const [isValid, invalidEntries] = await validateForm(form, document, false);
      expect(isValid).toBe<boolean>(false);
      expect(invalidEntries).toContain<string>("textInput") as void;
    }) as void;
    it("should reset placeholder for invalid inputs", async () => {
      inputText.required = true;
      inputText.value = "";
      const [isValid] = await validateForm(form, document, false);
      expect(isValid).toBe<boolean>(false);
      expect(inputText.placeholder).toBe<string>("Entrada inválida");
    }) as void;
    it("should handle file inputs correctly", async () => {
      const fileInput = document.createElement("input") as HTMLInputElement;
      fileInput.type = "file";
      form.appendChild(fileInput);
      const file = new File(["content"], "test.txt", { type: "text/plain" });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file) as DataTransferItem | null;
      fileInput.files = dataTransfer.files;
      const [isValid, , validEntries] = await validateForm(form, document, false);
      expect(isValid).toBe<boolean>(true);
      expect(validEntries).toContainEqual<(string | File)[]>(["", file]);
    }) as void;
    it("should validate radio button groups correctly", async () => {
      const radioGroupDiv = document.createElement("div") as HTMLDivElement;
      const radio1 = document.createElement("input") as HTMLInputElement;
      radio1.type = "radio";
      radio1.name = "radioGroup";
      radio1.value = "option1";
      const radio2 = document.createElement("input") as HTMLInputElement;
      radio2.type = "radio";
      radio2.name = "radioGroup";
      radio2.value = "option2";
      radioGroupDiv.append(radio1, radio2);
      form.appendChild(radioGroupDiv);
      radio1.checked = true;
      const [isValid, , validEntries] = await validateForm(form, document, false);
      expect(isValid).toBe<boolean>(true);
      expect(validEntries).toContainEqual<string[]>(["radioGroup", "true"]);
    }) as void;
    it("should validate checkbox groups correctly", async () => {
      const checkbox = document.createElement("input") as HTMLInputElement;
      checkbox.type = "checkbox";
      checkbox.name = "checkboxGroup";
      checkbox.checked = true;
      form.appendChild(checkbox);
      const [isValid, , validEntries] = await validateForm(form, document, false);
      expect(isValid).toBe<boolean>(true);
      expect(validEntries).toContainEqual<string[]>(["checkboxGroup", "true"]);
    }) as void;
    it("should handle minCurrDate validation for date input", async () => {
      inputDate.classList.add("minCurrDate");
      inputDate.value = "1990-01-01";
      const [isValid, invalidEntries] = await validateForm(form, document, false);
      expect(isValid).toBe<boolean>(false);
      expect(invalidEntries).toContain<string>("dateInput") as void;
    }) as void;
    it("should handle maxCurrDate validation for date input", async () => {
      inputDate.classList.add("maxCurrDate");
      inputDate.value = "2050-01-01";
      const [isValid, invalidEntries] = await validateForm(form, document, false);
      expect(isValid).toBe<boolean>(false);
      expect(invalidEntries).toContain<string>("dateInput") as void;
    });
    it("should handle custom patterns for input", async () => {
      inputText.classList.add("patternText");
      inputText.dataset.pattern = "^[A-Za-z]+$";
      inputText.value = "123";
      const [isValid, invalidEntries] = await validateForm(form, document, false);
      expect(isValid).toBe<boolean>(false);
      expect(invalidEntries).toContain<string>("textInput") as void;
    });
  });
  describe("submitForm", (): void => {
    let form: HTMLFormElement;
    const ep = "ag";
    beforeEach((): void => {
      form = document.createElement("form") as HTMLFormElement;
      const input = document.createElement("input") as HTMLInputElement;
      input.type = "text";
      input.name = "name";
      form.appendChild(input) as HTMLInputElement;
      document.body.appendChild(form) as HTMLFormElement;
    }) as void;
    afterEach((): void => {
      document.body.innerHTML = "";
      jest.clearAllMocks() as typeof jest;
    }) as void;
    it("should call handleSubmit with FormData when valid form is submitted", async (): Promise<void> => {
      await submitForm(form, ep as formCases);
      expect(handleSubmit).toHaveBeenCalledWith<Parameters<typeof handleSubmit>>(
        ep as formCases,
        expect.any(FormData) as any,
        true
      );
    }) as void;
    it("should throw an error if form is not an HTMLFormElement", async (): Promise<void> => {
      const invalidForm = null;
      await submitForm(invalidForm as any, ep as formCases);
      expect(elementNotFound).toHaveBeenCalled() as void;
    }) as void;
    it("should throw an error if ep is not a string", async (): Promise<void> => {
      await expect(submitForm(form, 123 as any)).rejects.toThrow("Incorret type for ep argument in submitForm");
    }) as void;
  }) as void;
  describe("handleCondtReq", (): void => {
    let input: HTMLInputElement;
    const options = {
      pattern: /^[A-Za-z]+$/,
      min: 5,
      max: 10,
      minNum: 1,
      maxNum: 100,
    };
    beforeEach((): void => {
      input = document.createElement("input") as HTMLInputElement;
      input.type = "text";
      document.body.appendChild(input);
    }) as void;
    afterEach((): void => {
      document.body.innerHTML = "";
      jest.clearAllMocks() as typeof jest;
    }) as void;
    it("should set the correct attributes when options are provided", (): void => {
      handleCondtReq(input, options);
      expect(input.dataset.reqlength).toBe<PseudoNum>("5");
      expect(input.minLength).toBe<number>(5);
      expect(input.dataset.maxlength).toBe<PseudoNum>("10");
      expect(input.maxLength).toBe<number>(10);
      expect(input.dataset.minnum).toBe<PseudoNum>("1");
      expect(input.min).toBe<PseudoNum>("1");
      expect(input.dataset.maxnum).toBe<PseudoNum>("100");
      expect(input.max).toBe<PseudoNum>("100");
    }) as void;

    it("should remove attributes if the input value is empty", (): void => {
      input.value = "";
      handleCondtReq(input, options);
      expect(input.dataset.reqlength).toBeUndefined() as void;
      expect(input.dataset.maxlength).toBeUndefined() as void;
      expect(input.min).toBe<string>("");
      expect(input.max).toBe<string>("");
    }) as void;
    it("should call inputNotFound when input is invalid", (): void => {
      const invalidInput = document.createElement("div") as HTMLDivElement;
      handleCondtReq(invalidInput as any, options);
      expect(inputNotFound).toHaveBeenCalled() as void;
    }) as void;
  }) as void;
  describe("handleEventReq", (): void => {
    let input: HTMLInputElement;
    let textarea: HTMLTextAreaElement;
    beforeEach((): void => {
      input = document.createElement("input") as HTMLInputElement;
      textarea = document.createElement("textarea");
      document.body.appendChild(input);
      document.body.appendChild(textarea);
    }) as void;
    afterEach((): void => {
      document.body.innerHTML = "";
      jest.clearAllMocks() as typeof jest;
    }) as void;
    it("should throw error if input is not a valid element", (): void => {
      const invalidElement = document.createElement("div") as HTMLDivElement;
      expect((): void => handleEventReq(invalidElement as any)).toThrow();
    }) as void;
    it("should skip validation if event target is not a valid input or textarea", (): void => {
      const invalidEvent = new Event("change");
      expect((): void => handleEventReq(invalidEvent)).not.toThrow();
    }) as void;
    it('should set alert color if input is invalid and type is "text"', (): void => {
      input.type = "text" as InputType;
      input.value = "";
      jest.spyOn<HTMLInputElement, HTMLInputElementMethod>(input, "checkValidity").mockReturnValue(false) as jest.Mock;
      handleEventReq(input);
      expect(input.style.color).toBe<CSSColor>("#e52626");
    }) as void;
    it("should reset color after 2000ms", (): void => {
      jest.useFakeTimers();
      input.type = "text" as InputType;
      input.value = "";
      jest.spyOn<HTMLInputElement, HTMLInputElementMethod>(input, "checkValidity").mockReturnValue(false) as jest.Mock;
      handleEventReq(input);
      expect(input.style.color).toBe<CSSColor>("#e52626");
      jest.advanceTimersByTime(2000);
      expect(input.style.color).toBe<CSSColor>("rgb(33, 37, 41)");
      jest.useRealTimers();
    }) as void;
    it('should validate input type for "number" and "date"', (): void => {
      input.type = "number" as InputType;
      input.step = "";
      handleEventReq(input);
      expect(input.step).toBe<string>("any");
    }) as void;
    it("should validate date with minCurrDate class", (): void => {
      input.type = "date" as InputType;
      input.classList.add("minCurrDate");
      input.value = new Date().toISOString().split("T")[0];
      handleEventReq(input);
      expect(input.style.color).toBe<string>("");
    }) as void;
    it("should validate date with maxCurrDate class", (): void => {
      input.type = "date" as InputType;
      input.classList.add("maxCurrDate");
      input.value = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0];
      handleEventReq(input);
      expect(input.style.color).toBe<CSSColor>("#e52626");
    }) as void;
    it("should check validity for patternText", (): void => {
      input.type = "text" as InputType;
      input.classList.add("patternText");
      input.dataset.pattern = "^[A-Za-z]+$";
      input.value = "123";
      handleEventReq(input);
      expect(input.style.color).toBe<CSSColor>("#e52626");
    }) as void;
    it("should check validity for minText", (): void => {
      input.type = "text" as InputType;
      input.classList.add("minText");
      input.dataset.reqlength = "5";
      input.value = "123";
      handleEventReq(input);
      expect(input.style.color).toBe<CSSColor>("#e52626");
    }) as void;
    it("should check validity for maxText", (): void => {
      input.type = "text" as InputType;
      input.classList.add("maxText");
      input.dataset.maxlength = "5";
      input.value = "123456";
      handleEventReq(input);
      expect(input.style.color).toBe<CSSColor>("#e52626");
    }) as void;
    it("should check validity for minNum and maxNum", (): void => {
      input.type = "number" as InputType;
      input.classList.add("minNum", "maxNum");
      input.dataset.minnum = "1";
      input.dataset.maxnum = "100";
      input.value = "150";
      handleEventReq(input);
      expect(input.style.color).toBe<CSSColor>("#e52626");
    }) as void;
    it("should skip check for unsupported input types", (): void => {
      input.type = "radio" as InputType;
      handleEventReq(input);
      expect(input.style.color).toBe<CSSColor>("");
    });
  });
});