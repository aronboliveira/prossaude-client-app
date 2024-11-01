import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { callbackAtvLvlElementNaf } from "../../../../../locals/edFisNutPage/edFisNutHandler";
import { tabProps } from "../../../../../../../../../pro-saude-app-vite/app/src/vars";
import GordCorpLvl from "../../../../../../../components/interactive/edfis/client/GordCorpLvl";
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
    person: { atvLvl: "eutrofico" },
    tabProps: { factorAtvLvl: 1.6, IMC: 25 },
  }),
) as typeof jest;
describe("GordCorpLvl component", (): void => {
  beforeEach((): void => {
    jest.clearAllMocks() as typeof jest;
  });
  test("renders select element with body fat level options", (): void => {
    render(<GordCorpLvl />) as RenderResult;
    const select = screen.getByLabelText<HTMLSelectElement>("Nível de Gordura Corporal");
    (expect(select) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
    (expect(select.children.length) as jest.JestMatchers<jest.SpyInstance>).toBe(6) as void;
  }) as void;
  test("calls callbackAtvLvlElementNaf on change event", (): void => {
    render(<GordCorpLvl />) as RenderResult;
    const select = screen.getByLabelText<HTMLSelectElement>("Nível de Gordura Corporal");
    fireEvent.change(select, { target: { value: "obeso1" } }) as boolean;
    (expect(callbackAtvLvlElementNaf) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof callbackAtvLvlElementNaf>
    >(
      [
        [tabProps.factorAtvLvl as number, tabProps.IMC as number],
        [
          document.getElementById("selectLvlAtFis") as HTMLSelectElement,
          select,
          document.getElementById("formCalcTMBType") as HTMLSelectElement,
          document.getElementById("nafType") as HTMLSelectElement,
        ],
      ],
      select.id,
    ) as void;
  }) as void;
}) as void;
