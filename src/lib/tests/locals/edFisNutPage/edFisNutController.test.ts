//v1.0.0
import {
  formatValue,
  checkReturnIndex,
  validateTitlesForTargs,
  addListenerComorbBtns,
  addListenerInnerTabs,
  addListenerTrioReadNumCons,
  callbackTrioReadNumCons,
  callbackAutoFillBtn,
  addListenerProtocolo,
} from "../../../locals/edFisNutPage/edFisNutController";
import { parseNotNaN } from "../../../global/gModel";
import { updateSimpleProperty } from "../../../global/handlers/gHandlers";
import { switchRowComorb } from "../../../locals/edFisNutPage/edFisNutHandler";
import { EdHandler, EdModeler, ErrorHandler, Protocol, PseudoBrFloat, PseudoNum } from "../../testVars";
jest.mock(
  "../../../global/gModel",
  (): {
    parseNotNaN: jest.Mock<any, any, any>;
  } => ({
    parseNotNaN: jest.fn(),
  })
);
jest.mock(
  "../../../global/handlers/gHandlers",
  (): {
    updateSimpleProperty: jest.Mock<any, any, any>;
  } => ({
    updateSimpleProperty: jest.fn(),
  })
);
jest.mock(
  "../../../locals/edFisNutPage/edFisNutHandler",
  (): {
    switchRowComorb: jest.Mock<any, any, any>;
  } => ({
    switchRowComorb: jest.fn(),
  })
);
jest.mock(
  "../../../locals/edFisNutPage/edFisNutModel",
  (): {
    checkInnerColGroups: jest.Mock<any, any, any>;
  } => ({
    checkInnerColGroups: jest.fn(),
  })
);
describe("formatValue", (): void => {
  let targetInput: HTMLInputElement;
  beforeEach((): void => {
    targetInput = document.createElement("input");
    targetInput.type = "text";
  });
  it("should format the number with correct comma and decimal points", (): void => {
    (parseNotNaN as jest.Mock).mockReturnValue(1234.5678);
    formatValue(targetInput, "1234.5678", 2);
    expect(targetInput.value).toBe<PseudoBrFloat>("1.234,57");
  });
  it("should fallback to default numValue when invalid values are provided", (): void => {
    targetInput.value = "abc";
    formatValue(targetInput, "1234.5678", 2);
    expect(targetInput.value).toBe<PseudoNum>("1234.57");
  });
  it("should use fallback value if number formatting fails", (): void => {
    targetInput.type = "number";
    formatValue(targetInput, "abcd", 2);
    expect(targetInput.value).toBe<PseudoNum>("0");
  });
  it("should correctly parse and handle missing input", (): void => {
    formatValue(targetInput, "", 2);
    expect(targetInput.value).toBe<PseudoBrFloat>("0,00");
  });
});
describe("checkReturnIndex", (): void => {
  let inputElement: HTMLInputElement;
  beforeEach((): void => {
    inputElement = document.createElement("input");
    inputElement.type = "text";
  });
  it("should call updateSimpleProperty and return the updated prop value", (): void => {
    (updateSimpleProperty as jest.Mock).mockReturnValue(10);
    expect(checkReturnIndex(inputElement, 5, "context")).toBe<number>(10);
  });
  it("should return default prop value when no return from updateSimpleProperty", (): void => {
    (updateSimpleProperty as jest.Mock).mockReturnValue(undefined);
    expect(checkReturnIndex(inputElement, 5, "context")).toBe<number>(5);
  });
  it("should throw an error when required elements are not found", (): void => {
    expect((): number => checkReturnIndex(null as any, 5, "context")).toThrow("Multiple elements not found");
  });
});
describe("validateTitlesForTargs", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = `
      <div id="tabCelRowMedAnt2_1">Peso</div>
      <input id="tabInpRowMedAnt2_2" />
      <div id="tabCelRowMedAnt3_1">Altura</div>
      <input id="tabInpRowMedAnt3_2" />
    `;
  });
  it("should return an array of valid target elements", (): void => {
    const result = validateTitlesForTargs(1);
    expect(result.length).toBe<number>(8);
    expect(result[0]?.id).toBe<string>("tabInpRowMedAnt2_2");
  });
  it("should return an array with undefined elements when there are missing titles", (): void => {
    document.body.innerHTML = "";
    const result = validateTitlesForTargs(1);
    expect(result.length).toBe<number>(8);
    expect(result[0]).toBeUndefined();
  });
});
describe("addListenerComorbBtns", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = `
      <button class="countComorb"></button>
    `;
  });
  it("should add event listeners to comorb buttons", (): void => {
    const [rowCount, btnArray] = addListenerComorbBtns(3);
    btnArray[0].dispatchEvent(new Event("click"));
    expect(rowCount).toBe<number>(3);
    expect(switchRowComorb).toHaveBeenCalled();
  });
  it("should throw an error when no buttons are found", (): void => {
    document.body.innerHTML = "";
    expect((): [number, Element[]] => addListenerComorbBtns(3)).toThrow("Element not populated");
  });
});
describe("addListenerInnerTabs", (): void => {
  let fieldSetElement: HTMLElement;
  beforeEach((): void => {
    fieldSetElement = document.createElement("fieldset");
    document.body.innerHTML = `
      <fieldset></fieldset>
      <input type="text" value="-1" />
    `;
  });
  it("should add input listeners to table inputs and prevent negative values", (): void => {
    fieldSetElement.innerHTML = '<input type="text" value="-1">';
    const [numCols, colGroups] = addListenerInnerTabs(fieldSetElement, 2, true);
    const inputElement = fieldSetElement.querySelector("input");
    inputElement?.dispatchEvent(new Event("input"));
    expect(inputElement?.value).toBe<PseudoNum>("0");
    expect(numCols).toBe<number>(2);
    expect(colGroups).toBe<boolean>(true);
  });
  expect((): number => checkReturnIndex(null as any, 5, "context")).toThrow("Multiple elements not found");
});
describe("addListenerTrioReadNumCons", (): void => {
  let consTablesFs: HTMLElement;
  let trioReadNumCons: HTMLInputElement;
  beforeEach((): void => {
    consTablesFs = document.createElement("div");
    trioReadNumCons = document.createElement("input");
    trioReadNumCons.type = "number";
    trioReadNumCons.id = "trioReadNumCons";
    document.body.appendChild(trioReadNumCons);
    jest.clearAllMocks();
  });
  it("should add an input event listener to trioReadNumCons when valid arguments are passed", (): void => {
    document.getElementById = jest.fn(() => trioReadNumCons);
    trioReadNumCons.addEventListener = jest.fn(jest.fn());
    expect(addListenerTrioReadNumCons(consTablesFs, 3, 3)).toBe<HTMLInputElement>(trioReadNumCons);
    expect(trioReadNumCons.addEventListener).toHaveBeenCalledWith<Parameters<typeof trioReadNumCons.addEventListener>>(
      "input",
      expect.any(Function)
    );
  });
  it("should call inputNotFound when trioReadNumCons is not found or invalid", (): void => {
    document.getElementById = jest.fn(() => null);
    addListenerTrioReadNumCons(consTablesFs, 3, 3);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "inputNotFound")
    ).toHaveBeenCalled();
  });
  it("should call multipleElementsNotFound when invalid arguments are provided", (): void => {
    addListenerTrioReadNumCons(null as any, NaN, NaN);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "multipleElementsNotFound")
    ).toHaveBeenCalled();
  });
});
describe("callbackTrioReadNumCons", (): void => {
  let consTablesFs: HTMLElement;
  let trioReadNumCons: HTMLInputElement;
  beforeEach((): void => {
    consTablesFs = document.createElement("div");
    trioReadNumCons = document.createElement("input");
    trioReadNumCons.type = "number";
    document.body.appendChild(trioReadNumCons);
    jest.clearAllMocks();
  });
  it("should update numConsTextHeadCels and call EdFisNutHandler.switchNumConsTitles when valid arguments are passed", (): void => {
    const numConsTextHeadCel = document.createElement("div");
    numConsTextHeadCel.classList.add("numConsTextHeadCel");
    document.body.appendChild(numConsTextHeadCel);
    callbackTrioReadNumCons(consTablesFs, trioReadNumCons, 3, 1);
    expect(
      jest.spyOn<any, EdHandler>(require("../../../locals/edFisNutPage/edFisNutHandler"), "switchNumConsTitles")
    ).toHaveBeenCalled();
  });
  it("should call elementNotPopulated when numConsTextHeadCels array length is invalid", (): void => {
    callbackTrioReadNumCons(consTablesFs, trioReadNumCons, 3, 2);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "elementNotPopulated")
    ).toHaveBeenCalled();
  });
  it("should call multipleElementsNotFound when invalid arguments are passed", (): void => {
    callbackTrioReadNumCons(null as any, null as any, NaN, NaN);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../global/handlers/errorHandler"), "multipleElementsNotFound")
    ).toHaveBeenCalled();
  });
});
describe("callbackAutoFillBtn", (): void => {
  let autoFillBtn: HTMLButtonElement;
  beforeEach((): void => {
    autoFillBtn = document.createElement("button");
    jest.clearAllMocks();
  });
  it("should switch the autofill status when a valid button or input is passed", (): void => {
    expect(callbackAutoFillBtn(autoFillBtn, false)).toBe<boolean>(true);
    expect(
      jest
        .spyOn<any, EdHandler>(require("../../../locals/edFisNutPage/edFisNutHandler"), "switchAutoFill")
        .mockReturnValue(true)
    ).toHaveBeenCalledWith<[HTMLButtonElement, boolean]>(autoFillBtn, false);
  });
  it("should call elementNotFound when the autoFillBtn is invalid", (): void => {
    callbackAutoFillBtn(null as any);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "elementNotFound")
    ).toHaveBeenCalled();
  });
});
describe("addListenerProtocolo", (): void => {
  let protocolo: HTMLSelectElement;
  let tabDC: HTMLTableElement;
  let textBodytype: HTMLInputElement;
  beforeEach((): void => {
    protocolo = document.createElement("select");
    tabDC = document.createElement("table");
    textBodytype = document.createElement("input");
    jest.clearAllMocks();
  });
  it("should add a change event listener to protocolo and update its value", (): void => {
    expect(addListenerProtocolo(protocolo, tabDC, textBodytype)).toBe<Protocol>("pollock3");
    protocolo.dispatchEvent(new Event("change"));
    expect(
      jest
        .spyOn<any, EdModeler>(require("../../../locals/edFisNutPage/edFisNutModel"), "changeTabDCutLayout")
        .mockReturnValue("pollock7")
    ).toHaveBeenCalledWith<[HTMLSelectElement, HTMLElement, HTMLElement]>(protocolo, tabDC, textBodytype);
  });
  it("should call multipleElementsNotFound when invalid arguments are passed", (): void => {
    addListenerProtocolo(null as any, null as any, null as any);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "multipleElementsNotFound")
    ).toHaveBeenCalled();
  });
});
