import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { changeTabDCutLayout } from "../../../../../locals/edFisNutPage/edFisNutModel";
import Protocolo from "../../../../../../../components/interactive/edfis/client/Protocolo";
jest.mock(
  "../../../../../lib/locals/edFisNutPage/edFisNutModel",
  (): {
    changeTabDCutLayout: jest.Mock<any, any, any>;
  } => ({
    changeTabDCutLayout: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("Protocolo Component", (): void => {
  it("should render the Protocolo select input", (): void => {
    render(<Protocolo />) as RenderResult;
    (
      expect(screen.getByTitle<HTMLSelectElement>("Protocolo_DCut")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument();
  }) as void;
  it("should call changeTabDCutLayout when an option is selected", (): void => {
    render(<Protocolo />) as RenderResult;
    const select = screen.getByTitle<HTMLSelectElement>("Protocolo_DCut");
    fireEvent.change(select, { target: { value: "pollock3" } }) as boolean;
    (expect(changeTabDCutLayout) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof changeTabDCutLayout>
    >(
      select,
      document.getElementById("tabDCut") as HTMLTableElement,
      document.getElementById("textBodytype") as HTMLSelectElement
    ) as void;
  }) as void;
}) as void;
