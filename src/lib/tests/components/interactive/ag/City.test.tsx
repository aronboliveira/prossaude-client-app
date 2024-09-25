import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import City from "../../../../../../components/interactive/ag/City";
import { handleEventReq } from "../../../../../lib/global/handlers/gHandlers";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleEventReq: jest.Mock<any, any, any>;
  } => ({
    handleEventReq: jest.fn(),
  })
) as typeof jest;
describe("City Component", (): void => {
  it("renders the city input field", (): void => {
    render(<City />);
    expect(screen.getByLabelText<HTMLInputElement>("Cidade")).toBeInTheDocument() as void;
  });
  it("calls handleEventReq on input", async (): Promise<void> => {
    render(<City />);
    const input = screen.getByLabelText<HTMLInputElement>("Cidade");
    fireEvent.input(input, { target: { value: "São Paulo" } });
    await waitFor((): void => {
      expect(handleEventReq).toHaveBeenCalledWith<Parameters<typeof handleEventReq>>(input) as void;
    });
  });
});
