import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HASDivAdd from "../../../../../../components/interactive/ag/HASDivAdd";
import { opRadioHandler } from "../../../../../lib/global/handlers/gHandlers";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    opRadioHandler: jest.Mock<any, any, any>;
  } => ({
    opRadioHandler: jest.fn(),
  })
) as typeof jest;
describe("HASDivAdd Component", (): void => {
  it("renders radio and checkbox options for hypertension stages", (): void => {
    render(<HASDivAdd />);
    expect(screen.getByLabelText<HTMLInputElement>("Pré-hipertensão")).toBeInTheDocument() as void;
    expect(screen.getByLabelText<HTMLInputElement>("Hipertensão Estágio 1")).toBeInTheDocument() as void;
    expect(screen.getByLabelText<HTMLInputElement>("Hipertensão Estágio 2")).toBeInTheDocument() as void;
    expect(screen.getByLabelText<HTMLInputElement>("Hipertensão Estágio 3 | Em Crise")).toBeInTheDocument() as void;
    expect(screen.getByLabelText<HTMLInputElement>("Hipertensão Primária | Essencial")).toBeInTheDocument() as void;
    expect(screen.getByLabelText<HTMLInputElement>("Hipertensão Secundária")).toBeInTheDocument() as void;
    expect(screen.getByLabelText<HTMLInputElement>("Hipertensão Resistente")).toBeInTheDocument() as void;
    expect(screen.getByLabelText<HTMLInputElement>("Hipertensão Sistólica Isolada")).toBeInTheDocument() as void;
    expect(screen.getByLabelText<HTMLInputElement>("Hipertensão Maligna")).toBeInTheDocument() as void;
  });
  it("calls opRadioHandler on radio input keydown", async (): Promise<void> => {
    render(<HASDivAdd />);
    const radioInput = screen.getByLabelText<HTMLInputElement>("Pré-hipertensão");
    fireEvent.keyDown(radioInput, { key: "Enter" });
    await waitFor((): void => {
      expect(opRadioHandler).toHaveBeenCalled() as void;
    });
  });
});
