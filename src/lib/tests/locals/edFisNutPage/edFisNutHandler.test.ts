//v1.0.0
import {
  switchAutoFill,
  switchLockInputs,
  getNumCol,
  validateEvResultNum,
  matchPersonPropertiesWH,
  matchPersonPropertiesDC,
  updateIndexesContexts,
  updateIMCContext,
  updateTMBContext,
  updateGETContext,
  matchTMBElements,
  updatePGC,
  updateAtvLvl,
  defineTargInps,
  addRowAtivFis,
  removeRowAtivFis,
  switchRowComorb,
  switchRequiredCols,
  defineMatrixAxes,
  validateTabInpList,
  filterCellsPattern,
  switchNumConsTitles,
  createArraysRels,
  getConsultasNums,
} from "../../../locals/edFisNutPage/edFisNutHandler";
import { Person } from "../../../global/declarations/classes";
import { targEl } from "../../../global/declarations/types";
describe("switchAutoFill", () => {
  let autoFillBtn: HTMLButtonElement;
  let lockTabInd: HTMLDivElement;
  beforeEach(() => {
    autoFillBtn = document.createElement("button");
    autoFillBtn.innerText = "Ativar Cálculo Automático";
    lockTabInd = document.createElement("div");
    lockTabInd.classList.add("lockTabInd");
    document.body.appendChild(autoFillBtn);
    document.body.appendChild(lockTabInd);
  });
  it("should activate auto fill when button is clicked", () => {
    expect(switchAutoFill(autoFillBtn, true)).toBe(false);
    expect(autoFillBtn.textContent).toBe("Desativar Cálculo Automático");
  });
  it("should deactivate auto fill when button is clicked", () => {
    autoFillBtn.textContent = "Desativar Cálculo Automático";
    expect(switchAutoFill(autoFillBtn, false)).toBe(true);
    expect(autoFillBtn.textContent).toBe("Ativar Cálculo Automático");
  });
  it("should throw an error if autoFillBtn is not found", () => {
    expect(() => switchAutoFill(document.createElement("div") as any)).toThrow(
      "Element not found: autoFillBtn"
    );
  });
});
describe("switchLockInputs", () => {
  let lockTabInd: HTMLSpanElement;
  let siblingInput: HTMLInputElement;
  beforeEach(() => {
    lockTabInd = document.createElement("span");
    lockTabInd.classList.add("lockTabInd");
    siblingInput = document.createElement("input");
    siblingInput.classList.add("tabInpProg");
    const parentDiv = document.createElement("div");
    parentDiv.appendChild(lockTabInd);
    parentDiv.appendChild(siblingInput);
    document.body.appendChild(parentDiv);
  });
  it("should lock inputs and change to locked icon", () => {
    switchLockInputs([lockTabInd], true);
    setTimeout(() => {
      expect(lockTabInd.innerHTML).toContain("bi-lock");
    }, 500);
  });
  it("should unlock inputs and change to unlocked icon", () => {
    switchLockInputs([lockTabInd], false);
    setTimeout(() => {
      expect(lockTabInd.innerHTML).toContain("bi-unlock");
    }, 500);
  });
  it("should throw an error if input not found", () => {
    expect(() =>
      switchLockInputs([document.createElement("div") as any], true)
    ).toThrow("Element not found: siblingInput");
  });
});
describe("getNumCol", () => {
  it("should return correct column number from element ID", () => {
    const inputElement = document.createElement("input");
    inputElement.id = "row_1_2";
    expect(getNumCol(inputElement)).toBe(2);
  });
  it("should throw an error if element ID does not match the pattern", () => {
    const invalidElement = document.createElement("input");
    invalidElement.id = "invalid_id";
    expect(() => getNumCol(invalidElement)).toThrowError(
      "Match error in .id do Elemento de Evento"
    );
  });
});
describe("validateEvResultNum", () => {
  let inputElement: HTMLInputElement;
  beforeEach(() => {
    inputElement = document.createElement("input");
    inputElement.type = "number";
  });
  it("should return the correct number when valid input", () => {
    inputElement.value = "5";
    expect(validateEvResultNum(inputElement)).toBe(5);
  });
  it("should return 0 for invalid input", () => {
    inputElement.value = "invalid";
    expect(validateEvResultNum(inputElement)).toBe(0);
  });
  it("should throw an error when element is not valid", () => {
    expect(() =>
      validateEvResultNum(document.createElement("div") as any)
    ).toThrow("Multiple elements not found");
  });
});
describe("matchPersonPropertiesWH", () => {
  let person: Person;
  let weightInput: HTMLInputElement;
  let heightInput: HTMLInputElement;
  beforeEach(() => {
    person = new Person();
    weightInput = document.createElement("input");
    heightInput = document.createElement("input");
  });
  it("should return correct weight and height from input fields", () => {
    weightInput.value = "70";
    heightInput.value = "180";
    const [weight, height] = matchPersonPropertiesWH(
      person,
      weightInput,
      heightInput
    );
    expect(weight).toBe(70);
    expect(height).toBe(180);
  });
  it("should default weight and height to 0 if invalid", () => {
    person.weight = "invalid" as any;
    person.height = "invalid" as any;
    const [weight, height] = matchPersonPropertiesWH(
      person,
      weightInput,
      heightInput
    );
    expect(weight).toBe(0);
    expect(height).toBe(0);
  });
});
describe("matchPersonPropertiesDC", () => {
  let person: Person;
  let inputElement: HTMLInputElement;
  beforeEach(() => {
    person = new Person();
    inputElement = document.createElement("input");
    inputElement.value = "25";
  });
  it("should set and return the sumDCut value when valid input is provided", () => {
    expect(matchPersonPropertiesDC(person, inputElement)).toBe(25);
    expect(person.sumDCut).toBe(25);
  });
  it("should default sumDCut to 0 if invalid", () => {
    person.sumDCut = "invalid" as any;
    expect(matchPersonPropertiesDC(person, inputElement)).toBe(0);
  });
  it("should throw an error if input element is not found", () => {
    expect(() =>
      matchPersonPropertiesDC(person, document.createElement("div") as any)
    ).toThrowError("Element not found: targInpSumDCut");
  });
  it("should throw an error if person object is not valid", () => {
    expect(() =>
      matchPersonPropertiesDC(null as any, inputElement)
    ).toThrowError("Object error: arguments for matchPersonPropertiesDC");
  });
});
describe("updateIndexesContexts", () => {
  let person: Person;
  let arrGord: [HTMLInputElement, HTMLInputElement, HTMLInputElement];
  let arrMetab: [HTMLInputElement, HTMLInputElement, HTMLSelectElement];
  beforeEach(() => {
    person = new Person();
    arrGord = [
      document.createElement("input"),
      document.createElement("input"),
      document.createElement("input"),
    ];
    arrMetab = [
      document.createElement("input"),
      document.createElement("input"),
      document.createElement("select"),
    ];
  });
  it("should calculate and return the correct IMC, MLG, TMB, and GET values", () => {
    jest.spyOn(person, "calcIMC").mockReturnValue(["IMC", 22.5]);
    jest.spyOn(person, "calcPGC").mockReturnValue([30, 15.5]);
    jest.spyOn(person, "calcTMB").mockReturnValue(["HarrisBenedict", 1500]);
    jest.spyOn(person, "calcGET").mockReturnValue(2100);
    const [IMC, MLG, TMB, GET] = updateIndexesContexts(
      person,
      arrGord,
      arrMetab,
      1.5,
      "Peso"
    );
    expect(IMC).toBe(22.5);
    expect(MLG).toBe(15.5);
    expect(TMB).toBe(1500);
    expect(GET).toBe(2100);
  });
  it("should throw an error if one of the input elements is not found", () => {
    const invalidArray = [
      document.createElement("div") as any,
      document.createElement("div") as any,
      document.createElement("div") as any,
    ] as [targEl, targEl, targEl];
    expect(() => updateIndexesContexts(person, invalidArray, arrMetab)).toThrow(
      "Multiple elements not found"
    );
  });
  it("should log a warning if TMB and/or factorAtvLvl are invalid", () => {
    jest.spyOn(console, "warn").mockImplementation(() => {});
    jest.spyOn(person, "calcTMB").mockReturnValue(["Invalid", NaN]); // Mocking invalid value
    updateIndexesContexts(person, arrGord, arrMetab, -1);
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("TMB and/or factorAtvLvl not updated or invalid")
    );
  });
});
describe("updateIMCContext", () => {
  let arrGord: [HTMLInputElement, HTMLInputElement, HTMLInputElement];
  let formTMBTypeElement: HTMLSelectElement;
  beforeEach(() => {
    arrGord = [
      document.createElement("input"),
      document.createElement("input"),
      document.createElement("input"),
    ];
    formTMBTypeElement = document.createElement("select");
  });
  it("should update IMC context correctly when values are valid", () => {
    updateIMCContext(arrGord, formTMBTypeElement, ["eutrofico", 22.5]);
    expect(arrGord[0].value).toBe("eutrofico");
    expect(arrGord[1].value).toBe("22.5");
  });
  it("should throw an error if one of the elements is invalid", () => {
    expect(() =>
      updateIMCContext(
        [
          document.createElement("div") as any,
          document.createElement("div") as any,
          document.createElement("div") as any,
        ] as [targEl, targEl, targEl],
        formTMBTypeElement
      )
    ).toThrow("Multiple elements not found");
  });
  it("should call highlightChange when IMC conditions are met", () => {
    const highlightSpy = jest.spyOn(
      require("../../../global/gStyleScript"),
      "highlightChange"
    );
    updateIMCContext(arrGord, formTMBTypeElement, ["abaixo", 18.0]);
    expect(highlightSpy).toHaveBeenCalled();
  });
});
describe("updateTMBContext", () => {
  let person: Person;
  let arrTMB: [HTMLInputElement, HTMLSelectElement];
  beforeEach(() => {
    person = new Person();
    arrTMB = [
      document.createElement("input"),
      document.createElement("select"),
    ];
  });
  it("should update the TMB context correctly", () => {
    jest.spyOn(person, "calcTMB").mockReturnValue(["HarrisBenedict", 1500]);
    expect(updateTMBContext(person, arrTMB, ["eutrofico", 22, 15])).toBe(1500);
    expect(arrTMB[0].value).toBe("1500");
    expect(arrTMB[1].value).toBe("HarrisBenedict");
  });
  it("should throw an error if formTMBTypeElement is not found", () => {
    expect(() =>
      updateTMBContext(
        person,
        [
          document.createElement("div") as any,
          document.createElement("div") as any,
        ] as [targEl, targEl],
        ["eutrofico", 22, 15]
      )
    ).toThrow("Multiple elements not found");
  });
});
describe("updateGETContext", () => {
  let person: Person;
  let inputElement: HTMLInputElement;
  beforeEach(() => {
    person = new Person();
    inputElement = document.createElement("input");
  });
  it("should calculate and return the correct GET value", () => {
    jest.spyOn(person, "calcGET").mockReturnValue(2100);
    expect(updateGETContext(person, inputElement, 1500, 1.4)).toBe(2100);
    expect(inputElement.value).toBe("2100");
  });
  it("should throw an error if input element is not found", () => {
    expect(() =>
      updateGETContext(person, document.createElement("div") as any)
    ).toThrow("Element not found: targInpGET em updateGETContext");
  });
});
describe("matchTMBElements", () => {
  let mainSelect: HTMLSelectElement;
  let gordCorpLvl: HTMLSelectElement;
  let formTMBTypeElement: HTMLSelectElement;
  let spanFactorAtleta: HTMLElement;
  let lockGordCorpLvl: HTMLElement;
  beforeEach(() => {
    mainSelect = document.createElement("select");
    gordCorpLvl = document.createElement("select");
    formTMBTypeElement = document.createElement("select");
    spanFactorAtleta = document.createElement("span");
    lockGordCorpLvl = document.createElement("div");
    jest.clearAllMocks();
  });
  it("should update formTMBTypeElement value to 'tinsley' when mainSelect value is 'muitoIntenso'", () => {
    mainSelect.value = "muitoIntenso";
    formTMBTypeElement.value = "mifflinStJeor";
    matchTMBElements(
      mainSelect,
      gordCorpLvl,
      formTMBTypeElement,
      spanFactorAtleta,
      lockGordCorpLvl
    );
    expect(formTMBTypeElement.value).toBe("tinsley");
  });
  it("should call fadeElement on spanFactorAtleta and lockGordCorpLvl when mainSelect value is 'muitoIntenso'", () => {
    mainSelect.value = "muitoIntenso";
    const mockFadeElement = jest.spyOn(
      require("../../global/gStyleScripts"),
      "fadeElement"
    );
    matchTMBElements(
      mainSelect,
      gordCorpLvl,
      formTMBTypeElement,
      spanFactorAtleta,
      lockGordCorpLvl
    );
    expect(mockFadeElement).toHaveBeenCalledWith(spanFactorAtleta, "0");
    expect(mockFadeElement).toHaveBeenCalledWith(lockGordCorpLvl, "0");
  });
  it("should call inputNotFound when nafType element is not found", () => {
    mainSelect.id = "LvlAtFis";
    const mockInputNotFound = jest.spyOn(
      require("../../global/handlers/errorHandler"),
      "inputNotFound"
    );
    matchTMBElements(
      mainSelect,
      gordCorpLvl,
      formTMBTypeElement,
      spanFactorAtleta,
      lockGordCorpLvl
    );
    expect(mockInputNotFound).toHaveBeenCalled();
  });
  it("should call stringError when an invalid mainSelect value is provided", () => {
    mainSelect.value = "invalidValue";
    const mockStringError = jest.spyOn(
      require("../../global/handlers/errorHandler"),
      "stringError"
    );
    matchTMBElements(
      mainSelect,
      gordCorpLvl,
      formTMBTypeElement,
      spanFactorAtleta,
      lockGordCorpLvl
    );
    expect(mockStringError).toHaveBeenCalled();
  });
  it("should call multipleElementsNotFound when elements are invalid", () => {
    const mockMultipleElementsNotFound = jest.spyOn(
      require("../../global/handlers/errorHandler"),
      "multipleElementsNotFound"
    );
    matchTMBElements(
      null as any,
      null as any,
      null as any,
      null as any,
      null as any
    );
    expect(mockMultipleElementsNotFound).toHaveBeenCalled();
  });
});
describe("updatePGC", () => {
  let person: Person;
  let parentEl: HTMLElement;
  beforeEach(() => {
    person = new Person("male", 30, 80, 180, 100, "1.2");
    parentEl = document.createElement("div");
    jest.clearAllMocks();
  });
  it("should correctly update sumDCut and PGC", () => {
    const inputSumDCut = document.createElement("input");
    inputSumDCut.type = "number";
    inputSumDCut.value = "150";
    parentEl.appendChild(inputSumDCut);
    const inputPGC = document.createElement("input");
    inputPGC.type = "number";
    parentEl.appendChild(inputPGC);
    const result = updatePGC(person, parentEl, 1, "cons");
    expect(result[0]).toBeGreaterThan(0);
    expect(result[1]).toBe(inputSumDCut);
    expect(result[2]).toBe(inputPGC);
  });
  it("should call inputNotFound when targInpSumDCut is invalid", () => {
    updatePGC(person, parentEl, 1, "cons");
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "inputNotFound"
      )
    ).toHaveBeenCalled();
  });
  it("should call multipleElementsNotFound when arguments are invalid", () => {
    updatePGC(null as any, null as any, NaN);
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "multipleElementsNotFound"
      )
    ).toHaveBeenCalled();
  });
});
describe("updateAtvLvl", () => {
  let mainSelect: HTMLSelectElement;
  let secondarySelect: HTMLSelectElement;
  beforeEach(() => {
    mainSelect = document.createElement("select");
    secondarySelect = document.createElement("select");
    jest.clearAllMocks();
  });
  it("should update secondarySelect value based on mainSelect", () => {
    mainSelect.value = "moderado";
    expect(updateAtvLvl(mainSelect, secondarySelect, "leve")).toBe("moderado");
    expect(secondarySelect.value).toBe("moderado");
  });
  it("should call typeError when the returned activity level is not a string", () => {
    const mockTypeError = jest.spyOn(
      require("../../global/handlers/errorHandler"),
      "typeError"
    );
    jest
      .spyOn(
        require("../../../global/handlers/gHandlers"),
        "updateSimpleProperty"
      )
      .mockReturnValue(123 as any);
    updateAtvLvl(mainSelect, secondarySelect, "leve");
    expect(mockTypeError).toHaveBeenCalled();
  });
  it("should call multipleElementsNotFound when elements are invalid", () => {
    updateAtvLvl(null as any, null as any, "leve");
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "multipleElementsNotFound"
      )
    ).toHaveBeenCalled();
  });
});
describe("defineTargInps", () => {
  let parentEl: HTMLElement;
  beforeEach(() => {
    parentEl = document.createElement("div");
    jest.clearAllMocks();
  });
  it("should return valid target inputs", () => {
    const input1 = document.createElement("input");
    const input2 = document.createElement("input");
    parentEl.appendChild(input1);
    parentEl.appendChild(input2);
    jest
      .spyOn(parentEl, "querySelector")
      .mockReturnValueOnce(input1)
      .mockReturnValueOnce(input2);
    const result = defineTargInps(parentEl, 1, "cons");
    expect(result.length).toBe(6);
    expect(result[0]).toBe(input1);
    expect(result[1]).toBe(input2);
  });
  it("should call stringError when numRef is invalid", () => {
    defineTargInps(parentEl, "invalidRef", "cons");
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "stringError"
      )
    ).toHaveBeenCalled();
  });
  it("should call inputNotFound when a target input is not found", () => {
    defineTargInps(parentEl, 1, "cons");
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "inputNotFound"
      )
    ).toHaveBeenCalled();
  });
  it("should call multipleElementsNotFound when elements are invalid", () => {
    defineTargInps(null as any, NaN, "cons");
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "multipleElementsNotFound"
      )
    ).toHaveBeenCalled();
  });
});
describe("addRowAtivFis", () => {
  let tBodyContainer: HTMLElement;
  beforeEach(() => {
    tBodyContainer = document.createElement("tbody");
    tBodyContainer.id = "tbodyAtFisRot";
    document.body.appendChild(tBodyContainer);
    jest.clearAllMocks();
  });
  it("should correctly add a new row to the table body", () => {
    addRowAtivFis(3, "Rot");
    const newRow = document.querySelector("tr.tabRowAtFisRot");
    expect(newRow).not.toBeNull();
    expect(newRow?.id).toBe("tabRowAtFisRotId3");
  });
  it("should call multipleElementsNotFound when tBodyContainer is not found", () => {
    document.getElementById("tbodyAtFisRot")?.remove();
    addRowAtivFis(3, "Rot");
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "multipleElementsNotFound"
      )
    ).toHaveBeenCalled();
  });
});
describe("removeRowAtivFis", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <table>
        <tr id="tabRowAtFisRotId2"></tr>
        <tr id="tabRowAtFisRotId3"></tr>
      </table>
    `;
  });
  it("should remove the row when the count is 3 or more", () => {
    expect(document.getElementById("tabRowAtFisRotId2")).toBeNull();
    expect(removeRowAtivFis(3)).toBe(3);
  });
  it("should not remove the row if the count is less than 3", () => {
    expect(document.getElementById("tabRowAtFisRotId2")).toBeTruthy();
    expect(removeRowAtivFis(2)).toBe(2);
  });
  it("should log a warning if no row is found to remove", () => {
    console.warn = jest.fn();
    removeRowAtivFis(4, "NonExisting");
    expect(console.warn).toHaveBeenCalledWith("No row to remove detected!");
  });
});
describe("switchRowComorb", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <table id="tabComorb">
        <tr id="tabRowComorb2"></tr>
      </table>
      <button id="addComorb"></button>
      <button id="removeComorb"></button>
    `;
  });
  it("should add a new comorbidity row when the add button is clicked", () => {
    switchRowComorb(
      document.getElementById("addComorb") as HTMLButtonElement,
      3
    );
    const newRow = document.getElementById("tabRowComorb3");
    expect(newRow).toBeTruthy();
    expect(newRow?.querySelector('input[type="text"]')).toBeTruthy();
    expect(newRow?.querySelector('input[type="date"]')).toBeTruthy();
  });
  it("should remove a comorbidity row when the remove button is clicked", () => {
    switchRowComorb(
      document.getElementById("removeComorb") as HTMLButtonElement,
      3
    );
    expect(document.getElementById("tabRowComorb2")).toBeNull();
  });
  it("should not remove the last row if rowCountComorb is less than or equal to 3", () => {
    console.warn = jest.fn();
    switchRowComorb(
      document.getElementById("removeComorb") as HTMLButtonElement,
      3
    );
    expect(document.getElementById("tabRowComorb2")).toBeTruthy();
    expect(console.warn).toHaveBeenCalledWith("No row to remove detected.");
  });
  it("should throw an error if comorbContainer is not found", () => {
    expect(() => switchRowComorb(null as any)).toThrowError(
      "Element not found: comorbContainer in switchRowComorb"
    );
  });
});
describe("switchRequiredCols", () => {
  let elements: [HTMLInputElement, HTMLElement, HTMLTableElement];
  beforeEach(() => {
    document.body.innerHTML = `
      <table id="tabProgSVi">
        <tr><td><input id="testInput1" class="tabInpProgSVi" /></td></tr>
      </table>
      <table id="tabMedAnt">
        <tr><td><input id="testInput2" class="tabInpProgMedAnt" /></td></tr>
      </table>
      <table id="tabIndPerc">
        <tr><td><input id="testInput3" class="inpInd" /></td></tr>
      </table>
    `;
    elements = [
      document.createElement("input"),
      document.createElement("div"),
      document.createElement("table"),
    ];
  });
  it("should update the required status of input fields", () => {
    switchRequiredCols(elements, 2);
    const input1 = document.getElementById("testInput1") as HTMLInputElement;
    const input2 = document.getElementById("testInput2") as HTMLInputElement;
    const input3 = document.getElementById("testInput3") as HTMLInputElement;
    expect(input1.required).toBe(true);
    expect(input2.required).toBe(true);
    expect(input3.required).toBe(true);
  });
  it("should throw an error if consTablesFs or other tables are not found", () => {
    expect(() =>
      switchRequiredCols(
        [document.createElement("input"), null as any, null as any],
        2
      )
    ).toThrow("Multiple elements not found");
  });
  it("should log an error if numCons is invalid", () => {
    console.error = jest.fn();
    switchRequiredCols(elements, -1, false);
    expect(console.error).toHaveBeenCalledWith(
      "Number of Appointment Options Invalid"
    );
  });
});
describe("defineMatrixAxes", () => {
  it("should calculate and return the number of valid axes", () => {
    document.body.innerHTML = `
      <table id="testTable">
        <tr><td></td></tr>
        <tr><td></td></tr>
        <col />
        <col />
      </table>
    `;
    expect(
      defineMatrixAxes(document.getElementById("testTable") as HTMLTableElement)
    ).toBe(1);
  });

  it("should throw an error if the table is not found", () => {
    expect(() => defineMatrixAxes(null as any)).toThrow(
      "Element not found: tab in defineMatrixAxes()"
    );
  });
});
describe("validateTabInpList", () => {
  it("should return true if input list and matrix size are valid", () => {
    expect(validateTabInpList(document.querySelectorAll("input"), 2)).toBe(
      true
    );
  });
  it("should return false if input list length does not match matrix size", () => {
    expect(validateTabInpList(document.querySelectorAll("input"), 5)).toBe(
      false
    );
  });
  it("should log a warning if inputs are not valid", () => {
    console.warn = jest.fn();
    validateTabInpList(document.querySelectorAll("div"), 2);
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("Error capturings inputs of Sinais Vitais")
    );
  });
});
describe("filterCellsPattern", () => {
  let inputElements: HTMLInputElement[];
  beforeEach(() => {
    inputElements = Array.from({ length: 3 }, (_, i) => {
      const input = document.createElement("input");
      input.id = `testInput_${i + 1}`;
      return input;
    });
    document.body.append(...inputElements);
  });
  it("should return filtered elements based on the ID pattern", () => {
    const result = filterCellsPattern(
      document.querySelectorAll("input"),
      /_2/,
      2
    );
    expect(result[0].length).toBe(1);
    expect(result[0][0].id).toBe("testInput_2");
  });
  it("should log an error if inputs do not match the pattern", () => {
    console.warn = jest.fn();
    filterCellsPattern(document.querySelectorAll("input"), /_10/, 2);
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining(
        "Error filtering .id of Elements in the table for Sinais Vitais"
      )
    );
  });
  it("should throw an error if invalid arguments are provided", () => {
    expect(() => filterCellsPattern(null as any, /_2/)).toThrowError(
      "Multiple elements not found"
    );
  });
});
describe("switchNumConsTitles", () => {
  let consTitles: HTMLElement[];
  let trioEl: HTMLInputElement;
  beforeEach(() => {
    consTitles = [document.createElement("div"), document.createElement("div")];
    trioEl = document.createElement("input");
    trioEl.type = "number";
    document.body.appendChild(trioEl);
    jest.clearAllMocks();
  });
  it("should update the text content of consTitles based on trioEl value", () => {
    trioEl.value = "2";
    switchNumConsTitles(consTitles, trioEl, 3, 1);
    expect(consTitles[0].textContent).toBe("2ª Consulta");
    expect(consTitles[1].textContent).toBe("3ª Consulta");
  });
  it("should call inputNotFound when an input element inside a table is not found", () => {
    document.querySelectorAll = jest
      .fn()
      .mockReturnValue([document.createElement("div")]);
    switchNumConsTitles(consTitles, trioEl, 3, 1);
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "inputNotFound"
      )
    ).toHaveBeenCalled();
  });
  it("should call multipleElementsNotFound when invalid arguments are passed", () => {
    switchNumConsTitles(null as any, null as any, NaN, NaN);
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "multipleElementsNotFound"
      )
    ).toHaveBeenCalled();
  });
});
describe("createArraysRels", () => {
  let arrayRows: HTMLTableRowElement[];
  let protocolValue: string;
  beforeEach(() => {
    const row1 = document.createElement("tr");
    const row2 = document.createElement("tr");
    const input1 = document.createElement("input");
    input1.id = "input_1";
    const input2 = document.createElement("input");
    input2.id = "input_2";
    row1.appendChild(input1);
    row2.appendChild(input2);
    arrayRows = [row1, row2];
    protocolValue = "pollock3";
    jest.clearAllMocks();
  });
  it("should correctly calculate the sum of input values", () => {
    if (arrayRows[0].querySelector("input"))
      arrayRows[0].querySelector("input")!.value = "10";
    if (arrayRows[1].querySelector("input"))
      arrayRows[1].querySelector("input")!.value = "20";
    expect(createArraysRels(arrayRows, "btn_1_1", protocolValue)).toBe(30);
  });
  it("should return 0 when protocol number is not 3 or 7", () => {
    expect(createArraysRels(arrayRows, "btn_1_1", "pollock9")).toBe(0);
  });
  it("should call multipleElementsNotFound when invalid arguments are passed", () => {
    createArraysRels(null as any, "", "");
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "multipleElementsNotFound"
      )
    ).toHaveBeenCalled();
  });
});
describe("getConsultasNums", () => {
  let arrayRow: HTMLTableRowElement;
  beforeEach(() => {
    arrayRow = document.createElement("tr");
    jest.clearAllMocks();
  });
  it("should return an array of consulta numbers extracted from innerText", () => {
    arrayRow.innerText = "Consulta 123";
    expect(getConsultasNums(arrayRow)).toEqual([1, 2, 3]);
  });
  it("should return [1] when innerText has no numbers", () => {
    arrayRow.innerText = "Consulta";
    expect(getConsultasNums(arrayRow)).toEqual([1]);
  });
  it("should call elementNotFound when arrayRow is not a table row", () => {
    getConsultasNums(null as any);
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "elementNotFound"
      )
    ).toHaveBeenCalled();
  });
});
