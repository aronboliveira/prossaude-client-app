import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FamCard from "../../../../../../components/interactive/ag/FamCard";
import { handleDivAddShow } from "../../../../../pages/ag";
jest.mock(
  "../../../../../pages/ag",
  (): {
    handleDivAddShow: jest.Mock<any, any, any>;
  } => ({
    handleDivAddShow: jest.fn(),
  })
);
describe("FamCard Component", (): void => {
  it("renders the checkbox for family heart disease history", (): void => {
    render(<FamCard />);
    expect(
      screen.getByLabelText<HTMLInputElement>("Antecedentes Familiares — Doença(s) Cardíaca(s)")
    ).toBeInTheDocument();
  });
  it("calls handleDivAddShow on checkbox click", async (): Promise<void> => {
    render(<FamCard />);
    const checkbox = screen.getByLabelText("Antecedentes Familiares — Doença(s) Cardíaca(s)") as HTMLInputElement;
    fireEvent.click(checkbox);
    await waitFor((): void => {
      expect(handleDivAddShow).toHaveBeenCalledWith<Parameters<typeof handleDivAddShow>>(checkbox);
    });
  });
});
