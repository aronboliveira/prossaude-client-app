import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { handleCondtReq } from "../../../../../lib/global/handlers/gHandlers";
import TelCodeSec from "../../../../../../components/interactive/ag/TelCodeSec";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleCondtReq: jest.Mock<any, any, any>;
  } => ({
    handleCondtReq: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("TelCodeSec", (): void => {
  it("renders a number input for secondary country code", (): void => {
    render(<TelCodeSec />);
    (
      expect(screen.getByRole<HTMLElement>("spinbutton")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("calls handleCondtReq on input", (): void => {
    render(<TelCodeSec />);
    const input = screen.getByRole<HTMLElement>("spinbutton");
    userEvent.type(input, "44");
    (expect(handleCondtReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof handleCondtReq>
    >(input, {
      min: 1,
      max: 6,
      minNum: 1,
      maxNum: 999,
    }) as void;
  }) as void;
}) as void;
