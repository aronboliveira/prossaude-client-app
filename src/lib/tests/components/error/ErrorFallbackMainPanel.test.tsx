import { render, fireEvent, screen, RenderResult } from "@testing-library/react";
import ErrorFallbackMainPanel from "../../../../../components/error/ErrorFallbackMainPanel";
import "@testing-library/jest-dom/extend-expect";
jest.mock(
  "../../../../../components/consRegst/MainFormPanel",
  (): (() => JSX.Element) => (): JSX.Element => <div>MainFormPanel Component</div>
) as typeof jest;
describe("ErrorFallbackMainPanel Component", (): void => {
  const mockMainRoot: {
    render: jest.Mock<any, any, any>;
    unmount: jest.Mock<any, any, any>;
  } = {
    render: jest.fn() as jest.Mock,
    unmount: jest.fn() as jest.Mock,
  };
  const mockProps: {
    defOp: string;
    mainRoot: {
      render: jest.Mock<any, any, any>;
    };
    tryAcc: number;
    renderError: Error;
    resetErrorBoundary: jest.Mock<any, any, any>;
  } = {
    defOp: "registStud",
    mainRoot: mockMainRoot,
    tryAcc: 1,
    renderError: new Error("Test error message"),
    resetErrorBoundary: jest.fn() as jest.Mock,
  };
  const renderComponent = (): RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > =>
    render(
      <ErrorFallbackMainPanel
        {...{
          defOp: "registStud",
          mainRoot: mockMainRoot,
          tryAcc: 1,
          renderError: new Error("Test Error"),
          resetErrorBoundary: jest.fn() as jest.Mock,
        }}
      />
    );
  test("renders error message and select options", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    expect(screen.getByRole<HTMLElement>("alert")).toBeInTheDocument() as void;
    expect(screen.getByText<HTMLHeadingElement>(/Oops, algo deu errado!/i)).toBeInTheDocument() as void;
    expect(screen.getByText<HTMLHeadingElement>(mockProps.renderError.message)).toBeInTheDocument() as void;
    expect(screen.getByRole<HTMLSelectElement>("combobox")).toBeInTheDocument() as void;
  }) as void;
  test("calls resetErrorBoundary on button click", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.click(screen.getByText<HTMLButtonElement>("Tentar novamente")) as boolean;
    expect(mockProps.resetErrorBoundary).toHaveBeenCalledWith<Parameters<typeof mockProps.resetErrorBoundary>>(
      mockMainRoot,
      "student",
      mockProps.tryAcc
    );
  }) as void;
  test("changes panel value on selecting new option", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.change(screen.getByRole<HTMLSelectElement>("combobox"), { target: { value: "agenda" } }) as boolean;
    expect(mockMainRoot.render).toHaveBeenCalledWith<Parameters<typeof mockMainRoot.render>>(
      expect.anything() as any
    ) as void;
  }) as void;
}) as void;
