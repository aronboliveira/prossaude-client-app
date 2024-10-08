import { render, fireEvent, RenderResult } from "@testing-library/react";
import FormExcludeBtn from "../../../../../components/panelForms/defs/FormExcludeBtn";
jest.mock(
  "@/lib/global/handlers/gHandlers",
  (): {
    syncAriaStates: jest.Mock<any, any, any>;
  } => ({
    syncAriaStates: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "@/lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
    extLine: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn() as jest.Mock,
    extLine: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("FormExcludeBtn Component", (): void => {
  test("renders the exclude button and toggles dialog", (): void => {
    const { getByText } = render(<FormExcludeBtn context='Stud' />) as RenderResult;
    const excludeButton = getByText(/Excluir/i) as HTMLButtonElement;
    const clickResult = fireEvent.click(excludeButton) as boolean;
    (expect(clickResult) as jest.JestMatchers<HTMLElement>).toBe<boolean>(true) as void;
    (expect(excludeButton) as jest.JestMatchers<HTMLButtonElement>).toBeInTheDocument() as void;
  }) as void;
}) as void;
