import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { handleCondtReq } from "../../../../../lib/global/handlers/gHandlers";
import StreetNum from "../../../../../../components/interactive/ag/StreetNum";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleCondtReq: jest.Mock<any, any, any>;
  } => ({
    handleCondtReq: jest.fn(),
  })
) as typeof jest;
describe("StreetNum", (): void => {
  it("renders a number input for street number", (): void => {
    render(<StreetNum />);
    expect(screen.getByRole<HTMLElement>("spinbutton")).toBeInTheDocument() as void;
  });
  it("calls handleCondtReq on input", (): void => {
    render(<StreetNum />);
    const input = screen.getByRole<HTMLElement>("spinbutton");
    userEvent.type(input, "123");
    expect(handleCondtReq).toHaveBeenCalledWith<Parameters<typeof handleCondtReq>>(input, {
      min: 1,
      minNum: 0,
    });
  });
});
