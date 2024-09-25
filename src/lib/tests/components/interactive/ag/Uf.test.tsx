import { render, screen } from "@testing-library/react";
import Uf from "../../../../../../components/interactive/ag/Uf";
describe("Uf", (): void => {
  it("renders the select input for UF and sets default value to RJ", (): void => {
    render(<Uf />);
    const select = screen.getByRole<HTMLSelectElement>("combobox");
    expect(select).toBeInTheDocument() as void;
    expect(select).toHaveValue("RJ");
  });
  it("renders the correct number of options", (): void => {
    render(<Uf />);
    expect(screen.getAllByRole<HTMLOptionElement>("option").length).toBeGreaterThan(10);
  });
});
