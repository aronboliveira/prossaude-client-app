import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TbodyAtFisProps from "../../../../../../components/interactive/edfis/TbodyAtFisProps";
import { handleEventReq } from "../../../../global/handlers/gHandlers";
jest.mock("@/lib/global/handlers/gHandlers", () => ({
  handleEventReq: jest.fn(),
}));
describe("TbodyAtFisProps component", () => {
  it("renders the tbody with correct initial elements", () => {
    render(<TbodyAtFisProps />);
    const tbodyElement = screen.getByRole("rowgroup");
    expect(tbodyElement).toBeInTheDocument();
    expect(screen.getByText("Qual atividade?")).toBeInTheDocument();
    expect(screen.getByText("Quantas vezes por semana?")).toBeInTheDocument();
    expect(screen.getByText("Quanto tempo por sessão, em minutos?")).toBeInTheDocument();
    expect(screen.getByText("Por quanto tempo, em meses?")).toBeInTheDocument();
    const rowLabel = screen.getByText("1)");
    expect(rowLabel).toBeInTheDocument();
  });
  it("allows typing in the text input for activity name", () => {
    render(<TbodyAtFisProps />);
    const textInput = screen.getByLabelText("Atividade_Fisica_Proposta_Nome_1", {
      selector: "input",
    }) as HTMLInputElement;
    fireEvent.change(textInput, { target: { value: "Running" } });
    expect(textInput.value).toBe("Running");
  });
  it("allows typing in the number input for sessions per week", () => {
    render(<TbodyAtFisProps />);
    const numberInput = screen.getByLabelText("Atividade_Fisica_Proposta_NSemana_1", {
      selector: "input",
    }) as HTMLInputElement;
    fireEvent.change(numberInput, { target: { value: "3" } });
    expect(numberInput.value).toBe("3");
  });
  it("calls handleEventReq when the input value changes", () => {
    render(<TbodyAtFisProps />);
    const textInput = screen.getByLabelText("Atividade_Fisica_Proposta_Nome_1", {
      selector: "input",
    }) as HTMLInputElement;
    fireEvent.input(textInput, { target: { value: "Cycling" } });
    expect(handleEventReq).toHaveBeenCalledWith(textInput);
  });
  it("allows typing in the number input for session duration in minutes", () => {
    render(<TbodyAtFisProps />);
    const sessionDurationInput = screen.getByLabelText("Atividade_Fisica_Proposta_SessãoMin_1", {
      selector: "input",
    }) as HTMLInputElement;
    fireEvent.change(sessionDurationInput, { target: { value: "60" } });
    expect(sessionDurationInput.value).toBe("60");
  });
  it("allows typing in the number input for duration in months", () => {
    render(<TbodyAtFisProps />);
    const durationMonthsInput = screen.getByLabelText("Atividade_Fisica_Proposta_Meses_1", {
      selector: "input",
    }) as HTMLInputElement;
    fireEvent.change(durationMonthsInput, { target: { value: "12" } });
    expect(durationMonthsInput.value).toBe("12");
  });
  it("renders inputs with required attribute", () => {
    render(<TbodyAtFisProps />);
    const textInput = screen.getByLabelText("Atividade_Fisica_Proposta_Nome_1", {
        selector: "input",
      }) as HTMLInputElement,
      numberInput = screen.getByLabelText("Atividade_Fisica_Proposta_NSemana_1", {
        selector: "input",
      }) as HTMLInputElement;
    expect(textInput).toBeRequired();
    expect(numberInput).toBeRequired();
  });
});
