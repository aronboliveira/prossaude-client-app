import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserPropsDlg from "../../../../..//components/user/UserPropsDlg";
import { validateForm, syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { addEmailExtension, autoCapitalizeInputs, formatTel } from "@/lib/global/gModel";
jest.mock(
  "@/lib/global/handlers/gHandlers",
  (): {
    validateForm: jest.Mock<Promise<boolean[]>, [], any>;
    syncAriaStates: jest.Mock<any, any, any>;
  } => ({
    validateForm: jest.fn((): Promise<[true]> => Promise.resolve([true])),
    syncAriaStates: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "@/lib/global/gModel",
  (): {
    addEmailExtension: jest.Mock<any, any, any>;
    autoCapitalizeInputs: jest.Mock<any, any, any>;
    formatTel: jest.Mock<any, any, any>;
  } => ({
    addEmailExtension: jest.fn() as jest.Mock,
    autoCapitalizeInputs: jest.fn() as jest.Mock,
    formatTel: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("UserPropsDlg", (): void => {
  const defaultProps = {
    setPropDlg: jest.fn() as jest.Mock,
    shouldDisplayPropDlg: true,
  };
  it("renders the UserPropsDlg component", (): void => {
    render(<UserPropsDlg {...defaultProps} />);
    expect(screen.getByText<HTMLFormElement>("Formulário de Alteração")).toBeInTheDocument() as void;
  }) as void;
  it("closes the dialog when the close button is clicked", async (): Promise<void> => {
    render(<UserPropsDlg {...defaultProps} />);
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: /close/i })) as boolean;
    (await waitFor((): void => {
      expect(defaultProps.setPropDlg).toHaveBeenCalledWith<Parameters<typeof defaultProps.setPropDlg>>(false) as void;
    })) as void;
  }) as void;
  it("calls syncAriaStates on mount", async (): Promise<void> => {
    render(<UserPropsDlg {...defaultProps} />);
    (await waitFor((): void => {
      expect(syncAriaStates).toHaveBeenCalled() as void;
    })) as void;
  }) as void;
  it("changes the input type to email and adds email extension", async (): Promise<void> => {
    render(<UserPropsDlg {...defaultProps} />);
    fireEvent.change(screen.getByLabelText<HTMLLabelElement>("Opções de Alteração:"), {
      target: { value: "userEmail" },
    });
    fireEvent.input(screen.getByPlaceholderText<HTMLInputElement>("Insira aqui o novo valor")) as boolean;
    (await waitFor((): void => {
      expect(addEmailExtension).toHaveBeenCalled() as void;
    })) as void;
  }) as void;
  it("changes the input type to telephone and formats the input", async (): Promise<void> => {
    render(<UserPropsDlg {...defaultProps} />);
    fireEvent.change(screen.getByLabelText<HTMLLabelElement>("Opções de Alteração:"), {
      target: { value: "userTel" },
    });
    fireEvent.input(screen.getByPlaceholderText<HTMLInputElement>("Insira aqui o novo valor")) as boolean;
    (await waitFor((): void => {
      expect(formatTel).toHaveBeenCalled() as void;
    })) as void;
  }) as void;
  it("validates the form and submits the new property", async (): Promise<void> => {
    render(<UserPropsDlg {...defaultProps} />);
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: /enviar/i })) as boolean;
    (await waitFor((): void => {
      expect(validateForm).toHaveBeenCalled() as void;
      expect(defaultProps.setPropDlg).toHaveBeenCalledWith<Parameters<typeof defaultProps.setPropDlg>>(false) as void;
    })) as void;
  }) as void;
  it("autocapitalizes the input when changing the user name", async (): Promise<void> => {
    render(<UserPropsDlg {...defaultProps} />);
    fireEvent.change(screen.getByLabelText<HTMLLabelElement>("Opções de Alteração:"), {
      target: { value: "userName" },
    });
    const nameInput = screen.getByPlaceholderText<HTMLLabelElement>("Insira aqui o novo valor");
    fireEvent.input(nameInput) as boolean;
    (await waitFor((): void => {
      expect(autoCapitalizeInputs).toHaveBeenCalledWith<Parameters<typeof autoCapitalizeInputs>>(nameInput) as void;
    })) as void;
  }) as void;
}) as void;
