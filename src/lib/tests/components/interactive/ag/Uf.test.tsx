import { render, screen } from "@testing-library/react";
import Uf from "../../../../../../components/interactive/ag/Uf";
describe("Uf", (): void => {
  it("renders the select input for UF and sets default value to RJ", (): void => {
    render(<Uf />);
    const select = screen.getByRole<HTMLSelectElement>("combobox");
    (expect(select) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
    (expect(select) as jest.JestMatchers<jest.SpyInstance>).toHaveValue("RJ") as void;
  }) as void;
  it("renders the correct number of options", (): void => {
    render(<Uf />);
    (
      expect(screen.getAllByRole<HTMLOptionElement>("option").length) as jest.JestMatchers<jest.SpyInstance>
    ).toBeGreaterThan(10);
  }) as void;
}) as void;
