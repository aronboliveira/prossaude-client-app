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
    formatTel: jest.fn(),
  })
);
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleEventReq: jest.Mock<any, any, any>;
  } => ({
    handleEventReq: jest.fn(),
  })
);
describe("TelPrim", (): void => {
  it("renders a text input for primary phone number", (): void => {
    render(<TelPrim />);
    expect(screen.getByRole<HTMLInputElement>("textbox")).toBeInTheDocument();
  });
  it("calls formatTel and handleEventReq on input", (): void => {
    render(<TelPrim />);
    const input = screen.getByRole<HTMLInputElement>("textbox");
    userEvent.type(input, "12345678");
    expect(formatTel).toHaveBeenCalledWith<Parameters<typeof formatTel>>(input, false);
    expect(handleEventReq).toHaveBeenCalledWith<Parameters<typeof handleEventReq>>(input);
  });
});
