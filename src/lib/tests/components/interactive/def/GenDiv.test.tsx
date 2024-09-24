import { render, screen, fireEvent } from "@testing-library/react";
import GenDiv from "../../../../../../components/interactive/def/GenDiv";
describe("GenDiv Component", (): void => {
  it("renders the gender select dropdown with options", (): void => {
    render(<GenDiv flux={false} />);
    const select = screen.getByRole<HTMLSelectElement>("combobox", { name: /gênero/i });
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue("masculino");
  });
  it("updates the selected option and triggers fluxGen when flux is true", (): void => {
    render(<GenDiv flux={true} />);
    const select = screen.getByRole<HTMLSelectElement>("combobox", { name: /gênero/i });
    fireEvent.change(select, { target: { value: "feminino" } });
    expect(select).toHaveValue("feminino");
    expect(
      screen.getByRole<HTMLSelectElement>("combobox", { name: /estágio da transição hormonal/i })
    ).toBeInTheDocument();
  });
});
