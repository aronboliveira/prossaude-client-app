import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FamDiab from "../../../../../../components/interactive/ag/FamDiab";
import { handleDivAddShow } from "../../../../../pages/ag";
jest.mock(
  "../../../../../pages/ag",
  (): {
    handleDivAddShow: jest.Mock<any, any, any>;
  } => ({
    handleDivAddShow: jest.fn(),
  })
);
describe("FamDiab Component", (): void => {
  it("renders the checkbox for family diabetes history", (): void => {
    render(<FamDiab />);
    expect(screen.getByLabelText<HTMLInputElement>("Antecedentes Familiares — Diabetes")).toBeInTheDocument();
  });
  it("calls handleDivAddShow on checkbox click", async (): Promise<void> => {
    render(<FamDiab />);
    const checkbox = screen.getByLabelText("Antecedentes Familiares — Diabetes") as HTMLInputElement;
    fireEvent.click(checkbox);
    await waitFor((): void => {
      expect(handleDivAddShow).toHaveBeenCalledWith<Parameters<typeof handleDivAddShow>>(checkbox);
    });
  });
});
