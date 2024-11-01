import React from "react";
import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import TabInpProg from "../../../../../../../../components/interactive/edfis/client/tabs/TabInpProg";
import { handleIndEv } from "../../../../../../locals/edFisNutPage/edFisNutHandler";
import { handleEventReq, handleCondtReq } from "../../../../../../global/handlers/gHandlers";
jest.mock(
  "../../../../../../../components/interactive/edfis/TabIndPerc",
  (): {
    handleIndEv: jest.Mock<any, any, any>;
  } => ({
    handleIndEv: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../../../lib/global/handlers/gHandlers",
  (): {
    handleCondtReq: jest.Mock<any, any, any>;
    handleEventReq: jest.Mock<any, any, any>;
  } => ({
    handleCondtReq: jest.fn() as jest.Mock,
    handleEventReq: jest.fn() as jest.Mock,
  }),
) as typeof jest;
describe("TabInpProg Component", (): void => {
  it("should render the input for IndPerc context", (): void => {
    render(<TabInpProg nRow={1} nCol={2} ctx='IndPerc' lab='IMC' />) as RenderResult;
    (
      expect(screen.getByTitle<HTMLInputElement>("IMC (Consulta 1)")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("should call handleIndEv and handleEventReq on input change when lab is IMC", (): void => {
    render(<TabInpProg nRow={1} nCol={2} ctx='IndPerc' lab='IMC' />) as RenderResult;
    const input = screen.getByTitle<HTMLInputElement>("IMC (Consulta 1)");
    fireEvent.input(input, { target: { value: "123" } }) as boolean;
    (expect(handleIndEv) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<Parameters<typeof handleIndEv>>(
      expect.any(Object),
      "IMC",
    ) as void;
    (expect(handleEventReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof handleEventReq>
    >(input) as void;
  }) as void;
  it("should call handleCondtReq on input change when lab is not IMC", (): void => {
    render(<TabInpProg nRow={1} nCol={2} ctx='MedAnt' lab='Peso' />) as RenderResult;
    const input = screen.getByTitle<HTMLInputElement>("Medidas Antropométricas Peso (Consulta 1)");
    fireEvent.input(input, { target: { value: "70" } }) as boolean;
    (expect(handleCondtReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof handleCondtReq>
    >(
      input,
      expect.objectContaining<{
        minNum: number;
        maxNum: number;
        min: number;
        max: number;
        pattern: string[];
      }>({
        minNum: 0.05,
        maxNum: 999999,
        min: 1,
        max: 99,
        pattern: ["^[\\d,.]+$", ""],
      }) as any,
    ) as void;
  }) as void;
}) as void;
