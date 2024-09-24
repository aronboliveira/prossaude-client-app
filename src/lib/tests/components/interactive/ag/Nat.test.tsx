import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Nat from "../../../../../../components/interactive/ag/Nat";
import { handleEventReq } from "../../../../../lib/global/handlers/gHandlers";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleEventReq: jest.Mock<any, any, any>;
  } => ({
    handleEventReq: jest.fn(),
  })
);
describe("Nat", (): void => {
  it("renders a text input for naturality", (): void => {
    render(<Nat />);
    expect(screen.getByRole<HTMLInputElement>("textbox")).toBeInTheDocument();
  });
  it("calls handleEventReq on input", (): void => {
    render(<Nat />);
    const input = screen.getByRole<HTMLInputElement>("textbox");
    userEvent.type(input, "São Paulo");
    expect(handleEventReq).toHaveBeenCalledWith<Parameters<typeof handleEventReq>>(input);
  });
});
