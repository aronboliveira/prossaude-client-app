import { screen, render, fireEvent, RenderResult } from "@testing-library/react";
import OdBtnConformWrapper from "../../../../../../components/interactive/od/OdBtnConformWrapper";
describe("OdBtnConformWrapper", (): void => {
  it("should render BtnConform and OdDeclaration when state is true", (): void => {
    render(<OdBtnConformWrapper />) as RenderResult;
    fireEvent.click(screen.getByText<HTMLButtonElement>("BtnConform")) as boolean;
    (
      expect(screen.getByText<HTMLElement>("OdDeclaration")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
}) as void;
