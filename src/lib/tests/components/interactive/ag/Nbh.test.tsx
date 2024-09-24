import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Nbh from "../../../../../../components/interactive/ag/Nbh";
import { handleEventReq } from "../../../../../lib/global/handlers/gHandlers";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleEventReq: jest.Mock<any, any, any>;
  } => ({
    handleEventReq: jest.fn(),
  })
);
describe("Nbh", (): void => {
  it("renders a text input for neighbourhood", (): void => {
    render(<Nbh />);
    expect(screen.getByRole<HTMLInputElement>("textbox")).toBeInTheDocument();
  });
  it("calls handleEventReq on input", (): void => {
    render(<Nbh />);
    const input = screen.getByRole<HTMLInputElement>("textbox");
    userEvent.type(input, "Jardins");
    expect(handleEventReq).toHaveBeenCalledWith<Parameters<typeof handleEventReq>>(input);
  });
});
