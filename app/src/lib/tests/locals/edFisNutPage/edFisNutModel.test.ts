//v1.0.0
import {
  checkInnerColGroups,
  checkTabRowsIds,
  changeTabDCutLayout,
  defineHiddenRows,
  evaluatePGCDecay,
  alertPGCRounding,
} from "../../../locals/edFisNutPage/edFisNutModel";
import { Person } from "../../../global/declarations/classes";
import { ErrorHandler, Protocol } from "../../testVars";
describe("checkInnerColGroups", (): void => {
  let parentEl: HTMLElement;
  beforeEach((): void => {
    parentEl = document.createElement("div") as HTMLDivElement;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should return the correct count and similarity flag when colgroups are valid and similar", (): void => {
    const colgroup1 = document.createElement("colgroup");
    const colgroup2 = document.createElement("colgroup");
    const col1 = document.createElement("col");
    const col2 = document.createElement("col");
    colgroup1.appendChild(col1);
    colgroup2.appendChild(col2);
    parentEl.appendChild(colgroup1);
    parentEl.appendChild(colgroup2);
    const [count, areSimilar] = checkInnerColGroups(parentEl);
    (expect(count) as jest.JestMatchers<jest.SpyInstance>).toBe<number>(2) as void;
    (expect(areSimilar) as jest.JestMatchers<jest.SpyInstance>).toBe<boolean>(true) as void;
  }) as void;
  it("should call multipleElementsNotFound when no colgroups are found", (): void => {
    const mockMultipleElementsNotFound = jest.spyOn<any, ErrorHandler>(
      require("../../../global/handlers/errorHandler"),
      "multipleElementsNotFound"
    );
    checkInnerColGroups(parentEl);
    (expect(mockMultipleElementsNotFound) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  it("should call elementNotFound when a child is not an HTMLTableColElement", (): void => {
    const colgroup = document.createElement("colgroup");
    const div = document.createElement("div") as HTMLDivElement;
    colgroup.appendChild(div);
    parentEl.appendChild(colgroup);
    const mockElementNotFound = jest.spyOn<any, ErrorHandler>(
      require("../../../global/handlers/errorHandler"),
      "elementNotFound"
    );
    checkInnerColGroups(parentEl);
    (expect(mockElementNotFound) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("checkTabRowsIds", (): void => {
  let tab: HTMLTableElement;
  beforeEach((): void => {
    tab = document.createElement("table") as HTMLTableElement;
    tab.id = "tabDCut";
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should return an array of ids from valid rows", (): void => {
    const row1 = document.createElement("tr");
    row1.classList.add("tabRowDCutMed");
    row1.id = "row123";
    const row2 = document.createElement("tr");
    row2.classList.add("tabRowDCutMed");
    row2.id = "row456";
    tab.appendChild(row1);
    tab.appendChild(row2);
    (expect(checkTabRowsIds(tab)) as jest.JestMatchers<jest.SpyInstance>).toEqual<[string, string]>(["123", "456"]);
  }) as void;
  it("should call stringError when row id does not match", (): void => {
    const row = document.createElement("tr");
    row.classList.add("tabRowDCutMed");
    row.id = "invalidRow";
    tab.appendChild(row);
    checkTabRowsIds(tab);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "stringError")
    ).toHaveBeenCalled() as void;
  }) as void;
  it("should call elementNotFound when the table is invalid", (): void => {
    checkTabRowsIds(document.createElement("div") as HTMLDivElement as any);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "elementNotFound")
    ).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("changeTabDCutLayout", (): void => {
  let protocolo: HTMLSelectElement;
  let tabDC: HTMLTableElement;
  let bodyType: HTMLSelectElement;
  beforeEach((): void => {
    protocolo = document.createElement("select");
    tabDC = document.createElement("table") as HTMLTableElement;
    bodyType = document.createElement("select");
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should return 'pollock7' when protocolo matches 'pollock7'", (): void => {
    protocolo.value = "pollock7";
    (expect(changeTabDCutLayout(protocolo, tabDC, bodyType)) as jest.JestMatchers<jest.SpyInstance>).toBe<Protocol>(
      "pollock7"
    ) as void;
  }) as void;
  it("should return 'pollock3' when protocolo matches 'pollock3'", (): void => {
    protocolo.value = "pollock3";
    (expect(changeTabDCutLayout(protocolo, tabDC, bodyType)) as jest.JestMatchers<jest.SpyInstance>).toBe<Protocol>(
      "pollock3"
    ) as void;
  }) as void;
  it("should call elementNotFound when elements are invalid", (): void => {
    changeTabDCutLayout(null as any, null as any, null as any);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../global/handlers/errorHandler"), "elementNotFound")
    ).toHaveBeenCalled() as void;
  }) as void;
  it("should call stringError when invalid body type is provided", (): void => {
    protocolo.value = "pollock3";
    bodyType.value = "invalidType";
    changeTabDCutLayout(protocolo, tabDC, bodyType);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../global/handlers/errorHandler"), "stringError")
    ).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("defineHiddenRows", (): void => {
  let tabDC: HTMLTableElement;
  let arrayTabIds: string[];
  let genderedIds: string[];
  beforeEach((): void => {
    tabDC = document.createElement("table") as HTMLTableElement;
    arrayTabIds = ["123", "456"];
    genderedIds = ["123", "456"];
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should correctly update hidden and required attributes for matched rows", (): void => {
    const row1 = document.createElement("tr");
    row1.id = "row123";
    row1.classList.add("tabRowDCutMed");
    const input1 = document.createElement("input") as HTMLInputElement;
    row1.appendChild(input1);
    const row2 = document.createElement("tr");
    row2.id = "row456";
    row2.classList.add("tabRowDCutMed");
    const input2 = document.createElement("input") as HTMLInputElement;
    row2.appendChild(input2);
    tabDC.appendChild(row1);
    tabDC.appendChild(row2);
    defineHiddenRows(tabDC, arrayTabIds, genderedIds);
    (expect(row1.hidden) as jest.JestMatchers<jest.SpyInstance>).toBe<boolean>(false) as void;
    (expect(row2.hidden) as jest.JestMatchers<jest.SpyInstance>).toBe<boolean>(false) as void;
    (expect(input1.required) as jest.JestMatchers<jest.SpyInstance>).toBe<boolean>(true) as void;
    (expect(input2.required) as jest.JestMatchers<jest.SpyInstance>).toBe<boolean>(true) as void;
  }) as void;
  it("should call multipleElementsNotFound when input is invalid", (): void => {
    defineHiddenRows(null as any, [], [], "invalid");
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "multipleElementsNotFound")
    ).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("evaluatePGCDecay", (): void => {
  let person: Person;
  let targInpPGC: HTMLInputElement;
  beforeEach((): void => {
    person = new Person("male", 30, 80, 180, 100, "1.2");
    targInpPGC = document.createElement("input") as HTMLInputElement;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should return true and correct PGC value when decay point is found", (): void => {
    const [foundDecayPoint, PGC] = evaluatePGCDecay(person, targInpPGC, 25);
    (expect(foundDecayPoint) as jest.JestMatchers<jest.SpyInstance>).toBe<boolean>(true) as void;
    (expect(PGC) as jest.JestMatchers<jest.SpyInstance>).toBeGreaterThan(0);
  }) as void;
  it("should call multipleElementsNotFound when invalid arguments are provided", (): void => {
    const mockMultipleElementsNotFound = jest.spyOn<any, ErrorHandler>(
      require("../../../global/handlers/errorHandler"),
      "multipleElementsNotFound"
    );
    evaluatePGCDecay(null as any, null as any, NaN);
    (expect(mockMultipleElementsNotFound) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("alertPGCRounding", (): void => {
  let targInpPGC: HTMLInputElement;
  beforeEach((): void => {
    targInpPGC = document.createElement("input") as HTMLInputElement;
    targInpPGC.id = "pgcInput";
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should hide the alert icon when it is visible", (): void => {
    const spanRoundingAlertIcon = document.createElement("span");
    spanRoundingAlertIcon.id = "alert_pgcInput";
    spanRoundingAlertIcon.hidden = false;
    document.body.appendChild(spanRoundingAlertIcon);
    alertPGCRounding(targInpPGC);
    (expect(spanRoundingAlertIcon.hidden) as jest.JestMatchers<jest.SpyInstance>).toBe<boolean>(true) as void;
  }) as void;
  it("should call elementNotFound when the alert icon is not found", (): void => {
    alertPGCRounding(targInpPGC);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "elementNotFound")
    ).toHaveBeenCalled() as void;
  }) as void;
  it("should call inputNotFound when targInpPGC is not an input element", (): void => {
    alertPGCRounding(null as any);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "inputNotFound")
    ).toHaveBeenCalled() as void;
  }) as void;
}) as void;
