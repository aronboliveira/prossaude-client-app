import React from "react";
import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import TabBtnInd from "../../../../../../../../components/interactive/edfis/client/tabs/TabBtnInd";
import { handleIndEv } from "../../../../../../locals/edFisNutPage/edFisNutHandler";
jest.mock(
  "../../../../../../../components/interactive/edfis/TabIndPerc",
  (): {
    handleIndEv: jest.Mock<any, any, any>;
  } => ({
    handleIndEv: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../../lib/global/gModel",
  (): {
    textTransformPascal: jest.Mock<any, [lab: any], any>;
  } => ({
    textTransformPascal: jest.fn((lab: string): string => lab) as jest.Mock,
  }),
) as typeof jest;
describe("TabBtnInd Component", (): void => {
  it("should render the TabBtnInd button", (): void => {
    render(<TabBtnInd nRow={1} nCol={2} lab='Abdominal' />) as RenderResult;
    (
      expect(screen.getByRole<HTMLButtonElement>("button", { name: "Calcular" })) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  });
  it("should call handleIndEv with BTN context on button click", (): void => {
    render(<TabBtnInd nRow={1} nCol={2} lab='Abdominal' />) as RenderResult;
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: "Calcular" })) as boolean;
    (expect(handleIndEv) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<Parameters<typeof handleIndEv>>(
      expect.any(Object),
      "BTN",
    ) as void;
  }) as void;
}) as void;
