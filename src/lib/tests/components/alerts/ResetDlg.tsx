import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import ResetDlg from "../../../../../components/alerts/ResetDlg";
import { ResetDlgProps } from "../../../../lib/locals/panelPage/declarations/interfacesCons";
import { createRoot } from "react-dom/client";
import MainFormPanel from "../../../../../components/mainPanel/MainFormPanel";
import "@testing-library/jest-dom/extend-expect";
jest.mock(
  "react-dom/client",
  (): {
    createRoot: jest.Mock<
      {
        render: jest.Mock<void, [JSX.Element]>;
      },
      [HTMLElement]
    >;
  } => ({
    createRoot: jest.fn<
      {
        render: jest.Mock<void, [JSX.Element]>;
      },
      [HTMLElement]
    >(() => ({
      render: jest.fn<void, [JSX.Element]>(),
    })),
  })
);
jest.mock(
  "../../../../lib/global/gStyleScript",
  (): {
    isClickOutside: jest.Mock<boolean[], [MouseEvent, HTMLElement]>;
  } => ({
    isClickOutside: jest.fn<boolean[], [MouseEvent, HTMLElement]>().mockReturnValue([true]),
  })
);
jest.mock(
  "../../../../lib/global/handlers/gHandlers",
  (): {
    syncAriaStates: jest.Mock<void, HTMLElement[]>;
  } => ({
    syncAriaStates: jest.fn<void, HTMLElement[]>(),
  })
);
jest.mock(
  "../../components/mainPanel/MainFormPanel",
  (): (() => JSX.Element) => (): JSX.Element => <div>MainFormPanel</div>
);
describe("ResetDlg Component", () => {
  const defaultProps: ResetDlgProps = {
    root: createRoot(screen.getByRole<HTMLDialogElement>("dialog")),
    setDisplayResetDlg: jest.fn<
      ReturnType<React.Dispatch<React.SetStateAction<boolean>>>,
      Parameters<React.Dispatch<React.SetStateAction<boolean>>>
    >((value: boolean | ((prevState: boolean) => boolean)) => (typeof value === "function" ? value(true) : value)),
    shouldDisplayResetDlg: true,
    renderForm: jest.fn<void, []>(),
  };
  const renderComponent = (
    props = {}
  ): RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement> =>
    render(<ResetDlg {...defaultProps} {...props} />);
  test("renders the modal dialog when shouldDisplayResetDlg is true", (): void => {
    renderComponent();
    expect(screen.getByRole<HTMLDialogElement>("alertdialog")).toBeInTheDocument();
    expect(screen.getByText<HTMLButtonElement>("Confirmar reset?")).toBeInTheDocument();
    expect(screen.getByText<HTMLElement>("Esse processo é totalmente irreversível!")).toBeInTheDocument();
  });
  test("does not render the modal dialog when shouldDisplayResetDlg is false", (): void => {
    renderComponent({ shouldDisplayResetDlg: false });
    expect(screen.queryByRole<HTMLDialogElement>("alertdialog")).not.toBeInTheDocument();
  });
  test("calls setDisplayResetDlg when 'Confirmar' button is clicked", (): void => {
    renderComponent();
    fireEvent.click(screen.getByText<HTMLButtonElement>("Confirmar"));
    expect(defaultProps.setDisplayResetDlg).toHaveBeenCalledWith<Parameters<typeof defaultProps.setDisplayResetDlg>>(
      false
    );
  });
  test("calls resetForm when 'Confirmar' button is clicked", (): void => {
    renderComponent();
    const form: HTMLFormElement = document.createElement("form");
    document.body.appendChild<HTMLFormElement>(form);
    fireEvent.click(screen.getByText<HTMLButtonElement>("Confirmar"));
    expect(jest.spyOn(form, "reset").mockImplementation(() => {})).toHaveBeenCalled();
    expect(createRoot).toHaveBeenCalledWith<Parameters<typeof createRoot>>(
      document.getElementById("formRoot") as HTMLDivElement
    );
    expect(createRoot(document.createElement("div")).render).toHaveBeenCalledWith<any[]>(
      <MainFormPanel defOp='agenda' />
    );
  });
  test("closes the dialog when clicking outside the modal", (): void => {
    renderComponent();
    fireEvent.click(screen.getByRole<HTMLDialogElement>("alertdialog"));
    expect(defaultProps.setDisplayResetDlg).toHaveBeenCalledWith<Parameters<typeof defaultProps.setDisplayResetDlg>>(
      false
    );
  });
  test("syncs aria states on mount", (): void => {
    renderComponent();
    expect(require("../../../../lib/global/handlers/gHandlers").syncAriaStates).toHaveBeenCalled();
  });
  test("adds keydown event listener for Escape key to close dialog", (): void => {
    const { container }: { container: HTMLElement } = renderComponent();
    fireEvent.keyDown(container, { key: "Escape" });
    expect(defaultProps.setDisplayResetDlg).toHaveBeenCalledWith<Parameters<typeof defaultProps.setDisplayResetDlg>>(
      false
    );
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
