import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import AptDataList from "../../../../../components/lists/AptDataList";
import { consVariablesData } from "../../../../../components/consRegst/consVariables";
import { addListenerExportBtn } from "../../../../lib/global/gController";
import "@testing-library/jest-dom/extend-expect";
jest.mock(
  "../../../../../components/consRegst/ErrorFallbackDlg",
  (): (() => JSX.Element) => (): JSX.Element => <div>ErrorFallbackDlg</div>
);
jest.mock(
  "../../../../../lib/global/gController",
  (): {
    addListenerExportBtn: jest.Mock<any, any, any>;
  } => ({
    addListenerExportBtn: jest.fn(),
  })
);
jest.mock(
  "react-dom/client",
  (): {
    createRoot: jest.Mock<any, any, any>;
  } => ({
    createRoot: jest.fn().mockReturnValue({
      render: jest.fn(),
      unmount: jest.fn(),
    }),
  })
);
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
      />
    );
  test("renders appointment data correctly", async (): Promise<void> => {
    renderComponent();
    expect(screen.getByText<HTMLTableCellElement>(/Registro de Consulta/i)).toBeInTheDocument();
    expect(screen.getByText<HTMLTableCellElement>("John Doe")).toBeInTheDocument();
    expect(screen.getByText<HTMLTableCellElement>("111-1111")).toBeInTheDocument();
    expect(screen.getByText<HTMLTableCellElement>("johndoe@example.com")).toBeInTheDocument();
    expect(screen.getByText<HTMLTableCellElement>("general")).toBeInTheDocument();
  });
  test("calls setDisplayAptList when close button is clicked", async (): Promise<void> => {
    renderComponent();
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: "" }));
    expect(mockSetDisplayAptList).toHaveBeenCalled();
  });
  test("calls addListenerExportBtn when export button is rendered", async (): Promise<void> => {
    renderComponent();
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: /Gerar Planilha/i }));
    expect(addListenerExportBtn).toHaveBeenCalled();
  });
  test("renders the ErrorFallbackDlg when an error occurs", async (): Promise<void> => {
    jest.spyOn<Console, "warn">(console, "warn").mockImplementation((): void => {});
    consVariablesData.rootDlg = undefined;
    renderComponent();
    expect(screen.getByText<HTMLDialogElement>(/ErrorFallbackDlg/i)).toBeInTheDocument();
  });
});
