import { screen, render, fireEvent, RenderResult } from "@testing-library/react";
import { switchAutoFill } from "../../../../../lib/locals/edFisNutPage/edFisNutHandler";
import { tabProps } from "../../../../../pages/edfis";
import SwitchDiv from "../../../../../../components/interactive/def/SwitchDiv";
jest.mock(
  "../../../../../lib/locals/edFisNutPage/edFisNutHandler",
  (): {
    switchAutoFill: jest.Mock<any, any, any>;
  } => ({
    switchAutoFill: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("SwitchDiv Component", (): void => {
  test("renders the auto-fill switch and toggles on change", (): void => {
    render(<SwitchDiv autofill={true} />) as RenderResult;
    const autoFillCheckbox = screen.getByRole("checkbox", { name: /Cálculo Automático/i }) as HTMLInputElement;
    fireEvent.click(autoFillCheckbox) as boolean;
    (
      expect(switchAutoFill) as jest.JestMatchers<jest.SpyInstance> as jest.JestMatchers<jest.SpyInstance>
    ).toHaveBeenCalledWith<Parameters<typeof switchAutoFill>>(autoFillCheckbox, tabProps.isAutoFillActive) as void;
  }) as void;
}) as void;
