import { RenderResult, render } from "@testing-library/react";
import LockTabInd from "../../../../../../../components/interactive/edfis/tabs/LobTackInd";
jest.mock(
  "@/lib/global/gModel",
  (): {
    textTransformPascal: jest.Mock<any, any, any>;
  } => ({
    textTransformPascal: jest.fn().mockImplementation(str => str) as jest.Mock,
  })
) as typeof jest;
describe("LockTabInd Component", (): void => {
  it("should render a span with an SVG lock when isSpan is true", (): void => {
    const { getByRole } = render(<LockTabInd ctx='IMC' isSpan />) as RenderResult;
    const span = getByRole("img") as HTMLElement;
    (expect(span) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
    (expect(span.getAttribute("id")) as jest.JestMatchers<jest.SpyInstance>).toBe("lockIMC") as void;
    (expect(span.querySelector("svg")) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
  }) as void;
  it("should render a div with an SVG lock when isSpan is false", (): void => {
    const { getByRole } = render(<LockTabInd ctx='IMC' />) as RenderResult;
    const div = getByRole("group") as HTMLElement;
    (expect(div) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
    (expect(div.getAttribute("id")) as jest.JestMatchers<jest.SpyInstance>).toBe("divIMC") as void;
    (expect(div.querySelector("span")) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
  }) as void;
}) as void;
