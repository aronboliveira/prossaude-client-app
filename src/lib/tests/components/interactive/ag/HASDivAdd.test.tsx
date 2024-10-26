import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HASDivAdd from "../../../../../../components/interactive/ag/HASDivAdd";
import { opRadioHandler } from "../../../../../lib/global/handlers/gHandlers";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    opRadioHandler: jest.Mock<any, any, any>;
  } => ({
    opRadioHandler: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("HASDivAdd Component", (): void => {
  it("renders radio and checkbox options for hypertension stages", (): void => {
    render(<HASDivAdd />);
    (
      expect(screen.getByLabelText<HTMLInputElement>("Pré-hipertensão")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByLabelText<HTMLInputElement>("Hipertensão Estágio 1")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByLabelText<HTMLInputElement>("Hipertensão Estágio 2")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(
        screen.getByLabelText<HTMLInputElement>("Hipertensão Estágio 3 | Em Crise")
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(
        screen.getByLabelText<HTMLInputElement>("Hipertensão Primária | Essencial")
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByLabelText<HTMLInputElement>("Hipertensão Secundária")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByLabelText<HTMLInputElement>("Hipertensão Resistente")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(
        screen.getByLabelText<HTMLInputElement>("Hipertensão Sistólica Isolada")
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByLabelText<HTMLInputElement>("Hipertensão Maligna")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("calls opRadioHandler on radio input keydown", async (): Promise<void> => {
    render(<HASDivAdd />);
    const radioInput = screen.getByLabelText<HTMLInputElement>("Pré-hipertensão");
    fireEvent.keyDown(radioInput, { key: "Enter" }) as boolean;
    (await waitFor((): void => {
      (expect(opRadioHandler) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    })) as void;
  }) as void;
}) as void;
