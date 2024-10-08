import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import React from "react";
import { callbackAtvLvlElementNaf } from "../../../../../locals/edFisNutPage/edFisNutHandler";
import { tabProps } from "../../../../../../../../../pro-saude-app-vite/app/src/vars";
import SelectLvlAtFis from "../../../../../../../components/interactive/edfis/client/SelectLvlAtFis";
jest.mock(
  "../../../../../locals/edFisNutPage/edFisNutHandler",
  (): {
    callbackAtvLvlElementNaf: jest.Mock<any, any, any>;
    person: object;
    tabProps: object;
  } => ({
    callbackAtvLvlElementNaf: jest.fn() as jest.Mock,
    person: {},
    tabProps: {},
  }),
) as typeof jest;
describe("SelectLvlAtFis Component", (): void => {
  it("should render the SelectLvlAtFis select input", (): void => {
    render(<SelectLvlAtFis />) as RenderResult;
    (
      expect(screen.getByTitle<HTMLSelectElement>("Nivel de Atividade Física")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("should call callbackAtvLvlElementNaf when an option is selected", (): void => {
    render(<SelectLvlAtFis />) as RenderResult;
    const select = screen.getByTitle("Nivel de Atividade Física");
    fireEvent.change(select, { target: { value: "leve" } }) as boolean;
    (expect(callbackAtvLvlElementNaf) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith(
      [
        [tabProps.factorAtvLvl, tabProps.IMC],
        [
          select,
          document.getElementById("gordCorpLvl"),
          document.getElementById("formCalcTMBType"),
          document.getElementById("nafType"),
        ],
      ],
      select.id,
    );
  }) as void;
}) as void;
