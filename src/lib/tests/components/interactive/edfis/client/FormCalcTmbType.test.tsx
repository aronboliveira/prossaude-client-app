import React from "react";
import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { callbackAtvLvlElementNaf } from "../../../../../locals/edFisNutPage/edFisNutHandler";
import { tabProps } from "../../../../../../../../../pro-saude-app-vite/app/src/vars";
import FormCalcTmbType from "../../../../../../../components/interactive/edfis/client/FormCalcTmbType";
jest.mock(
  "../../../../../locals/edFisNutPage/edFisNutHandler",
  (): {
    callbackAtvLvlElementNaf: jest.Mock<any, any, any>;
    person: {
      atvLvl: string;
    };
    tabProps: {
      factorAtvLvl: number;
      IMC: number;
    };
  } => ({
    callbackAtvLvlElementNaf: jest.fn() as jest.Mock,
    person: { atvLvl: "leve" },
    tabProps: { factorAtvLvl: 1.4, IMC: 22 },
  }),
) as typeof jest;
describe("FormCalcTmbType component", (): void => {
  beforeEach((): void => {
    jest.clearAllMocks() as typeof jest;
  }) as void;
  test("renders select element with TMB options", (): void => {
    render(<FormCalcTmbType />) as RenderResult;
    const select = screen.getByLabelText<HTMLSelectElement>("Fórmula para TMB");
    (expect(select) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
    (expect(select.children.length) as jest.JestMatchers<jest.SpyInstance>).toBe(3) as void;
  }) as void;
  test("calls callbackAtvLvlElementNaf on change event", (): void => {
    render(<FormCalcTmbType />) as RenderResult;
    const select = screen.getByLabelText<HTMLSelectElement>("Fórmula para TMB");
    fireEvent.change(select, { target: { value: "tinsley" } }) as boolean;
    (expect(callbackAtvLvlElementNaf) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof callbackAtvLvlElementNaf>
    >(
      [
        [tabProps.factorAtvLvl, tabProps.IMC],
        [
          document.getElementById("selectLvlAtFis") as HTMLSelectElement,
          document.getElementById("gordCorpLvl") as HTMLSelectElement,
          select,
          document.getElementById("nafType") as HTMLSelectElement,
        ],
      ],
      select.id,
    ) as void;
  }) as void;
}) as void;
