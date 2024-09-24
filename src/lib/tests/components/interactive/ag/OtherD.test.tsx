import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { opRadioHandler } from "../../../../../lib/global/handlers/gHandlers";
import OtherD from "../../../../../../components/interactive/ag/OtherD";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    opRadioHandler: jest.Mock<any, any, any>;
  } => ({
    opRadioHandler: jest.fn(),
  })
);
describe("OtherD", (): void => {
  it("renders a radio input for other diseases", (): void => {
    render(<OtherD />);
    expect(screen.getByRole<HTMLInputElement>("radio")).toBeInTheDocument();
  });
  it("calls opRadioHandler on keydown", (): void => {
    render(<OtherD />);
    const input = screen.getByRole<HTMLInputElement>("radio");
    userEvent.type(input, "{enter}");
    expect(opRadioHandler).toHaveBeenCalledWith<Parameters<typeof opRadioHandler>>(
      expect.any(Object),
      expect.any(Array)
    );
  });
});
