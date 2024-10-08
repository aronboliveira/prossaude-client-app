import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactDlg from "../../../../../components/user/ContactDlg";
describe("ContactDlg", (): void => {
  it("renders the contact dialog", (): void => {
    render(<ContactDlg setContact={jest.fn() as jest.Mock} shouldDisplayContact={true} />);
    (
      expect(screen.getByText<HTMLFormElement>("Formulário de Contato")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("closes the dialog on close button click", async (): Promise<void> => {
    const setContact: jest.Mock<any, any, any> = jest.fn() as jest.Mock;
    render(<ContactDlg setContact={setContact} shouldDisplayContact={true} />);
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: /close/i })) as boolean;
    (await waitFor((): void => {
      (expect(setContact) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<Parameters<typeof setContact>>(
        false
      ) as void;
    })) as void;
  }) as void;
  it("validates and submits the form", async (): Promise<void> => {
    const setContact: jest.Mock<any, any, any> = jest.fn() as jest.Mock;
    render(<ContactDlg setContact={setContact} shouldDisplayContact={true} />);
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: /enviar/i })) as boolean;
    (await waitFor((): void => {
      (expect(setContact) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<Parameters<typeof setContact>>(
        false
      ) as void;
    })) as void;
  }) as void;
}) as void;
