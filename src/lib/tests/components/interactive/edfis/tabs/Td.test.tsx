import { RenderResult, render, screen } from "@testing-library/react";
import Td from "../../../../../../../components/interactive/edfis/tabs/Td";
import TabInpProg from "../../../../../../../components/interactive/edfis/client/tabs/TabBtnInd";
import TabBtnInd from "../../../../../../../components/interactive/edfis/client/tabs/TabBtnInd";
import LockTabInd from "../../../../../../../components/interactive/edfis/tabs/LobTackInd";
jest.mock("../../../../../../components/interactive/edfis/client/tabs/TabBtnInd", (): (() => JSX.Element) =>
  jest.fn((): JSX.Element => <div>TabBtnInd</div>),
) as typeof jest;
jest.mock("../../../../../../components/interactive/edfis/client/tabs/TabBtnInd", (): (() => JSX.Element) =>
  jest.fn((): JSX.Element => <div>TabInpProg</div>),
) as typeof jest;
jest.mock("../../../../../../components/interactive/edfis/tabs/LobTackInd", (): (() => JSX.Element) =>
  jest.fn((): JSX.Element => <div>LockTabInd</div>),
) as typeof jest;
describe("Td Component", (): void => {
  it("should render with IndPerc context", () => {
    render(<Td nRow={1} nCol={2} ctx='IndPerc' lab='IMC' />) as RenderResult;
    const td = screen.getByRole("cell") as HTMLTableCellElement;
    (expect(td) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
    (expect(td.querySelector("label")) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
    (expect(TabInpProg) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[any, object]>(
      (expect as jest.Expect).objectContaining<{
        ctx: string;
        lab: string;
      }>({ ctx: "IndPerc", lab: "IMC" }),
      {},
    );
    (expect(TabBtnInd) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    (expect(LockTabInd) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  it("should render with MedAnt context", () => {
    render(<Td nRow={1} nCol={2} ctx='MedAnt' lab='Peso' />) as RenderResult;
    const td = screen.getByRole("cell") as HTMLTableCellElement;
    (expect(td) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
    (expect(td.querySelector("label")) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
    (expect(TabInpProg) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      [jest.JestMatchers<jest.SpyInstance<any, any, any>>]
    >(
      ((expect as jest.Expect).objectContaining<{
        ctx: string;
        lab: string;
      }>({ ctx: "MedAnt", lab: "Peso" }),
      {}) as jest.JestMatchers<jest.SpyInstance>,
    ) as void;
  }) as void;
}) as void;
