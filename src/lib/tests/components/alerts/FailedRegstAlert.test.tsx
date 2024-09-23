import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import FailRegstAlert from "../../../../../components/alerts/FailRegsAlert";
import { FailedRegstProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { createRoot } from "react-dom/client";
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
describe("FailRegstAlert Component", (): void => {
  const defaultProps: FailedRegstProps = {
    root: createRoot(document.createElement("div")),
    setDisplayFailRegstDlg: jest.fn<
      ReturnType<React.Dispatch<React.SetStateAction<boolean>>>,
      Parameters<React.Dispatch<React.SetStateAction<boolean>>>
    >(value => (typeof value === "function" ? value(true) : value)),
    shouldDisplayFailRegstDlg: true,
    secondOp: "Arraste",
  };
  const renderComponent = (
    props = {}
  ): RenderResult<
    typeof import("c:/Users/Aron/Desktop/P/HTML/pro-saude-app-netlify/node_modules/@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > => render(<FailRegstAlert {...defaultProps} {...props} />);

  test("renders the modal dialog when shouldDisplayFailRegstDlg is true", (): void => {
    renderComponent();
    expect(screen.getByRole<HTMLElement>("alertdialog")).toBeInTheDocument();
    expect(
      screen.getByText<HTMLElement>(
        "Falha na procura de um encaixe correspondente na agenda! Arraste  ou insira manualmente."
      )
    ).toBeInTheDocument();
  });
  test("does not render the modal dialog when shouldDisplayFailRegstDlg is false", (): void => {
    renderComponent({ shouldDisplayFailRegstDlg: false });
    expect(screen.queryByRole<HTMLElement>("alertdialog")).not.toBeInTheDocument();
  });
  test("calls setDisplayFailRegstDlg when 'Fechar' button is clicked", (): void => {
    renderComponent();
    fireEvent.click(screen.getByText<HTMLElement>("Fechar"));
    expect(defaultProps.setDisplayFailRegstDlg).toHaveBeenCalledWith<
      Parameters<typeof defaultProps.setDisplayFailRegstDlg>
    >(false);
  });
  test("closes the dialog when clicking outside the modal", (): void => {
    renderComponent();
    fireEvent.click(screen.getByRole<HTMLElement>("alertdialog"));
    expect(defaultProps.setDisplayFailRegstDlg).toHaveBeenCalledWith<
      Parameters<typeof defaultProps.setDisplayFailRegstDlg>
    >(false);
  });
  test("syncs aria states on mount", (): void => {
    renderComponent();
    expect(require("@/lib/global/handlers/gHandlers").syncAriaStates).toHaveBeenCalled();
  });

  test("adds keydown event listener for Escape key to close dialog", (): void => {
    const { container } = renderComponent();
    fireEvent.keyDown(container, { key: "Escape" });
    expect(defaultProps.setDisplayFailRegstDlg).toHaveBeenCalledWith<
      Parameters<typeof defaultProps.setDisplayFailRegstDlg>
    >(false);
  });

  test("shows error fallback if an error is thrown", (): void => {
    jest.mock(
      "react-error-boundary",
      (): {
        ErrorBoundary: jest.Mock<any, any, any>;
      } => ({
        ErrorBoundary: jest.fn<never, []>().mockImplementation(() => {
          throw new Error("Test Error");
        }),
      })
    );
    renderComponent();
    expect(screen.getByText<HTMLElement>("Erro carregando a janela modal!")).toBeInTheDocument();
  });
});
