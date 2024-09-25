import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import ErrorFallbackDlg from "../../../../../components/error/ErrorFallbackDlg";
import "@testing-library/jest-dom/extend-expect";
describe("ErrorFallbackDlg Component", (): void => {
  const mockError = new Error("Test error message");
  const mockOnClick = jest.fn();
  const renderComponent = (): RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > => render(<ErrorFallbackDlg renderError={mockError} onClick={mockOnClick} />);
  test("renders the component with error message", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    expect(screen.getByRole<HTMLElement>("alert")).toBeInTheDocument() as void;
    expect(screen.getByText<HTMLHeadingElement>(/Oops, algo deu errado!/i)).toBeInTheDocument() as void;
    expect(screen.getByText<HTMLHeadingElement>(mockError.message)).toBeInTheDocument() as void;
    expect(screen.getByText<HTMLButtonElement>("Fechar")).toBeInTheDocument() as void;
  });
  test("calls onClick handler when 'Fechar' button is clicked", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.click(screen.getByText<HTMLButtonElement>("Fechar"));
    expect(mockOnClick).toHaveBeenCalled() as void;
  });
});
