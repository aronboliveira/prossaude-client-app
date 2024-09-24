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
    syncAriaStates: jest.fn(),
  })
);
jest.mock(
  "@/lib/global/gModel",
  (): {
    addEmailExtension: jest.Mock<any, any, any>;
    autoCapitalizeInputs: jest.Mock<any, any, any>;
    formatTel: jest.Mock<any, any, any>;
  } => ({
    addEmailExtension: jest.fn(),
    autoCapitalizeInputs: jest.fn(),
    formatTel: jest.fn(),
  })
);
describe("UserPropsDlg", (): void => {
  const defaultProps = {
    setPropDlg: jest.fn(),
    shouldDisplayPropDlg: true,
  };
  it("renders the UserPropsDlg component", (): void => {
    render(<UserPropsDlg {...defaultProps} />);
    expect(screen.getByText<HTMLFormElement>("Formulário de Alteração")).toBeInTheDocument();
  });
  it("closes the dialog when the close button is clicked", async (): Promise<void> => {
    render(<UserPropsDlg {...defaultProps} />);
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: /close/i }));
    await waitFor((): void => {
      expect(defaultProps.setPropDlg).toHaveBeenCalledWith<Parameters<typeof defaultProps.setPropDlg>>(false);
    });
  });
  it("calls syncAriaStates on mount", async (): Promise<void> => {
    render(<UserPropsDlg {...defaultProps} />);
    await waitFor((): void => {
      expect(syncAriaStates).toHaveBeenCalled();
    });
  });
  it("changes the input type to email and adds email extension", async (): Promise<void> => {
    render(<UserPropsDlg {...defaultProps} />);
    fireEvent.change(screen.getByLabelText<HTMLLabelElement>("Opções de Alteração:"), {
      target: { value: "userEmail" },
    });
    fireEvent.input(screen.getByPlaceholderText<HTMLInputElement>("Insira aqui o novo valor"));
    await waitFor((): void => {
      expect(addEmailExtension).toHaveBeenCalled();
    });
  });
  it("changes the input type to telephone and formats the input", async (): Promise<void> => {
    render(<UserPropsDlg {...defaultProps} />);
    fireEvent.change(screen.getByLabelText<HTMLLabelElement>("Opções de Alteração:"), {
      target: { value: "userTel" },
    });
    fireEvent.input(screen.getByPlaceholderText<HTMLInputElement>("Insira aqui o novo valor"));
    await waitFor(() => {
      expect(formatTel).toHaveBeenCalled();
    });
  });
  it("validates the form and submits the new property", async (): Promise<void> => {
    render(<UserPropsDlg {...defaultProps} />);
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: /enviar/i }));
    await waitFor((): void => {
      expect(validateForm).toHaveBeenCalled();
      expect(defaultProps.setPropDlg).toHaveBeenCalledWith<Parameters<typeof defaultProps.setPropDlg>>(false);
    });
  });
  it("autocapitalizes the input when changing the user name", async (): Promise<void> => {
    render(<UserPropsDlg {...defaultProps} />);
    fireEvent.change(screen.getByLabelText<HTMLLabelElement>("Opções de Alteração:"), {
      target: { value: "userName" },
    });
    const nameInput = screen.getByPlaceholderText<HTMLLabelElement>("Insira aqui o novo valor");
    fireEvent.input(nameInput);
    await waitFor((): void => {
      expect(autoCapitalizeInputs).toHaveBeenCalledWith<Parameters<typeof autoCapitalizeInputs>>(nameInput);
    });
  });
});
