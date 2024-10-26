import { render, screen, fireEvent, waitFor, RenderResult } from "@testing-library/react";
import { elementNotFound } from "../../../../global/handlers/errorHandler";
import { isClickOutside } from "../../../../global/gStyleScript";
import PanelTips from "../../../../../../components/interactive/panel/PanelTips";
jest.mock(
  "../../../../lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
    extLine: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn() as jest.Mock,
    extLine: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "../../../../lib/global/gStyleScript",
  (): {
    isClickOutside: jest.Mock<any, any, any>;
  } => ({
    isClickOutside: jest.fn(() => [true]) as jest.Mock,
  })
) as typeof jest;
describe("PanelTips Component", (): void => {
  const mockDispatch = jest.fn() as jest.Mock;
  beforeEach((): void => {
    jest.clearAllMocks();
  }) as void;
  it("should render the dialog when state is true", (): void => {
    render(<PanelTips state={true} dispatch={mockDispatch} />) as RenderResult;
    expect(screen.getByRole<HTMLDialogElement>("dialog")).toBeInTheDocument() as void;
    expect(screen.getByText<HTMLElement>("Manual para controle de formulário")).toBeInTheDocument() as void;
  }) as void;
  it("should not render the dialog when state is false", (): void => {
    render(<PanelTips state={false} dispatch={mockDispatch} />) as RenderResult;
    expect(screen.queryByRole<HTMLDialogElement>("dialog")).toBeUndefined() as void;
  }) as void;
  it("should close the dialog when clicking the close button", (): void => {
    render(<PanelTips state={true} dispatch={mockDispatch} />) as RenderResult;
    const fireEventClick = fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: "" })) as boolean;
    expect(fireEventClick).toBe(true) as void;
    expect(mockDispatch).toHaveBeenCalledWith<[boolean]>(false) as void;
  }) as void;
  it("should call isClickOutside and close the dialog when clicking outside", (): void => {
    render(<PanelTips state={true} dispatch={mockDispatch} />) as RenderResult;
    const dialog = screen.getByRole<HTMLDialogElement>("dialog") as HTMLDialogElement;
    const fireEventClick = fireEvent.click(dialog) as boolean;
    expect(fireEventClick).toBe(true) as void;
    expect(isClickOutside).toHaveBeenCalledWith<Parameters<typeof isClickOutside>>(expect.anything(), dialog) as void;
    expect(mockDispatch).toHaveBeenCalledWith<[boolean]>(false) as void;
  }) as void;
  it("should close the dialog when ESCAPE is pressed", async (): Promise<void> => {
    render(<PanelTips state={true} dispatch={mockDispatch} />) as RenderResult;
    expect(fireEvent.keyPress(document, { key: "ESCAPE" }) as boolean).toBe(true) as void;
    await waitFor(() => expect(mockDispatch).toHaveBeenCalledWith<[boolean]>(false) as void);
  }) as void;
  it("should call elementNotFound if dlgRef is not an instance of HTMLDialogElement", (): void => {
    render(<PanelTips state={true} dispatch={mockDispatch} />) as RenderResult;
    expect(elementNotFound).toHaveBeenCalledWith<Parameters<typeof elementNotFound>>(
      null,
      "PanelTips",
      expect.anything()
    ) as void;
  }) as void;
  it("should update history state on mount and unmount", (): void => {
    render(<PanelTips state={true} dispatch={mockDispatch} />) as RenderResult;
    expect(
      history.pushState({}, "", `${location.origin}${location.pathname}${location.search}&tips=open`) as void
    ).toBeUndefined() as void;
    expect(
      setTimeout((): void => {
        expect(
          history.pushState({}, "", `${location.href}`.replaceAll("/?", "?").replaceAll("/#", "#")) as void
        ).toBeUndefined() as void;
      }, 300) as NodeJS.Timeout
    ).toBeUndefined() as void;
    expect(
      setTimeout((): void => {
        expect(
          history.pushState(
            {},
            "",
            `${location.origin}${location.pathname}${location.search}`.replaceAll("&tips=open", "")
          ) as void
        ).toBeUndefined() as void;
      }, 300) as NodeJS.Timeout
    ).toBeUndefined() as void;
  }) as void;
}) as void;
