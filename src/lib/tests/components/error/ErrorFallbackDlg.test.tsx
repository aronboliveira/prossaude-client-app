import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import ErrorFallbackDlg from "../../../../../components/error/ErrorFallbackDlg";
import "@testing-library/jest-dom/extend-expect";
describe("ErrorFallbackDlg Component", (): void => {
  const mockError = new Error("Test error message");
  const mockOnClick = jest.fn() as jest.Mock;
  const renderComponent = (): RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > => render(<ErrorFallbackDlg renderError={mockError} onClick={mockOnClick} />);
  test("renders the component with error message", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (expect(screen.getByRole<HTMLElement>("alert")) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
    (
      expect(screen.getByText<HTMLHeadingElement>(/Oops, algo deu errado!/i)) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByText<HTMLHeadingElement>(mockError.message)) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByText<HTMLButtonElement>("Fechar")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("calls onClick handler when 'Fechar' button is clicked", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.click(screen.getByText<HTMLButtonElement>("Fechar")) as boolean;
    (expect(mockOnClick) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
}) as void;
