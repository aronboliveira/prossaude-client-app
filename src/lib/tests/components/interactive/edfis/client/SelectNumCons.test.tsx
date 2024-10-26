import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { switchRequiredCols } from "../../../../../locals/edFisNutPage/edFisNutHandler";
import { tabProps } from "../../../../../../pages/edfis";
import SelectNumCons from "../../../../../../../components/interactive/edfis/client/SelectNumCons";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleEventReq: jest.Mock<any, any, any>;
  } => ({
    handleEventReq: jest.fn(),
  })
) as typeof jest;
jest.mock(
  "../../../../../lib/locals/edFisNutPage/edFisNutHandler",
  (): {
    parseNotNaN: jest.Mock<any, any, any>;
    switchRequiredCols: jest.Mock<any, any, any>;
  } => ({
    parseNotNaN: jest.fn(),
    switchRequiredCols: jest.fn(),
  })
) as typeof jest;
describe("SelectNumCons Component", (): void => {
  it("should render the SelectNumCons select input", (): void => {
    render(<SelectNumCons />) as RenderResult;
    (
      expect(screen.getByTitle<HTMLSelectElement>("Consulta Lida")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("should call switchRequiredCols on input change", (): void => {
    render(<SelectNumCons />) as RenderResult;
    const select = screen.getByTitle<HTMLSelectElement>("Consulta Lida");
    fireEvent.change(select, { target: { value: "2" } }) as boolean;
    (expect(switchRequiredCols) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof switchRequiredCols>
    >(
      [
        select,
        document.getElementById("fsProgConsId") as HTMLFieldSetElement,
        document.getElementById("tabDCut") as HTMLTableElement,
      ],
      tabProps.numCons as number,
      tabProps.areNumConsOpsValid as boolean
    ) as void;
  }) as void;
}) as void;
