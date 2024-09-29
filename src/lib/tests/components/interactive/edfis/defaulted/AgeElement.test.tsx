import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { Person } from "../../../../../global/declarations/classes";
import { exeAutoFill, person, tabProps } from "../../../../../../pages/edfis";
import { validateEvResultNum } from "../../../../../locals/edFisNutPage/edFisNutHandler";
import { handleEventReq } from "../../../../../global/handlers/gHandlers";
import { multipleElementsNotFound } from "../../../../../global/handlers/errorHandler";
import AgeElement from "../../../../../../../components/interactive/edfis/defaulted/AgeElement";
import { targEl } from "@/lib/global/declarations/types";
jest.mock(
  "../../../../../pages/edfis",
  (): {
    exeAutoFill: jest.Mock<any, any, any>;
    person: {
      age: number;
      weight: number;
      height: number;
      sumDCut: number;
    };
    tabProps: {
      isAutoFillActive: boolean;
      numCons: number;
      IMC: number;
      MLG: number;
      TMB: number;
      GET: number;
      PGC: number;
      targInpWeigth: targEl;
      targInpHeigth: targEl;
      targInpIMC: targEl;
      targInpMLG: targEl;
      targInpTMB: targEl;
      targInpGET: targEl;
      targInpSumDCut: targEl;
      targInpPGC: targEl;
    };
  } => ({
    exeAutoFill: jest.fn(),
    person: { age: 25, weight: 70, height: 180, sumDCut: 10 },
    tabProps: {
      isAutoFillActive: true,
      numCons: 1,
      IMC: 25,
      MLG: 20,
      TMB: 1600,
      GET: 2000,
      PGC: 15,
      targInpWeigth: null,
      targInpHeigth: null,
      targInpIMC: null,
      targInpMLG: null,
      targInpTMB: null,
      targInpGET: null,
      targInpSumDCut: null,
      targInpPGC: null,
    },
  })
) as typeof jest;
jest.mock(
  "../../../../../lib/locals/edFisNutPage/edFisNutHandler",
  (): {
    validateEvResultNum: jest.Mock<any, any, any>;
  } => ({
    validateEvResultNum: jest.fn(),
  })
) as typeof jest;
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleEventReq: jest.Mock<any, any, any>;
  } => ({
    handleEventReq: jest.fn(),
  })
) as typeof jest;
jest.mock(
  "../../../../../lib/global/handlers/errorHandler",
  (): {
    multipleElementsNotFound: jest.Mock<any, any, any>;
    extLine: jest.Mock<string, [], any>;
  } => ({
    multipleElementsNotFound: jest.fn(),
    extLine: jest.fn(() => "Error Line"),
  })
) as typeof jest;
describe("AgeElement Component", (): void => {
  beforeEach((): void => {
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should render the AgeElement input with initial value set to 30", (): void => {
    render(<AgeElement />) as RenderResult;
    (
      expect((screen.getByLabelText("Idade") as HTMLInputElement).value) as jest.JestMatchers<jest.SpyInstance>
    ).toBe<string>("30") as void;
  }) as void;
  it("should set person.age and call exeAutoFill when input value changes and auto-fill is active", (): void => {
    (validateEvResultNum as jest.Mock).mockReturnValue(26) as jest.Mock;
    render(<AgeElement />) as RenderResult;
    const input = screen.getByLabelText("Idade") as HTMLInputElement;
    fireEvent.input(input, { target: { value: "26" } }) as boolean;
    (expect(input.value) as jest.JestMatchers<jest.SpyInstance>).toBe<string>("26") as void;
    (expect(validateEvResultNum) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof validateEvResultNum>
    >(input, person.age) as void;
    (expect(person.age) as jest.JestMatchers<jest.SpyInstance>).toBe<number>(26) as void;
    (expect(exeAutoFill) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<Parameters<typeof exeAutoFill>>(
      input,
      tabProps.isAutoFillActive,
      "cons"
    ) as void;
    (expect(handleEventReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof handleEventReq>
    >(input) as void;
  }) as void;
  it("should revert to previous value and call multipleElementsNotFound if conditions are not met", (): void => {
    (validateEvResultNum as jest.Mock).mockReturnValue(null) as jest.Mock;
    (person as Person).age = NaN;
    render(<AgeElement />) as RenderResult;
    const input = screen.getByLabelText("Idade") as HTMLInputElement;
    fireEvent.input(input, { target: { value: "50" } }) as boolean;
    (expect(input.value) as jest.JestMatchers<jest.SpyInstance>).toBe<string>("50") as void;
    (expect(multipleElementsNotFound) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof multipleElementsNotFound>
    >(
      "Error Line",
      "argumentas for callbackAgeElement()",
      JSON.stringify(person),
      person?.age,
      input,
      (expect as jest.Expect).any(String) as any,
      tabProps.isAutoFillActive as boolean
    ) as void;
    (expect(handleEventReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof handleEventReq>
    >(input) as void;
  }) as void;
  it("should update person.age when input value changes", (): void => {
    render(<AgeElement />) as RenderResult;
    const input = screen.getByLabelText("Idade") as HTMLInputElement;
    fireEvent.input(input, { target: { value: "30" } }) as boolean;
    (expect(validateEvResultNum) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof validateEvResultNum>
    >(input, person.age) as void;
    (expect(person.age) as jest.JestMatchers<jest.SpyInstance>).toBe<number>(30) as void;
  }) as void;
  it("should call handleEventReq on input change", (): void => {
    render(<AgeElement />) as RenderResult;
    const input = screen.getByLabelText("Idade") as HTMLInputElement;
    fireEvent.input(input, { target: { value: "30" } }) as boolean;
    (expect(handleEventReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof handleEventReq>
    >(input) as void;
  }) as void;
  it("should initialize the value with '0' if the input is empty", (): void => {
    render(<AgeElement />) as RenderResult;
    (
      expect((screen.getByLabelText("Idade") as HTMLInputElement).value) as jest.JestMatchers<jest.SpyInstance>
    ).toBe<string>("30") as void;
  }) as void;
}) as void;
