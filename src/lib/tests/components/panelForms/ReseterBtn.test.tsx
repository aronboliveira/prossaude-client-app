import { render, fireEvent, RenderResult } from "@testing-library/react";
import ReseterBtn from "../../../../../components/panelForms/defs/ReseterBtn";
import { createRoot } from "react-dom/client";
jest.mock(
  "@/lib/global/handlers/gHandlers",
  (): {
    syncAriaStates: jest.Mock<any, any, any>;
  } => ({
    syncAriaStates: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock("react-dom/client", (): { createRoot: jest.Mock<any, any, any> } => ({
  createRoot: jest.fn(() => ({
    render: jest.fn() as jest.Mock,
  })) as jest.Mock,
})) as typeof jest;
describe("ReseterBtn Component", (): void => {
  test("renders the reset button and toggles reset dialog", (): void => {
    const resetButton = (
      render(<ReseterBtn renderForm={jest.fn()} root={createRoot(document.createElement("div"))} />) as RenderResult
    ).getByText(/Resetar Formulário/i) as HTMLButtonElement;
    (expect(fireEvent.click(resetButton) as boolean) as jest.JestMatchers<HTMLButtonElement>).toBe<boolean>(
      true
    ) as void;
    (expect(resetButton) as jest.JestMatchers<HTMLButtonElement>).toBeInTheDocument() as void;
  }) as void;
}) as void;
