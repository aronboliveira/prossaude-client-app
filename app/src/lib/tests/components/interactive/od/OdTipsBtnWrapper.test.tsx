import { screen, render, fireEvent, RenderResult } from "@testing-library/react";
import OdTipsBtnWrapper from "../../../../../../components/interactive/od/OdTipsBtnWrapper";
describe("OdTipsBtnWrapper Component", (): void => {
  it("should render TipsBtn and OdTips when state is true", (): void => {
    render(<OdTipsBtnWrapper />) as RenderResult;
    fireEvent.click(screen.getByText<HTMLButtonElement>("TipsBtn")) as boolean;
    (
      expect(screen.getByText<HTMLElement>("OdTips")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
}) as void;
