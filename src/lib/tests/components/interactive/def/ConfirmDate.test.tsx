import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmDate from "../../../../../../components/interactive/def/ConfirmDate";
describe("ConfirmDate Component", (): void => {
  it("renders the input date field and button", (): void => {
    render(<ConfirmDate />);
    (
      expect(screen.getByLabelText<HTMLInputElement>("Data:")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(
        screen.getByRole<HTMLButtonElement>("button", { name: /usar data atual/i })
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("equalizes button and input widths on resize", (): void => {
    render(<ConfirmDate />);
    fireEvent(window, new Event("resize"));
    (
      expect(
        screen.getByRole<HTMLButtonElement>("button", { name: /usar data atual/i }).style.width
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBe(screen.getByLabelText<HTMLInputElement>("Data:").style.width);
  }) as void;
}) as void;
