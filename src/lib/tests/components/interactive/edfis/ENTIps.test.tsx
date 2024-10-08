import React from "react";
import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { elementNotFound } from "../../../../global/handlers/errorHandler";
import ENTips from "../../../../../../components/interactive/edfis/ENTips";
jest.mock(
  "../../../../lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../lib/global/gStyleScript",
  (): {
    isClickOutside: jest.Mock<boolean[], [], any>;
  } => ({
    isClickOutside: jest.fn((): boolean[] => [true]) as jest.Mock,
  }),
) as typeof jest;
describe("ENTips component", (): void => {
  const mockDispatch = jest.fn();
  beforeEach((): void => {
    jest.clearAllMocks() as typeof jest;
  }) as void;
  test("renders correctly when state is true", (): void => {
    render(<ENTips state={true} dispatch={mockDispatch} />) as RenderResult;
    (
      expect(screen.getByRole<HTMLDialogElement>("dialog")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("does not render when state is false", (): void => {
    render(<ENTips state={false} dispatch={mockDispatch} />) as RenderResult;
    (
      expect(screen.queryByRole<HTMLDialogElement>("dialog")) as jest.JestMatchers<jest.SpyInstance>
    ).not.toBeInTheDocument() as void;
  }) as void;
  test("closes dialog on ESCAPE key press", (): void => {
    render(<ENTips state={true} dispatch={mockDispatch} />) as RenderResult;
    fireEvent.keyDown(window, { key: "ESCAPE" }) as boolean;
    (expect(mockDispatch) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[boolean]>(false);
  }) as void;
  test("closes dialog when clicking outside", (): void => {
    render(<ENTips state={true} dispatch={mockDispatch} />) as RenderResult;
    fireEvent.click(screen.getByRole<HTMLDialogElement>("dialog")) as boolean;
    (expect(mockDispatch) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[boolean]>(false);
  }) as void;
  test("executes math block manipulation on mount", (): void => {
    document.body.innerHTML = `
      <div id="mathFirstBlock"></div>
      <div id="mathSecondBlock"></div>
      <div id="mathThirdBlock"></div>
      <div id="mathFourthBlock"></div>
      <div id="mathLastBlock"></div>
      <div id="hbFormula"></div>
    `;
    render(<ENTips state={true} dispatch={mockDispatch} />);
    (
      expect(document.getElementById("mathFirstBlock")?.innerHTML) as jest.JestMatchers<jest.SpyInstance>
    ).toContain<string>("<math") as void;
    (
      expect(document.getElementById("mathSecondBlock")?.innerHTML) as jest.JestMatchers<jest.SpyInstance>
    ).toContain<string>("<summary") as void;
    (
      expect(document.getElementById("mathThirdBlock")?.innerHTML) as jest.JestMatchers<jest.SpyInstance>
    ).toContain<string>("<munder") as void;
    (
      expect(document.getElementById("mathFourthBlock")?.innerHTML) as jest.JestMatchers<jest.SpyInstance>
    ).toContain<string>("<math") as void;
    (
      expect(document.getElementById("mathLastBlock")?.innerHTML) as jest.JestMatchers<jest.SpyInstance>
    ).toContain<string>("<math") as void;
    (expect(document.getElementById("hbFormula")?.innerHTML) as jest.JestMatchers<jest.SpyInstance>).toContain<string>(
      "<math",
    ) as void;
  }) as void;
  test("throws error when elements are not found", (): void => {
    render(<ENTips state={true} dispatch={mockDispatch} />) as RenderResult;
    (expect(elementNotFound) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("renders formula blocks with correct content", (): void => {
    document.body.innerHTML = `
      <div id="mathFirstBlock"></div>
      <div id="mathSecondBlock"></div>
      <div id="mathThirdBlock"></div>
      <div id="mathFourthBlock"></div>
      <div id="mathLastBlock"></div>
    `;
    render(<ENTips state={true} dispatch={mockDispatch} />) as RenderResult;
    (
      expect(document.getElementById("mathFirstBlock")?.innerHTML) as jest.JestMatchers<jest.SpyInstance>
    ).toContain<string>("Peso") as void;
    (
      expect(document.getElementById("mathSecondBlock")?.innerHTML) as jest.JestMatchers<jest.SpyInstance>
    ).toContain<string>("495") as void;
    (
      expect(document.getElementById("mathThirdBlock")?.innerHTML) as jest.JestMatchers<jest.SpyInstance>
    ).toContain<string>("Altura") as void;
    (
      expect(document.getElementById("mathFourthBlock")?.innerHTML) as jest.JestMatchers<jest.SpyInstance>
    ).toContain<string>("C1") as void;
    (
      expect(document.getElementById("mathLastBlock")?.innerHTML) as jest.JestMatchers<jest.SpyInstance>
    ).toContain<string>("TMB") as void;
  }) as void;
  test("executes useEffect cleanup properly", (): void => {
    const { unmount } = render(<ENTips state={true} dispatch={mockDispatch} />) as RenderResult;
    unmount() as void;
    (expect(window.removeEventListener) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof window.removeEventListener>
    >("keypress", (expect as jest.Expect).any(Function) as any) as void;
  }) as void;
}) as void;
