//v1.0.0
import { equalizeParagraphs } from "../../../locals/basePage/baseStylescript";
describe("equalizeParagraphs", () => {
  let div1: HTMLDivElement;
  let div2: HTMLDivElement;
  let div3: HTMLDivElement;
  beforeEach(() => {
    div1 = document.createElement("div");
    div2 = document.createElement("div");
    div3 = document.createElement("div");
    div1.style.width = "200px";
    div2.style.width = "150px";
    div3.style.width = "180px";
    jest.spyOn(window, "getComputedStyle").mockImplementation((el: Element) => {
      return {
        width: el instanceof HTMLElement ? el.style.width : "16px",
        fontSize: "16px",
      } as CSSStyleDeclaration;
    });
    jest.clearAllMocks();
  });
  it("should set all elements to the minimum width in rem", () => {
    jest
      .spyOn(require("../../../global/gModel"), "parseNotNaN")
      .mockImplementation(value => {
        return parseFloat(value as any);
      });
    equalizeParagraphs([div1, div2, div3]);
    const expectedMinWidth = (150 / 16).toFixed(3);
    expect(div1.style.width).toBe(expectedMinWidth);
    expect(div2.style.width).toBe(expectedMinWidth);
    expect(div3.style.width).toBe(expectedMinWidth);
  });
  it("should call elementNotPopulated when textEls is not an array or is empty", () => {
    const mockElementNotPopulated = jest.spyOn(
      require("../../../global/handlers/errorHandler"),
      "elementNotPopulated"
    );
    equalizeParagraphs([]);
    expect(mockElementNotPopulated).toHaveBeenCalledWith(
      [],
      "Text Elements for equalizeParagraphs()",
      expect.any(String)
    );
    equalizeParagraphs(null as any);
    expect(mockElementNotPopulated).toHaveBeenCalledWith(
      null,
      "Text Elements for equalizeParagraphs()",
      expect.any(String)
    );
  });
  it("should call elementNotPopulated when an element is not an HTMLElement", () => {
    const mockElementNotPopulated = jest.spyOn(
      require("../../global/handlers/errorHandler"),
      "elementNotPopulated"
    );
    equalizeParagraphs([div1, {} as HTMLElement]);
    expect(mockElementNotPopulated).toHaveBeenCalledWith(
      [div1, {}],
      "Text Elements for equalizeParagraphs()",
      expect.any(String)
    );
  });
  it("should not update width if minTextWid / rem is 0", () => {
    div1.style.width = "0px";
    div2.style.width = "0px";
    div3.style.width = "0px";
    equalizeParagraphs([div1, div2, div3]);
    expect(div1.style.width).toBe("0px");
    expect(div2.style.width).toBe("0px");
    expect(div3.style.width).toBe("0px");
  });
});
