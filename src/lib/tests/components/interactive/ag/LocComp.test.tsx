import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LocComp from "../../../../../../components/interactive/ag/LocComp";
import { handleCondtReq } from "../../../../../lib/global/handlers/gHandlers";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleCondtReq: jest.Mock<any, any, any>;
  } => ({
    handleCondtReq: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("LocComp", (): void => {
  it("renders a number input for location complement", (): void => {
    render(<LocComp />);
    const input = screen.getByRole<HTMLElement>("spinbutton");
    (expect(input) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
  }) as void;
  it("calls handleCondtReq on input", (): void => {
    render(<LocComp />);
    const input = screen.getByRole<HTMLElement>("spinbutton");
    userEvent.type(input, "5");
    (expect(handleCondtReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof handleCondtReq>
    >(input, {
      min: 1,
      minNum: 0,
    }) as void;
  }) as void;
}) as void;
