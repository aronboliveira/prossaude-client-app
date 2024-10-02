import React from "react";
import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { handleSumClick } from "../../../../../../locals/edFisNutPage/edFisNutHandler";
import TabBtnDCut from "../../../../../../../../components/interactive/edfis/client/tabs/TabBtnDCut";
jest.mock(
  "../../../../../../../components/interactive/edfis/TabDCut",
  (): {
    handleSumClick: jest.Mock<any, any, any>;
  } => ({
    handleSumClick: jest.fn(),
  }),
) as typeof jest;
describe("TabBtnDCut Component", (): void => {
  it("should render the TabBtnDCut button", (): void => {
    render(<TabBtnDCut nCol={2} />) as RenderResult;
    (
      expect(screen.getByRole<HTMLButtonElement>("button", { name: "Calcular" })) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("should call handleSumClick on button click", (): void => {
    render(<TabBtnDCut nCol={2} />) as RenderResult;
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: "Calcular" })) as boolean;
    (expect(handleSumClick) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
}) as void;
