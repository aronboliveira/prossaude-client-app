import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TbodyComorb from "../../../../../../components/interactive/edfis/TbodyComorb";
describe("TbodyComorb component", () => {
  it("renders the table row with correct initial elements", () => {
    render(<TbodyComorb />);
    const tableRow = screen.getByRole("row");
    expect(tableRow).toBeInTheDocument();
    const firstCell = screen.getByText("1");
    expect(firstCell).toBeInTheDocument();
    const textInput = screen.getByLabelText("Comorbidade_Nome_1", { selector: "input" }),
      dateInput = screen.getByLabelText("Comorbidade_Data_1", { selector: "input" });
    expect(textInput).toBeInTheDocument();
    expect(dateInput).toBeInTheDocument();
  });
  it("allows typing in the text input", () => {
    render(<TbodyComorb />);
    const textInput = screen.getByLabelText("Comorbidade_Nome_1", { selector: "input" }) as HTMLInputElement;
    fireEvent.change(textInput, { target: { value: "Hypertension" } });
    expect(textInput.value).toBe("Hypertension");
  });
  it("allows selecting a date in the date input", () => {
    render(<TbodyComorb />);
    const dateInput = screen.getByLabelText("Comorbidade_Data_1", { selector: "input" }) as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: "2024-09-25" } });
    expect(dateInput.value).toBe("2024-09-25");
  });
  it("renders inputs with required attribute", () => {
    render(<TbodyComorb />);
    const textInput = screen.getByLabelText("Comorbidade_Nome_1", { selector: "input" }) as HTMLInputElement,
      dateInput = screen.getByLabelText("Comorbidade_Data_1", { selector: "input" }) as HTMLInputElement;
    expect(textInput).toBeRequired();
    expect(dateInput).toBeRequired();
  });
});
