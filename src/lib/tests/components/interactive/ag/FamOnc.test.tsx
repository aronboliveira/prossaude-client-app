import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FamOnc from "../../../../../../components/interactive/ag/FamOnc";
import { handleDivAddShow } from "../../../../../pages/ag";
jest.mock(
  "../../../../../pages/ag",
  (): {
    handleDivAddShow: jest.Mock<any, any, any>;
  } => ({
    handleDivAddShow: jest.fn(),
  })
);
describe("FamOnc Component", (): void => {
  it("renders the checkbox for family oncology history", (): void => {
    render(<FamOnc />);
    expect(
      screen.getByLabelText<HTMLInputElement>("Antecedentes Familiares — Doença(s) Oncológica(s)")
    ).toBeInTheDocument();
  });
  it("calls handleDivAddShow on checkbox click", async (): Promise<void> => {
    render(<FamOnc />);
    const checkbox = screen.getByLabelText<HTMLInputElement>("Antecedentes Familiares — Doença(s) Oncológica(s)");
    fireEvent.click(checkbox);
    await waitFor((): void => {
      expect(handleDivAddShow).toHaveBeenCalledWith<Parameters<typeof handleDivAddShow>>(checkbox);
    });
  });
});
