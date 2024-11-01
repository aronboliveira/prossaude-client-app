import React from "react";
import { render, fireEvent, RenderResult } from "@testing-library/react";
//@ts-ignore
import { handleSubmit } from "@/pages/api/ts/handlers";
//@ts-ignore
import { formatCPF, addEmailExtension } from "@/lib/global/gModel";
import ProfForm from "../../../../../../components/panelForms/profs/ProfForm";
jest.mock(
  "@/lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
    extLine: jest.Mock<any, any, any>;
    inputNotFound: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn() as jest.Mock,
    extLine: jest.fn() as jest.Mock,
    inputNotFound: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "@/lib/global/gController",
  (): {
    addExportFlags: jest.Mock<any, any, any>;
  } => ({
    addExportFlags: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "@/lib/global/gModel",
  (): {
    formatCPF: jest.Mock<any, any, any>;
    formatTel: jest.Mock<any, any, any>;
    addEmailExtension: jest.Mock<any, any, any>;
  } => ({
    formatCPF: jest.fn() as jest.Mock,
    formatTel: jest.fn() as jest.Mock,
    addEmailExtension: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "@/pages/api/ts/handlers",
  (): {
    handleSubmit: jest.Mock<any, any, any>;
    validateForm: jest.Mock<any, any, any>;
  } => ({
    handleSubmit: jest.fn() as jest.Mock,
    validateForm: jest.fn() as jest.Mock,
  }),
) as typeof jest;
describe("ProfForm Component", (): void => {
  test("renders form and calls appropriate handlers", (): void => {
    const renderResult = render(<ProfForm mainRoot={undefined} userClass='estudante' />) as RenderResult,
      nameInput = renderResult.getByLabelText(/Nome Completo:/i) as HTMLInputElement;
    fireEvent.input(nameInput, { target: { value: "John Doe" } }) as boolean;
    (expect(nameInput.value) as jest.JestMatchers<jest.SpyInstance>).toBe<string>("John Doe") as void;
    const cpfInput = renderResult.getByLabelText(/CPF:/i) as HTMLInputElement;
    fireEvent.input(cpfInput, { target: { value: "123.456.789-09" } }) as boolean;
    (expect(formatCPF) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<Parameters<typeof formatCPF>>(
      cpfInput,
    ) as void;
    const submitButton = renderResult.getByText(/Finalizar Cadastro/i) as HTMLButtonElement;
    (expect(fireEvent.click(submitButton) as boolean) as jest.JestMatchers<jest.SpyInstance>).toBe<boolean>(
      true,
    ) as void;
  }) as void;
  test("calls autofill and autocorrect handlers", (): void => {
    fireEvent.click(
      (render(<ProfForm mainRoot={undefined} userClass='coordenador' />) as RenderResult).getByTitle(
        "Autopreenchimento(Profissional)",
      ) as HTMLInputElement,
    );
    (expect(addEmailExtension) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("validates form on submission", (): void => {
    (
      expect(
        fireEvent.submit(
          (render(<ProfForm mainRoot={undefined} userClass='coordenador' />) as RenderResult).getByRole(
            "form",
          ) as HTMLFormElement,
        ) as boolean,
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBe(true) as void;
    (expect(handleSubmit) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<Parameters<typeof handleSubmit>>(
      "profs",
      (expect as jest.Expect).anything() as any,
      true,
    ) as void;
  }) as void;
}) as void;
