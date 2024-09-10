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
jest.mock("../../../global/gModel", () => ({
  parseNotNaN: jest.fn(),
}));
jest.mock("../../../global/handlers/gHandlers", () => ({
  updateSimpleProperty: jest.fn(),
}));
jest.mock("../../../locals/edFisNutPage/edFisNutHandler", () => ({
  switchRowComorb: jest.fn(),
}));
jest.mock("../../../locals/edFisNutPage/edFisNutModel", () => ({
  checkInnerColGroups: jest.fn(),
}));
describe("formatValue", () => {
  let targetInput: HTMLInputElement;
  beforeEach(() => {
    targetInput = document.createElement("input");
    targetInput.type = "text";
  });
  it("should format the number with correct comma and decimal points", () => {
    (parseNotNaN as jest.Mock).mockReturnValue(1234.5678);
    formatValue(targetInput, "1234.5678", 2);
    expect(targetInput.value).toBe("1.234,57");
  });
  it("should fallback to default numValue when invalid values are provided", () => {
    targetInput.value = "abc";
    formatValue(targetInput, "1234.5678", 2);
    expect(targetInput.value).toBe("1234.57");
  });
  it("should use fallback value if number formatting fails", () => {
    targetInput.type = "number";
    formatValue(targetInput, "abcd", 2);
    expect(targetInput.value).toBe("0");
  });
  it("should correctly parse and handle missing input", () => {
    formatValue(targetInput, "", 2);
    expect(targetInput.value).toBe("0,00");
  });
});
describe("checkReturnIndex", () => {
  let inputElement: HTMLInputElement;
  beforeEach(() => {
    inputElement = document.createElement("input");
    inputElement.type = "text";
  });
  it("should call updateSimpleProperty and return the updated prop value", () => {
    (updateSimpleProperty as jest.Mock).mockReturnValue(10);
    expect(checkReturnIndex(inputElement, 5, "context")).toBe(10);
  });
  it("should return default prop value when no return from updateSimpleProperty", () => {
    (updateSimpleProperty as jest.Mock).mockReturnValue(undefined);
    expect(checkReturnIndex(inputElement, 5, "context")).toBe(5);
  });
  it("should throw an error when required elements are not found", () => {
    expect(() => checkReturnIndex(null as any, 5, "context")).toThrowError(
      "Multiple elements not found"
    );
  });
});
describe("validateTitlesForTargs", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="tabCelRowMedAnt2_1">Peso</div>
      <input id="tabInpRowMedAnt2_2" />
      <div id="tabCelRowMedAnt3_1">Altura</div>
      <input id="tabInpRowMedAnt3_2" />
    `;
  });
  it("should return an array of valid target elements", () => {
    const result = validateTitlesForTargs(1);
    expect(result.length).toBe(8);
    expect(result[0]?.id).toBe("tabInpRowMedAnt2_2");
  });
  it("should return an array with undefined elements when there are missing titles", () => {
    document.body.innerHTML = "";
    const result = validateTitlesForTargs(1);
    expect(result.length).toBe(8);
    expect(result[0]).toBeUndefined();
  });
});
describe("addListenerComorbBtns", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button class="countComorb"></button>
    `;
  });
  it("should add event listeners to comorb buttons", () => {
    const [rowCount, btnArray] = addListenerComorbBtns(3);
    btnArray[0].dispatchEvent(new Event("click"));
    expect(rowCount).toBe(3);
    expect(switchRowComorb).toHaveBeenCalled();
  });
  it("should throw an error when no buttons are found", () => {
    document.body.innerHTML = "";
    expect(() => addListenerComorbBtns(3)).toThrowError(
      "Element not populated"
    );
  });
});
describe("addListenerInnerTabs", () => {
  let fieldSetElement: HTMLElement;
  beforeEach(() => {
    fieldSetElement = document.createElement("fieldset");
    document.body.innerHTML = `
      <fieldset></fieldset>
      <input type="text" value="-1" />
    `;
  });
  it("should add input listeners to table inputs and prevent negative values", () => {
    fieldSetElement.innerHTML = '<input type="text" value="-1">';
    const [numCols, colGroups] = addListenerInnerTabs(fieldSetElement, 2, true);
    const inputElement = fieldSetElement.querySelector("input");
    inputElement?.dispatchEvent(new Event("input"));
    expect(inputElement?.value).toBe("0");
    expect(numCols).toBe(2);
    expect(colGroups).toBe(true);
  });
  expect(() => checkReturnIndex(null as any, 5, "context")).toThrow(
    "Multiple elements not found"
  );
});
describe("addListenerTrioReadNumCons", () => {
  let consTablesFs: HTMLElement;
  let trioReadNumCons: HTMLInputElement;
  beforeEach(() => {
    consTablesFs = document.createElement("div");
    trioReadNumCons = document.createElement("input");
    trioReadNumCons.type = "number";
    trioReadNumCons.id = "trioReadNumCons";
    document.body.appendChild(trioReadNumCons);
    jest.clearAllMocks();
  });
  it("should add an input event listener to trioReadNumCons when valid arguments are passed", () => {
    document.getElementById = jest.fn(() => trioReadNumCons);
    trioReadNumCons.addEventListener = jest.fn(jest.fn());
    expect(addListenerTrioReadNumCons(consTablesFs, 3, 3)).toBe(
      trioReadNumCons
    );
    expect(trioReadNumCons.addEventListener).toHaveBeenCalledWith(
      "input",
      expect.any(Function)
    );
  });
  it("should call inputNotFound when trioReadNumCons is not found or invalid", () => {
    document.getElementById = jest.fn(() => null);
    addListenerTrioReadNumCons(consTablesFs, 3, 3);
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "inputNotFound"
      )
    ).toHaveBeenCalled();
  });
  it("should call multipleElementsNotFound when invalid arguments are provided", () => {
    addListenerTrioReadNumCons(null as any, NaN, NaN);
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "multipleElementsNotFound"
      )
    ).toHaveBeenCalled();
  });
});
describe("callbackTrioReadNumCons", () => {
  let consTablesFs: HTMLElement;
  let trioReadNumCons: HTMLInputElement;
  beforeEach(() => {
    consTablesFs = document.createElement("div");
    trioReadNumCons = document.createElement("input");
    trioReadNumCons.type = "number";
    document.body.appendChild(trioReadNumCons);
    jest.clearAllMocks();
  });
  it("should update numConsTextHeadCels and call EdFisNutHandler.switchNumConsTitles when valid arguments are passed", () => {
    const numConsTextHeadCel = document.createElement("div");
    numConsTextHeadCel.classList.add("numConsTextHeadCel");
    document.body.appendChild(numConsTextHeadCel);
    callbackTrioReadNumCons(consTablesFs, trioReadNumCons, 3, 1);
    expect(
      jest.spyOn(
        require("../../../locals/edFisNutPage/edFisNutHandler"),
        "switchNumConsTitles"
      )
    ).toHaveBeenCalled();
  });
  it("should call elementNotPopulated when numConsTextHeadCels array length is invalid", () => {
    callbackTrioReadNumCons(consTablesFs, trioReadNumCons, 3, 2);
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "elementNotPopulated"
      )
    ).toHaveBeenCalled();
  });
  it("should call multipleElementsNotFound when invalid arguments are passed", () => {
    callbackTrioReadNumCons(null as any, null as any, NaN, NaN);
    expect(
      jest.spyOn(
        require("../../global/handlers/errorHandler"),
        "multipleElementsNotFound"
      )
    ).toHaveBeenCalled();
  });
});
describe("callbackAutoFillBtn", () => {
  let autoFillBtn: HTMLButtonElement;
  beforeEach(() => {
    autoFillBtn = document.createElement("button");
    jest.clearAllMocks();
  });
  it("should switch the autofill status when a valid button or input is passed", () => {
    expect(callbackAutoFillBtn(autoFillBtn, false)).toBe(true);
    expect(
      jest
        .spyOn(
          require("../../../locals/edFisNutPage/edFisNutHandler"),
          "switchAutoFill"
        )
        .mockReturnValue(true)
    ).toHaveBeenCalledWith(autoFillBtn, false);
  });
  it("should call elementNotFound when the autoFillBtn is invalid", () => {
    callbackAutoFillBtn(null as any);
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "elementNotFound"
      )
    ).toHaveBeenCalled();
  });
});
describe("addListenerProtocolo", () => {
  let protocolo: HTMLSelectElement;
  let tabDC: HTMLTableElement;
  let textBodytype: HTMLInputElement;
  beforeEach(() => {
    protocolo = document.createElement("select");
    tabDC = document.createElement("table");
    textBodytype = document.createElement("input");
    jest.clearAllMocks();
  });
  it("should add a change event listener to protocolo and update its value", () => {
    expect(addListenerProtocolo(protocolo, tabDC, textBodytype)).toBe(
      "pollock3"
    );
    protocolo.dispatchEvent(new Event("change"));
    expect(
      jest
        .spyOn(
          require("../../../locals/edFisNutPage/edFisNutModel"),
          "changeTabDCutLayout"
        )
        .mockReturnValue("pollock7")
    ).toHaveBeenCalledWith(protocolo, tabDC, textBodytype);
  });
  it("should call multipleElementsNotFound when invalid arguments are passed", () => {
    addListenerProtocolo(null as any, null as any, null as any);
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "multipleElementsNotFound"
      )
    ).toHaveBeenCalled();
  });
});
