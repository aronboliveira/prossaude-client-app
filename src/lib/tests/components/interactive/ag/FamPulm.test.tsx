import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FamPulm from "../../../../../../components/interactive/ag/FamPulm";
import { handleDivAddShow } from "../../../../../pages/ag";
jest.mock(
  "../../../../../pages/ag",
  (): {
    handleDivAddShow: jest.Mock<any, any, any>;
  } => ({
    handleDivAddShow: jest.fn(),
  })
);
describe("FamPulm Component", (): void => {
  it("renders the checkbox for family pulmonary disease history", (): void => {
    render(<FamPulm />);
    expect(
      screen.getByLabelText<HTMLInputElement>("Antecedentes Familiares — Doença(s) Pulmonar(es)")
    ).toBeInTheDocument();
  });
  it("calls handleDivAddShow on checkbox click", async (): Promise<void> => {
    render(<FamPulm />);
    const checkbox = screen.getByLabelText("Antecedentes Familiares — Doença(s) Pulmonar(es)") as HTMLInputElement;
    fireEvent.click(checkbox);
    await waitFor((): void => {
      expect(handleDivAddShow).toHaveBeenCalledWith<Parameters<typeof handleDivAddShow>>(checkbox);
    });
  });
});
