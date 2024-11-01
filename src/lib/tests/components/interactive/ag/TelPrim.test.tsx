import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { formatTel } from "../../../../../lib/global/gModel";
import { handleEventReq } from "../../../../../lib/global/handlers/gHandlers";
import TelPrim from "../../../../../../components/interactive/ag/TelPrim";
jest.mock(
  "../../../../../lib/global/gModel",
  (): {
    formatTel: jest.Mock<any, any, any>;
  } => ({
    formatTel: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleEventReq: jest.Mock<any, any, any>;
  } => ({
    handleEventReq: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("TelPrim", (): void => {
  it("renders a text input for primary phone number", (): void => {
    render(<TelPrim />);
    (
      expect(screen.getByRole<HTMLInputElement>("textbox")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("calls formatTel and handleEventReq on input", (): void => {
    render(<TelPrim />);
    const input = screen.getByRole<HTMLInputElement>("textbox");
    userEvent.type(input, "12345678");
    (expect(formatTel) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<Parameters<typeof formatTel>>(
      input,
      false
    ) as void;
    (expect(handleEventReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof handleEventReq>
    >(input) as void;
  }) as void;
}) as void;
