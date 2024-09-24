import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { handleCondtReq } from "../../../../../lib/global/handlers/gHandlers";
import TelCodePrim from "../../../../../../components/interactive/ag/TelCodePrim";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleCondtReq: jest.Mock<any, any, any>;
  } => ({
    handleCondtReq: jest.fn(),
  })
);
describe("TelCodePrim", (): void => {
  it("renders a number input for country code", (): void => {
    render(<TelCodePrim />);
    expect(screen.getByRole<HTMLElement>("spinbutton")).toBeInTheDocument();
  });
  it("calls handleCondtReq on input", (): void => {
    render(<TelCodePrim />);
    const input = screen.getByRole<HTMLElement>("spinbutton");
    userEvent.type(input, "55");
    expect(handleCondtReq).toHaveBeenCalledWith<Parameters<typeof handleCondtReq>>(input, {
      min: 1,
      max: 6,
      minNum: 1,
      maxNum: 999,
    });
  });
});
