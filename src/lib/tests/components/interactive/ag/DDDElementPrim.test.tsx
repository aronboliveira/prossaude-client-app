import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DDDElementPrim from "../../../../../../components/interactive/ag/DDDElementPrim";
import { handleEventReq } from "../../../../../lib/global/handlers/gHandlers";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleEventReq: jest.Mock<any, any, any>;
  } => ({
    handleEventReq: jest.fn(),
  })
);
describe("DDDElementPrim Component", (): void => {
  it("renders the DDD input field", (): void => {
    render(<DDDElementPrim />);
    expect(screen.getByLabelText<HTMLInputElement>("DDD Primário")).toBeInTheDocument();
  });
  it("calls handleEventReq on input", async (): Promise<void> => {
    render(<DDDElementPrim />);
    const input = screen.getByLabelText("DDD Primário") as HTMLInputElement;
    fireEvent.input(input, { target: { value: "11" } });
    await waitFor((): void => {
      expect(handleEventReq).toHaveBeenCalledWith<Parameters<typeof handleEventReq>>(input);
    });
  });
});
