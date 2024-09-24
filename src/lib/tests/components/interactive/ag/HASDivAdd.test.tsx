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
);
describe("HASDivAdd Component", (): void => {
  it("renders radio and checkbox options for hypertension stages", (): void => {
    render(<HASDivAdd />);
    expect(screen.getByLabelText<HTMLInputElement>("Pré-hipertensão")).toBeInTheDocument();
    expect(screen.getByLabelText<HTMLInputElement>("Hipertensão Estágio 1")).toBeInTheDocument();
    expect(screen.getByLabelText<HTMLInputElement>("Hipertensão Estágio 2")).toBeInTheDocument();
    expect(screen.getByLabelText<HTMLInputElement>("Hipertensão Estágio 3 | Em Crise")).toBeInTheDocument();
    expect(screen.getByLabelText<HTMLInputElement>("Hipertensão Primária | Essencial")).toBeInTheDocument();
    expect(screen.getByLabelText<HTMLInputElement>("Hipertensão Secundária")).toBeInTheDocument();
    expect(screen.getByLabelText<HTMLInputElement>("Hipertensão Resistente")).toBeInTheDocument();
    expect(screen.getByLabelText<HTMLInputElement>("Hipertensão Sistólica Isolada")).toBeInTheDocument();
    expect(screen.getByLabelText<HTMLInputElement>("Hipertensão Maligna")).toBeInTheDocument();
  });
  it("calls opRadioHandler on radio input keydown", async (): Promise<void> => {
    render(<HASDivAdd />);
    const radioInput = screen.getByLabelText<HTMLInputElement>("Pré-hipertensão");
    fireEvent.keyDown(radioInput, { key: "Enter" });
    await waitFor((): void => {
      expect(opRadioHandler).toHaveBeenCalled();
    });
  });
});
