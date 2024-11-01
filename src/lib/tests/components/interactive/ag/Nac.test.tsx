import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Nac from "../../../../../../components/interactive/ag/Nac";
import { handleEventReq } from "../../../../../lib/global/handlers/gHandlers";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleEventReq: jest.Mock<any, any, any>;
  } => ({
    handleEventReq: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("Nac", (): void => {
  it("renders a text input for country", (): void => {
    render(<Nac />);
    const input = screen.getByRole<HTMLInputElement>("textbox");
    (expect(input) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
  }) as void;
  it("calls handleEventReq on input", (): void => {
    render(<Nac />);
    const input = screen.getByRole<HTMLInputElement>("textbox");
    userEvent.type(input, "Brazil");
    (expect(handleEventReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof handleEventReq>
    >(input) as void;
  }) as void;
}) as void;
