import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { handleEventReq } from "../../../../../lib/global/handlers/gHandlers";
import Street from "../../../../../../components/interactive/ag/Street";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleEventReq: jest.Mock<any, any, any>;
  } => ({
    handleEventReq: jest.fn(),
  })
) as typeof jest;
describe("Street", (): void => {
  it("renders a text input for street", (): void => {
    render(<Street />);
    expect(screen.getByRole<HTMLInputElement>("textbox")).toBeInTheDocument() as void;
  });
  it("calls handleEventReq on input", (): void => {
    render(<Street />);
    const input = screen.getByRole<HTMLInputElement>("textbox");
    userEvent.type(input, "Main Street");
    expect(handleEventReq).toHaveBeenCalledWith<Parameters<typeof handleEventReq>>(input) as void;
  });
});
