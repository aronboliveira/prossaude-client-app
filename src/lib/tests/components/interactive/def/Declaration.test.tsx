import { render, screen } from "@testing-library/react";
import Declaration from "../../../../../../components/interactive/def/Declaration";
describe("Declaration Component", (): void => {
  it("renders the declaration text and checkbox", (): void => {
    render(<Declaration text='I agree with the terms.' />);
    (
      expect(screen.getByText<HTMLLabelElement>("I agree with the terms.")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByRole<HTMLInputElement>("checkbox")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("marks the checkbox as required", (): void => {
    render(<Declaration text='I agree with the terms.' />);
    (expect(screen.getByRole<HTMLInputElement>("checkbox")) as jest.JestMatchers<jest.SpyInstance>).toBeRequired();
  }) as void;
}) as void;
