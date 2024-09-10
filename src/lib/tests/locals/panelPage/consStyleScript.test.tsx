import {
  strikeEntries,
  setListenersForDates,
  hideLastDay,
  correlateDayOpts,
} from "../../../locals/panelPage/consStyleScript";
import {
  elementNotFound,
  elementNotPopulated,
  inputNotFound,
  multipleElementsNotFound,
} from "../../../global/handlers/errorHandler";
import { strikeNulls } from "../../../global/gStyleScript";
jest.mock("../../../global/handlers/errorHandler", () => ({
  extLine: jest.fn(),
  elementNotFound: jest.fn(),
  elementNotPopulated: jest.fn(),
  inputNotFound: jest.fn(),
  multipleElementsNotFound: jest.fn(),
}));
jest.mock("../../../global/gStyleScript", () => ({
  strikeNulls: jest.fn(),
  highlightChange: jest.fn(),
}));
jest.mock("./handlers/consHandlerCmn", () => ({
  convertWeekdaysToMonthdays: jest.fn(),
  correlateAptMonthDays: jest.fn(),
  correlateWorkingDays: jest.fn(),
}));
describe("strikeEntries", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  test("should call strikeNulls with found elements", () => {
    document.body.innerHTML = `
      <div id="main">
        <input />
        <output />
        <select></select>
        <textarea></textarea>
      </div>
    `;
    strikeEntries(document.getElementById("main") as HTMLElement);
    expect(strikeNulls).toHaveBeenCalledWith(expect.any(Array));
  });
  test("should call elementNotPopulated when no elements found", () => {
    document.body.innerHTML = `<div id="main"></div>`;
    strikeEntries(document.getElementById("main") as HTMLElement);
    expect(elementNotPopulated).toHaveBeenCalledWith(
      [],
      "inAndOutEls in useEffect() for sectTabRef",
      expect.anything()
    );
  });
});
describe("setListenersForDates", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  test("should set date inputs with month and year when valid inputs are provided", async () => {
    document.body.innerHTML = `
      <input type="date" class="dateInp" />
      <select id="monthStateSelector">
        <option value="feb">February</option>
        <option value="mar">March</option>
      </select>
    `;
    const [pattern, handler] = await setListenersForDates(
      Array.from(
        document.querySelectorAll(".dateInp")
      ) as Array<HTMLInputElement>,
      document.getElementById("monthStateSelector") as HTMLSelectElement
    );
    expect(pattern).toEqual(expect.any(RegExp));
    expect(handler).toBeInstanceOf(Function);
  });
  test("should call inputNotFound when monthStateSelector is invalid", async () => {
    document.body.innerHTML = `
      <input type="date" class="dateInp" />
      <input id="monthStateSelector" type="text" value="invalid" />
    `;
    const monthStateSelector = document.getElementById(
      "monthStateSelector"
    ) as HTMLInputElement;
    await setListenersForDates(
      Array.from(
        document.querySelectorAll(".dateInp")
      ) as Array<HTMLInputElement>,
      monthStateSelector
    );
    expect(elementNotFound).toHaveBeenCalledWith(
      monthStateSelector,
      "monthStateSelector in setListenerForDates()",
      expect.anything()
    );
  });
  test("should call elementNotPopulated when dateInps is empty", async () => {
    await setListenersForDates([], document.createElement("select"));
    expect(elementNotPopulated).toHaveBeenCalledWith(
      [],
      "argument for setListenerForDates()",
      expect.anything()
    );
  });
});
describe("hideLastDay", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  test("should hide the last day when elements are hidden", () => {
    document.body.innerHTML = `
      <div class="lastConsDayCont" style="display: none;"></div>
      <select id="daySel">
        <option>Option</option>
      </select>
    `;
    const daySel = document.getElementById("daySel") as HTMLSelectElement;
    hideLastDay(daySel);
    if (daySel?.lastElementChild instanceof HTMLElement) {
      expect(daySel.lastElementChild.hidden).toBe(true);
      expect(daySel.lastElementChild.style.display).toBe("none");
    } else console.error(`Last Element Child of daySel is not an HTMLElement.`);
  });
  test("should do nothing if no elements are hidden", () => {
    document.body.innerHTML = `
      <div class="lastConsDayCont"></div>
      <select id="daySel">
        <option>Option</option>
      </select>
    `;
    const daySel = document.getElementById("daySel") as HTMLSelectElement;
    hideLastDay(daySel);
    daySel?.lastElementChild instanceof HTMLElement
      ? expect(daySel.lastElementChild!.hidden).toBe(false)
      : console.error(`Last Element Child of daySel is not an HTMLElement.`);
  });
});
describe("correlateDayOpts", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  test("should add new option to the date select if new date input value is not in options", () => {
    document.body.innerHTML = `
      <input type="date" class="dateInp" value="2024-09-09" />
      <select id="dateSel">
        <option value="2024-09-08">08/09/2024</option>
      </select>
    `;
    const dateSel = document.getElementById("dateSel") as HTMLSelectElement;
    correlateDayOpts(
      Array.from(
        document.querySelectorAll(".dateInp")
      ) as Array<HTMLInputElement>,
      dateSel,
      "coordenador"
    );
    expect(dateSel.options).toHaveLength(2);
    expect(dateSel.options[1].value).toBe("2024-09-09");
  });
  test("should call inputNotFound if dateInp is invalid", () => {
    document.body.innerHTML = `
      <div class="dateInp"></div>
      <select id="dateSel"></select>
    `;
    const dateInps = Array.from(
      document.querySelectorAll(".dateInp")
    ) as Array<HTMLElement>;
    const dateSel = document.getElementById("dateSel") as HTMLSelectElement;
    correlateDayOpts(dateInps, dateSel, "coordenador");
    expect(inputNotFound).toHaveBeenCalledWith(
      dateInps[0],
      "dateInp id UNIDENTIFIED",
      expect.anything()
    );
  });
  test("should call multipleElementsNotFound if dateInps or dateSel are invalid", () => {
    document.body.innerHTML = `
      <select id="dateSel"></select>
    `;
    correlateDayOpts(
      [],
      document.getElementById("dateSel") as HTMLSelectElement
    );
    expect(multipleElementsNotFound).toHaveBeenCalledWith(
      expect.anything(),
      "arguments for correlateDayOpts",
      expect.anything(),
      expect.anything()
    );
  });
});
