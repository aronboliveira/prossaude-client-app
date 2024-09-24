import { render, screen } from "@testing-library/react";
import Declaration from "../../../../../../components/interactive/def/Declaration";
describe("Declaration Component", (): void => {
  it("renders the declaration text and checkbox", (): void => {
    render(<Declaration text='I agree with the terms.' />);
    expect(screen.getByText<HTMLLabelElement>("I agree with the terms.")).toBeInTheDocument();
    expect(screen.getByRole<HTMLInputElement>("checkbox")).toBeInTheDocument();
  });
  it("marks the checkbox as required", (): void => {
    render(<Declaration text='I agree with the terms.' />);
    expect(screen.getByRole<HTMLInputElement>("checkbox")).toBeRequired();
  });
});
