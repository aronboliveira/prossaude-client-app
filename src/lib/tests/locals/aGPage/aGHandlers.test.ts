//v1.0.0
import {
  searchCEPXML,
  loadCEPXML,
  searchCEP,
  makeCEPRequest,
  loadCEP,
  displayCEPLoadBar,
  uploadCEPLoadBar,
  enableCEPBtn,
  addMedHistHandler,
} from "../../../locals/aGPage/aGHandlers";
import {
  elementNotFound,
  multipleElementsNotFound,
} from "../../../global/handlers/errorHandler";
jest.mock("../../../global/gModel", () => ({
  autoCapitalizeInputs: jest.fn(),
  checkAutoCorrect: jest.fn(),
}));
jest.mock("../../../global/handlers/errorHandler", () => ({
  extLine: jest.fn(),
  elementNotFound: jest.fn(),
  multipleElementsNotFound: jest.fn(),
  inputNotFound: jest.fn(),
}));
jest.mock("../../../global/handlers/gHandlers", () => ({
  useCurrentDate: jest.fn(),
}));
describe("searchCEPXML", () => {
  let mockXMLHttpRequest: jest.Mocked<XMLHttpRequest>;
  beforeEach(() => {
    const mockXMLHttpRequest = jest.fn().mockImplementation(() => ({
      open: jest.fn(),
      send: jest.fn(),
      setRequestHeader: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      status: 200,
      responseText: JSON.stringify({
        state: "SP",
        city: "São Paulo",
        neighborhood: "Centro",
        street: "Rua A",
      }),
      onload: null,
      onreadystatechange: null,
      readyState: 4,
    }));
    global.XMLHttpRequest = mockXMLHttpRequest as any;
    document.body.innerHTML = '<input id="cepId" value="12345-678"/>';
  });
  it("should initiate an XMLHttpRequest and load data on success", () => {
    const cepElement = document.createElement("input");
    cepElement.id = "cepId";
    cepElement.value = "12345-678";
    document.body.appendChild(cepElement);
    searchCEPXML(cepElement);
    expect(mockXMLHttpRequest.open).toHaveBeenCalledWith(
      "GET",
      "https://brasilapi.com.br/api/cep/v2/12345678"
    );
    expect(mockXMLHttpRequest.send).toHaveBeenCalled();
    Object.defineProperty(mockXMLHttpRequest, "status", {
      value: 200,
      writable: true,
    });
    Object.defineProperty(mockXMLHttpRequest, "responseText", {
      value: JSON.stringify({
        state: "SP",
        city: "São Paulo",
        neighborhood: "Centro",
        street: "Rua A",
      }),
      writable: true,
    });
    mockXMLHttpRequest && (mockXMLHttpRequest as any).onload();
    expect(loadCEPXML).toHaveBeenCalledWith(mockXMLHttpRequest, 2);
  });
  it("should call elementNotFound if input element is not valid", () => {
    searchCEPXML(null as any);
    expect(elementNotFound).toHaveBeenCalled();
  });
});
describe("loadCEPXML", () => {
  let mockXMLHttpRequest: jest.Mocked<XMLHttpRequest>;
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="UFId"/><input id="cityId"/><input id="neighbourhoodId"/><input id="streetId"/>
    `;
    mockXMLHttpRequest = new XMLHttpRequest() as jest.Mocked<XMLHttpRequest>;
  });
  it("should update the DOM inputs when response is 200", () => {
    Object.defineProperty(mockXMLHttpRequest, "status", {
      value: 200,
      writable: true,
    });
    Object.defineProperty(mockXMLHttpRequest, "responseText", {
      value: JSON.stringify({
        state: "SP",
        city: "São Paulo",
        neighborhood: "Centro",
        street: "Rua A",
      }),
      writable: true,
    });
    loadCEPXML(mockXMLHttpRequest, 1);
    expect((document.getElementById("UFId") as HTMLInputElement).value).toBe(
      "SP"
    );
    expect((document.getElementById("cityId") as HTMLInputElement).value).toBe(
      "São Paulo"
    );
  });
  it("should throw an error for invalid status codes", () => {
    Object.defineProperty(mockXMLHttpRequest, "status", {
      value: 200,
      writable: true,
    });
    Object.defineProperty(mockXMLHttpRequest, "responseText", {
      value: JSON.stringify({
        state: "SP",
        city: "São Paulo",
        neighborhood: "Centro",
        street: "Rua A",
      }),
      writable: true,
    });
    expect(() => loadCEPXML(mockXMLHttpRequest, 1)).not.toThrowError();
  });
});
describe("searchCEP", () => {
  beforeEach(() => {
    document.body.innerHTML = '<input id="cepId" value="12345-678"/>';
  });
  it("should handle successful fetch requests", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ state: "SP", city: "São Paulo" }),
    });
    expect(
      await searchCEP(document.getElementById("cepId") as HTMLInputElement)
    ).toBe("success");
    expect(loadCEP).toHaveBeenCalled();
  });
  it("should handle failed fetch requests", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Failed request"));
    const cepElement = document.getElementById("cepId") as HTMLInputElement;
    expect(await searchCEP(cepElement)).toBe("fail");
    expect(loadCEP).not.toHaveBeenCalled();
  });
  it("should call elementNotFound if cepElement is not an input", async () => {
    await searchCEP(null as any);
    expect(elementNotFound).toHaveBeenCalled();
  });
});
describe("makeCEPRequest", () => {
  it("should return a response on successful fetch", async () => {
    const mockResponse = { ok: true, status: 200 } as Response;
    global.fetch = jest.fn().mockResolvedValue(mockResponse);
    expect(await makeCEPRequest("https://api.example.com/cep")).toBe(
      mockResponse
    );
  });
  it("should log error if response is not ok", async () => {
    const mockResponse = { ok: false, status: 500 } as Response;
    global.fetch = jest.fn().mockResolvedValue(mockResponse);
    expect(await makeCEPRequest("https://api.example.com/cep")).toBe(
      mockResponse
    );
  });
});
describe("enableCEPBtn", () => {
  beforeEach(() => {
    document.body.innerHTML = '<button id="cepBtn" disabled></button>';
  });
  it("should enable button if CEP length is 9", () => {
    const cepBtn = document.getElementById("cepBtn") as HTMLButtonElement;
    expect(cepBtn.hasAttribute("disabled")).toBe(false);
    expect(enableCEPBtn(cepBtn, 9)).toBe(false);
  });
  it("should keep the button disabled if CEP length is not 9", () => {
    const cepBtn = document.getElementById("cepBtn") as HTMLButtonElement;
    expect(cepBtn.hasAttribute("disabled")).toBe(true);
    expect(enableCEPBtn(cepBtn, 8)).toBe(true);
  });
  it("should call multipleElementsNotFound if the button is not valid", () => {
    enableCEPBtn(null as any, 9);
    expect(multipleElementsNotFound).toHaveBeenCalled();
  });
});
describe("addMedHistHandler", () => {
  beforeEach(() => {
    document.body.innerHTML =
      '<button id="addAntMed" class="addAntMed"></button><div id="antMedContainer"></div>';
  });
  it('should add new blocks when button with class "addAntMed" is clicked', () => {
    expect(document.querySelectorAll(".antMedBlock").length).toBe(1);
    expect(
      addMedHistHandler(
        {
          currentTarget: document.getElementById(
            "addAntMed"
          ) as HTMLButtonElement,
        } as unknown as React.MouseEvent,
        1
      )
    ).toBe(1);
  });
  it('should remove the last block when "removeAntMed" is clicked', () => {
    document.body.innerHTML += `
      <div class="antMedBlock" id="antMedBlock1"></div>
      <div class="antMedBlock" id="antMedBlock2"></div>
    `;
    const button = document.createElement("button");
    button.classList.add("removeAntMed");
    document.body.appendChild(button);
    const blockCount = addMedHistHandler(
      { currentTarget: button } as unknown as React.MouseEvent,
      2
    );
    expect(document.querySelectorAll(".antMedBlock").length).toBe(1);
    expect(blockCount).toBe(2);
  });
  it("should call elementNotFound if click target is invalid", () => {
    addMedHistHandler(null as any);
    expect(elementNotFound).toHaveBeenCalled();
  });
});
describe("displayCEPLoadBar", () => {
  let cepElement: HTMLInputElement;
  beforeEach(() => {
    cepElement = document.createElement("input");
    cepElement.id = "cepId";
    document.body.innerHTML = `
      <div id="divProgCEP"></div>
    `;
  });
  it("should append a progress bar to the divProgCEP container", () => {
    const progressBar = displayCEPLoadBar(cepElement)[2];
    expect(document.getElementById("divProgCEP")?.contains(progressBar)).toBe(
      true
    );
    expect(progressBar.max).toBe(100);
    expect(progressBar.value).toBe(0);
    expect(progressBar.style.backgroundColor).toBe("blue");
    expect(progressBar.style.color).toBe("white");
  });
  it("should return the correct max and value of the progress bar", () => {
    const [max, value] = displayCEPLoadBar(cepElement);
    expect(max).toBe(100);
    expect(value).toBe(0);
  });
  it("should throw an error if cepElement is not an HTMLInputElement", () => {
    expect(() => displayCEPLoadBar(document.createElement("div"))).toThrowError(
      "Input not found for cepElement"
    );
  });
});
describe("uploadCEPLoadBar", () => {
  let cepElement: HTMLInputElement;
  let progressBar: HTMLProgressElement;
  beforeEach(() => {
    cepElement = document.createElement("input");
    cepElement.id = "cepId";
    progressBar = document.createElement("progress");
    progressBar.id = "loadBarCepVars";
    progressBar.max = 100;
    progressBar.value = 0;
    document.body.innerHTML = `
      <div id="divProgCEP"></div>
    `;
    document.getElementById("divProgCEP")?.appendChild(progressBar);
  });
  it("should update the progress bar value incrementally until max value is reached", () => {
    jest.useFakeTimers();
    uploadCEPLoadBar(cepElement, progressBar, Date.now(), 100, 0);
    expect(progressBar.value).toBe(0);
    jest.advanceTimersByTime(500);
    expect(progressBar.value).toBeGreaterThan(0);
    jest.advanceTimersByTime(1000);
    expect(progressBar.value).toBe(100);
    jest.useRealTimers();
  });
  it("should remove the progress bar after the loading is complete", () => {
    jest.useFakeTimers();
    uploadCEPLoadBar(cepElement, progressBar, Date.now(), 100, 0);
    jest.runAllTimers();
    expect(document.getElementById("divProgCEP")?.contains(progressBar)).toBe(
      false
    );
    jest.useRealTimers();
  });
  it("should throw an error if any of the arguments are invalid", () => {
    expect(() => {
      uploadCEPLoadBar(
        document.createElement("div"),
        progressBar,
        Date.now(),
        100,
        0
      );
    }).toThrowError("Multiple elements not found");
  });
});
