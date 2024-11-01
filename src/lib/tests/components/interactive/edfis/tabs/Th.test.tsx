import { RenderResult, render } from "@testing-library/react";
import Th from "../../../../../../../components/interactive/edfis/tabs/Th";
describe("Th Component", (): void => {
  it("should render with a label when lab is provided", (): void => {
    const { getByRole } = render(<Th nRow={1} nCol={2} ctx='IndPerc' lab='IMC' />) as RenderResult;
    const th = getByRole("columnheader") as HTMLTableCellElement;
    (expect(th) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
    (expect(th.textContent) as jest.JestMatchers<jest.SpyInstance>).toBe<string>("IMC") as void;
  }) as void;
  it("should render column number when lab is not provided", (): void => {
    const { getByRole } = render(<Th nRow={1} nCol={2} ctx='IndPerc' />) as RenderResult;
    const th = getByRole("columnheader") as HTMLTableCellElement;
    (expect(th) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
    (expect(th.textContent) as jest.JestMatchers<jest.SpyInstance>).toBe<string>("1ª Consulta") as void;
  }) as void;
}) as void;
