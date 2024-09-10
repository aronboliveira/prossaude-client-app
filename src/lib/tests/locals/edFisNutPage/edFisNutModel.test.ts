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
describe("checkInnerColGroups", () => {
  let parentEl: HTMLElement;
  beforeEach(() => {
    parentEl = document.createElement("div");
    jest.clearAllMocks();
  });
  it("should return the correct count and similarity flag when colgroups are valid and similar", () => {
    const colgroup1 = document.createElement("colgroup");
    const colgroup2 = document.createElement("colgroup");
    const col1 = document.createElement("col");
    const col2 = document.createElement("col");
    colgroup1.appendChild(col1);
    colgroup2.appendChild(col2);
    parentEl.appendChild(colgroup1);
    parentEl.appendChild(colgroup2);
    const [count, areSimilar] = checkInnerColGroups(parentEl);
    expect(count).toBe(2);
    expect(areSimilar).toBe(true);
  });
  it("should call multipleElementsNotFound when no colgroups are found", () => {
    const mockMultipleElementsNotFound = jest.spyOn(
      require("../../../global/handlers/errorHandler"),
      "multipleElementsNotFound"
    );
    checkInnerColGroups(parentEl);
    expect(mockMultipleElementsNotFound).toHaveBeenCalled();
  });
  it("should call elementNotFound when a child is not an HTMLTableColElement", () => {
    const colgroup = document.createElement("colgroup");
    const div = document.createElement("div");
    colgroup.appendChild(div);
    parentEl.appendChild(colgroup);
    const mockElementNotFound = jest.spyOn(
      require("../../../global/handlers/errorHandler"),
      "elementNotFound"
    );
    checkInnerColGroups(parentEl);
    expect(mockElementNotFound).toHaveBeenCalled();
  });
});
describe("checkTabRowsIds", () => {
  let tab: HTMLTableElement;
  beforeEach(() => {
    tab = document.createElement("table");
    tab.id = "tabDCut";
    jest.clearAllMocks();
  });
  it("should return an array of ids from valid rows", () => {
    const row1 = document.createElement("tr");
    row1.classList.add("tabRowDCutMed");
    row1.id = "row123";
    const row2 = document.createElement("tr");
    row2.classList.add("tabRowDCutMed");
    row2.id = "row456";
    tab.appendChild(row1);
    tab.appendChild(row2);
    expect(checkTabRowsIds(tab)).toEqual(["123", "456"]);
  });
  it("should call stringError when row id does not match", () => {
    const row = document.createElement("tr");
    row.classList.add("tabRowDCutMed");
    row.id = "invalidRow";
    tab.appendChild(row);
    checkTabRowsIds(tab);
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "stringError"
      )
    ).toHaveBeenCalled();
  });
  it("should call elementNotFound when the table is invalid", () => {
    checkTabRowsIds(document.createElement("div") as any);
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "elementNotFound"
      )
    ).toHaveBeenCalled();
  });
});
describe("changeTabDCutLayout", () => {
  let protocolo: HTMLSelectElement;
  let tabDC: HTMLTableElement;
  let bodyType: HTMLSelectElement;
  beforeEach(() => {
    protocolo = document.createElement("select");
    tabDC = document.createElement("table");
    bodyType = document.createElement("select");
    jest.clearAllMocks();
  });
  it("should return 'pollock7' when protocolo matches 'pollock7'", () => {
    protocolo.value = "pollock7";
    expect(changeTabDCutLayout(protocolo, tabDC, bodyType)).toBe("pollock7");
  });
  it("should return 'pollock3' when protocolo matches 'pollock3'", () => {
    protocolo.value = "pollock3";
    expect(changeTabDCutLayout(protocolo, tabDC, bodyType)).toBe("pollock3");
  });
  it("should call elementNotFound when elements are invalid", () => {
    changeTabDCutLayout(null as any, null as any, null as any);
    expect(
      jest.spyOn(
        require("../../global/handlers/errorHandler"),
        "elementNotFound"
      )
    ).toHaveBeenCalled();
  });
  it("should call stringError when invalid body type is provided", () => {
    protocolo.value = "pollock3";
    bodyType.value = "invalidType";
    changeTabDCutLayout(protocolo, tabDC, bodyType);
    expect(
      jest.spyOn(require("../../global/handlers/errorHandler"), "stringError")
    ).toHaveBeenCalled();
  });
});
describe("defineHiddenRows", () => {
  let tabDC: HTMLTableElement;
  let arrayTabIds: string[];
  let genderedIds: string[];
  beforeEach(() => {
    tabDC = document.createElement("table");
    arrayTabIds = ["123", "456"];
    genderedIds = ["123", "456"];
    jest.clearAllMocks();
  });
  it("should correctly update hidden and required attributes for matched rows", () => {
    const row1 = document.createElement("tr");
    row1.id = "row123";
    row1.classList.add("tabRowDCutMed");
    const input1 = document.createElement("input");
    row1.appendChild(input1);
    const row2 = document.createElement("tr");
    row2.id = "row456";
    row2.classList.add("tabRowDCutMed");
    const input2 = document.createElement("input");
    row2.appendChild(input2);
    tabDC.appendChild(row1);
    tabDC.appendChild(row2);
    defineHiddenRows(tabDC, arrayTabIds, genderedIds);
    expect(row1.hidden).toBe(false);
    expect(row2.hidden).toBe(false);
    expect(input1.required).toBe(true);
    expect(input2.required).toBe(true);
  });
  it("should call multipleElementsNotFound when input is invalid", () => {
    defineHiddenRows(null as any, [], [], "invalid");
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "multipleElementsNotFound"
      )
    ).toHaveBeenCalled();
  });
});
describe("evaluatePGCDecay", () => {
  let person: Person;
  let targInpPGC: HTMLInputElement;
  beforeEach(() => {
    person = new Person("male", 30, 80, 180, 100, "1.2");
    targInpPGC = document.createElement("input");
    jest.clearAllMocks();
  });
  it("should return true and correct PGC value when decay point is found", () => {
    const [foundDecayPoint, PGC] = evaluatePGCDecay(person, targInpPGC, 25);
    expect(foundDecayPoint).toBe(true);
    expect(PGC).toBeGreaterThan(0);
  });
  it("should call multipleElementsNotFound when invalid arguments are provided", () => {
    const mockMultipleElementsNotFound = jest.spyOn(
      require("../../../global/handlers/errorHandler"),
      "multipleElementsNotFound"
    );
    evaluatePGCDecay(null as any, null as any, NaN);
    expect(mockMultipleElementsNotFound).toHaveBeenCalled();
  });
});
describe("alertPGCRounding", () => {
  let targInpPGC: HTMLInputElement;
  beforeEach(() => {
    targInpPGC = document.createElement("input");
    targInpPGC.id = "pgcInput";
    jest.clearAllMocks();
  });
  it("should hide the alert icon when it is visible", () => {
    const spanRoundingAlertIcon = document.createElement("span");
    spanRoundingAlertIcon.id = "alert_pgcInput";
    spanRoundingAlertIcon.hidden = false;
    document.body.appendChild(spanRoundingAlertIcon);
    alertPGCRounding(targInpPGC);
    expect(spanRoundingAlertIcon.hidden).toBe(true);
  });
  it("should call elementNotFound when the alert icon is not found", () => {
    alertPGCRounding(targInpPGC);
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "elementNotFound"
      )
    ).toHaveBeenCalled();
  });
  it("should call inputNotFound when targInpPGC is not an input element", () => {
    alertPGCRounding(null as any);
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "inputNotFound"
      )
    ).toHaveBeenCalled();
  });
});
