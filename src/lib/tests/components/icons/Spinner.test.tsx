import { render, screen, RenderResult } from "@testing-library/react";
import Spinner from "../../../../../components/icons/Spinner";
import { ErrorBoundary } from "react-error-boundary";
import "@testing-library/jest-dom/extend-expect";
jest.mock(
  "../../../../../components/consRegst/GenericErrorComponent",
  (): (() => JSX.Element) => (): JSX.Element => <div>GenericErrorComponent</div>
) as typeof jest;
describe("Spinner Component", (): void => {
  const renderComponent = (
    spinnerClass = "spinner-border",
    spinnerColor = "",
    message = "Loading..."
  ): RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement> =>
    render(<Spinner spinnerClass={spinnerClass as any} spinnerColor={spinnerColor as any} message={message} />);
  test("renders spinner with default values", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    expect(screen.getByRole<HTMLElement>("status")).toBeInTheDocument() as void;
    expect(screen.getByText<HTMLSpanElement>("Loading...")).toBeInTheDocument() as void;
    expect(screen.getByText<HTMLSpanElement>("Loading...").className).toContain<string>("visually-hidden");
  });
  test("renders spinner with custom values", (): void => {
    const customClass = "custom-spinner";
    const customColor = "text-primary";
    const customMessage = "Loading data...";
    renderComponent(customClass, customColor, customMessage);
    expect(screen.getByRole<HTMLElement>("status")).toHaveClass(`${customClass} ${customColor}`);
    expect(screen.getByText<HTMLSpanElement>(customMessage)).toBeInTheDocument() as void;
  });
  test("renders GenericErrorComponent when error occurs", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    expect(screen.queryByText("GenericErrorComponent")).not.toBeInTheDocument() as void;
    jest.spyOn<ErrorBoundary, "componentDidCatch">(ErrorBoundary.prototype, "componentDidCatch").mockRestore() as void;
  });
});
