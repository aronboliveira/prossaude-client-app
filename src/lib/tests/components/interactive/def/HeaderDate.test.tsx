import { render, screen, fireEvent } from "@testing-library/react";
import HeaderDate from "../../../../../../components/interactive/def/HeaderDate";
describe("HeaderDate Component", (): void => {
  it("renders the date input and button", (): void => {
    render(<HeaderDate />);
    expect(screen.getByRole<HTMLInputElement>("textbox", { name: /date/i })).toBeInTheDocument();
    expect(screen.getByRole<HTMLButtonElement>("button", { name: /usar data atual/i })).toBeInTheDocument();
  });
  it("equalizes button and input widths on resize", (): void => {
    render(<HeaderDate />);
    fireEvent(window, new Event("resize"));
    expect(screen.getByRole<HTMLButtonElement>("button", { name: /usar data atual/i }).style.width).toBe(
      screen.getByRole<HTMLInputElement>("textbox", { name: /date/i }).style.width
    );
  });
});
