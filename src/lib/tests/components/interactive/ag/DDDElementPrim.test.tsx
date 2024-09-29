import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DDDElementPrim from "../../../../../../components/interactive/ag/DDDElementPrim";
import { handleEventReq } from "../../../../../lib/global/handlers/gHandlers";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleEventReq: jest.Mock<any, any, any>;
  } => ({
    handleEventReq: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("DDDElementPrim Component", (): void => {
  it("renders the DDD input field", (): void => {
    render(<DDDElementPrim />);
    (
      expect(screen.getByLabelText<HTMLInputElement>("DDD Primário")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("calls handleEventReq on input", async (): Promise<void> => {
    render(<DDDElementPrim />);
    const input = screen.getByLabelText<HTMLInputElement>("DDD Primário");
    fireEvent.input(input, { target: { value: "11" } }) as boolean;
    (await waitFor((): void => {
      (expect(handleEventReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
        Parameters<typeof handleEventReq>
      >(input) as void;
    })) as void;
  }) as void;
}) as void;
