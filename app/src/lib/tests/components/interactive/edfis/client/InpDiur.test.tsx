import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { handleCondtReq } from "@/lib/global/handlers/gHandlers";
import InpDiur from "../../../../../../../components/interactive/edfis/client/InpDiur";
jest.mock(
  "@/lib/global/handlers/gHandlers",
  (): {
    handleCondtReq: jest.Mock<any, any, any>;
  } => ({
    handleCondtReq: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("InpDiur component", (): void => {
  beforeEach((): void => {
    jest.clearAllMocks() as typeof jest;
  }) as void;
  test("renders input element for Diuresis", (): void => {
    render(<InpDiur />) as RenderResult;
    (
      expect(screen.getByLabelText<HTMLInputElement>("Diurese")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("calls handleCondtReq on input event", (): void => {
    render(<InpDiur />) as RenderResult;
    const input = screen.getByLabelText<HTMLInputElement>("Diurese");
    fireEvent.input(input, { target: { value: "2000" } }) as boolean;
    (expect(handleCondtReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      [
        HTMLInputElement,
        {
          minNum: number;
          maxNum: number;
          min: number;
          max: number;
          pattern: string[];
        }
      ]
    >(input, {
      minNum: 0,
      maxNum: 9999,
      min: 1,
      max: 6,
      pattern: ["^d+$", ""],
    }) as void;
  }) as void;
}) as void;
