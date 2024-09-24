import { root } from "../vars";
import { nullishBtn } from "../../../../lib/global/declarations/types";
import { ExcludeConsDlgProps } from "../../../../lib/locals/panelPage/declarations/interfacesCons";
import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import ExcludeConsDlg from "../../../../../components/alerts/ExcludeConsDlg";
import "@testing-library/jest-dom";
jest.mock(
  `${root}/lib/global/gStyleScript`,
  (): {
    isClickOutside: jest.Mock<boolean[], [MouseEvent, HTMLElement]>;
  } => ({
    isClickOutside: jest.fn<boolean[], [MouseEvent, HTMLElement]>().mockReturnValue([true]),
  })
);
jest.mock(
  `${root}/lib/global/handlers/errorHandler`,
  (): {
    elementNotFound: jest.Mock<void, [HTMLElement | null, string, string]>;
    extLine: jest.Mock<string, [Error]>;
  } => ({
    elementNotFound: jest.fn<void, [HTMLElement | null, string, string]>(),
    extLine: jest.fn<string, [Error]>(),
  })
);
jest.mock(
  `${root}/lib/global/handlers/gHandlers`,
  (): {
    syncAriaStates: jest.Mock<void, HTMLElement[]>;
  } => ({
    syncAriaStates: jest.fn<void, HTMLElement[]>(),
  })
);
jest.mock(
  `${root}/lib/locals/panelPage/handlers/consHandlerCmn`,
  (): {
    addEraseEvent: jest.Mock<void, [nullishBtn, string]>;
  } => ({
    addEraseEvent: jest.fn<void, [nullishBtn, string]>(),
  })
);
describe("ExcludeConsDlg Component", (): void => {
  const defaultProps: ExcludeConsDlgProps = {
    setDisplayExcludeDlg: jest.fn<
      ReturnType<React.Dispatch<React.SetStateAction<boolean>>>,
      Parameters<React.Dispatch<React.SetStateAction<boolean>>>
    >(value => (typeof value === "function" ? value(true) : value)),
    shouldDisplayExcludeDlg: true,
    btn: {
      id: "confirm-btn",
    } as nullishBtn,
    userClass: "estudante",
  };
  const renderComponent = (
    props = {}
  ): RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement> =>
    render(<ExcludeConsDlg {...defaultProps} {...props} />);
  test("renders the modal dialog when shouldDisplayExcludeDlg is true", (): void => {
    renderComponent();
    expect(screen.getByRole<HTMLDialogElement>("alertdialog")).toBeInTheDocument();
    expect(screen.getByText<HTMLButtonElement>("Confirmar remoção?")).toBeInTheDocument();
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
    fireEvent.click(screen.getByText<HTMLButtonElement>("Confirmar"));
    expect(defaultProps.setDisplayExcludeDlg).toHaveBeenCalledWith<
      Parameters<typeof defaultProps.setDisplayExcludeDlg>
    >(false);
  });
  test("calls setDisplayExcludeDlg when clicking outside the modal", (): void => {
    renderComponent();
    fireEvent.click(screen.getByRole<HTMLDialogElement>("alertdialog"));
    expect(defaultProps.setDisplayExcludeDlg).toHaveBeenCalledWith<
      Parameters<typeof defaultProps.setDisplayExcludeDlg>
    >(false);
  });
  test("syncs aria states on mount", (): void => {
    renderComponent();
    expect(require(`${root}/lib/global/handlers/gHandlers`).syncAriaStates).toHaveBeenCalled();
  });
  test("adds keydown event listener for Escape key to close dialog", (): void => {
    const { container }: { container: HTMLElement } = renderComponent();
    fireEvent.keyDown(container, { key: "Escape" });
    expect(defaultProps.setDisplayExcludeDlg).toHaveBeenCalledWith<
      Parameters<typeof defaultProps.setDisplayExcludeDlg>
    >(false);
  });
  test("shows error fallback if an error is thrown in the boundary", (): void => {
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
  test("throws error if confirm button is not found", (): void => {
    renderComponent({ btn: null });
    expect(require(`${root}/lib/global/handlers/errorHandler`).elementNotFound).toHaveBeenCalled();
  });
});
