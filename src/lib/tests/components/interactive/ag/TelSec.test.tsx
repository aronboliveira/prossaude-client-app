import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { formatTel } from "../../../../../lib/global/gModel";
import { handleCondtReq } from "../../../../../lib/global/handlers/gHandlers";
import TelSec from "../../../../../../components/interactive/ag/TelSec";
jest.mock(
  "../../../../../lib/global/gModel",
  (): {
    formatTel: jest.Mock<any, any, any>;
  } => ({
    formatTel: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleCondtReq: jest.Mock<any, any, any>;
  } => ({
    handleCondtReq: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("TelSec", (): void => {
  it("renders a text input for secondary phone number", (): void => {
    render(<TelSec />);
    (
      expect(screen.getByRole<HTMLInputElement>("textbox")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("calls formatTel and handleCondtReq on input", (): void => {
    render(<TelSec />);
    const input = screen.getByRole<HTMLInputElement>("textbox");
    userEvent.type(input, "98765432");
    (expect(formatTel) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<Parameters<typeof formatTel>>(
      input,
      false
    );
    (expect(handleCondtReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof handleCondtReq>
    >(input, {
      min: 3,
      max: 10,
      pattern: ["9?d{4}-d{4}", "g"],
    }) as void;
  }) as void;
}) as void;
