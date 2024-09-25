import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import BtnAddPac from "../../../../../components/consRegst/BtnAddPac";
import { BtnAddPacPros } from "../../../../lib/locals/panelPage/declarations/interfacesCons";
import { syncAriaStates } from "../../../../lib/global/handlers/gHandlers";
import "@testing-library/jest-dom/extend-expect";
jest.mock(
  "../../../../lib/global/handlers/gHandlers",
  (): {
    syncAriaStates: jest.Mock<void, HTMLElement[]>;
  } => ({
    syncAriaStates: jest.fn<void, HTMLElement[]>(),
  })
) as typeof jest;
describe("BtnAddPac Component", (): void => {
  const defaultProps: BtnAddPacPros = {
    userClass: "estudante",
    context: false,
  };
  const renderComponent = (
    props = {}
  ): RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement> =>
    render(<BtnAddPac {...defaultProps} {...props} />);
  test("renders the button correctly", (): void =>
    (renderComponent() as RenderResult<
      typeof import("@testing-library/dom/types/queries"),
      HTMLElement,
      HTMLElement
    >) && (expect(screen.getByText<HTMLButtonElement>("Adicionar Consulta")).toBeInTheDocument() as void));
  test("toggles form visibility on button click", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    const addButton: HTMLElement = screen.getByText<HTMLButtonElement>("Adicionar Consulta");
    fireEvent.click(addButton);
    expect(screen.queryByRole<HTMLDialogElement>("dialog")).toBeInTheDocument() as void;
    fireEvent.click(addButton);
    expect(screen.queryByRole<HTMLDialogElement>("dialog")).not.toBeInTheDocument() as void;
  });
  test("syncs aria states on mount and button press", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    expect(syncAriaStates).toHaveBeenCalled() as void;
    fireEvent.click(screen.getByText<HTMLButtonElement>("Adicionar Consulta"));
    expect(syncAriaStates).toHaveBeenCalledTimes(2) as void;
  });
  test("sets initial pressState based on location.search", (): void => {
    const original: Location = window.location;
    Object.defineProperty(window, "location", {
      value: {
        search: "?new-cons=open",
      },
      writable: true,
    });
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    expect(screen.queryByRole<HTMLDialogElement>("dialog")).toBeInTheDocument() as void;
    window.location = original;
  });
  test("handles timeout case for aria syncing", (): void => {
    jest.useFakeTimers();
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    jest.advanceTimersByTime(2000);
    expect(syncAriaStates).toHaveBeenCalledTimes(2) as void;
    jest.useRealTimers();
  });
});
