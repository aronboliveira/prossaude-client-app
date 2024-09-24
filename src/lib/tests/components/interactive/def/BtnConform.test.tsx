import { render, screen, fireEvent } from "@testing-library/react";
import BtnConform from "../../../../../../components/interactive/def/BtnConform";
describe("BtnConform Component", (): void => {
  const mockDispatch = jest.fn();
  it("renders the button with the correct text", (): void => {
    render(<BtnConform dispatch={mockDispatch} state={false} />);
    expect(
      screen.getByRole<HTMLButtonElement>("button", { name: /abrir declaração de concordância/i })
    ).toBeInTheDocument();
  });
  it("calls dispatch with toggled state when clicked", (): void => {
    render(<BtnConform dispatch={mockDispatch} state={false} />);
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: /abrir declaração de concordância/i }));
    expect(mockDispatch).toHaveBeenCalledWith<[boolean]>(true);
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: /abrir declaração de concordância/i }));
    expect(mockDispatch).toHaveBeenCalledWith<[boolean]>(false);
  });
});
