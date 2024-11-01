import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { handleCallbackWHS } from "../../../../../locals/edFisNutPage/edFisNutHandler";
import { tabProps } from "../../../../../../../../../pro-saude-app-vite/app/src/vars";
import React from "react";
import SelFactorAtleta from "../../../../../../../components/interactive/edfis/client/SelFactorAtleta";
jest.mock(
  "../../../../../locals/edFisNutPage/edFisNutHandler",
  (): {
    handleCallbackWHS: jest.Mock<any, any, any>;
    tabProps: object;
  } => ({
    handleCallbackWHS: jest.fn() as jest.Mock,
    tabProps: {},
  }),
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
            tabProps.tiw,
            tabProps.tih,
            tabProps.tiimc,
            tabProps.timlg,
            tabProps.titmb,
            tabProps.tiget,
            tabProps.tidc,
            tabProps.tiget,
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
      tabProps.isAutoFillActive,
    ) as any;
  }) as void;
}) as void;
