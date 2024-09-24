//v1.0.0
import { equalizeParagraphs } from "../../../locals/basePage/baseStylescript";
import { CSSMeasureValue, ErrorHandler } from "../../testVars";
describe("equalizeParagraphs", (): void => {
  let div1: HTMLDivElement, div2: HTMLDivElement, div3: HTMLDivElement;
  beforeEach((): void => {
    div1 = document.createElement("div");
    div2 = document.createElement("div");
    div3 = document.createElement("div");
    div1.style.width = "200px";
    div2.style.width = "150px";
    div3.style.width = "180px";
    jest
      .spyOn<Window, "getComputedStyle">(window, "getComputedStyle")
      .mockImplementation((el: Element): CSSStyleDeclaration => {
        return {
          width: el instanceof HTMLElement ? el.style.width : "16px",
          fontSize: "16px",
        } as CSSStyleDeclaration;
      });
    jest.clearAllMocks();
  });
  it("should set all elements to the minimum width in rem", (): void => {
    jest.spyOn<any, "parseNotNaN">(require("../../../global/gModel"), "parseNotNaN").mockImplementation(value => {
      return parseFloat(value as any);
    });
    equalizeParagraphs([div1, div2, div3]);
    const expectedMinWidth = (150 / 16).toFixed(3);
    expect(div1.style.width).toBe<string>(expectedMinWidth);
    expect(div2.style.width).toBe<string>(expectedMinWidth);
    expect(div3.style.width).toBe<string>(expectedMinWidth);
  });
  it("should call elementNotPopulated when textEls is not an array or is empty", (): void => {
    const mockElementNotPopulated = jest.spyOn<any, ErrorHandler>(
      require("../../../global/handlers/errorHandler"),
      "elementNotPopulated"
    );
    equalizeParagraphs([]);
    expect(mockElementNotPopulated).toHaveBeenCalledWith<[any, string, any]>(
      [],
      "Text Elements for equalizeParagraphs()",
      expect.any(String)
    );
    equalizeParagraphs(null as any);
    expect(mockElementNotPopulated).toHaveBeenCalledWith<[any, string, any]>(
      null,
      "Text Elements for equalizeParagraphs()",
      expect.any(String)
    );
  });
  it("should call elementNotPopulated when an element is not an HTMLElement", (): void => {
    const mockElementNotPopulated = jest.spyOn<any, ErrorHandler>(
      require("../../global/handlers/errorHandler"),
      "elementNotPopulated"
    );
    equalizeParagraphs([div1, {} as HTMLElement]);
    expect(mockElementNotPopulated).toHaveBeenCalledWith<[any, string, any]>(
      [div1, {}],
      "Text Elements for equalizeParagraphs()",
      expect.any(String)
    );
  });
  it("should not update width if minTextWid / rem is 0", (): void => {
    div1.style.width = "0px";
    div2.style.width = "0px";
    div3.style.width = "0px";
    equalizeParagraphs([div1, div2, div3]);
    expect(div1.style.width).toBe<CSSMeasureValue>("0px");
    expect(div2.style.width).toBe<CSSMeasureValue>("0px");
    expect(div3.style.width).toBe<CSSMeasureValue>("0px");
  });
});
