declare global {
  var switchBtnBS: jest.Mock;
}
import {
  checkIntervDate,
  checkLocalIntervs,
  transferDataAloc,
  addListenerAlocation,
  addListenerAvMembers,
  filterAvMembers,
  filterTabMembers,
  fillTabAttr,
} from "../../../../locals/panelPage/handlers/consHandlerList";
import { elementNotFound, multipleElementsNotFound } from "../../../../global/handlers/errorHandler";
import { personAbrvClasses } from "@/lib/global/declarations/types";
import { AppointmentHandler, ErrorHandler, EventTargetMethod } from "@/lib/tests/testVars";
jest.mock(
  "../../../../global/handlers/errorHandler",
  (): {
    extLine: jest.Mock<any, any, any>;
    elementNotFound: jest.Mock<any, any, any>;
    multipleElementsNotFound: jest.Mock<any, any, any>;
  } => ({
    extLine: jest.fn(),
    elementNotFound: jest.fn(),
    multipleElementsNotFound: jest.fn(),
  })
) as typeof jest;
describe("checkIntervDate", (): void => {
  let mockSwitchBtnBS: jest.Mock;
  beforeEach((): void => {
    mockSwitchBtnBS = jest.fn();
    global.switchBtnBS = mockSwitchBtnBS;
  });
  it("should switch the button state if the date is older than today", (): void => {
    const el = document.createElement("button") as HTMLButtonElement;
    const tr = document.createElement("tr");
    const output = document.createElement("span");
    output.id = "outpInterv";
    output.textContent = "Valid date 2020-01-01";
    tr.appendChild(output);
    el.closest = jest.fn().mockReturnValue(tr);
    checkIntervDate([el]);
    expect(mockSwitchBtnBS).toHaveBeenCalledWith<[HTMLElement[]]>([el]) as void;
  });
  it("should not call switchBtnBS if the date is not older than today", (): void => {
    const el = document.createElement("button") as HTMLButtonElement;
    const tr = document.createElement("tr");
    const output = document.createElement("span");
    output.id = "outpInterv";
    const today = new Date();
    output.textContent = `Valid date ${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    tr.appendChild(output);
    el.closest = jest.fn().mockReturnValue(tr);
    checkIntervDate([el]);
    expect(mockSwitchBtnBS).not.toHaveBeenCalled() as void;
  });
  it("should throw elementNotPopulated if arrEls is empty", (): void => {
    checkIntervDate([]);
    expect(
      jest
        .spyOn<any, ErrorHandler>(require("../../../../global/handlers/errorHandler"), "elementNotPopulated")
        .mockImplementation((): void => {}) as jest.SpyInstance
    ).toHaveBeenCalled() as void;
  });
});
describe("checkLocalIntervs", (): void => {
  it("should call checkIntervDate with button elements", (): void => {
    const mainRef = document.createElement("div") as HTMLDivElement;
    const btnAloc = document.createElement("button") as HTMLButtonElement;
    btnAloc.id = "btnAloc1";
    mainRef.appendChild(btnAloc);
    checkLocalIntervs(mainRef);
    expect(
      jest
        .spyOn<any, AppointmentHandler>(
          require("../../../../locals/panelPage/handlers/consHandlerList"),
          "checkIntervDate"
        )
        .mockImplementation((): void => {}) as jest.SpyInstance
    ).toHaveBeenCalledWith<[HTMLButtonElement[]]>([btnAloc]) as void;
  });
  it("should call elementNotPopulated if no buttons are found", (): void => {
    checkLocalIntervs(document.createElement("div") as HTMLDivElement);
    expect(
      jest
        .spyOn<any, ErrorHandler>(require("../../../../global/handlers/errorHandler"), "elementNotPopulated")
        .mockImplementation((): void => {}) as jest.SpyInstance
    ).toHaveBeenCalled() as void;
  });
});
describe("transferDataAloc", (): void => {
  let mockMainAncestral: HTMLElement, mockAncestral: HTMLElement, mockButton: HTMLElement;
  beforeEach((): void => {
    mockMainAncestral = document.createElement("div") as HTMLDivElement;
    mockAncestral = document.createElement("div") as HTMLDivElement;
    mockButton = document.createElement("button") as HTMLButtonElement;
    mockButton.id = "btnAloc1";
  });
  it("should return true when data is transferred correctly", (): void => {
    const tr = document.createElement("tr");
    tr.id = "row1";
    mockMainAncestral.appendChild(tr);
    expect(transferDataAloc(mockButton, mockMainAncestral, mockAncestral)).toBe<boolean>(true);
  });
  it("should return false when no table row is found", (): void => {
    expect(transferDataAloc(mockButton, mockMainAncestral, mockAncestral)).toBe<boolean>(false);
    expect(
      jest
        .spyOn<any, ErrorHandler>(require("../../../../global/handlers/errorHandler"), "elementNotFound")
        .mockImplementation((): void => {}) as jest.SpyInstance
    ).toHaveBeenCalled() as void;
  });
});
describe("addListenerAlocation", (): void => {
  let alocBtn: HTMLButtonElement;
  let parentRef: HTMLElement;
  let forwardedRef: HTMLElement;
  let dispatch: jest.Mock;
  let transferDataAlocMock: jest.SpyInstance;
  beforeEach((): void => {
    alocBtn = document.createElement("button") as HTMLButtonElement;
    parentRef = document.createElement("div") as HTMLDivElement;
    forwardedRef = document.createElement("div") as HTMLDivElement;
    dispatch = jest.fn();
    transferDataAlocMock = jest
      .spyOn<any, AppointmentHandler>(
        require("../../../../locals/panelPage/handlers/consHandlerList"),
        "transferDataAloc"
      )
      .mockReturnValue(true);
  });
  afterEach((): void => {
    jest.clearAllMocks() as typeof jest;
  });
  it("should add click event listeners to allocation buttons and call transferDataAloc", (): void => {
    const table = document.createElement("table");
    table.id = "avStud";
    parentRef.appendChild(table);
    const btnAloc = document.createElement("button") as HTMLButtonElement;
    btnAloc.classList.add("btnAlocStud");
    table.appendChild(btnAloc);
    addListenerAlocation(alocBtn, parentRef, forwardedRef, "Stud", true, dispatch, "coordenador");
    btnAloc.click() as void;
    expect(transferDataAlocMock).toHaveBeenCalledWith<[HTMLButtonElement, HTMLElement, HTMLElement, personAbrvClasses]>(
      btnAloc,
      parentRef,
      forwardedRef,
      "stud"
    );
    expect(dispatch).toHaveBeenCalledWith<[boolean]>(false) as void;
  });
  it("should log a warning if the number of buttons doesn't match the number of rows", (): void => {
    console.warn = jest.fn();
    const table = document.createElement("table");
    table.id = "avStud";
    const btnAloc1 = document.createElement("button") as HTMLButtonElement;
    btnAloc1.classList.add("btnAlocStud");
    table.appendChild(btnAloc1);
    table.insertRow();
    parentRef.appendChild(table);
    addListenerAlocation(alocBtn, parentRef, forwardedRef, "Stud", true, dispatch, "coordenador");
    expect(console.warn).toHaveBeenCalledWith<[any]>(expect.stringContaining("Number of rows in Stud Table")) as void;
  });
  it("should call elementNotPopulated if no tables are found", (): void => {
    addListenerAlocation(alocBtn, parentRef, forwardedRef, "Stud", true, dispatch, "coordenador");
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../../global/handlers/errorHandler"), "elementNotPopulated")
    ).toHaveBeenCalledWith<[any, string, any]>(
      expect.anything() as any,
      `tabs in addListenerAlocation(), context Stud`,
      expect.anything() as any
    );
  });
  it("should call multipleElementsNotFound if alocBtn or parentRef are invalid", (): void => {
    addListenerAlocation(null as any, parentRef, forwardedRef, "Stud", true, dispatch, "coordenador");
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../../global/handlers/errorHandler"), "multipleElementsNotFound")
    ).toHaveBeenCalled() as void;
  });
  it("should not add event listeners for non-coordenador or supervisor user classes", (): void => {
    const table = document.createElement("table");
    table.id = "avStud";
    const btnAloc = document.createElement("button") as HTMLButtonElement;
    btnAloc.classList.add("btnAlocStud");
    table.appendChild(btnAloc);
    parentRef.appendChild(table);
    addListenerAlocation(alocBtn, parentRef, forwardedRef, "Stud", true, dispatch, "estudante");
    btnAloc.click() as void;
    expect(transferDataAlocMock).not.toHaveBeenCalled() as void;
  });
});
describe("addListenerAvMembers", (): void => {
  beforeEach((): void => {
    jest.clearAllMocks() as typeof jest;
    document.body.innerHTML = "";
  });
  test("should add event listener to typeCons if it is found", (): void => {
    document.body.innerHTML = `
      <select id="typeConsSel"></select>
      <datalist id="avStuds"></datalist>
      <datalist id="avProfs"></datalist>
    `;
    const typeConsSel = document.getElementById("typeConsSel");
    if (typeConsSel) {
      jest.spyOn<HTMLElement, EventTargetMethod>(typeConsSel, "addEventListener");
      addListenerAvMembers({ current: document.createElement("div") as HTMLDivElement }, true);
      expect(typeConsSel.addEventListener).toHaveBeenCalled() as void;
    } else console.error(`Type Cons Sel not found.`);
  });
  test("should log error if gAvStudsOpGrps or gAvProfsOpGrps are not found", (): void => {
    document.body.innerHTML = `<select id="typeConsSel"></select>`;
    const dialogRef = { current: document.createElement("div") as HTMLDivElement };
    addListenerAvMembers(dialogRef);
    expect(dialogRef.current.innerHTML).toBe<string>("");
  });
  test("should throw elementNotFound if typeCons is not found", (): void => {
    addListenerAvMembers({ current: document.createElement("div") as HTMLDivElement });
    expect(elementNotFound).toHaveBeenCalledWith<Parameters<typeof elementNotFound>>(
      null,
      "<select> for defining type of possible appointments",
      expect.any(Function)
    );
  });
});
describe("filterAvMembers", (): void => {
  beforeEach((): void => {
    jest.clearAllMocks() as typeof jest;
    document.body.innerHTML = "";
  });
  test("should filter students and professors based on selected option", (): void => {
    document.body.innerHTML = `
      <input id="relStudName" />
      <input id="relProfName" />
      <select id="typeConsSel">
        <option selected>Group 1</option>
      </select>
      <datalist id="avStuds"></datalist>
      <datalist id="avProfs"></datalist>
    `;
    const gAvStudsOpGrps = document.querySelectorAll("optgroup");
    const gAvProfsOpGrps = document.querySelectorAll("optgroup");
    filterAvMembers(gAvStudsOpGrps, gAvProfsOpGrps);
    const avStuds = document.getElementById("avStuds");
    const avProfs = document.getElementById("avProfs");
    avStuds ? expect(avStuds.innerHTML).toBe<string>("") : console.error(`Available Students Element not found.`);
    avProfs ? expect(avProfs.innerHTML).toBe<string>("") : console.error(`Available Professional Element not found.`);
  });
  test("should throw multipleElementsNotFound if elements are not found", (): void => {
    filterAvMembers(
      document.querySelectorAll("non-existing-element") as NodeListOf<HTMLOptGroupElement>,
      document.querySelectorAll("non-existing-element") as NodeListOf<HTMLOptGroupElement>
    );
    expect(multipleElementsNotFound).toHaveBeenCalled() as void;
  });
});
describe("filterTabMembers", (): void => {
  beforeEach((): void => {
    jest.clearAllMocks() as typeof jest;
    document.body.innerHTML = "";
  });
  test("should hide rows based on the area", (): void => {
    document.body.innerHTML = `
      <table id="tab">
        <tr>
          <td class="celArea">
            <output data-title="area">nutrição</output>
          </td>
          <td><button id="btnAloc"></button></td>
        </tr>
      </table>
    `;
    const tab = document.getElementById("tab") as HTMLTableElement;
    filterTabMembers(tab, "odontologia");
    const tr = tab.querySelector("tr");
    tr instanceof HTMLElement ? expect(tr.hidden).toBe<boolean>(true) : console.error(`Table Row not found.`);
  });
  test("should throw elementNotFound if table is not found", (): void => {
    filterTabMembers(null, "odontologia");
    expect(elementNotFound).toHaveBeenCalled() as void;
  });
  test("should show all rows if area is 'geral'", (): void => {
    document.body.innerHTML = `
      <table id="tab">
        <tr><td>Row 1</td><td><button id="btnAloc"></button></td></tr>
      </table>
    `;
    const tab = document.getElementById("tab") as HTMLTableElement;
    filterTabMembers(tab, "geral");
    const tr = tab.querySelector("tr");
    tr instanceof HTMLElement ? expect(tr.hidden).toBe<boolean>(false) : console.error(`Table Row not found.`);
  });
});
describe("fillTabAttr", (): void => {
  beforeEach((): void => {
    jest.clearAllMocks() as typeof jest;
    document.body.innerHTML = "";
  });
  test("should replace Unfilled0 and Unfilled1 attributes in table rows", (): void => {
    document.body.innerHTML = `
      <table id="tab">
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
          </tr>
        </thead>
        <tr Unfilled0>
          <td></td>
        </tr>
      </table>
    `;
    const tab = document.getElementById("tab") as HTMLTableElement;
    fillTabAttr(tab);
    const tr = tab.querySelector("tr");
    tr instanceof HTMLElement
      ? expect(tr.getAttribute("Unfilled0")).not.toContain<string>("Unfilled0")
      : console.error(`Table row not found.`);
  });
  test("should throw elementNotFound if table is not found", (): void => {
    fillTabAttr(null);
    expect(elementNotFound).toHaveBeenCalled() as void;
  });
});
