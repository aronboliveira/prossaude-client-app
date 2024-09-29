import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Nat from "../../../../../../components/interactive/ag/Nat";
import { handleEventReq } from "../../../../../lib/global/handlers/gHandlers";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleEventReq: jest.Mock<any, any, any>;
  } => ({
    handleEventReq: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("Nat", (): void => {
  it("renders a text input for naturality", (): void => {
    render(<Nat />);
    (
      expect(screen.getByRole<HTMLInputElement>("textbox")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("calls handleEventReq on input", (): void => {
    render(<Nat />);
    const input = screen.getByRole<HTMLInputElement>("textbox");
    userEvent.type(input, "São Paulo");
    (expect(handleEventReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof handleEventReq>
    >(input) as void;
  }) as void;
}) as void;
