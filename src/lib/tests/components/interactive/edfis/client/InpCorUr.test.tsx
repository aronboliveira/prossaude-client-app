import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { handleEventReq } from "../../../../../global/handlers/gHandlers";
import InpCorUr from "../../../../../../../components/interactive/edfis/client/InpCorUr";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleEventReq: jest.Mock<any, any, any>;
  } => ({
    handleEventReq: jest.fn(),
  })
) as typeof jest;
describe("InpCorUr component", (): void => {
  beforeEach((): void => {
    jest.clearAllMocks() as typeof jest;
  }) as void;
  test("renders input element for Urine Color", (): void => {
    render(<InpCorUr />) as RenderResult;
    (
      expect(screen.getByLabelText<HTMLInputElement>("Urina (Coloração)")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("calls handleEventReq on input event", (): void => {
    render(<InpCorUr />) as RenderResult;
    const input = screen.getByLabelText<HTMLInputElement>("Urina (Coloração)");
    fireEvent.input(input, { target: { value: "amarelo-claro" } }) as boolean;
    (expect(handleEventReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof handleEventReq>
    >(input) as void;
  }) as void;
}) as void;
