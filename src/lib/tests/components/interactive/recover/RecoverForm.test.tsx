import { render, screen, fireEvent, waitFor, RenderResult } from "@testing-library/react";
import { handleEventReq, validateForm } from "../../../../global/handlers/gHandlers";
import { handleSubmit } from "../../../../../pages/api/ts/handlers";
import RecoverForm from "../../../../../../components/interactive/recover/RecoverForm";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleEventReq: jest.Mock<any, any, any>;
    validateForm: jest.Mock<any, any, any>;
  } => ({
    handleEventReq: jest.fn() as jest.Mock,
    validateForm: jest.fn().mockResolvedValue([true, {}, { email: "test@test.com" }]) as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "../../../../pages/api/ts/handlers",
  (): {
    handleSubmit: jest.Mock<any, any, any>;
  } => ({
    handleSubmit: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock("../../../../../components/alerts/RecoverAlert", (): (() => React.JSX.Element) =>
  jest.fn((): React.JSX.Element => <div>RecoverAlert Component</div>)
) as typeof jest;
describe("RecoverForm Component", (): void => {
  it("should render the form and inputs correctly", (): void => {
    render(<RecoverForm />) as RenderResult;
    (
      expect(screen.getByText<HTMLInputElement>("Recuperação de Senha")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(
        screen.getByPlaceholderText<HTMLInputElement>("Digite aqui o seu e-mail")
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByText<HTMLButtonElement>("Enviar")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByText<HTMLButtonElement>("Retornar")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("should call handleEventReq when email input is changed", (): void => {
    render(<RecoverForm />) as RenderResult;
    const emailInput = screen.getByPlaceholderText<HTMLInputElement>("Digite aqui o seu e-mail") as HTMLInputElement;
    (
      expect(
        fireEvent.input(emailInput, { target: { value: "test@test.com" } }) as boolean
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBe(true) as void;
    (expect(handleEventReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof handleEventReq>
    >(emailInput) as void;
  }) as void;
  it("should prevent form submission and validate the form", async (): Promise<void> => {
    render(<RecoverForm />) as RenderResult;
    const submitButton = screen
      .getByText<HTMLButtonElement>("Enviar")
      .closest<HTMLButtonElement>("button") as HTMLButtonElement;
    const preventDefaultSpy = jest.fn() as jest.Mock;
    (
      expect(
        fireEvent.click(submitButton, { preventDefault: preventDefaultSpy }) as boolean
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBe(true) as void;
    await waitFor((): void => expect(validateForm).toHaveBeenCalled() as void);
    await waitFor((): void => expect(preventDefaultSpy).toHaveBeenCalled() as void);
  }) as void;
  it("should call handleSubmit when form is valid", async (): Promise<void> => {
    render(<RecoverForm />) as RenderResult;
    fireEvent.click(screen.getByText<HTMLButtonElement>("Enviar").closest("button") as HTMLButtonElement);
    await waitFor(
      (): void =>
        (expect(handleSubmit) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
          Parameters<typeof handleSubmit>
        >("recover", { email: "test@test.com" }, true) as void
    );
  }) as void;
  it("should render RecoverAlert when alert state is true", (): void => {
    render(<RecoverForm />) as RenderResult;
    fireEvent.click(screen.getByText<HTMLButtonElement>("Enviar").closest("button") as HTMLButtonElement);
    (
      expect(screen.getByText<HTMLElement>("RecoverAlert Component")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
}) as void;
