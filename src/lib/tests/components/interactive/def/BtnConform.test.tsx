import { render, screen, fireEvent } from "@testing-library/react";
import BtnConform from "../../../../../../components/interactive/def/BtnConform";
describe("BtnConform Component", (): void => {
  const mockDispatch = jest.fn() as jest.Mock;
  it("renders the button with the correct text", (): void => {
    render(<BtnConform dispatch={mockDispatch} state={false} />);
    expect(
      screen.getByRole<HTMLButtonElement>("button", { name: /abrir declaração de concordância/i })
    ).toBeInTheDocument() as void;
  }) as void;
  it("calls dispatch with toggled state when clicked", (): void => {
    render(<BtnConform dispatch={mockDispatch} state={false} />);
    fireEvent.click(
      screen.getByRole<HTMLButtonElement>("button", { name: /abrir declaração de concordância/i })
    ) as boolean;
    (expect(mockDispatch) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[boolean]>(true) as void;
    fireEvent.click(
      screen.getByRole<HTMLButtonElement>("button", { name: /abrir declaração de concordância/i })
    ) as boolean;
    (expect(mockDispatch) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[boolean]>(false) as void;
  }) as void;
}) as void;
