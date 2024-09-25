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
) as typeof jest;
jest.mock(
  "../../../../lib/global/gStyleScript",
  (): {
    isClickOutside: jest.Mock<boolean[], [MouseEvent, HTMLElement]>;
  } => ({
    isClickOutside: jest.fn<boolean[], [MouseEvent, HTMLElement]>().mockReturnValue([true]),
  })
) as typeof jest;
jest.mock(
  "../../../../lib/global/handlers/gHandlers",
  (): {
    syncAriaStates: jest.Mock<void, HTMLElement[]>;
  } => ({
    syncAriaStates: jest.fn<void, HTMLElement[]>(),
  })
) as typeof jest;
jest.mock(
  "../../components/mainPanel/MainFormPanel",
  (): (() => JSX.Element) => (): JSX.Element => <div>MainFormPanel</div>
) as typeof jest;
describe("ResetDlg Component", (): void => {
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
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    expect(screen.getByRole<HTMLDialogElement>("alertdialog")).toBeInTheDocument() as void;
    expect(screen.getByText<HTMLButtonElement>("Confirmar reset?")).toBeInTheDocument() as void;
    expect(screen.getByText<HTMLElement>("Esse processo é totalmente irreversível!")).toBeInTheDocument() as void;
  });
  test("does not render the modal dialog when shouldDisplayResetDlg is false", (): void => {
    renderComponent({ shouldDisplayResetDlg: false });
    expect(screen.queryByRole<HTMLDialogElement>("alertdialog")).not.toBeInTheDocument() as void;
  });
  test("calls setDisplayResetDlg when 'Confirmar' button is clicked", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.click(screen.getByText<HTMLButtonElement>("Confirmar"));
    expect(defaultProps.setDisplayResetDlg).toHaveBeenCalledWith<Parameters<typeof defaultProps.setDisplayResetDlg>>(
      false
    );
  });
  test("calls resetForm when 'Confirmar' button is clicked", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    const form: HTMLFormElement = document.createElement("form") as HTMLFormElement;
    document.body.appendChild<HTMLFormElement>(form);
    fireEvent.click(screen.getByText<HTMLButtonElement>("Confirmar"));
    expect(
      jest.spyOn<HTMLFormElement, "reset">(form, "reset").mockImplementation((): void => {}) as jest.SpyInstance
    ).toHaveBeenCalled() as void;
    expect(createRoot).toHaveBeenCalledWith<Parameters<typeof createRoot>>(
      document.getElementById("formRoot") as HTMLDivElement
    );
    expect(createRoot(document.createElement("div") as HTMLDivElement).render).toHaveBeenCalledWith<any[]>(
      <MainFormPanel defOp='agenda' />
    );
  });
  test("closes the dialog when clicking outside the modal", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.click(screen.getByRole<HTMLDialogElement>("alertdialog"));
    expect(defaultProps.setDisplayResetDlg).toHaveBeenCalledWith<Parameters<typeof defaultProps.setDisplayResetDlg>>(
      false
    );
  });
  test("syncs aria states on mount", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    expect(require("../../../../lib/global/handlers/gHandlers").syncAriaStates).toHaveBeenCalled() as void;
  });
  test("adds keydown event listener for Escape key to close dialog", (): void => {
    const { container }: { container: HTMLElement } = renderComponent() as RenderResult<
      typeof import("@testing-library/dom/types/queries"),
      HTMLElement,
      HTMLElement
    >;
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
        }) as jest.Mock,
      })
    );
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    expect(screen.getByText<HTMLElement>("Erro carregando a janela modal!")).toBeInTheDocument() as void;
  });
});
