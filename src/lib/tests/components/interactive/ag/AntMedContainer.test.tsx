import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import AntMedContainer from "../../../../../../components/interactive/ag/AntMedContainer";
describe("AntMedContainer component", () => {
  it("should render the component without errors", (): void => {
    render(<AntMedContainer />);
    const container = screen.getByRole("group", { name: /antMedContainer/i });
    expect(container).toBeInTheDocument();
    const inputName = screen.getByLabelText(/1\)/),
      inputDateStart = screen.getByLabelText("Início de Tratamento 1"),
      inputDateEnd = screen.getByLabelText("Término de Tratamento 1"),
      currentDateButton = screen.getByRole("button", { name: /usar data atual/i });
    expect(inputName).toBeInTheDocument();
    expect(inputDateStart).toBeInTheDocument();
    expect(inputDateEnd).toBeInTheDocument();
    expect(currentDateButton).toBeInTheDocument();
  });
  it("should allow typing in the name and date inputs", (): void => {
    render(<AntMedContainer />);
    const inputName = screen.getByLabelText(/1\)/),
      inputDateStart = screen.getByLabelText("Início de Tratamento 1"),
      inputDateEnd = screen.getByLabelText("Término de Tratamento 1");
    fireEvent.change(inputName, { target: { value: "Test Treatment" } });
    fireEvent.change(inputDateStart, { target: { value: "2024-09-25" } });
    fireEvent.change(inputDateEnd, { target: { value: "2024-09-30" } });
    expect(inputName).toHaveValue("Test Treatment");
    expect(inputDateStart).toHaveValue("2024-09-25");
    expect(inputDateEnd).toHaveValue("2024-09-30");
  });
  it('should trigger the "Use current date" button', (): void => {
    render(<AntMedContainer />);
    const currentDateButton = screen.getByRole("button", { name: /usar data atual/i }),
      inputDateEnd = screen.getByLabelText("Término de Tratamento 1"),
      today = new Date().toISOString().slice(0, 10);
    userEvent.click(currentDateButton);
    expect(inputDateEnd).toHaveValue(today);
  });
});
