import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import RecoverAlert from "../../../../../components/alerts/RecoverAlert";
import { DlgProps } from "../../../global/declarations/interfaces";
import "@testing-library/jest-dom/extend-expect";
jest.mock(
  "@/lib/global/gStyleScript",
  (): {
    isClickOutside: jest.Mock<boolean[], [MouseEvent, HTMLElement]>;
  } => ({
    isClickOutside: jest.fn<boolean[], [MouseEvent, HTMLElement]>().mockReturnValue([true]),
  })
);
jest.mock(
  "@/lib/global/handlers/gHandlers",
  (): {
    syncAriaStates: jest.Mock<void, HTMLElement[]>;
  } => ({
    syncAriaStates: jest.fn<void, HTMLElement[]>(),
  })
);
describe("RecoverAlert Component", (): void => {
  const defaultProps: DlgProps = {
    dispatch: jest.fn<void, [boolean]>(),
    state: true,
  };
  const renderComponent = (
    props = {}
  ): RenderResult<
    typeof import("c:/Users/Aron/Desktop/P/HTML/pro-saude-app-netlify/node_modules/@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > => render(<RecoverAlert {...defaultProps} {...props} />);
  test("renders the modal dialog when state is true", (): void => {
    renderComponent();
    expect(screen.getByRole<HTMLElement>("alertdialog")).toBeInTheDocument();
    expect(screen.getByText<HTMLElement>("Solicitação enviada!")).toBeInTheDocument();
    expect(
      screen.getByText<HTMLElement>("Verifique a caixa de entrada do seu e-mail para os próximos passos.")
    ).toBeInTheDocument();
  });
  test("does not render the modal dialog when state is false", (): void => {
    renderComponent({ state: false });
    expect(screen.queryByRole<HTMLElement>("alertdialog")).not.toBeInTheDocument();
  });
  test("calls dispatch when 'Fechar' button is clicked", (): void => {
    renderComponent();
    fireEvent.click(screen.getByText<HTMLElement>("Fechar"));
    expect(defaultProps.dispatch).toHaveBeenCalledWith<Parameters<typeof defaultProps.dispatch>>(false);
  });
  test("closes the dialog when clicking outside the modal", (): void => {
    renderComponent();
    fireEvent.click(screen.getByRole<HTMLElement>("alertdialog"));
    expect(defaultProps.dispatch).toHaveBeenCalledWith<Parameters<typeof defaultProps.dispatch>>(false);
  });
  test("syncs aria states on mount", (): void => {
    renderComponent();
    expect(require("@/lib/global/handlers/gHandlers").syncAriaStates).toHaveBeenCalled();
  });
  test("adds keydown event listener for Escape key to close dialog", (): void => {
    const { container } = renderComponent();
    fireEvent.keyDown(container, { key: "Escape" });
    expect(defaultProps.dispatch).toHaveBeenCalledWith<Parameters<typeof defaultProps.dispatch>>(false);
  });
  test("shows error fallback if an error is thrown", (): void => {
    jest.mock(
      "react-error-boundary",
      (): {
        ErrorBoundary: jest.Mock<any, any, any>;
      } => ({
        ErrorBoundary: jest.fn<never, []>().mockImplementation((): never => {
          throw new Error("Test Error");
        }),
      })
    );
    renderComponent();
    expect(screen.getByText<HTMLElement>("Erro carregando a janela modal!")).toBeInTheDocument();
  });
});
