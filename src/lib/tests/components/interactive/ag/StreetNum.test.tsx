import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { handleCondtReq } from "../../../../../lib/global/handlers/gHandlers";
import StreetNum from "../../../../../../components/interactive/ag/StreetNum";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleCondtReq: jest.Mock<any, any, any>;
  } => ({
    handleCondtReq: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("StreetNum", (): void => {
  it("renders a number input for street number", (): void => {
    render(<StreetNum />);
    (
      expect(screen.getByRole<HTMLElement>("spinbutton")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("calls handleCondtReq on input", (): void => {
    render(<StreetNum />);
    const input = screen.getByRole<HTMLElement>("spinbutton");
    userEvent.type(input, "123");
    (expect(handleCondtReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof handleCondtReq>
    >(input, {
      min: 1,
      minNum: 0,
    }) as void;
  }) as void;
}) as void;
