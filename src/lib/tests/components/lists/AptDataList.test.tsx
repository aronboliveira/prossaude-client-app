import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import AptDataList from "../../../../../components/lists/AptDataList";
import { consVariablesData } from "../../../../../components/consRegst/consVariables";
import { addExportFlags } from "../../../../lib/global/gController";
import "@testing-library/jest-dom/extend-expect";
jest.mock(
  "../../../../../components/consRegst/ErrorFallbackDlg",
  (): (() => JSX.Element) => (): JSX.Element => <div>ErrorFallbackDlg</div>,
) as typeof jest;
jest.mock(
  "../../../../../lib/global/gController",
  (): {
    addExportFlags: jest.Mock<any, any, any>;
  } => ({
    addExportFlags: jest.fn(),
  }),
) as typeof jest;
jest.mock(
  "react-dom/client",
  (): {
    createRoot: jest.Mock<any, any, any>;
  } => ({
    createRoot: jest.fn().mockReturnValue({
      render: jest.fn(),
      unmount: jest.fn(),
    }),
  }),
) as typeof jest;
describe("AptDataList Component", (): void => {
  const mockSetDisplayAptList: jest.Mock<any, any, any> = jest.fn();
  const renderComponent = (): RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > =>
    render(
      <AptDataList
        {...{
          setDisplayAptList: mockSetDisplayAptList,
          data: {
            cpf: "12345678900",
            name: "John Doe",
            date: "2023-09-22",
            tel: "111-1111",
            email: "johndoe@example.com",
            typecons: "general",
            relstud: "Student A",
            relprof: "Prof B",
            notes: "None",
            confirm: "Yes",
          },
          btnId: "btn123",
          shouldDisplayAptList: true,
          userClass: "coordenador",
          isDirectRender: false,
        }}
      />,
    );
  test("renders appointment data correctly", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    expect(screen.getByText<HTMLTableCellElement>(/Registro de Consulta/i)).toBeInTheDocument() as void;
    expect(screen.getByText<HTMLTableCellElement>("John Doe")).toBeInTheDocument() as void;
    expect(screen.getByText<HTMLTableCellElement>("111-1111")).toBeInTheDocument() as void;
    expect(screen.getByText<HTMLTableCellElement>("johndoe@example.com")).toBeInTheDocument() as void;
    expect(screen.getByText<HTMLTableCellElement>("general")).toBeInTheDocument() as void;
  }) as void;
  test("calls setDisplayAptList when close button is clicked", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: "" })) as boolean;
    expect(mockSetDisplayAptList).toHaveBeenCalled() as void;
  }) as void;
  test("calls addExportFlags when export button is rendered", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: /Gerar Planilha/i })) as boolean;
    expect(addExportFlags).toHaveBeenCalled() as void;
  }) as void;
  test("renders the ErrorFallbackDlg when an error occurs", (): void => {
    jest.spyOn<Console, "warn">(console, "warn").mockImplementation((): void => {}) as jest.SpyInstance;
    consVariablesData.rootDlg = undefined;
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    expect(screen.getByText<HTMLDialogElement>(/ErrorFallbackDlg/i)).toBeInTheDocument() as void;
  }) as void;
}) as void;
