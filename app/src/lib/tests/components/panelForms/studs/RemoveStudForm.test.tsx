import React from "react";
import { render, fireEvent, RenderResult } from "@testing-library/react";
import { addListenerExportBtn } from "../../../../global/gController";
import { handleFetch } from "../../../../../../../../pro-saude-app-vite/app/src/lib/locals/panelPage/handlers/handlers";
import RemoveStudForm from "../../../../../../components/panelForms/studs/RemoveStudForm";
jest.mock(
  "../../../../global/gController",
  (): {
    addListenerExportBtn: jest.Mock<any, any, any>;
  } => ({
    addListenerExportBtn: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock("../../../../../../../../pro-saude-app-vite/app/src/lib/locals/panelPage/handlers/handlers", () => ({
  handleFetch: jest.fn() as jest.Mock,
})) as typeof jest;
describe("RemoveStudForm Component", (): void => {
  test("renders form elements and table with headings", (): void => {
    const renderResult = render(<RemoveStudForm />) as RenderResult;
    (
      expect(
        renderResult.getByText(/Tabela de Estudantes Registrados/i) as HTMLTableElement,
      ) as jest.JestMatchers<HTMLElement>
    ).toBeInTheDocument() as void;
    (
      expect(
        renderResult.getByTitle(/Gere um .xlsx com os dados preenchidos/i) as HTMLButtonElement,
      ) as jest.JestMatchers<HTMLElement>
    ).toBeInTheDocument() as void;
    (
      expect(renderResult.getByText(/Nome/i) as HTMLTableCellElement) as jest.JestMatchers<HTMLElement>
    ).toBeInTheDocument() as void;
  }) as void;
  test("triggers export function on button click", (): void => {
    (
      expect(
        fireEvent.click(
          (render(<RemoveStudForm />) as RenderResult).getByTitle(
            /Gere um .xlsx com os dados preenchidos/i,
          ) as HTMLButtonElement,
        ) as boolean,
      ) as jest.JestMatchers<HTMLElement>
    ).toBe<boolean>(true) as void;
    (expect(addListenerExportBtn) as jest.JestMatchers<HTMLElement>).toHaveBeenCalledWith<
      Parameters<typeof addListenerExportBtn>
    >("tab_Estudantes", (expect as jest.Expect).anything(), (expect as jest.Expect).anything()) as void;
  }) as void;
  test("executes table fetch on render", async (): Promise<void> => {
    (handleFetch as jest.Mock).mockResolvedValueOnce([{ name: "Student1", tel: "12345" }]) as jest.Mock;
    (expect(handleFetch) as jest.JestMatchers<HTMLElement>).toHaveBeenCalledWith<Parameters<typeof handleFetch>>(
      "studs",
      "_table",
      true,
    ) as void;
    (
      expect(
        (await (render(<RemoveStudForm />) as RenderResult).findByText("Student1")) as HTMLTableCellElement,
      ) as jest.JestMatchers<HTMLElement>
    ).toBeInTheDocument() as void;
  }) as void;
}) as void;
