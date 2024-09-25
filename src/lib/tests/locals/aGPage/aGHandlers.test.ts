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
import { elementNotFound, multipleElementsNotFound } from "../../../global/handlers/errorHandler";
import { BrState, BrStateAcronym, CSSColor, PromiseRes } from "../../testVars";
jest.mock(
  "../../../global/gModel",
  (): {
    autoCapitalizeInputs: jest.Mock<any, any, any>;
    checkAutoCorrect: jest.Mock<any, any, any>;
  } => ({
    autoCapitalizeInputs: jest.fn() as jest.Mock,
    checkAutoCorrect: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "../../../global/handlers/errorHandler",
  (): {
    extLine: jest.Mock<any, any, any>;
    elementNotFound: jest.Mock<any, any, any>;
    multipleElementsNotFound: jest.Mock<any, any, any>;
    inputNotFound: jest.Mock<any, any, any>;
  } => ({
    extLine: jest.fn() as jest.Mock,
    elementNotFound: jest.fn() as jest.Mock,
    multipleElementsNotFound: jest.fn() as jest.Mock,
    inputNotFound: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "../../../global/handlers/gHandlers",
  (): {
    useCurrentDate: jest.Mock<any, any, any>;
  } => ({
    useCurrentDate: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("searchCEPXML", (): void => {
  let mockXMLHttpRequest: jest.Mocked<XMLHttpRequest>;
  beforeEach((): void => {
    const mockXMLHttpRequest = (jest.fn() as jest.Mock).mockImplementation(
      (): {
        open: jest.Mock<any, any, any>;
        send: jest.Mock<any, any, any>;
        setRequestHeader: jest.Mock<any, any, any>;
        addEventListener: jest.Mock<any, any, any>;
        removeEventListener: jest.Mock<any, any, any>;
        responseText: string;
        status: number;
        onload: any;
        onreadystatechange: any;
        readyState: number;
      } => ({
        open: jest.fn() as jest.Mock,
        send: jest.fn() as jest.Mock,
        setRequestHeader: jest.fn() as jest.Mock,
        addEventListener: jest.fn() as jest.Mock,
        removeEventListener: jest.fn() as jest.Mock,
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
      })
    );
    global.XMLHttpRequest = mockXMLHttpRequest as any;
    document.body.innerHTML = '<input id="cepId" value="12345-678"/>';
  }) as void;
  it("should initiate an XMLHttpRequest and load data on success", (): void => {
    const cepElement = document.createElement("input") as HTMLInputElement;
    cepElement.id = "cepId";
    cepElement.value = "12345-678";
    document.body.appendChild(cepElement);
    searchCEPXML(cepElement);
    expect(mockXMLHttpRequest.open).toHaveBeenCalledWith<[string, string]>(
      "GET",
      "https://brasilapi.com.br/api/cep/v2/12345678"
    );
    expect(mockXMLHttpRequest.send).toHaveBeenCalled() as void;
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
    expect(loadCEPXML).toHaveBeenCalledWith<Parameters<typeof loadCEPXML>>(mockXMLHttpRequest, 2) as void;
  }) as void;
  it("should call elementNotFound if input element is not valid", (): void => {
    searchCEPXML(null as any);
    expect(elementNotFound).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("loadCEPXML", (): void => {
  let mockXMLHttpRequest: jest.Mocked<XMLHttpRequest>;
  beforeEach((): void => {
    document.body.innerHTML = `
      <input id="UFId"/><input id="cityId"/><input id="neighbourhoodId"/><input id="streetId"/>
    `;
    mockXMLHttpRequest = new XMLHttpRequest() as jest.Mocked<XMLHttpRequest>;
  }) as void;
  it("should update the DOM inputs when response is 200", (): void => {
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
    expect((document.getElementById("UFId") as HTMLInputElement).value).toBe<BrStateAcronym>("SP");
    expect((document.getElementById("cityId") as HTMLInputElement).value).toBe<BrState>("São Paulo");
  }) as void;
  it("should throw an error for invalid status codes", (): void => {
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
    expect((): number => loadCEPXML(mockXMLHttpRequest, 1)).not.toThrow();
  });
});
describe("searchCEP", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = '<input id="cepId" value="12345-678"/>';
  }) as void;
  it("should handle successful fetch requests", async (): Promise<void> => {
    global.fetch = (jest.fn() as jest.Mock).mockResolvedValue({
      ok: true,
      json: (jest.fn() as jest.Mock).mockResolvedValue({ state: "SP", city: "São Paulo" }),
    });
    expect(await searchCEP(document.getElementById("cepId") as HTMLInputElement)).toBe<PromiseRes>("success");
    expect(loadCEP).toHaveBeenCalled() as void;
  }) as void;
  it("should handle failed fetch requests", async (): Promise<void> => {
    global.fetch = (jest.fn() as jest.Mock).mockRejectedValue(new Error("Failed request"));
    const cepElement = document.getElementById("cepId") as HTMLInputElement;
    expect(await searchCEP(cepElement)).toBe<PromiseRes>("fail");
    expect(loadCEP).not.toHaveBeenCalled() as void;
  }) as void;
  it("should call elementNotFound if cepElement is not an input", async (): Promise<void> => {
    await searchCEP(null as any);
    expect(elementNotFound).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("makeCEPRequest", (): void => {
  it("should return a response on successful fetch", async (): Promise<void> => {
    const mockResponse = { ok: true, status: 200 } as Response;
    global.fetch = (jest.fn() as jest.Mock).mockResolvedValue(mockResponse) as jest.Mock;
    expect(await makeCEPRequest("https://api.example.com/cep")).toBe<Response>(mockResponse);
  }) as void;
  it("should log error if response is not ok", async (): Promise<void> => {
    const mockResponse = { ok: false, status: 500 } as Response;
    global.fetch = (jest.fn() as jest.Mock).mockResolvedValue(mockResponse) as jest.Mock;
    expect(await makeCEPRequest("https://api.example.com/cep")).toBe<Response>(mockResponse);
  }) as void;
}) as void;
describe("enableCEPBtn", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = '<button id="cepBtn" disabled></button>';
  }) as void;
  it("should enable button if CEP length is 9", (): void => {
    const cepBtn = document.getElementById("cepBtn") as HTMLButtonElement;
    expect(cepBtn.hasAttribute("disabled")).toBe<boolean>(false);
    expect(enableCEPBtn(cepBtn, 9)).toBe<boolean>(false);
  }) as void;
  it("should keep the button disabled if CEP length is not 9", (): void => {
    const cepBtn = document.getElementById("cepBtn") as HTMLButtonElement;
    expect(cepBtn.hasAttribute("disabled")).toBe<boolean>(true);
    expect(enableCEPBtn(cepBtn, 8)).toBe<boolean>(true);
  }) as void;
  it("should call multipleElementsNotFound if the button is not valid", (): void => {
    enableCEPBtn(null as any, 9);
    expect(multipleElementsNotFound).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("addMedHistHandler", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = '<button id="addAntMed" class="addAntMed"></button><div id="antMedContainer"></div>';
  }) as void;
  it('should add new blocks when button with class "addAntMed" is clicked', (): void => {
    expect(document.querySelectorAll<HTMLElement>(".antMedBlock").length).toBe<number>(1);
    expect(
      addMedHistHandler(
        {
          currentTarget: document.getElementById("addAntMed") as HTMLButtonElement,
        } as unknown as React.MouseEvent,
        1
      )
    ).toBe<number>(1);
  }) as void;
  it('should remove the last block when "removeAntMed" is clicked', (): void => {
    document.body.innerHTML += `
      <div class="antMedBlock" id="antMedBlock1"></div>
      <div class="antMedBlock" id="antMedBlock2"></div>
    `;
    const button = document.createElement("button") as HTMLButtonElement;
    button.classList.add("removeAntMed");
    document.body.appendChild(button);
    const blockCount = addMedHistHandler({ currentTarget: button } as unknown as React.MouseEvent, 2);
    expect(document.querySelectorAll<HTMLElement>(".antMedBlock").length).toBe<number>(1);
    expect(blockCount).toBe<number>(2);
  }) as void;
  it("should call elementNotFound if click target is invalid", (): void => {
    addMedHistHandler(null as any);
    expect(elementNotFound).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("displayCEPLoadBar", (): void => {
  let cepElement: HTMLInputElement;
  beforeEach((): void => {
    cepElement = document.createElement("input") as HTMLInputElement;
    cepElement.id = "cepId";
    document.body.innerHTML = `
      <div id="divProgCEP"></div>
    `;
  }) as void;
  it("should append a progress bar to the divProgCEP container", (): void => {
    const progressBar = displayCEPLoadBar(cepElement)[2];
    expect(document.getElementById("divProgCEP")?.contains(progressBar)).toBe<boolean>(true);
    expect(progressBar.max).toBe<number>(100);
    expect(progressBar.value).toBe<number>(0);
    expect(progressBar.style.backgroundColor).toBe<CSSColor>("blue");
    expect(progressBar.style.color).toBe<CSSColor>("white");
  }) as void;
  it("should return the correct max and value of the progress bar", (): void => {
    const [max, value] = displayCEPLoadBar(cepElement);
    expect(max).toBe<number>(100);
    expect(value).toBe<number>(0);
  }) as void;
  it("should throw an error if cepElement is not an HTMLInputElement", (): void => {
    expect((): [number, number, HTMLProgressElement] =>
      displayCEPLoadBar(document.createElement("div") as HTMLDivElement)
    ).toThrow("Input not found for cepElement");
  }) as void;
}) as void;
describe("uploadCEPLoadBar", (): void => {
  let cepElement: HTMLInputElement;
  let progressBar: HTMLProgressElement;
  beforeEach((): void => {
    cepElement = document.createElement("input") as HTMLInputElement;
    cepElement.id = "cepId";
    progressBar = document.createElement("progress");
    progressBar.id = "loadBarCepVars";
    progressBar.max = 100;
    progressBar.value = 0;
    document.body.innerHTML = `
      <div id="divProgCEP"></div>
    `;
    document.getElementById("divProgCEP")?.appendChild(progressBar);
  }) as void;
  it("should update the progress bar value incrementally until max value is reached", (): void => {
    jest.useFakeTimers();
    uploadCEPLoadBar(cepElement, progressBar, Date.now(), 100, 0);
    expect(progressBar.value).toBe<number>(0);
    jest.advanceTimersByTime(500);
    expect(progressBar.value).toBeGreaterThan(0);
    jest.advanceTimersByTime(1000);
    expect(progressBar.value).toBe<number>(100);
    jest.useRealTimers();
  }) as void;
  it("should remove the progress bar after the loading is complete", (): void => {
    jest.useFakeTimers();
    uploadCEPLoadBar(cepElement, progressBar, Date.now(), 100, 0);
    jest.runAllTimers();
    expect(document.getElementById("divProgCEP")?.contains(progressBar)).toBe<boolean>(false);
    jest.useRealTimers();
  }) as void;
  it("should throw an error if any of the arguments are invalid", (): void => {
    expect((): void => {
      uploadCEPLoadBar(document.createElement("div") as HTMLDivElement, progressBar, Date.now(), 100, 0);
    }).toThrow("Multiple elements not found");
  }) as void;
}) as void;
