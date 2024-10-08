import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import ExcludeDlg from "../../../../../components/alerts/ExcludeDlg";
import { ExcludeDlgProps } from "../../..//lib/global/declarations/interfacesCons";
import { handleDelete } from "@/pages/api/ts/handlers";
import "@testing-library/jest-dom/extend-expect";
jest.mock(
  "@/pages/api/ts/handlers",
  (): {
    handleDelete: jest.Mock<void, [string, boolean]>;
  } => ({
    handleDelete: jest.fn<void, [string, boolean]>(),
  }),
) as typeof jest;
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
describe("ExcludeDlg Component", (): void => {
  const defaultProps: ExcludeDlgProps = {
    route: "ag",
    setDisplayExcludeDlg: jest.fn<
      ReturnType<React.Dispatch<React.SetStateAction<boolean>>>,
      Parameters<React.Dispatch<React.SetStateAction<boolean>>>
    >(value => (typeof value === "function" ? value(true) : value)),
    shouldDisplayExcludeDlg: true,
  };
  const renderComponent = (
    props = {},
  ): RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement> =>
    render(<ExcludeDlg {...defaultProps} {...props} />);

  test("renders the modal dialog when shouldDisplayExcludeDlg is true", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (
      expect(screen.getByRole<HTMLDialogElement>("alertdialog")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByText<HTMLButtonElement>("Confirmar remoção?")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(
        screen.getByText<HTMLElement>("Esse processo é parcialmente ou totalmente irreversível!"),
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;

  test("does not render the modal dialog when shouldDisplayExcludeDlg is false", (): void => {
    renderComponent({ shouldDisplayExcludeDlg: false }) as RenderResult;
    (
      expect(screen.queryByRole<HTMLElement>("alertdialog")).not as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;

  test("calls setDisplayExcludeDlg when confirm button is clicked", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.click(screen.getByText<HTMLButtonElement>("Confirmar")) as boolean;
    (expect(defaultProps.setDisplayExcludeDlg) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof defaultProps.setDisplayExcludeDlg>
    >(false);
  }) as void;
  test("calls handleDelete when the form is submitted", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.submit(screen.getByRole<HTMLFormElement>("form")) as boolean;
    (expect(handleDelete) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<Parameters<typeof handleDelete>>(
      "ag",
      true,
    ) as void;
  }) as void;
  test("closes dialog and toggles state when clicking outside the modal", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.click(screen.getByRole<HTMLDialogElement>("alertdialog")) as boolean;
    (expect(defaultProps.setDisplayExcludeDlg) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof defaultProps.setDisplayExcludeDlg>
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
    (expect(defaultProps.setDisplayExcludeDlg) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof defaultProps.setDisplayExcludeDlg>
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
