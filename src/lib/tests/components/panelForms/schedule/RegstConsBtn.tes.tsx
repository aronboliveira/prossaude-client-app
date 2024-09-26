import { render, fireEvent, RenderResult } from "@testing-library/react";
import { checkRegstBtn } from "@/lib/locals/panelPage/handlers/consHandlerCmn";
import RegstConsBtn from "../../../../../../components/panelForms/schedule/RegstConsBtn";
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
jest.mock(
  "@/lib/locals/panelPage/handlers/consHandlerCmn",
  (): {
    checkRegstBtn: jest.Mock<any, any, any>;
  } => ({
    checkRegstBtn: jest.fn(() => true) as jest.Mock,
  })
) as typeof jest;
describe("RegstConsBtn Component", (): void => {
  test("renders button and toggles FailRegstAlert", (): void => {
    const renderResult = render(
      <RegstConsBtn rootEl={null} secondOp='Arraste' userClass='coordenador' />
    ) as RenderResult;
    (
      expect(
        fireEvent.click(renderResult.getByText(/Agendar Consulta/i) as HTMLButtonElement) as boolean
      ) as jest.JestMatchers<HTMLElement>
    ).toBe<boolean>(true) as void;
    (
      expect(renderResult.getByText(/FailRegstAlert/i) as HTMLElement) as jest.JestMatchers<HTMLElement>
    ).toBeInTheDocument() as void;
  }) as void;
  test("checks registration button and toggles dialog", (): void => {
    fireEvent.click(
      (
        render(<RegstConsBtn rootEl={document.body} secondOp='Arraste' userClass='coordenador' />) as RenderResult
      ).getByText(/Agendar Consulta/i) as HTMLButtonElement
    ) as boolean;
    (expect(checkRegstBtn) as jest.JestMatchers<HTMLElement>).toHaveBeenCalled() as void;
  }) as void;
}) as void;
