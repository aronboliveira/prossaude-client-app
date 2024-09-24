import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Nac from "../../../../../../components/interactive/ag/Nac";
import { handleEventReq } from "../../../../../lib/global/handlers/gHandlers";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleEventReq: jest.Mock<any, any, any>;
  } => ({
    handleEventReq: jest.fn(),
  })
);
describe("Nac", (): void => {
  it("renders a text input for country", (): void => {
    render(<Nac />);
    const input = screen.getByRole<HTMLInputElement>("textbox");
    expect(input).toBeInTheDocument();
  });
  it("calls handleEventReq on input", (): void => {
    render(<Nac />);
    const input = screen.getByRole<HTMLInputElement>("textbox");
    userEvent.type(input, "Brazil");
    expect(handleEventReq).toHaveBeenCalledWith<Parameters<typeof handleEventReq>>(input);
  });
});
