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
import {
  elementNotFound,
  multipleElementsNotFound,
} from "../../../../global/handlers/errorHandler";
jest.mock("../../../../global/handlers/errorHandler", () => ({
  extLine: jest.fn(),
  elementNotFound: jest.fn(),
  multipleElementsNotFound: jest.fn(),
}));
describe("checkIntervDate", () => {
  let mockSwitchBtnBS: jest.Mock;
  beforeEach(() => {
    mockSwitchBtnBS = jest.fn();
    global.switchBtnBS = mockSwitchBtnBS;
  });
  it("should switch the button state if the date is older than today", () => {
    const el = document.createElement("button");
    const tr = document.createElement("tr");
    const output = document.createElement("span");
    output.id = "outpInterv";
    output.textContent = "Valid date 2020-01-01";
    tr.appendChild(output);
    el.closest = jest.fn().mockReturnValue(tr);
    checkIntervDate([el]);
    expect(mockSwitchBtnBS).toHaveBeenCalledWith([el]);
  });
  it("should not call switchBtnBS if the date is not older than today", () => {
    const el = document.createElement("button");
    const tr = document.createElement("tr");
    const output = document.createElement("span");
    output.id = "outpInterv";
    const today = new Date();
    output.textContent = `Valid date ${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    tr.appendChild(output);
    el.closest = jest.fn().mockReturnValue(tr);
    checkIntervDate([el]);
    expect(mockSwitchBtnBS).not.toHaveBeenCalled();
  });
  it("should throw elementNotPopulated if arrEls is empty", () => {
    checkIntervDate([]);
    expect(
      jest
        .spyOn(
          require("../../../../global/handlers/errorHandler"),
          "elementNotPopulated"
        )
        .mockImplementation(() => {})
    ).toHaveBeenCalled();
  });
});
describe("checkLocalIntervs", () => {
  it("should call checkIntervDate with button elements", () => {
    const mainRef = document.createElement("div");
    const btnAloc = document.createElement("button");
    btnAloc.id = "btnAloc1";
    mainRef.appendChild(btnAloc);
    checkLocalIntervs(mainRef);
    expect(
      jest
        .spyOn(
          require("../../../../locals/panelPage/handlers/consHandlerList"),
          "checkIntervDate"
        )
        .mockImplementation(() => {})
    ).toHaveBeenCalledWith([btnAloc]);
  });
  it("should call elementNotPopulated if no buttons are found", () => {
    checkLocalIntervs(document.createElement("div"));
    expect(
      jest
        .spyOn(
          require("../../../../global/handlers/errorHandler"),
          "elementNotPopulated"
        )
        .mockImplementation(() => {})
    ).toHaveBeenCalled();
  });
});
describe("transferDataAloc", () => {
  let mockMainAncestral: HTMLElement,
    mockAncestral: HTMLElement,
    mockButton: HTMLElement;
  beforeEach(() => {
    mockMainAncestral = document.createElement("div");
    mockAncestral = document.createElement("div");
    mockButton = document.createElement("button");
    mockButton.id = "btnAloc1";
  });
  it("should return true when data is transferred correctly", () => {
    const tr = document.createElement("tr");
    tr.id = "row1";
    mockMainAncestral.appendChild(tr);
    expect(transferDataAloc(mockButton, mockMainAncestral, mockAncestral)).toBe(
      true
    );
  });
  it("should return false when no table row is found", () => {
    expect(transferDataAloc(mockButton, mockMainAncestral, mockAncestral)).toBe(
      false
    );
    expect(
      jest
        .spyOn(
          require("../../../../global/handlers/errorHandler"),
          "elementNotFound"
        )
        .mockImplementation(() => {})
    ).toHaveBeenCalled();
  });
});
describe("addListenerAlocation", () => {
  let alocBtn: HTMLButtonElement;
  let parentRef: HTMLElement;
  let forwardedRef: HTMLElement;
  let dispatch: jest.Mock;
  let transferDataAlocMock: jest.SpyInstance;
  beforeEach(() => {
    alocBtn = document.createElement("button");
    parentRef = document.createElement("div");
    forwardedRef = document.createElement("div");
    dispatch = jest.fn();
    transferDataAlocMock = jest
      .spyOn(
        require("../../../../locals/panelPage/handlers/consHandlerList"),
        "transferDataAloc"
      )
      .mockReturnValue(true);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should add click event listeners to allocation buttons and call transferDataAloc", () => {
    const table = document.createElement("table");
    table.id = "avStud";
    parentRef.appendChild(table);
    const btnAloc = document.createElement("button");
    btnAloc.classList.add("btnAlocStud");
    table.appendChild(btnAloc);
    addListenerAlocation(
      alocBtn,
      parentRef,
      forwardedRef,
      "Stud",
      true,
      dispatch,
      "coordenador"
    );
    btnAloc.click();
    expect(transferDataAlocMock).toHaveBeenCalledWith(
      btnAloc,
      parentRef,
      forwardedRef,
      "stud"
    );
    expect(dispatch).toHaveBeenCalledWith(false);
  });
  it("should log a warning if the number of buttons doesn't match the number of rows", () => {
    console.warn = jest.fn();
    const table = document.createElement("table");
    table.id = "avStud";
    const btnAloc1 = document.createElement("button");
    btnAloc1.classList.add("btnAlocStud");
    table.appendChild(btnAloc1);
    table.insertRow();
    parentRef.appendChild(table);
    addListenerAlocation(
      alocBtn,
      parentRef,
      forwardedRef,
      "Stud",
      true,
      dispatch,
      "coordenador"
    );
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("Number of rows in Stud Table")
    );
  });
  it("should call elementNotPopulated if no tables are found", () => {
    addListenerAlocation(
      alocBtn,
      parentRef,
      forwardedRef,
      "Stud",
      true,
      dispatch,
      "coordenador"
    );
    expect(
      jest.spyOn(
        require("../../../../global/handlers/errorHandler"),
        "elementNotPopulated"
      )
    ).toHaveBeenCalledWith(
      expect.anything(),
      `tabs in addListenerAlocation(), context Stud`,
      expect.anything()
    );
  });
  it("should call multipleElementsNotFound if alocBtn or parentRef are invalid", () => {
    addListenerAlocation(
      null as any,
      parentRef,
      forwardedRef,
      "Stud",
      true,
      dispatch,
      "coordenador"
    );
    expect(
      jest.spyOn(
        require("../../../../global/handlers/errorHandler"),
        "multipleElementsNotFound"
      )
    ).toHaveBeenCalled();
  });
  it("should not add event listeners for non-coordenador or supervisor user classes", () => {
    const table = document.createElement("table");
    table.id = "avStud";
    const btnAloc = document.createElement("button");
    btnAloc.classList.add("btnAlocStud");
    table.appendChild(btnAloc);
    parentRef.appendChild(table);
    addListenerAlocation(
      alocBtn,
      parentRef,
      forwardedRef,
      "Stud",
      true,
      dispatch,
      "estudante"
    );
    btnAloc.click();
    expect(transferDataAlocMock).not.toHaveBeenCalled();
  });
});
describe("addListenerAvMembers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = "";
  });
  test("should add event listener to typeCons if it is found", () => {
    document.body.innerHTML = `
      <select id="typeConsSel"></select>
      <datalist id="avStuds"></datalist>
      <datalist id="avProfs"></datalist>
    `;
    const typeConsSel = document.getElementById("typeConsSel");
    if (typeConsSel) {
      jest.spyOn(typeConsSel, "addEventListener");
      addListenerAvMembers({ current: document.createElement("div") }, true);
      expect(typeConsSel.addEventListener).toHaveBeenCalled();
    } else console.error(`Type Cons Sel not found.`);
  });
  test("should log error if gAvStudsOpGrps or gAvProfsOpGrps are not found", () => {
    document.body.innerHTML = `<select id="typeConsSel"></select>`;
    const dialogRef = { current: document.createElement("div") };
    addListenerAvMembers(dialogRef);
    expect(dialogRef.current.innerHTML).toBe("");
  });
  test("should throw elementNotFound if typeCons is not found", () => {
    addListenerAvMembers({ current: document.createElement("div") });
    expect(elementNotFound).toHaveBeenCalledWith(
      null,
      "<select> for defining type of possible appointments",
      expect.any(Function)
    );
  });
});
describe("filterAvMembers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = "";
  });
  test("should filter students and professors based on selected option", () => {
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
    avStuds
      ? expect(avStuds.innerHTML).toBe("")
      : console.error(`Available Students Element not found.`);
    avProfs
      ? expect(avProfs.innerHTML).toBe("")
      : console.error(`Available Professional Element not found.`);
  });
  test("should throw multipleElementsNotFound if elements are not found", () => {
    filterAvMembers(
      document.querySelectorAll(
        "non-existing-element"
      ) as NodeListOf<HTMLOptGroupElement>,
      document.querySelectorAll(
        "non-existing-element"
      ) as NodeListOf<HTMLOptGroupElement>
    );
    expect(multipleElementsNotFound).toHaveBeenCalled();
  });
});
describe("filterTabMembers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = "";
  });
  test("should hide rows based on the area", () => {
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
    tr instanceof HTMLElement
      ? expect(tr.hidden).toBe(true)
      : console.error(`Table Row not found.`);
  });
  test("should throw elementNotFound if table is not found", () => {
    filterTabMembers(null, "odontologia");
    expect(elementNotFound).toHaveBeenCalled();
  });
  test('should show all rows if area is "geral"', () => {
    document.body.innerHTML = `
      <table id="tab">
        <tr><td>Row 1</td><td><button id="btnAloc"></button></td></tr>
      </table>
    `;
    const tab = document.getElementById("tab") as HTMLTableElement;
    filterTabMembers(tab, "geral");
    const tr = tab.querySelector("tr");
    tr instanceof HTMLElement
      ? expect(tr.hidden).toBe(false)
      : console.error(`Table Row not found.`);
  });
});
describe("fillTabAttr", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = "";
  });
  test("should replace Unfilled0 and Unfilled1 attributes in table rows", () => {
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
      ? expect(tr.getAttribute("Unfilled0")).not.toContain("Unfilled0")
      : console.error(`Table row not found.`);
  });
  test("should throw elementNotFound if table is not found", () => {
    fillTabAttr(null);
    expect(elementNotFound).toHaveBeenCalled();
  });
});
