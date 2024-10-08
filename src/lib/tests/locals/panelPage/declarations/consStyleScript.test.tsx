import { DataProvider } from "../../../../global/declarations/classesCons";
import { userClasses } from "../../../../global/declarations/types";
import { DOMEvent, EventTargetMethod } from "@/lib/tests/testVars";
describe("DataProvider Class", (): void => {
  let dataProvider: DataProvider;
  let mockSessionStorage: { [key: string]: any };
  let mockScope: HTMLElement;
  beforeEach((): void => {
    mockSessionStorage = {};
    dataProvider = new DataProvider(mockSessionStorage);
    mockScope = document.createElement("div") as HTMLDivElement;
    jest.clearAllMocks() as typeof jest;
    sessionStorage.clear();
  }) as void;
  describe("constructor", (): void => {
    it("should initialize #sessionDataState and set up beforeunload event listener", (): void => {
      dataProvider = new DataProvider(mockSessionStorage);
      expect(jest.spyOn<Window, EventTargetMethod>(window, "addEventListener")).toHaveBeenCalledWith<[DOMEvent, any]>(
        "beforeunload",
        expect.any(Function),
      );
    }) as void;
  }) as void;
  describe("initPersist", (): void => {
    it("should parse session storage for the element if sessionStorage contains data", (): void => {
      sessionStorage.setItem("testElement", JSON.stringify({ key: "value" }));
      const mockParseSessionStorage = jest.spyOn<DataProvider, "parseSessionStorage">(
        dataProvider,
        "parseSessionStorage",
      );
      const element = document.createElement("div") as HTMLDivElement;
      element.id = "testElement";
      dataProvider.initPersist(element, dataProvider);
      setTimeout((): void => {
        expect(mockParseSessionStorage).toHaveBeenCalledWith<[HTMLElement, string, userClasses]>(
          element,
          element.id,
          "estudante",
        );
      }, 200);
    }) as void;
  }) as void;
  describe("initStorageParsing", (): void => {
    it("should correctly parse session storage data for HTML elements", (): void => {
      const inputEl = document.createElement("input") as HTMLInputElement;
      inputEl.id = "input1";
      mockScope.appendChild(inputEl);
      sessionStorage.setItem("testScope", JSON.stringify({ input1: "testValue" }));
      dataProvider.initStorageParsing(mockScope, "testScope");
      expect(inputEl.value).toBe<string>("testValue") as void;
    }) as void;
    it("should handle checkboxes correctly", (): void => {
      const checkbox = document.createElement("input") as HTMLInputElement;
      checkbox.id = "checkbox1";
      checkbox.type = "checkbox";
      mockScope.appendChild(checkbox);
      sessionStorage.setItem("testScope", JSON.stringify({ checkbox1: "true" }));
      dataProvider.initStorageParsing(mockScope, "testScope");
      expect(checkbox.checked).toBe<boolean>(true) as void;
    }) as void;
  }) as void;
  describe("parseSessionStorage", (): void => {
    it("should parse session storage and set element values correctly", (): void => {
      const inputEl = document.createElement("input") as HTMLInputElement;
      inputEl.id = "input1";
      mockScope.appendChild(inputEl);
      sessionStorage.setItem("testScope", JSON.stringify({ input1: "testValue" }));
      dataProvider.parseSessionStorage(mockScope, "testScope");
      expect(inputEl.value).toBe<string>("testValue") as void;
    }) as void;
    it("should call handleScheduleChange if a month selector is found", (): void => {
      const mockHandleScheduleChange = jest.spyOn<any, "handleScheduleChange">(
        require("../handlers/consHandlerCmn"),
        "handleScheduleChange",
      );
      const monthSelector = document.createElement("select");
      monthSelector.id = "monthSelector";
      mockScope.appendChild(monthSelector);
      dataProvider.parseSessionStorage(mockScope, "testScope", "student");
      expect(mockHandleScheduleChange).toHaveBeenCalled() as void;
    }) as void;
  }) as void;
  describe("checkForPersist", (): void => {
    it("should persist session entries to sessionStorage", (): void => {
      const inputEl = document.createElement("input") as HTMLInputElement;
      inputEl.id = "input1";
      inputEl.value = "persistedValue";
      inputEl.classList.add("ssPersist");
      mockScope.appendChild(inputEl);
      dataProvider.checkForPersist(mockScope);
      expect(sessionStorage.getItem(mockScope.id)).toContain<string>(
        JSON.stringify({ input1: "persistedValue" }),
      ) as void;
    }) as void;
  }) as void;
  describe("persistSessionEntries", (): void => {
    it("should persist HTMLInputElement and HTMLTextAreaElement values", (): void => {
      const inputEl = document.createElement("input") as HTMLInputElement;
      inputEl.id = "input1";
      inputEl.value = "persistedValue";
      inputEl.classList.add("ssPersist");
      mockScope.appendChild(inputEl);
      const persistedEntries = DataProvider.persistSessionEntries(mockScope);
      expect(persistedEntries).toEqual<{ [k: string]: string }>({ input1: "persistedValue" }) as void;
    }) as void;
    it("should persist checkbox state correctly", (): void => {
      const checkbox = document.createElement("input") as HTMLInputElement;
      checkbox.id = "checkbox1";
      checkbox.type = "checkbox";
      checkbox.checked = true;
      checkbox.classList.add("ssPersist");
      mockScope.appendChild(checkbox);
      const persistedEntries = DataProvider.persistSessionEntries(mockScope);
      expect(persistedEntries).toEqual<{ [k: string]: string }>({ checkbox1: "true" }) as void;
    }) as void;
  }) as void;
  describe("checkForm", (): void => {
    it("should return false if the element is not found", (): void => {
      expect(dataProvider.checkForm("nonExistentElement")).toBe<boolean>(false) as void;
    }) as void;
    it("should return true if the element exists", (): void => {
      const element = document.createElement("form") as HTMLFormElement;
      element.id = "testForm";
      document.body.appendChild(element);
      expect(dataProvider.checkForm("testForm")).toBe<boolean>(true) as void;
    }) as void;
  }) as void;
}) as void;
