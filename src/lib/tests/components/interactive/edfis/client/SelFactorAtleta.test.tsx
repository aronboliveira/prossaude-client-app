import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { handleCallbackWHS, tabProps } from "../../../../../../pages/edfis";
import SelFactorAtleta from "../../../../../../../components/interactive/edfis/client/SelFactorAtleta";
jest.mock(
  "../../../../../pages/edfis",
  (): {
    handleCallbackWHS: jest.Mock<any, any, any>;
    tabProps: {};
  } => ({
    handleCallbackWHS: jest.fn() as jest.Mock,
    tabProps: {},
  })
) as typeof jest;
describe("SelFactorAtleta Component", (): void => {
  it("should render the SelFactorAtleta select input", (): void => {
    render(<SelFactorAtleta />) as RenderResult;
    (
      expect(screen.getByTitle<HTMLSelectElement>("Fator de TMB para Atletas")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("should call handleCallbackWHS when an option is selected", (): void => {
    render(<SelFactorAtleta />) as RenderResult;
    const select = screen.getByTitle<HTMLSelectElement>("Fator de TMB para Atletas");
    fireEvent.change(select, { target: { value: "Peso" } }) as boolean;
    (expect(handleCallbackWHS) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof handleCallbackWHS>
    >(
      [
        [
          document.getElementById("gordCorpLvl") as HTMLSelectElement,
          document.getElementById("formCalcTMBType") as HTMLSelectElement,
          document.getElementById("nafType") as HTMLSelectElement,
          [
            tabProps.targInpWeigth,
            tabProps.targInpHeigth,
            tabProps.targInpIMC,
            tabProps.targInpMLG,
            tabProps.targInpTMB,
            tabProps.targInpGET,
            tabProps.targInpSumDCut,
            tabProps.targInpPGC,
          ],
        ],
        [
          tabProps.numCol,
          tabProps.factorAtvLvl,
          tabProps.factorAtleta,
          [tabProps.IMC, tabProps.MLG, tabProps.TMB, tabProps.GET, tabProps.PGC],
        ],
      ],
      select,
      tabProps.isAutoFillActive
    ) as any;
  }) as void;
}) as void;
