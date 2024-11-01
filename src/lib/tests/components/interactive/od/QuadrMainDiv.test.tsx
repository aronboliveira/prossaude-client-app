import { screen, render, RenderResult } from "@testing-library/react";
import QuadrMainDiv from "../../../../../../components/interactive/od/QuadrMainDiv";
describe("QuadrMainDiv Component", (): void => {
  it("should render InpAvDent components for teeth", (): void => {
    render(<QuadrMainDiv qr='SupDir' />) as RenderResult;
    (
      expect(screen.getByText<HTMLElement>("Superior Direito")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByLabelText<HTMLElement>("Estado do Dente 11")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
}) as void;
