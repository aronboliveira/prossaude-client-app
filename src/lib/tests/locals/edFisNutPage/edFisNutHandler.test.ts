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
import {
  Appointment,
  BootstrapIconClass,
  ConsoleMethod,
  ElementMethod,
  ErrorHandler,
  GlobalHandler,
  GlobalStyleFunction,
  GordLvl,
  Intensity,
  PersonMethod,
  PseudoNum,
  TMBFormula,
} from "../../testVars";
describe("switchAutoFill", (): void => {
  let autoFillBtn: HTMLButtonElement;
  let lockTabInd: HTMLDivElement;
  beforeEach((): void => {
    autoFillBtn = document.createElement("button") as HTMLButtonElement;
    autoFillBtn.innerText = "Ativar Cálculo Automático";
    lockTabInd = document.createElement("div") as HTMLDivElement;
    lockTabInd.classList.add("lockTabInd");
    document.body.appendChild(autoFillBtn);
    document.body.appendChild(lockTabInd);
  });
  it("should activate auto fill when button is clicked", (): void => {
    expect(switchAutoFill(autoFillBtn, true)).toBe<boolean>(false);
    expect(autoFillBtn.textContent).toBe<string>("Desativar Cálculo Automático");
  });
  it("should deactivate auto fill when button is clicked", (): void => {
    autoFillBtn.textContent = "Desativar Cálculo Automático";
    expect(switchAutoFill(autoFillBtn, false)).toBe<boolean>(true);
    expect(autoFillBtn.textContent).toBe<string>("Ativar Cálculo Automático");
  });
  it("should throw an error if autoFillBtn is not found", (): void => {
    expect((): boolean => switchAutoFill(document.createElement("div") as HTMLDivElement as any)).toThrow(
      "Element not found: autoFillBtn"
    );
  });
});
describe("switchLockInputs", (): void => {
  let lockTabInd: HTMLSpanElement;
  let siblingInput: HTMLInputElement;
  beforeEach((): void => {
    lockTabInd = document.createElement("span");
    lockTabInd.classList.add("lockTabInd");
    siblingInput = document.createElement("input") as HTMLInputElement;
    siblingInput.classList.add("tabInpProg");
    const parentDiv = document.createElement("div") as HTMLDivElement;
    parentDiv.appendChild(lockTabInd);
    parentDiv.appendChild(siblingInput);
    document.body.appendChild(parentDiv);
  });
  it("should lock inputs and change to locked icon", (): void => {
    switchLockInputs([lockTabInd], true);
    setTimeout(() => {
      expect(lockTabInd.innerHTML).toContain<BootstrapIconClass>("bi-lock");
    }, 500);
  });
  it("should unlock inputs and change to unlocked icon", (): void => {
    switchLockInputs([lockTabInd], false);
    setTimeout(() => {
      expect(lockTabInd.innerHTML).toContain<BootstrapIconClass>("bi-unlock");
    }, 500);
  });
  it("should throw an error if input not found", (): void => {
    expect((): void => switchLockInputs([document.createElement("div") as HTMLDivElement as any], true)).toThrow(
      "Element not found: siblingInput"
    );
  });
});
describe("getNumCol", (): void => {
  it("should return correct column number from element ID", (): void => {
    const inputElement = document.createElement("input") as HTMLInputElement;
    inputElement.id = "row_1_2";
    expect(getNumCol(inputElement)).toBe<number>(2);
  });
  it("should throw an error if element ID does not match the pattern", (): void => {
    const invalidElement = document.createElement("input") as HTMLInputElement;
    invalidElement.id = "invalid_id";
    expect((): number => getNumCol(invalidElement)).toThrow("Match error in .id do Elemento de Evento");
  });
});
describe("validateEvResultNum", (): void => {
  let inputElement: HTMLInputElement;
  beforeEach((): void => {
    inputElement = document.createElement("input") as HTMLInputElement;
    inputElement.type = "number";
  });
  it("should return the correct number when valid input", (): void => {
    inputElement.value = "5";
    expect(validateEvResultNum(inputElement)).toBe<number>(5);
  });
  it("should return 0 for invalid input", (): void => {
    inputElement.value = "invalid";
    expect(validateEvResultNum(inputElement)).toBe<number>(0);
  });
  it("should throw an error when element is not valid", (): void => {
    expect((): number => validateEvResultNum(document.createElement("div") as HTMLDivElement as any)).toThrow(
      "Multiple elements not found"
    );
  });
});
describe("matchPersonPropertiesWH", (): void => {
  let person: Person;
  let weightInput: HTMLInputElement;
  let heightInput: HTMLInputElement;
  beforeEach((): void => {
    person = new Person();
    weightInput = document.createElement("input") as HTMLInputElement;
    heightInput = document.createElement("input") as HTMLInputElement;
  });
  it("should return correct weight and height from input fields", (): void => {
    weightInput.value = "70";
    heightInput.value = "180";
    const [weight, height] = matchPersonPropertiesWH(person, weightInput, heightInput);
    expect(weight).toBe<number>(70);
    expect(height).toBe<number>(180);
  });
  it("should default weight and height to 0 if invalid", (): void => {
    person.weight = "invalid" as any;
    person.height = "invalid" as any;
    const [weight, height] = matchPersonPropertiesWH(person, weightInput, heightInput);
    expect(weight).toBe<number>(0);
    expect(height).toBe<number>(0);
  });
});
describe("matchPersonPropertiesDC", (): void => {
  let person: Person;
  let inputElement: HTMLInputElement;
  beforeEach((): void => {
    person = new Person();
    inputElement = document.createElement("input") as HTMLInputElement;
    inputElement.value = "25";
  });
  it("should set and return the sumDCut value when valid input is provided", (): void => {
    expect(matchPersonPropertiesDC(person, inputElement)).toBe<number>(25);
    expect(person.sumDCut).toBe<number>(25);
  });
  it("should default sumDCut to 0 if invalid", (): void => {
    person.sumDCut = "invalid" as any;
    expect(matchPersonPropertiesDC(person, inputElement)).toBe<number>(0);
  });
  it("should throw an error if input element is not found", (): void => {
    expect((): number =>
      matchPersonPropertiesDC(person, document.createElement("div") as HTMLDivElement as any)
    ).toThrow("Element not found: targInpSumDCut");
  });
  it("should throw an error if person object is not valid", (): void => {
    expect((): number => matchPersonPropertiesDC(null as any, inputElement)).toThrow(
      "Object error: arguments for matchPersonPropertiesDC"
    );
  });
});
describe("updateIndexesContexts", (): void => {
  let person: Person;
  let arrGord: [HTMLInputElement, HTMLInputElement, HTMLInputElement];
  let arrMetab: [HTMLInputElement, HTMLInputElement, HTMLSelectElement];
  beforeEach((): void => {
    person = new Person();
    arrGord = [
      document.createElement("input") as HTMLInputElement,
      document.createElement("input") as HTMLInputElement,
      document.createElement("input") as HTMLInputElement,
    ];
    arrMetab = [
      document.createElement("input") as HTMLInputElement,
      document.createElement("input") as HTMLInputElement,
      document.createElement("select"),
    ];
  });
  it("should calculate and return the correct IMC, MLG, TMB, and GET values", (): void => {
    jest.spyOn<Person, PersonMethod>(person, "calcIMC").mockReturnValue(["IMC", 22.5]);
    jest.spyOn<Person, PersonMethod>(person, "calcPGC").mockReturnValue([30, 15.5]);
    jest.spyOn<Person, PersonMethod>(person, "calcTMB").mockReturnValue(["HarrisBenedict", 1500]);
    jest.spyOn<Person, PersonMethod>(person, "calcGET").mockReturnValue(2100);
    const [IMC, MLG, TMB, GET] = updateIndexesContexts(person, arrGord, arrMetab, 1.5, "Peso");
    expect(IMC).toBe<number>(22.5);
    expect(MLG).toBe<number>(15.5);
    expect(TMB).toBe<number>(1500);
    expect(GET).toBe<number>(2100);
  });
  it("should throw an error if one of the input elements is not found", (): void => {
    const invalidArray = [
      document.createElement("div") as HTMLDivElement as any,
      document.createElement("div") as HTMLDivElement as any,
      document.createElement("div") as HTMLDivElement as any,
    ] as [targEl, targEl, targEl];
    expect((): [number, number, number, number] => updateIndexesContexts(person, invalidArray, arrMetab)).toThrow(
      "Multiple elements not found"
    );
  });
  it("should log a warning if TMB and/or factorAtvLvl are invalid", (): void => {
    jest.spyOn<Console, ConsoleMethod>(console, "warn").mockImplementation((): void => {}) as jest.SpyInstance;
    jest.spyOn<Person, PersonMethod>(person, "calcTMB").mockReturnValue(["Invalid", NaN]);
    updateIndexesContexts(person, arrGord, arrMetab, -1);
    expect(console.warn).toHaveBeenCalledWith<[any]>(
      expect.stringContaining("TMB and/or factorAtvLvl not updated or invalid")
    );
  });
});
describe("updateIMCContext", (): void => {
  let arrGord: [HTMLInputElement, HTMLInputElement, HTMLInputElement];
  let formTMBTypeElement: HTMLSelectElement;
  beforeEach((): void => {
    arrGord = [
      document.createElement("input") as HTMLInputElement,
      document.createElement("input") as HTMLInputElement,
      document.createElement("input") as HTMLInputElement,
    ];
    formTMBTypeElement = document.createElement("select");
  });
  it("should update IMC context correctly when values are valid", (): void => {
    updateIMCContext(arrGord, formTMBTypeElement, ["eutrofico", 22.5]);
    expect(arrGord[0].value).toBe<GordLvl>("eutrofico");
    expect(arrGord[1].value).toBe<PseudoNum>("22.5");
  });
  it("should throw an error if one of the elements is invalid", (): void => {
    expect((): void =>
      updateIMCContext(
        [
          document.createElement("div") as HTMLDivElement as any,
          document.createElement("div") as HTMLDivElement as any,
          document.createElement("div") as HTMLDivElement as any,
        ] as [targEl, targEl, targEl],
        formTMBTypeElement
      )
    ).toThrow("Multiple elements not found");
  });
  it("should call highlightChange when IMC conditions are met", (): void => {
    updateIMCContext(arrGord, formTMBTypeElement, ["abaixo", 18.0]);
    expect(
      jest.spyOn<any, GlobalStyleFunction>(require("../../../global/gStyleScript"), "highlightChange")
    ).toHaveBeenCalled() as void;
  });
});
describe("updateTMBContext", (): void => {
  let person: Person;
  let arrTMB: [HTMLInputElement, HTMLSelectElement];
  beforeEach((): void => {
    person = new Person();
    arrTMB = [document.createElement("input") as HTMLInputElement, document.createElement("select")];
  });
  it("should update the TMB context correctly", (): void => {
    jest.spyOn<Person, PersonMethod>(person, "calcTMB").mockReturnValue(["harrisBenedict", 1500]);
    expect(updateTMBContext(person, arrTMB, ["eutrofico", 22, 15])).toBe<number>(1500);
    expect(arrTMB[0].value).toBe<PseudoNum>("1500");
    expect(arrTMB[1].value).toBe<TMBFormula>("harrisBenedict");
  });
  it("should throw an error if formTMBTypeElement is not found", (): void => {
    expect((): number =>
      updateTMBContext(
        person,
        [
          document.createElement("div") as HTMLDivElement as any,
          document.createElement("div") as HTMLDivElement as any,
        ] as [targEl, targEl],
        ["eutrofico", 22, 15]
      )
    ).toThrow("Multiple elements not found");
  });
});
describe("updateGETContext", (): void => {
  let person: Person;
  let inputElement: HTMLInputElement;
  beforeEach((): void => {
    person = new Person();
    inputElement = document.createElement("input") as HTMLInputElement;
  });
  it("should calculate and return the correct GET value", (): void => {
    jest.spyOn<Person, PersonMethod>(person, "calcGET").mockReturnValue(2100);
    expect(updateGETContext(person, inputElement, 1500, 1.4)).toBe<number>(2100);
    expect(inputElement.value).toBe<PseudoNum>("2100");
  });
  it("should throw an error if input element is not found", (): void => {
    expect((): number => updateGETContext(person, document.createElement("div") as HTMLDivElement as any)).toThrow(
      "Element not found: targInpGET em updateGETContext"
    );
  });
});
describe("matchTMBElements", (): void => {
  let mainSelect: HTMLSelectElement;
  let gordCorpLvl: HTMLSelectElement;
  let formTMBTypeElement: HTMLSelectElement;
  let spanFactorAtleta: HTMLElement;
  let lockGordCorpLvl: HTMLElement;
  beforeEach((): void => {
    mainSelect = document.createElement("select");
    gordCorpLvl = document.createElement("select");
    formTMBTypeElement = document.createElement("select");
    spanFactorAtleta = document.createElement("span");
    lockGordCorpLvl = document.createElement("div") as HTMLDivElement;
    jest.clearAllMocks() as typeof jest;
  });
  it("should update formTMBTypeElement value to 'tinsley' when mainSelect value is 'muitoIntenso'", (): void => {
    mainSelect.value = "muitoIntenso";
    formTMBTypeElement.value = "mifflinStJeor";
    matchTMBElements(mainSelect, gordCorpLvl, formTMBTypeElement, spanFactorAtleta, lockGordCorpLvl);
    expect(formTMBTypeElement.value).toBe<TMBFormula>("tinsley");
  });
  it("should call fadeElement on spanFactorAtleta and lockGordCorpLvl when mainSelect value is 'muitoIntenso'", (): void => {
    mainSelect.value = "muitoIntenso";
    const mockFadeElement = jest.spyOn<any, GlobalStyleFunction>(require("../../global/gStyleScripts"), "fadeElement");
    matchTMBElements(mainSelect, gordCorpLvl, formTMBTypeElement, spanFactorAtleta, lockGordCorpLvl);
    expect(mockFadeElement).toHaveBeenCalledWith<[HTMLElement, string]>(spanFactorAtleta, "0") as void;
    expect(mockFadeElement).toHaveBeenCalledWith<[HTMLElement, string]>(lockGordCorpLvl, "0") as void;
  });
  it("should call inputNotFound when nafType element is not found", (): void => {
    mainSelect.id = "LvlAtFis";
    const mockInputNotFound = jest.spyOn<any, ErrorHandler>(
      require("../../global/handlers/errorHandler"),
      "inputNotFound"
    );
    matchTMBElements(mainSelect, gordCorpLvl, formTMBTypeElement, spanFactorAtleta, lockGordCorpLvl);
    expect(mockInputNotFound).toHaveBeenCalled() as void;
  });
  it("should call stringError when an invalid mainSelect value is provided", (): void => {
    mainSelect.value = "invalidValue";
    const mockStringError = jest.spyOn<any, ErrorHandler>(require("../../global/handlers/errorHandler"), "stringError");
    matchTMBElements(mainSelect, gordCorpLvl, formTMBTypeElement, spanFactorAtleta, lockGordCorpLvl);
    expect(mockStringError).toHaveBeenCalled() as void;
  });
  it("should call multipleElementsNotFound when elements are invalid", (): void => {
    const mockMultipleElementsNotFound = jest.spyOn<any, ErrorHandler>(
      require("../../global/handlers/errorHandler"),
      "multipleElementsNotFound"
    );
    matchTMBElements(null as any, null as any, null as any, null as any, null as any);
    expect(mockMultipleElementsNotFound).toHaveBeenCalled() as void;
  });
});
describe("updatePGC", (): void => {
  let person: Person;
  let parentEl: HTMLElement;
  beforeEach((): void => {
    person = new Person("male", 30, 80, 180, 100, "1.2");
    parentEl = document.createElement("div") as HTMLDivElement;
    jest.clearAllMocks() as typeof jest;
  });
  it("should correctly update sumDCut and PGC", (): void => {
    const inputSumDCut = document.createElement("input") as HTMLInputElement;
    inputSumDCut.type = "number";
    inputSumDCut.value = "150";
    parentEl.appendChild(inputSumDCut);
    const inputPGC = document.createElement("input") as HTMLInputElement;
    inputPGC.type = "number";
    parentEl.appendChild(inputPGC);
    const result = updatePGC(person, parentEl, 1, "cons");
    expect(result[0]).toBeGreaterThan(0);
    expect(result[1]).toBe<HTMLInputElement>(inputSumDCut);
    expect(result[2]).toBe<HTMLInputElement>(inputPGC);
  });
  it("should call inputNotFound when targInpSumDCut is invalid", (): void => {
    updatePGC(person, parentEl, 1, "cons");
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "inputNotFound")
    ).toHaveBeenCalled() as void;
  });
  it("should call multipleElementsNotFound when arguments are invalid", (): void => {
    updatePGC(null as any, null as any, NaN);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "multipleElementsNotFound")
    ).toHaveBeenCalled() as void;
  });
});
describe("updateAtvLvl", (): void => {
  let mainSelect: HTMLSelectElement;
  let secondarySelect: HTMLSelectElement;
  beforeEach((): void => {
    mainSelect = document.createElement("select");
    secondarySelect = document.createElement("select");
    jest.clearAllMocks() as typeof jest;
  });
  it("should update secondarySelect value based on mainSelect", (): void => {
    mainSelect.value = "moderado";
    expect(updateAtvLvl(mainSelect, secondarySelect, "leve")).toBe<Intensity>("moderado");
    expect(secondarySelect.value).toBe<Intensity>("moderado");
  });
  it("should call typeError when the returned activity level is not a string", (): void => {
    const mockTypeError = jest.spyOn<any, ErrorHandler>(require("../../global/handlers/errorHandler"), "typeError");
    jest
      .spyOn<any, GlobalHandler>(require("../../../global/handlers/gHandlers"), "updateSimpleProperty")
      .mockReturnValue(123 as any);
    updateAtvLvl(mainSelect, secondarySelect, "leve");
    expect(mockTypeError).toHaveBeenCalled() as void;
  });
  it("should call multipleElementsNotFound when elements are invalid", (): void => {
    updateAtvLvl(null as any, null as any, "leve");
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "multipleElementsNotFound")
    ).toHaveBeenCalled() as void;
  });
});
describe("defineTargInps", (): void => {
  let parentEl: HTMLElement;
  beforeEach((): void => {
    parentEl = document.createElement("div") as HTMLDivElement;
    jest.clearAllMocks() as typeof jest;
  });
  it("should return valid target inputs", (): void => {
    const input1 = document.createElement("input") as HTMLInputElement;
    const input2 = document.createElement("input") as HTMLInputElement;
    parentEl.appendChild(input1);
    parentEl.appendChild(input2);
    jest
      .spyOn<HTMLElement, ElementMethod>(parentEl, "querySelector")
      .mockReturnValueOnce(input1)
      .mockReturnValueOnce(input2);
    const result = defineTargInps(parentEl, 1, "cons");
    expect(result.length).toBe<number>(6);
    expect(result[0]).toBe<HTMLInputElement>(input1);
    expect(result[1]).toBe<HTMLInputElement>(input2);
  });
  it("should call stringError when numRef is invalid", (): void => {
    defineTargInps(parentEl, "invalidRef", "cons");
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "stringError")
    ).toHaveBeenCalled() as void;
  });
  it("should call inputNotFound when a target input is not found", (): void => {
    defineTargInps(parentEl, 1, "cons");
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "inputNotFound")
    ).toHaveBeenCalled() as void;
  });
  it("should call multipleElementsNotFound when elements are invalid", (): void => {
    defineTargInps(null as any, NaN, "cons");
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "multipleElementsNotFound")
    ).toHaveBeenCalled() as void;
  });
});
describe("addRowAtivFis", (): void => {
  let tBodyContainer: HTMLElement;
  beforeEach((): void => {
    tBodyContainer = document.createElement("tbody");
    tBodyContainer.id = "tbodyAtFisRot";
    document.body.appendChild(tBodyContainer);
    jest.clearAllMocks() as typeof jest;
  });
  it("should correctly add a new row to the table body", (): void => {
    addRowAtivFis(3, "Rot");
    const newRow = document.querySelector("tr.tabRowAtFisRot");
    expect(newRow).not.toBeNull();
    expect(newRow?.id).toBe<string>("tabRowAtFisRotId3");
  });
  it("should call multipleElementsNotFound when tBodyContainer is not found", (): void => {
    document.getElementById("tbodyAtFisRot")?.remove() as void;
    addRowAtivFis(3, "Rot");
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "multipleElementsNotFound")
    ).toHaveBeenCalled() as void;
  });
});
describe("removeRowAtivFis", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = `
      <table>
        <tr id="tabRowAtFisRotId2"></tr>
        <tr id="tabRowAtFisRotId3"></tr>
      </table>
    `;
  });
  it("should remove the row when the count is 3 or more", (): void => {
    expect(document.getElementById("tabRowAtFisRotId2")).toBeNull();
    expect(removeRowAtivFis(3)).toBe<number>(3);
  });
  it("should not remove the row if the count is less than 3", (): void => {
    expect(document.getElementById("tabRowAtFisRotId2")).toBeTruthy() as void;
    expect(removeRowAtivFis(2)).toBe<number>(2);
  });
  it("should log a warning if no row is found to remove", (): void => {
    console.warn = jest.fn();
    removeRowAtivFis(4, "NonExisting");
    expect(console.warn).toHaveBeenCalledWith<[string]>("No row to remove detected!") as void;
  });
});
describe("switchRowComorb", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = `
      <table id="tabComorb">
        <tr id="tabRowComorb2"></tr>
      </table>
      <button id="addComorb"></button>
      <button id="removeComorb"></button>
    `;
  });
  it("should add a new comorbidity row when the add button is clicked", (): void => {
    switchRowComorb(document.getElementById("addComorb") as HTMLButtonElement, 3);
    const newRow = document.getElementById("tabRowComorb3");
    expect(newRow).toBeTruthy() as void;
    expect(newRow?.querySelector('input[type="text"]')).toBeTruthy() as void;
    expect(newRow?.querySelector('input[type="date"]')).toBeTruthy() as void;
  });
  it("should remove a comorbidity row when the remove button is clicked", (): void => {
    switchRowComorb(document.getElementById("removeComorb") as HTMLButtonElement, 3);
    expect(document.getElementById("tabRowComorb2")).toBeNull();
  });
  it("should not remove the last row if rowCountComorb is less than or equal to 3", (): void => {
    console.warn = jest.fn();
    switchRowComorb(document.getElementById("removeComorb") as HTMLButtonElement, 3);
    expect(document.getElementById("tabRowComorb2")).toBeTruthy() as void;
    expect(console.warn).toHaveBeenCalledWith<[string]>("No row to remove detected.") as void;
  });
  it("should throw an error if comorbContainer is not found", (): void => {
    expect((): void => switchRowComorb(null as any)).toThrow("Element not found: comorbContainer in switchRowComorb");
  });
});
describe("switchRequiredCols", (): void => {
  let elements: [HTMLInputElement, HTMLElement, HTMLTableElement];
  beforeEach((): void => {
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
      document.createElement("input") as HTMLInputElement,
      document.createElement("div") as HTMLDivElement,
      document.createElement("table"),
    ];
  });
  it("should update the required status of input fields", (): void => {
    switchRequiredCols(elements, 2);
    const input1 = document.getElementById("testInput1") as HTMLInputElement;
    const input2 = document.getElementById("testInput2") as HTMLInputElement;
    const input3 = document.getElementById("testInput3") as HTMLInputElement;
    expect(input1.required).toBe<boolean>(true);
    expect(input2.required).toBe<boolean>(true);
    expect(input3.required).toBe<boolean>(true);
  });
  it("should throw an error if consTablesFs or other tables are not found", (): void => {
    expect((): void =>
      switchRequiredCols([document.createElement("input") as HTMLInputElement, null as any, null as any], 2)
    ).toThrow("Multiple elements not found");
  });
  it("should log an error if numCons is invalid", (): void => {
    console.error = jest.fn();
    switchRequiredCols(elements, -1, false);
    expect(console.error).toHaveBeenCalledWith<[string]>("Number of Appointment Options Invalid") as void;
  });
});
describe("defineMatrixAxes", (): void => {
  it("should calculate and return the number of valid axes", (): void => {
    document.body.innerHTML = `
      <table id="testTable">
        <tr><td></td></tr>
        <tr><td></td></tr>
        <col />
        <col />
      </table>
    `;
    expect(defineMatrixAxes(document.getElementById("testTable") as HTMLTableElement)).toBe<number>(1);
  });

  it("should throw an error if the table is not found", (): void => {
    expect((): number => defineMatrixAxes(null as any)).toThrow("Element not found: tab in defineMatrixAxes()");
  });
});
describe("validateTabInpList", (): void => {
  it("should return true if input list and matrix size are valid", (): void => {
    expect(validateTabInpList(document.querySelectorAll("input"), 2)).toBe<boolean>(true);
  });
  it("should return false if input list length does not match matrix size", (): void => {
    expect(validateTabInpList(document.querySelectorAll("input"), 5)).toBe<boolean>(false);
  });
  it("should log a warning if inputs are not valid", (): void => {
    console.warn = jest.fn();
    validateTabInpList(document.querySelectorAll("div"), 2);
    expect(console.warn).toHaveBeenCalledWith<[any]>(
      expect.stringContaining("Error capturings inputs of Sinais Vitais")
    );
  });
});
describe("filterCellsPattern", (): void => {
  let inputElements: HTMLInputElement[];
  beforeEach((): void => {
    inputElements = Array.from({ length: 3 }, (_, i) => {
      const input = document.createElement("input") as HTMLInputElement;
      input.id = `testInput_${i + 1}`;
      return input;
    });
    document.body.append(...inputElements);
  });
  it("should return filtered elements based on the ID pattern", (): void => {
    const result = filterCellsPattern(document.querySelectorAll("input"), /_2/, 2);
    expect(result[0].length).toBe<number>(1);
    expect(result[0][0].id).toBe<string>("testInput_2");
  });
  it("should log an error if inputs do not match the pattern", (): void => {
    console.warn = jest.fn();
    filterCellsPattern(document.querySelectorAll("input"), /_10/, 2);
    expect(console.warn).toHaveBeenCalledWith<[any]>(
      expect.stringContaining("Error filtering .id of Elements in the table for Sinais Vitais")
    );
  });
  it("should throw an error if invalid arguments are provided", (): void => {
    expect((): Array<Element[]> => filterCellsPattern(null as any, /_2/)).toThrow("Multiple elements not found");
  });
});
describe("switchNumConsTitles", (): void => {
  let consTitles: HTMLElement[];
  let trioEl: HTMLInputElement;
  beforeEach((): void => {
    consTitles = [document.createElement("div") as HTMLDivElement, document.createElement("div") as HTMLDivElement];
    trioEl = document.createElement("input") as HTMLInputElement;
    trioEl.type = "number";
    document.body.appendChild(trioEl);
    jest.clearAllMocks() as typeof jest;
  });
  it("should update the text content of consTitles based on trioEl value", (): void => {
    trioEl.value = "2";
    switchNumConsTitles(consTitles, trioEl, 3, 1);
    expect(consTitles[0].textContent).toBe<Appointment>("2ª Consulta");
    expect(consTitles[1].textContent).toBe<Appointment>("3ª Consulta");
  });
  it("should call inputNotFound when an input element inside a table is not found", (): void => {
    document.querySelectorAll = jest.fn().mockReturnValue([document.createElement("div") as HTMLDivElement]);
    switchNumConsTitles(consTitles, trioEl, 3, 1);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "inputNotFound")
    ).toHaveBeenCalled() as void;
  });
  it("should call multipleElementsNotFound when invalid arguments are passed", (): void => {
    switchNumConsTitles(null as any, null as any, NaN, NaN);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "multipleElementsNotFound")
    ).toHaveBeenCalled() as void;
  });
});
describe("createArraysRels", (): void => {
  let arrayRows: HTMLTableRowElement[];
  let protocolValue: string;
  beforeEach((): void => {
    const row1 = document.createElement("tr");
    const row2 = document.createElement("tr");
    const input1 = document.createElement("input") as HTMLInputElement;
    input1.id = "input_1";
    const input2 = document.createElement("input") as HTMLInputElement;
    input2.id = "input_2";
    row1.appendChild(input1);
    row2.appendChild(input2);
    arrayRows = [row1, row2];
    protocolValue = "pollock3";
    jest.clearAllMocks() as typeof jest;
  });
  it("should correctly calculate the sum of input values", (): void => {
    if (arrayRows[0].querySelector("input")) arrayRows[0].querySelector("input")!.value = "10";
    if (arrayRows[1].querySelector("input")) arrayRows[1].querySelector("input")!.value = "20";
    expect(createArraysRels(arrayRows, "btn_1_1", protocolValue)).toBe<number>(30);
  });
  it("should return 0 when protocol number is not 3 or 7", (): void => {
    expect(createArraysRels(arrayRows, "btn_1_1", "pollock9")).toBe<number>(0);
  });
  it("should call multipleElementsNotFound when invalid arguments are passed", (): void => {
    createArraysRels(null as any, "", "");
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "multipleElementsNotFound")
    ).toHaveBeenCalled() as void;
  });
});
describe("getConsultasNums", (): void => {
  let arrayRow: HTMLTableRowElement;
  beforeEach((): void => {
    arrayRow = document.createElement("tr");
    jest.clearAllMocks() as typeof jest;
  });
  it("should return an array of consulta numbers extracted from innerText", (): void => {
    arrayRow.innerText = "Consulta 123";
    expect(getConsultasNums(arrayRow)).toEqual<[number, number, number]>([1, 2, 3]);
  });
  it("should return [1] when innerText has no numbers", (): void => {
    arrayRow.innerText = "Consulta";
    expect(getConsultasNums(arrayRow)).toEqual<[number]>([1]);
  });
  it("should call elementNotFound when arrayRow is not a table row", (): void => {
    getConsultasNums(null as any);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "elementNotFound")
    ).toHaveBeenCalled() as void;
  });
});
