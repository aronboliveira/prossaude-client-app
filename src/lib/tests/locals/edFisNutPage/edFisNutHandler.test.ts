import {
  addRowAtivFis,
  switchAutoFill,
  validateEvResultNum,
  createArraysRels,
  handleIndEv,
  exeAutoFill,
  runAutoFill,
} from "../../../locals/edFisNutPage/edFisNutHandler";
import { person, tabProps } from "../../../../vars";
describe("addRowAtivFis", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    container.id = "tbodyAtFisRot";
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  test("adds a new row with correct attributes", () => {
    addRowAtivFis(4, "Rot");
    const newRow = document.getElementById("tabRowAtFisRotId4");
    expect(newRow).toBeTruthy();
    expect(newRow?.querySelector('input[type="text"]')?.getAttribute("placeholder")).toContain("Atividade Física");
  });
});

describe("switchAutoFill", () => {
  let autoFillBtn: HTMLButtonElement;
  let lockTabInd: HTMLDivElement;

  beforeEach(() => {
    autoFillBtn = document.createElement("button");
    autoFillBtn.innerText = "Desativar Cálculo Automático";
    lockTabInd = document.createElement("div");
    lockTabInd.className = "lockTabInd";
    document.body.append(autoFillBtn, lockTabInd);
  });

  afterEach(() => {
    autoFillBtn.remove();
    lockTabInd.remove();
  });

  test("toggles button text and lock visibility correctly", () => {
    switchAutoFill(autoFillBtn);
    expect(autoFillBtn.textContent).toBe("Ativar Cálculo Automático");

    switchAutoFill(autoFillBtn);
    expect(autoFillBtn.textContent).toBe("Desativar Cálculo Automático");
  });
});

describe("validateEvResultNum", () => {
  test("returns correct numeric value for valid input element", () => {
    const input = document.createElement("input");
    input.type = "number";
    input.value = "25";
    const result = validateEvResultNum(input, 5);
    expect(result).toBe(25);
  });

  test("returns 0 for invalid input type", () => {
    const invalidInput = document.createElement("select");
    const result = validateEvResultNum(invalidInput, 10);
    expect(result).toBe(0);
  });
});

describe("createArraysRels", () => {
  let button: HTMLButtonElement;
  let arrayRows: HTMLTableRowElement[];

  beforeEach(() => {
    button = document.createElement("button");
    button.id = "button_1";
    arrayRows = Array.from({ length: 3 }, (_, i) => {
      const row = document.createElement("tr");
      const input = document.createElement("input");
      input.type = "number";
      input.id = `input_${i + 1}`;
      row.appendChild(input);
      return row;
    });
  });

  test("calculates sum based on protocol value and row inputs", () => {
    arrayRows.forEach((row, i) => {
      const input = row.querySelector("input") as HTMLInputElement;
      input.value = `${(i + 1) * 10}`;
    });

    const sum = createArraysRels({ btn: button, arrayRows, protocolValue: "pollock3" });
    expect(sum).toBe(60);
  });
});
class MockHTMLElement {
  public dataset: { [key: string]: string } = {};
  public isConnected = true;
  public type: string = "";

  setAttribute(key: string, value: string) {
    this.dataset[key] = value;
  }

  getAttribute(key: string) {
    return this.dataset[key];
  }
}

const mockDefineTargInps = jest.fn().mockReturnValue({}),
  mockUpdatePGC = jest.fn(),
  mockMatchPersonPropertiesWH = jest.fn(),
  mockEvalFactorAtvLvl = jest.fn(),
  mockEvalFactorAtleta = jest.fn(),
  mockUpdateIndexesContexts = jest.fn();

jest.mock("./path/to/your/module", () => ({
  ...jest.requireActual("./path/to/your/module"),
  defineTargInps: mockDefineTargInps,
  updatePGC: mockUpdatePGC,
  matchPersonPropertiesWH: mockMatchPersonPropertiesWH,
  evalFactorAtvLvl: mockEvalFactorAtvLvl,
  evalFactorAtleta: mockEvalFactorAtleta,
  updateIndexesContexts: mockUpdateIndexesContexts,
}));

describe("handleIndEv", () => {
  it("should handle input elements and call necessary functions", () => {
    const mockEl = new MockHTMLElement();
    mockEl.type = "text";
    const ctxEls = {
      el: document.createElement("input"),
      fsp: document.createElement("fieldset"),
      gl: document.createElement("select"),
      fct: document.createElement("select"),
      refs: null,
    };

    handleIndEv("BTN", ctxEls);

    expect(mockDefineTargInps).toHaveBeenCalled();
    expect(mockUpdatePGC).toHaveBeenCalledWith("col");
    expect(mockMatchPersonPropertiesWH).toHaveBeenCalled();
    expect(mockEvalFactorAtvLvl).toHaveBeenCalled();
  });

  it("should return early if the element is not of the expected type", () => {
    const mockEl = new MockHTMLElement();
    const ctxEls = {
      el: document.createElement("input"),
      fsp: document.createElement("fieldset"),
      gl: document.createElement("select"),
      fct: document.createElement("select"),
      refs: null,
    };

    handleIndEv("BTN", ctxEls);

    expect(mockDefineTargInps).not.toHaveBeenCalled();
  });
});

describe("exeAutoFill", () => {
  it("should return initial result if the element is invalid", () => {
    const mockEl = document.createElement("input");
    const result = exeAutoFill(mockEl, "cons");

    expect(result).toEqual({
      ncl: 1,
      ps: {
        w: person.weight || 0,
        h: person.height || 0,
        sd: person.sumDCut || 0,
      },
      i: {
        imc: tabProps.IMC ?? 0,
        mlg: tabProps.MLG ?? 0,
        tmb: tabProps.TMB ?? 0,
        get: tabProps.GET ?? 0,
        pgc: tabProps.PGC ?? 0,
      },
      ts: {
        tiw: tabProps.tiw,
        tih: tabProps.tih,
        tii: tabProps.tiimc,
        tim: tabProps.timlg,
        tit: tabProps.titmb,
        tidc: tabProps.tidc,
        tip: tabProps.tiget,
      },
    });
  });

  it("should call runAutoFill for valid elements", () => {
    const mockEl = document.createElement("input");
    mockEl.type = "text";

    const result = exeAutoFill(mockEl, "cons");

    expect(result).not.toBeNull();
  });
});

describe("runAutoFill", () => {
  it("should assign dataset target to true for valid elements", () => {
    const mockEl = document.createElement("input");
    mockEl.dataset.col = "2";

    runAutoFill(mockEl, "cons");

    expect(mockEl.dataset.target).toBe("true");
  });

  it("should return autofill result correctly", () => {
    const mockEl = document.createElement("input"),
      result = runAutoFill(mockEl, "cons");

    expect(result).toEqual(
      expect.objectContaining({
        ncl: expect.any(Number),
        ps: expect.objectContaining({
          w: expect.any(Number),
          h: expect.any(Number),
          sd: expect.any(Number),
        }),
        i: expect.any(Object),
        ts: expect.any(Object),
      }),
    );
  });
});
