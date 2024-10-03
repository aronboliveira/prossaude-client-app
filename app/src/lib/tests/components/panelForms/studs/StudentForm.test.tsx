import { render, fireEvent, RenderResult } from "@testing-library/react";
import { addExportFlags } from "@/lib/global/gController";
import { autoCapitalizeInputs } from "@/lib/global/gModel";
import StudentForm from "../../../../../../components/panelForms/studs/StudentForm";
jest.mock(
  "@/lib/global/gController",
  (): {
    addExportFlags: jest.Mock<any, any, any>;
  } => ({
    addExportFlags: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "@/pages/api/ts/handlers",
  (): {
    handleSubmit: jest.Mock<any, any, any>;
  } => ({
    handleSubmit: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "@/lib/global/gModel",
  (): {
    autoCapitalizeInputs: jest.Mock<any, any, any>;
    formatCPF: jest.Mock<any, any, any>;
    formatTel: jest.Mock<any, any, any>;
  } => ({
    autoCapitalizeInputs: jest.fn() as jest.Mock,
    formatCPF: jest.fn() as jest.Mock,
    formatTel: jest.fn() as jest.Mock,
  }),
) as typeof jest;
describe("StudentForm Component", (): void => {
  test("renders student form", (): void => {
    const renderResult = render(<StudentForm mainRoot={undefined} userClass='coordenador' />) as RenderResult;
    (
      expect(renderResult.getByText(/Cadastro de Aluno/i) as HTMLElement) as jest.JestMatchers<HTMLElement>
    ).toBeInTheDocument() as void;
    (
      expect(renderResult.getByText(/Nome Completo/i) as HTMLElement) as jest.JestMatchers<HTMLElement>
    ).toBeInTheDocument() as void;
  }) as void;
  test("autoCapitalizeInputs is called on name input", (): void => {
    (
      expect(
        fireEvent.input(
          (render(<StudentForm mainRoot={undefined} userClass='coordenador' />) as RenderResult).getByPlaceholderText(
            /Preencha com o nome completo/i,
          ) as HTMLInputElement,
          { target: { value: "john doe" } },
        ) as boolean,
      ) as jest.JestMatchers<HTMLElement>
    ).toBe(true) as void;
    (expect(autoCapitalizeInputs) as jest.JestMatchers<HTMLElement>).toHaveBeenCalledWith<
      Parameters<typeof autoCapitalizeInputs>
    >((expect as jest.Expect).anything()) as void;
  }) as void;
  test("triggers export on button click", (): void => {
    (
      expect(
        fireEvent.click(
          (render(<StudentForm mainRoot={undefined} userClass='coordenador' />) as RenderResult).getByTitle(
            /Gere um .xlsx com os dados preenchidos/i,
          ) as HTMLButtonElement,
        ) as boolean,
      ) as jest.JestMatchers<HTMLElement>
    ).toBe<boolean>(true) as void;
    (expect(addExportFlags) as jest.JestMatchers<HTMLElement>).toHaveBeenCalledWith<Parameters<typeof addExportFlags>>(
      "novoEstudante",
      (expect as jest.Expect).anything(),
      (expect as jest.Expect).anything(),
    ) as void;
  }) as void;
}) as void;
