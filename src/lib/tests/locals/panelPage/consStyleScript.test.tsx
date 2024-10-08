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
import { CSSDisplay, ISODate } from "../../testVars";
jest.mock(
  "../../../global/handlers/errorHandler",
  (): {
    extLine: jest.Mock<any, any, any>;
    elementNotFound: jest.Mock<any, any, any>;
    elementNotPopulated: jest.Mock<any, any, any>;
    inputNotFound: jest.Mock<any, any, any>;
    multipleElementsNotFound: jest.Mock<any, any, any>;
  } => ({
    extLine: jest.fn() as jest.Mock,
    elementNotFound: jest.fn() as jest.Mock,
    elementNotPopulated: jest.fn() as jest.Mock,
    inputNotFound: jest.fn() as jest.Mock,
    multipleElementsNotFound: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "../../../global/gStyleScript",
  (): {
    strikeNulls: jest.Mock<any, any, any>;
    highlightChange: jest.Mock<any, any, any>;
  } => ({
    strikeNulls: jest.fn() as jest.Mock,
    highlightChange: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "./handlers/consHandlerCmn",
  (): {
    convertWeekdaysToMonthdays: jest.Mock<any, any, any>;
    correlateAptMonthDays: jest.Mock<any, any, any>;
    correlateWorkingDays: jest.Mock<any, any, any>;
  } => ({
    convertWeekdaysToMonthdays: jest.fn() as jest.Mock,
    correlateAptMonthDays: jest.fn() as jest.Mock,
    correlateWorkingDays: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("strikeEntries", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = "";
  }) as void;
  test("should call strikeNulls with found elements", (): void => {
    document.body.innerHTML = `
      <div id="main">
        <input />
        <output />
        <select></select>
        <textarea></textarea>
      </div>
    `;
    strikeEntries(document.getElementById("main") as HTMLElement);
    expect(strikeNulls).toHaveBeenCalledWith<Parameters<typeof strikeNulls>>(expect.any(Array) as any) as void;
  }) as void;
  test("should call elementNotPopulated when no elements found", (): void => {
    document.body.innerHTML = `<div id="main"></div>`;
    strikeEntries(document.getElementById("main") as HTMLElement);
    expect(elementNotPopulated).toHaveBeenCalledWith<Parameters<typeof elementNotPopulated>>(
      [],
      "inAndOutEls in useEffect() for sectTabRef",
      expect.anything() as any
    );
  }) as void;
}) as void;
describe("setListenersForDates", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = "";
  }) as void;
  test("should set date inputs with month and year when valid inputs are provided", async (): Promise<void> => {
    document.body.innerHTML = `
      <input type="date" class="dateInp" />
      <select id="monthStateSelector">
        <option value="feb">February</option>
        <option value="mar">March</option>
      </select>
    `;
    const [pattern, handler] = await setListenersForDates(
      Array.from(document.querySelectorAll(".dateInp") as NodeListOf<HTMLInputElement>) as Array<HTMLInputElement>,
      document.getElementById("monthStateSelector") as HTMLSelectElement
    );
    expect(pattern).toEqual<any>(expect.any(RegExp) as any);
    expect(handler).toBeInstanceOf<FunctionConstructor>(Function) as void;
  }) as void;
  test("should call inputNotFound when monthStateSelector is invalid", async (): Promise<void> => {
    document.body.innerHTML = `
      <input type="date" class="dateInp" />
      <input id="monthStateSelector" type="text" value="invalid" />
    `;
    const monthStateSelector = document.getElementById("monthStateSelector") as HTMLInputElement;
    await setListenersForDates(
      Array.from(document.querySelectorAll(".dateInp") as NodeListOf<HTMLInputElement>) as Array<HTMLInputElement>,
      monthStateSelector
    );
    expect(elementNotFound).toHaveBeenCalledWith<Parameters<typeof elementNotFound>>(
      monthStateSelector,
      "monthStateSelector in setListenerForDates()",
      expect.anything() as any
    );
  }) as void;
  test("should call elementNotPopulated when dateInps is empty", async (): Promise<void> => {
    await setListenersForDates([], document.createElement("select"));
    expect(elementNotPopulated).toHaveBeenCalledWith<Parameters<typeof elementNotPopulated>>(
      [],
      "argument for setListenerForDates()",
      expect.anything() as any
    );
  }) as void;
}) as void;
describe("hideLastDay", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = "";
  }) as void;
  test("should hide the last day when elements are hidden", (): void => {
    document.body.innerHTML = `
      <div class="lastConsDayCont" style="display: none;"></div>
      <select id="daySel">
        <option>Option</option>
      </select>
    `;
    const daySel = document.getElementById("daySel") as HTMLSelectElement;
    hideLastDay(daySel);
    if (daySel?.lastElementChild instanceof HTMLElement) {
      expect(daySel.lastElementChild.hidden).toBe<boolean>(true) as void;
      expect(daySel.lastElementChild.style.display).toBe<CSSDisplay>("none") as void;
    } else console.error(`Last Element Child of daySel is not an HTMLElement.`);
  }) as void;
  test("should do nothing if no elements are hidden", (): void => {
    document.body.innerHTML = `
      <div class="lastConsDayCont"></div>
      <select id="daySel">
        <option>Option</option>
      </select>
    `;
    const daySel = document.getElementById("daySel") as HTMLSelectElement;
    hideLastDay(daySel);
    daySel?.lastElementChild instanceof HTMLElement
      ? expect(daySel.lastElementChild!.hidden).toBe<boolean>(false)
      : console.error(`Last Element Child of daySel is not an HTMLElement.`);
  }) as void;
}) as void;
describe("correlateDayOpts", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = "";
  }) as void;
  test("should add new option to the date select if new date input value is not in options", (): void => {
    document.body.innerHTML = `
      <input type="date" class="dateInp" value="2024-09-09" />
      <select id="dateSel">
        <option value="2024-09-08">08/09/2024</option>
      </select>
    `;
    const dateSel = document.getElementById("dateSel") as HTMLSelectElement;
    correlateDayOpts(
      Array.from(document.querySelectorAll(".dateInp") as NodeListOf<HTMLInputElement>) as Array<HTMLInputElement>,
      dateSel,
      "coordenador"
    );
    expect(dateSel.options).toHaveLength(2);
    expect(dateSel.options[1].value).toBe<ISODate>("2024-09-09") as void;
  }) as void;
  test("should call inputNotFound if dateInp is invalid", (): void => {
    document.body.innerHTML = `
      <div class="dateInp"></div>
      <select id="dateSel"></select>
    `;
    const dateInps = Array.from(
      document.querySelectorAll(".dateInp") as NodeListOf<HTMLInputElement>
    ) as Array<HTMLElement>;
    const dateSel = document.getElementById("dateSel") as HTMLSelectElement;
    correlateDayOpts(dateInps, dateSel, "coordenador");
    expect(inputNotFound).toHaveBeenCalledWith<Parameters<typeof inputNotFound>>(
      dateInps[0],
      "dateInp id UNIDENTIFIED",
      expect.anything() as any
    );
  }) as void;
  test("should call multipleElementsNotFound if dateInps or dateSel are invalid", (): void => {
    document.body.innerHTML = `
      <select id="dateSel"></select>
    `;
    correlateDayOpts([], document.getElementById("dateSel") as HTMLSelectElement);
    expect(multipleElementsNotFound).toHaveBeenCalledWith<Parameters<typeof multipleElementsNotFound>>(
      expect.anything() as any,
      "arguments for correlateDayOpts",
      expect.anything() as any,
      expect.anything() as any
    );
  }) as void;
}) as void;
