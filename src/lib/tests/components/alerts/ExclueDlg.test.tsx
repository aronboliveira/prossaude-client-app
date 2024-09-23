import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import ExcludeDlg from "../../../../../components/alerts/ExcludeDlg";
import { ExcludeDlgProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { handleDelete } from "@/pages/api/ts/handlers";
import "@testing-library/jest-dom/extend-expect";
jest.mock(
  "@/pages/api/ts/handlers",
  (): {
    handleDelete: jest.Mock<void, [string, boolean]>;
  } => ({
    handleDelete: jest.fn<void, [string, boolean]>(),
  })
);
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
    props = {}
  ): RenderResult<
    typeof import("c:/Users/Aron/Desktop/P/HTML/pro-saude-app-netlify/node_modules/@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > => render(<ExcludeDlg {...defaultProps} {...props} />);

  test("renders the modal dialog when shouldDisplayExcludeDlg is true", (): void => {
    renderComponent();
    expect(screen.getByRole<HTMLElement>("alertdialog")).toBeInTheDocument();
    expect(screen.getByText<HTMLElement>("Confirmar remoção?")).toBeInTheDocument();
    expect(
      screen.getByText<HTMLElement>("Esse processo é parcialmente ou totalmente irreversível!")
    ).toBeInTheDocument();
  });

  test("does not render the modal dialog when shouldDisplayExcludeDlg is false", (): void => {
    renderComponent({ shouldDisplayExcludeDlg: false });
    expect(screen.queryByRole<HTMLElement>("alertdialog")).not.toBeInTheDocument();
  });

  test("calls setDisplayExcludeDlg when confirm button is clicked", (): void => {
    renderComponent();
    fireEvent.click(screen.getByText<HTMLElement>("Confirmar"));
    expect(defaultProps.setDisplayExcludeDlg).toHaveBeenCalledWith<
      Parameters<typeof defaultProps.setDisplayExcludeDlg>
    >(false);
  });
  test("calls handleDelete when the form is submitted", (): void => {
    renderComponent();
    fireEvent.submit(screen.getByRole<HTMLElement>("form"));
    expect(handleDelete).toHaveBeenCalledWith<Parameters<typeof handleDelete>>("ag", true);
  });
  test("closes dialog and toggles state when clicking outside the modal", (): void => {
    renderComponent();
    fireEvent.click(screen.getByRole<HTMLElement>("alertdialog"));
    expect(defaultProps.setDisplayExcludeDlg).toHaveBeenCalledWith<
      Parameters<typeof defaultProps.setDisplayExcludeDlg>
    >(false);
  });
  test("syncs aria states on mount", (): void => {
    renderComponent();
    expect(require("@/lib/global/handlers/gHandlers").syncAriaStates).toHaveBeenCalled();
  });
  test("adds keydown event listener for Escape key to close dialog", (): void => {
    const { container } = renderComponent();
    fireEvent.keyDown(container, { key: "Escape" });
    expect(defaultProps.setDisplayExcludeDlg).toHaveBeenCalledWith<
      Parameters<typeof defaultProps.setDisplayExcludeDlg>
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
