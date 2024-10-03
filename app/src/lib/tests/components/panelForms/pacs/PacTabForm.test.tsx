import { render, fireEvent, RenderResult } from "@testing-library/react";
import PacTabForm from "../../../../../../components/panelForms/pacs/PacTabForm";
jest.mock(
  "@/lib/global/gController",
  (): {
    addExportFlags: jest.Mock<any, any, any>;
  } => ({
    addExportFlags: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "@/lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
    extLine: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn() as jest.Mock,
    extLine: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "@/lib/global/gStyleScript",
  (): {
    normalizeSizeSb: jest.Mock<any, any, any>;
  } => ({
    normalizeSizeSb: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "@/lib/global/handlers/gHandlers",
  (): {
    syncAriaStates: jest.Mock<any, any, any>;
  } => ({
    syncAriaStates: jest.fn() as jest.Mock,
  }),
) as typeof jest;
describe("PacTabForm Component", (): void => {
  test("renders PacTabForm with default props", (): void => {
    (
      expect(
        (render(<PacTabForm userClass='estudante' />) as RenderResult).getByText(/Tabela de Pacientes Registrados/i),
      ) as jest.JestMatchers<HTMLElement>
    ).toBeInTheDocument() as void;
  }) as void;
  test("click on 'Gerar Planilha' button", (): void => {
    expect(
      fireEvent.click(
        (render(<PacTabForm userClass='estudante' />) as RenderResult).getByText(
          /Gerar Planilha/i,
        ) as HTMLButtonElement,
      ) as boolean,
    ).toBe<boolean>(true) as void;
  }) as void;
}) as void;
