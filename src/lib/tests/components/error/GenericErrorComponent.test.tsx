import { render, screen, RenderResult } from "@testing-library/react";
import GenericErrorComponent from "../../../../../components/error/GenericErrorComponent";
import "@testing-library/jest-dom/extend-expect";
describe("GenericErrorComponent", (): void => {
  const renderComponent = (
    message = "Erro indefinido"
  ): RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement> =>
    render(<GenericErrorComponent message={message} />);
  test("renders with a custom error message", (): void => {
    const customMessage = "Custom error occurred";
    renderComponent(customMessage) as RenderResult;
    (
      expect(screen.getByText<HTMLHeadingElement>(/Oops, algo deu errado!/i)) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByText<HTMLHeadingElement>(customMessage)) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("renders with default error message when message is undefined", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (
      expect(screen.getByText<HTMLHeadingElement>("Erro indefinido")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
}) as void;
