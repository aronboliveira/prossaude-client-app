import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CPFElement from "../../../../../../components/interactive/ag/CPFElement";
import { formatCPF } from "../../../../../lib/global/gModel";
import { handleCondtReq } from "../../../../../lib/global/handlers/gHandlers";
jest.mock(
  "../../../../../lib/global/gModel",
  (): {
    formatCPF: jest.Mock<any, any, any>;
  } => ({
    formatCPF: jest.fn() as jest.Mock,
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
describe("CPFElement Component", (): void => {
  it("renders the CPF input field", (): void => {
    render(<CPFElement />);
    (
      expect(screen.getByPlaceholderText<HTMLInputElement>("Preencha com o CPF")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("calls formatCPF and handleCondtReq on input", async (): Promise<void> => {
    render(<CPFElement />);
    const input = screen.getByPlaceholderText<HTMLInputElement>("Preencha com o CPF");
    fireEvent.input(input, { target: { value: "123.456.789-00" } }) as boolean;
    (await waitFor((): void => {
      (expect(formatCPF) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<Parameters<typeof formatCPF>>(
        input
      );
      (expect(handleCondtReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
        Parameters<typeof handleCondtReq>
      >(input, {
        min: 1,
        max: 16,
        pattern: ["^(d{3}.){2}d{3}-d{2}$", ""],
      }) as void;
    })) as void;
  }) as void;
}) as void;
