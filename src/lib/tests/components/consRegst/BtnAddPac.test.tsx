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
);
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
    renderComponent() && expect(screen.getByText<HTMLButtonElement>("Adicionar Consulta")).toBeInTheDocument());
  test("toggles form visibility on button click", (): void => {
    renderComponent();
    const addButton: HTMLElement = screen.getByText<HTMLButtonElement>("Adicionar Consulta");
    fireEvent.click(addButton);
    expect(screen.queryByRole<HTMLDialogElement>("dialog")).toBeInTheDocument();
    fireEvent.click(addButton);
    expect(screen.queryByRole<HTMLDialogElement>("dialog")).not.toBeInTheDocument();
  });
  test("syncs aria states on mount and button press", (): void => {
    renderComponent();
    expect(syncAriaStates).toHaveBeenCalled();
    fireEvent.click(screen.getByText<HTMLButtonElement>("Adicionar Consulta"));
    expect(syncAriaStates).toHaveBeenCalledTimes(2);
  });
  test("sets initial pressState based on location.search", (): void => {
    const original: Location = window.location;
    Object.defineProperty(window, "location", {
      value: {
        search: "?new-cons=open",
      },
      writable: true,
    });
    renderComponent();
    expect(screen.queryByRole<HTMLDialogElement>("dialog")).toBeInTheDocument();
    window.location = original;
  });
  test("handles timeout case for aria syncing", (): void => {
    jest.useFakeTimers();
    renderComponent();
    jest.advanceTimersByTime(2000);
    expect(syncAriaStates).toHaveBeenCalledTimes(2);
    jest.useRealTimers();
  });
});
