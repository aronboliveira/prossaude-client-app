import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import City from "../../../../../../components/interactive/ag/City";
import { handleEventReq } from "../../../../../lib/global/handlers/gHandlers";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleEventReq: jest.Mock<any, any, any>;
  } => ({
    handleEventReq: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("City Component", (): void => {
  it("renders the city input field", (): void => {
    render(<City />);
    (
      expect(screen.getByLabelText<HTMLInputElement>("Cidade")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("calls handleEventReq on input", async (): Promise<void> => {
    render(<City />);
    const input = screen.getByLabelText<HTMLInputElement>("Cidade");
    fireEvent.input(input, { target: { value: "São Paulo" } }) as boolean;
    (await waitFor((): void => {
      (expect(handleEventReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
        Parameters<typeof handleEventReq>
      >(input) as void;
    })) as void;
  }) as void;
}) as void;
