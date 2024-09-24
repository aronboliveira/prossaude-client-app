import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmLocId from "../../../../../../components/interactive/def/ConfirmLocId";
describe("ConfirmLocId Component", (): void => {
  it("renders the location input field with a default value", (): void => {
    render(<ConfirmLocId />);
    expect(screen.getByRole<HTMLInputElement>("textbox")).toHaveValue("Rio de Janeiro, Rio de Janeiro");
  });
  it("updates the value on input change", (): void => {
    render(<ConfirmLocId />);
    const input = screen.getByRole<HTMLInputElement>("textbox");
    fireEvent.input(screen.getByRole<HTMLInputElement>("textbox"), { target: { value: "São Paulo, São Paulo" } });
    expect(input).toHaveValue("São Paulo, São Paulo");
  });
});
