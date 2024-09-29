import { render, fireEvent, RenderResult } from "@testing-library/react";
import { elementNotFound } from "@/lib/global/handlers/errorHandler";
import EraseAptBtn from "../../../../../../components/panelForms/schedule/EraseAptBtn";
jest.mock(
  "@/lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
    extLine: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn() as jest.Mock,
    extLine: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("EraseAptBtn Component", (): void => {
  test("renders button and toggles ExcludeConsDlg", (): void => {
    const renderResult = render(<EraseAptBtn userClass='coordenador' />) as RenderResult;
    const button = renderResult.getByTitle(/Remova o agendamento relativo/i) as HTMLButtonElement;
    (expect(fireEvent.click(button) as boolean) as jest.JestMatchers<HTMLElement>).toBe(true) as void;
    (
      expect(renderResult.queryByText(/Erro carregando botão de excluir/i)) as jest.JestMatchers<HTMLElement>
    ).toBeNull() as void;
    fireEvent.click(button) as boolean;
    (expect(renderResult.getByText(/ExcludeConsDlg/i)) as jest.JestMatchers<HTMLElement>).toBeInTheDocument() as void;
  }) as void;
  test("throws error if button reference is incorrect", (): void => {
    const button = (render(<EraseAptBtn userClass='estudante' />) as RenderResult).getByTitle(
      /Remova o agendamento relativo/i
    ) as HTMLButtonElement;
    button.closest = jest.fn((): null => null) as jest.Mock;
    fireEvent.click(button) as boolean;
    (expect(elementNotFound) as jest.JestMatchers<HTMLElement>).toHaveBeenCalledWith<
      Parameters<typeof elementNotFound>
    >(null, expect.anything(), expect.anything()) as void;
  }) as void;
}) as void;
