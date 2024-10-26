import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import AgForm from "../../../../../../components/interactive/ag/AgForm";
import { validateForm } from "../../../../global/handlers/gHandlers";
import { handleSubmit } from "../../../../locals/panelPage/handlers/handlers";
jest.mock("../../../../global/handlers/gHandlers", () => ({
  validateForm: jest.fn(),
}));
jest.mock("../../../../locals/panelPage/handlers/handlers", () => ({
  handleSubmit: jest.fn(),
}));
describe("AgForm component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders the form with all the required fields and sections", () => {
    render(<AgForm />);
    expect(screen.getByRole("form", { name: /ag_form/i })).toBeInTheDocument();
    expect(screen.getByText("Identificação")).toBeInTheDocument();
    expect(screen.getByText("Dados de Saúde Geral")).toBeInTheDocument();
    expect(screen.getByText("Possíveis Doenças")).toBeInTheDocument();
    expect(screen.getByText("Frequências de Rotina")).toBeInTheDocument();
  });
  it("calls validateForm and handleSubmit on form submission when valid", async () => {
    (validateForm as jest.Mock).mockResolvedValue([true, {}, "mockedFormData"]);
    render(<AgForm />);
    fireEvent.submit(screen.getByRole("form", { name: /ag_form/i }));
    await waitFor(() => {
      expect(validateForm).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith("ag", "mockedFormData", true);
    });
  });
  it("prevents form submission if validation fails", async () => {
    (validateForm as jest.Mock).mockResolvedValue([false, {}, null]);
    render(<AgForm />);
    fireEvent.submit(screen.getByRole("form", { name: /ag_form/i }));
    await waitFor(() => {
      expect(validateForm).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });
  it('allows filling in the "CPF" field', () => {
    render(<AgForm />);
    const cpfInput = screen.getByLabelText(/CPF/i);
    userEvent.type(cpfInput, "12345678901");
    expect(cpfInput).toHaveValue("12345678901");
  });
  it('allows selecting "Status" from the dropdown', () => {
    render(<AgForm />);
    const statusDropdown = screen.getByLabelText(/Status/i);
    userEvent.selectOptions(statusDropdown, "emergência");
    expect(statusDropdown).toHaveValue("emergência");
  });
  it('renders "Frequências de Rotina" section with correct elements', () => {
    render(<AgForm />);
    expect(screen.getByText("Frequências de Rotina")).toBeInTheDocument();
    expect(screen.getByLabelText("Escovações por dia:")).toBeInTheDocument();
    expect(screen.getByLabelText("Uso de Fio Dental por dia:")).toBeInTheDocument();
    expect(screen.getByLabelText("Uso de Enxaguante Bucal por dia:")).toBeInTheDocument();
  });
  it('allows filling in "Escovações por dia"', () => {
    render(<AgForm />);
    const brushingInput = screen.getByLabelText("Escovações por dia:");
    userEvent.type(brushingInput, "3");
    expect(brushingInput).toHaveValue(3);
  });
  it('allows filling in "Queixa Principal" field', () => {
    render(<AgForm />);
    const complaintTextarea = screen.getByLabelText(/Queixa Principal/i);
    userEvent.type(complaintTextarea, "Dor de cabeça frequente");
    expect(complaintTextarea).toHaveValue("Dor de cabeça frequente");
  });
});
