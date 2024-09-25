import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactDlg from "../../../../../components/user/ContactDlg";
describe("ContactDlg", (): void => {
  it("renders the contact dialog", (): void => {
    render(<ContactDlg setContact={jest.fn()} shouldDisplayContact={true} />);
    expect(screen.getByText<HTMLFormElement>("Formulário de Contato")).toBeInTheDocument() as void;
  });
  it("closes the dialog on close button click", async (): Promise<void> => {
    const setContact: jest.Mock<any, any, any> = jest.fn();
    render(<ContactDlg setContact={setContact} shouldDisplayContact={true} />);
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: /close/i }));
    await waitFor((): void => {
      expect(setContact).toHaveBeenCalledWith<Parameters<typeof setContact>>(false) as void;
    });
  });
  it("validates and submits the form", async (): Promise<void> => {
    const setContact: jest.Mock<any, any, any> = jest.fn();
    render(<ContactDlg setContact={setContact} shouldDisplayContact={true} />);
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: /enviar/i }));
    await waitFor((): void => {
      expect(setContact).toHaveBeenCalledWith<Parameters<typeof setContact>>(false) as void;
    });
  });
});
