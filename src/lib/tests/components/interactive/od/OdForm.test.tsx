import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import OdForm from "../../../../../../components/interactive/od/OdForm";
import { validateForm } from "../../../../global/handlers/gHandlers";
import { handleSubmit } from "../../../../locals/panelPage/handlers/handlers";
jest.mock("../../../../locals/panelPage/handlers/handlers", () => ({
  validateForm: jest.fn(),
}));
jest.mock("../../../../global/handlers/gHandlers", () => ({
  handleSubmit: jest.fn(),
}));
describe("OdForm component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders the form with all the required fields and sections", () => {
    render(<OdForm />);
    expect(screen.getByRole("form", { name: /od_form/i })).toBeInTheDocument();
    expect(screen.getByText("Identificação")).toBeInTheDocument();
    expect(screen.getByText("Inspeção da Boca e da Face")).toBeInTheDocument();
    expect(screen.getByText("Avaliação Dentária")).toBeInTheDocument();
    expect(screen.getByText("Plano de Tratamento")).toBeInTheDocument();
  });
  it("calls validateForm and handleSubmit on form submission when valid", async () => {
    (validateForm as jest.Mock).mockResolvedValue([true, {}, "mockedFormData"]);
    render(<OdForm />);
    fireEvent.submit(screen.getByRole("form", { name: /od_form/i }));
    await waitFor(() => {
      expect(validateForm).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith("od", "mockedFormData", true);
    });
  });
  it("prevents form submission if validation fails", async () => {
    (validateForm as jest.Mock).mockResolvedValue([false, {}, null]);
    render(<OdForm />);
    fireEvent.submit(screen.getByRole("form", { name: /od_form/i }));
    await waitFor(() => {
      expect(validateForm).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });
  it('allows filling in the "Plano de Tratamento" textarea', () => {
    render(<OdForm />);
    const treatmentPlanTextarea = screen.getByPlaceholderText("Escreva o Plano de Tratamento aqui");
    userEvent.type(treatmentPlanTextarea, "Plano de Tratamento Teste");
    expect(treatmentPlanTextarea).toHaveValue("Plano de Tratamento Teste");
  });
  it("allows filling in the form identification fields", () => {
    render(<OdForm />);
    const nameInput = screen.getByLabelText(/Nome completo/i);
    const socialNameInput = screen.getByLabelText(/Nome social/i);
    userEvent.type(nameInput, "John Doe");
    userEvent.type(socialNameInput, "JD");
    expect(nameInput).toHaveValue("John Doe");
    expect(socialNameInput).toHaveValue("JD");
  });
  it('renders "Inspeção da Boca e da Face" section with the correct elements', () => {
    render(<OdForm />);
    expect(screen.getByText("Inspeção da Boca e da Face")).toBeInTheDocument();
    expect(screen.getByText("Lábios e Mucosa Labial")).toBeInTheDocument();
  });
  it('renders the "Avaliação Dentária" section with quadrant fields', () => {
    render(<OdForm />);
    expect(screen.getByText("Avaliação Dentária")).toBeInTheDocument();
    expect(screen.getByText("SupDir")).toBeInTheDocument();
    expect(screen.getByText("SupEsq")).toBeInTheDocument();
    expect(screen.getByText("InfDir")).toBeInTheDocument();
    expect(screen.getByText("InfEsq")).toBeInTheDocument();
  });
});
