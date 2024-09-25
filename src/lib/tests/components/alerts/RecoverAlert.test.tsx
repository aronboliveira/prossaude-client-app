import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import RecoverAlert from "../../../../../components/alerts/RecoverAlert";
import { DlgProps } from "../../../global/declarations/interfaces";
import "@testing-library/jest-dom/extend-expect";
jest.mock(
  "../../../../lib/global/gStyleScript",
  (): {
    isClickOutside: jest.Mock<boolean[], [MouseEvent, HTMLElement]>;
  } => ({
    isClickOutside: jest.fn<boolean[], [MouseEvent, HTMLElement]>().mockReturnValue([true]) as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "../../../../lib/global/handlers/gHandlers",
  (): {
    syncAriaStates: jest.Mock<void, HTMLElement[]>;
  } => ({
    syncAriaStates: jest.fn<void, HTMLElement[]>() as jest.Mock,
  })
) as typeof jest;
describe("RecoverAlert Component", (): void => {
  const defaultProps: DlgProps = {
    dispatch: jest.fn<void, [boolean]>(),
    state: true,
  };
  const renderComponent = (
    props = {}
  ): RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement> =>
    render(<RecoverAlert {...defaultProps} {...props} />);
  test("renders the modal dialog when state is true", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (
      expect(screen.getByRole<HTMLDialogElement>("alertdialog")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByText<HTMLElement>("Solicitação enviada!")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(
        screen.getByText<HTMLElement>("Verifique a caixa de entrada do seu e-mail para os próximos passos.")
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("does not render the modal dialog when state is false", (): void => {
    renderComponent({ state: false }) as RenderResult;
    (
      expect(screen.queryByRole<HTMLDialogElement>("alertdialog")) as jest.JestMatchers<jest.SpyInstance>
    ).not.toBeInTheDocument() as void;
  }) as void;
  test("calls dispatch when 'Fechar' button is clicked", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.click(screen.getByText<HTMLButtonElement>("Fechar")) as boolean;
    (expect(defaultProps.dispatch) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof defaultProps.dispatch>
    >(false) as void;
  }) as void;
  test("closes the dialog when clicking outside the modal", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.click(screen.getByRole<HTMLDialogElement>("alertdialog")) as boolean;
    (expect(defaultProps.dispatch) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof defaultProps.dispatch>
    >(false) as void;
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
    (expect(defaultProps.dispatch) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof defaultProps.dispatch>
    >(false) as void;
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
      })
    );
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (
      expect(screen.getByText<HTMLElement>("Erro carregando a janela modal!")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
}) as void;
