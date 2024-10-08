import React from "react";
import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { callbackAtvLvlElementNaf } from "../../../../../locals/edFisNutPage/edFisNutHandler";
import { tabProps } from "../../../../../../../../../pro-saude-app-vite/app/src/vars";
import NafType from "../../../../../../../components/interactive/edfis/client/NafType";
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
    callbackAtvLvlElementNaf: jest.fn(),
    person: { atvLvl: "sedentario" },
    tabProps: { factorAtvLvl: 1.2, IMC: 23 },
  }),
) as typeof jest;
describe("NafType component", (): void => {
  beforeEach((): void => {
    jest.clearAllMocks() as typeof jest;
  }) as void;
  test("renders select element with NAF options", (): void => {
    render(<NafType />) as RenderResult;
    const select = screen.getByLabelText<HTMLSelectElement>("Fator de Nível de Atividade Física");
    (expect(select) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
    (expect(select.children.length) as jest.JestMatchers<jest.SpyInstance>).toBe(5) as void;
  }) as void;
  test("calls callbackAtvLvlElementNaf on change event", (): void => {
    render(<NafType />) as RenderResult;
    const select = screen.getByLabelText<HTMLSelectElement>("Fator de Nível de Atividade Física");
    fireEvent.change(select, { target: { value: "intenso" } }) as boolean;
    (expect(callbackAtvLvlElementNaf) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof callbackAtvLvlElementNaf>
    >(
      [
        [tabProps.factorAtvLvl, tabProps.IMC],
        [
          document.getElementById("selectLvlAtFis") as HTMLSelectElement,
          document.getElementById("gordCorpLvl") as HTMLSelectElement,
          document.getElementById("formCalcTMBType") as HTMLSelectElement,
          select,
        ],
      ],
      select.id,
    ) as void;
  }) as void;
}) as void;
