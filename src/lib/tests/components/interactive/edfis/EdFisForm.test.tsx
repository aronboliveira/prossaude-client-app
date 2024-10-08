import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ENForm from "../../../../../../components/interactive/edfis/ENForm";
import { handleSubmit } from "../../../../locals/panelPage/handlers/handlers";
import { validateForm } from "../../../../global/handlers/gHandlers";
jest.mock("../../../../global/handlers/gHandlers", () => ({
  validateForm: jest.fn(),
}));
jest.mock("../../../../locals/panelPage/handlers/handlers", () => ({
  handleSubmit: jest.fn(),
}));
describe("ENForm component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders the form with correct elements", () => {
    render(<ENForm />);
    expect(screen.getByRole("form", { name: /ed_form/i })).toBeInTheDocument();
    expect(screen.getByText("Identificação")).toBeInTheDocument();
    expect(screen.getByText("Hábitos Rotineiros — Alimentação")).toBeInTheDocument();
    expect(screen.getByText("Hábitos Rotineiros — Excreção")).toBeInTheDocument();
    expect(screen.getByText("Progresso em Consultas")).toBeInTheDocument();
  });
  it("validates the form on submit", async () => {
    (validateForm as jest.Mock).mockResolvedValue([true, {}, "mockedFormData"]);
    render(<ENForm />);
    fireEvent.submit(screen.getByRole("form", { name: /ed_form/i }));
    await waitFor(() => {
      expect(validateForm).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith("ed", "mockedFormData", true);
    });
  });
  it("prevents submission if validation fails", async () => {
    (validateForm as jest.Mock).mockResolvedValue([false, {}, null]);
    render(<ENForm />);
    fireEvent.submit(screen.getByRole("form", { name: /ed_form/i }));
    await waitFor(() => {
      expect(validateForm).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });
  it("allows filling in form fields correctly", () => {
    render(<ENForm />);
    const nameInput = screen.getByLabelText(/Nome completo/i);
    userEvent.type(nameInput, "John Doe");
    expect(nameInput).toHaveValue("John Doe");
    const socialNameInput = screen.getByLabelText(/Nome social/i);
    userEvent.type(socialNameInput, "JD");
    expect(socialNameInput).toHaveValue("JD");
    const ageInput = screen.getByLabelText(/Idade/i);
    userEvent.type(ageInput, "25");
    expect(ageInput).toHaveValue(25);
  });
});
