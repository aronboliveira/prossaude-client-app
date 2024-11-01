import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GenDiv from "../../../../../../components/interactive/def/GenDiv";
describe("GenDiv Component", (): void => {
  it("renders the gender select dropdown with options", (): void => {
    render(<GenDiv />);
    const select = screen.getByRole<HTMLSelectElement>("combobox", { name: /gênero/i });
    expect(select).toBeInTheDocument() as void;
    expect(select).toHaveValue("masculino");
  });
  it("updates the selected option and triggers fluxGen when flux is true", (): void => {
    render(<GenDiv />);
    const select = screen.getByRole<HTMLSelectElement>("combobox", { name: /gênero/i });
    fireEvent.change(select, { target: { value: "feminino" } }) as boolean;
    expect(select).toHaveValue("feminino");
    expect(
      screen.getByRole<HTMLSelectElement>("combobox", { name: /estágio da transição hormonal/i }),
    ).toBeInTheDocument() as void;
  });
});
