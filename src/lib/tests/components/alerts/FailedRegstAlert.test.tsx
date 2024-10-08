import React from "react";
import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import FailRegstAlert from "../../../../../components/alerts/FailRegsAlert";
import { FailedRegstProps } from "../../../global/declarations/interfacesCons";
import { createRoot } from "react-dom/client";
import "@testing-library/jest-dom/extend-expect";
jest.mock(
  "../../../../lib/global/gStyleScript",
  (): {
    isClickOutside: jest.Mock<boolean[], [MouseEvent, HTMLElement]>;
  } => ({
    isClickOutside: jest.fn<boolean[], [MouseEvent, HTMLElement]>().mockReturnValue([true]),
  }),
) as typeof jest;
jest.mock(
  "../../../../lib/global/handlers/gHandlers",
  (): {
    syncAriaStates: jest.Mock<void, HTMLElement[]>;
  } => ({
    syncAriaStates: jest.fn<void, HTMLElement[]>(),
  }),
) as typeof jest;
describe("FailRegstAlert Component", (): void => {
  const defaultProps: FailedRegstProps = {
    root: createRoot(document.createElement("div") as HTMLDivElement),
    setDisplayFailRegstDlg: jest.fn<
      ReturnType<React.Dispatch<React.SetStateAction<boolean>>>,
      Parameters<React.Dispatch<React.SetStateAction<boolean>>>
    >(value => (typeof value === "function" ? value(true) : value)),
    shouldDisplayFailRegstDlg: true,
    secondOp: "Arraste",
  };
  const renderComponent = (
    props = {},
  ): RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement> =>
    render(<FailRegstAlert {...defaultProps} {...props} />);

  test("renders the modal dialog when shouldDisplayFailRegstDlg is true", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (
      expect(screen.getByRole<HTMLDialogElement>("alertdialog")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(
        screen.getByText<HTMLElement>(
          "Falha na procura de um encaixe correspondente na agenda! Arraste  ou insira manualmente.",
        ),
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("does not render the modal dialog when shouldDisplayFailRegstDlg is false", (): void => {
    renderComponent({ shouldDisplayFailRegstDlg: false }) as RenderResult;
    (
      expect(screen.queryByRole<HTMLDialogElement>("alertdialog")).not as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("calls setDisplayFailRegstDlg when 'Fechar' button is clicked", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.click(screen.getByText<HTMLButtonElement>("Fechar")) as boolean;
    (expect(defaultProps.setDisplayFailRegstDlg) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof defaultProps.setDisplayFailRegstDlg>
    >(false);
  }) as void;
  test("closes the dialog when clicking outside the modal", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.click(screen.getByRole<HTMLDialogElement>("alertdialog")) as boolean;
    (expect(defaultProps.setDisplayFailRegstDlg) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof defaultProps.setDisplayFailRegstDlg>
    >(false);
  }) as void;
  test("syncs aria states on mount", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (
      expect(require("../../../../lib/global/handlers/gHandlers").syncAriaStates) as jest.JestMatchers<jest.SpyInstance>
    ).toHaveBeenCalled() as void;
  }) as void;

  test("adds keydown event listener for Escape key to close dialog", (): void => {
    const { container }: { container: HTMLElement } = renderComponent() as RenderResult<
      typeof import("@testing-library/dom/types/queries"),
      HTMLElement,
      HTMLElement
    >;
    fireEvent.keyDown(container, { key: "Escape" }) as boolean;
    (expect(defaultProps.setDisplayFailRegstDlg) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof defaultProps.setDisplayFailRegstDlg>
    >(false);
  }) as void;

  test("shows error fallback if an error is thrown", (): void => {
    jest.mock(
      "react-error-boundary",
      (): {
        ErrorBoundary: jest.Mock<any, any, any>;
      } => ({
        ErrorBoundary: jest.fn<never, []>().mockImplementation((): never => {
          throw new Error("Test Error");
        }) as jest.Mock,
      }),
    );
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (
      expect(screen.getByText<HTMLElement>("Erro carregando a janela modal!")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
}) as void;
