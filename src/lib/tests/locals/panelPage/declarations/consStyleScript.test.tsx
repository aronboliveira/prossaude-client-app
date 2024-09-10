import { DataProvider } from "../../../../locals/panelPage/declarations/classesCons";
describe("DataProvider Class", () => {
  let dataProvider: DataProvider;
  let mockSessionStorage: { [key: string]: any };
  let mockScope: HTMLElement;
  beforeEach(() => {
    mockSessionStorage = {};
    dataProvider = new DataProvider(mockSessionStorage);
    mockScope = document.createElement("div");
    jest.clearAllMocks();
    sessionStorage.clear();
  });
  describe("constructor", () => {
    it("should initialize #sessionDataState and set up beforeunload event listener", () => {
      dataProvider = new DataProvider(mockSessionStorage);
      expect(jest.spyOn(window, "addEventListener")).toHaveBeenCalledWith(
        "beforeunload",
        expect.any(Function)
      );
    });
  });
  describe("initPersist", () => {
    it("should parse session storage for the element if sessionStorage contains data", () => {
      sessionStorage.setItem("testElement", JSON.stringify({ key: "value" }));
      const mockParseSessionStorage = jest.spyOn(
        dataProvider,
        "parseSessionStorage"
      );
      const element = document.createElement("div");
      element.id = "testElement";
      dataProvider.initPersist(element, dataProvider);
      setTimeout(() => {
        expect(mockParseSessionStorage).toHaveBeenCalledWith(
          element,
          element.id,
          "student"
        );
      }, 200);
    });
  });
  describe("initStorageParsing", () => {
    it("should correctly parse session storage data for HTML elements", () => {
      const inputEl = document.createElement("input");
      inputEl.id = "input1";
      mockScope.appendChild(inputEl);
      sessionStorage.setItem(
        "testScope",
        JSON.stringify({ input1: "testValue" })
      );
      dataProvider.initStorageParsing(mockScope, "testScope");
      expect(inputEl.value).toBe("testValue");
    });
    it("should handle checkboxes correctly", () => {
      const checkbox = document.createElement("input");
      checkbox.id = "checkbox1";
      checkbox.type = "checkbox";
      mockScope.appendChild(checkbox);
      sessionStorage.setItem(
        "testScope",
        JSON.stringify({ checkbox1: "true" })
      );
      dataProvider.initStorageParsing(mockScope, "testScope");
      expect(checkbox.checked).toBe(true);
    });
  });
  describe("parseSessionStorage", () => {
    it("should parse session storage and set element values correctly", () => {
      const inputEl = document.createElement("input");
      inputEl.id = "input1";
      mockScope.appendChild(inputEl);
      sessionStorage.setItem(
        "testScope",
        JSON.stringify({ input1: "testValue" })
      );
      dataProvider.parseSessionStorage(mockScope, "testScope");
      expect(inputEl.value).toBe("testValue");
    });
    it("should call handleScheduleChange if a month selector is found", () => {
      const mockHandleScheduleChange = jest.spyOn(
        require("../handlers/consHandlerCmn"),
        "handleScheduleChange"
      );
      const monthSelector = document.createElement("select");
      monthSelector.id = "monthSelector";
      mockScope.appendChild(monthSelector);
      dataProvider.parseSessionStorage(mockScope, "testScope", "student");
      expect(mockHandleScheduleChange).toHaveBeenCalled();
    });
  });
  describe("checkForPersist", () => {
    it("should persist session entries to sessionStorage", () => {
      const inputEl = document.createElement("input");
      inputEl.id = "input1";
      inputEl.value = "persistedValue";
      inputEl.classList.add("ssPersist");
      mockScope.appendChild(inputEl);
      dataProvider.checkForPersist(mockScope);
      expect(sessionStorage.getItem(mockScope.id)).toContain(
        JSON.stringify({ input1: "persistedValue" })
      );
    });
  });
  describe("persistSessionEntries", () => {
    it("should persist HTMLInputElement and HTMLTextAreaElement values", () => {
      const inputEl = document.createElement("input");
      inputEl.id = "input1";
      inputEl.value = "persistedValue";
      inputEl.classList.add("ssPersist");
      mockScope.appendChild(inputEl);
      const persistedEntries = DataProvider.persistSessionEntries(mockScope);
      expect(persistedEntries).toEqual({ input1: "persistedValue" });
    });
    it("should persist checkbox state correctly", () => {
      const checkbox = document.createElement("input");
      checkbox.id = "checkbox1";
      checkbox.type = "checkbox";
      checkbox.checked = true;
      checkbox.classList.add("ssPersist");
      mockScope.appendChild(checkbox);
      const persistedEntries = DataProvider.persistSessionEntries(mockScope);
      expect(persistedEntries).toEqual({ checkbox1: "true" });
    });
  });
  describe("checkForm", () => {
    it("should return false if the element is not found", () => {
      expect(dataProvider.checkForm("nonExistentElement")).toBe(false);
    });
    it("should return true if the element exists", () => {
      const element = document.createElement("form");
      element.id = "testForm";
      document.body.appendChild(element);
      expect(dataProvider.checkForm("testForm")).toBe(true);
    });
  });
});
