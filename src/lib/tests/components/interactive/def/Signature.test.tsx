import { screen, render, fireEvent, RenderResult } from "@testing-library/react";
import { changeToAstDigit } from "../../../../../lib/global/handlers/gHandlers";
import Signature from "../../../../../../components/interactive/def/Signature";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    changeToAstDigit: jest.Mock<any, any, any>;
  } => ({
    changeToAstDigit: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "../../../../../lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
    extLine: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn() as jest.Mock,
    extLine: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("Signature Component", (): void => {
  test("renders canvas and allows drawing", (): void => {
    render(<Signature />) as RenderResult;
    const canvas = screen.getByRole("canvas", { name: /Assinatura do Paciente/i }) as HTMLCanvasElement;
    fireEvent.mouseDown(canvas, { clientX: 10, clientY: 10 }) as boolean;
    fireEvent.mouseMove(canvas, { clientX: 20, clientY: 20 }) as boolean;
    fireEvent.mouseUp(canvas) as boolean;
    (
      expect(canvas) as jest.JestMatchers<jest.SpyInstance> as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("calls changeToAstDigit on button click", (): void => {
    render(<Signature />) as RenderResult;
    const digitalSignBtn = screen.getByText<HTMLButtonElement>(/Usar Assinatura Digital/i);
    fireEvent.click(digitalSignBtn) as boolean;
    (
      expect(changeToAstDigit) as jest.JestMatchers<jest.SpyInstance> as jest.JestMatchers<jest.SpyInstance>
    ).toHaveBeenCalledWith<[HTMLButtonElement]>(digitalSignBtn);
  }) as void;
}) as void;
