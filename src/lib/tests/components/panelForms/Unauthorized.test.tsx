import { RenderResult, render } from "@testing-library/react";
import Unauthorized from "../../../../../components/panelForms/defs/Unauthorized";
jest.mock(
  "@/lib/global/handlers/gHandlers",
  (): {
    syncAriaStates: jest.Mock<any, any, any>;
  } => ({
    syncAriaStates: jest.fn(),
  })
) as typeof jest;
describe("Unauthorized Component", (): void => {
  test("renders the unauthorized message", (): void => {
    (
      expect(
        (render(<Unauthorized />) as RenderResult).getByText(/não possui autorização/i)
      ) as jest.JestMatchers<HTMLElement>
    ).toBeInTheDocument() as void;
  }) as void;
}) as void;
