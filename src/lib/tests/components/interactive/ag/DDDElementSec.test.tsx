import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DDDElementSec from "../../../../../../components/interactive/ag/DDDElementSec";
import { handleCondtReq } from "../../../../../lib/global/handlers/gHandlers";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleCondtReq: jest.Mock<any, any, any>;
  } => ({
    handleCondtReq: jest.fn(),
  })
);
describe("DDDElementSec Component", (): void => {
  it("renders the DDD secondary input field", (): void => {
    render(<DDDElementSec />);
    expect(screen.getByLabelText<HTMLInputElement>("DDD Secundário")).toBeInTheDocument();
  });
  it("calls handleCondtReq on input", async (): Promise<void> => {
    render(<DDDElementSec />);
    const input = screen.getByLabelText("DDD Secundário") as HTMLInputElement;
    fireEvent.input(input, { target: { value: "21" } });
    await waitFor((): void => {
      expect(handleCondtReq).toHaveBeenCalledWith<Parameters<typeof handleCondtReq>>(input, {
        min: 2,
        max: 4,
        minNum: 11,
        maxNum: 11,
        pattern: ["[0-9]{2,}", "g"],
      });
    });
  });
});
