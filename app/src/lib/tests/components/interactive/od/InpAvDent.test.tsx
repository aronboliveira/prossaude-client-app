import { render, fireEvent, screen, RenderResult } from "@testing-library/react";
import { handleEventReq } from "../../../../global/handlers/gHandlers";
import { clearQuadrInps } from "../../../../locals/odPage/odHandler";
import { resetAvDentValue } from "../../../../locals/odPage/odModel";
import InpAvDent from "../../../../../../components/interactive/od/InpAvDent";
jest.mock(
  "../../../../lib/global/handlers/gHandlers",
  (): {
    handleEventReq: jest.Mock<any, any, any>;
  } => ({
    handleEventReq: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "../../../../lib/locals/odPage/odHandler",
  (): {
    clearQuadrInps: jest.Mock<any, any, any>;
    resetAvDentValue: jest.Mock<any, any, any>;
  } => ({
    clearQuadrInps: jest.fn() as jest.Mock,
    resetAvDentValue: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("InpAvDent Component", (): void => {
  it("should render input with correct attributes", (): void => {
    (
      expect(render(<InpAvDent qr='SupDir' num={3} />) as RenderResult) as jest.JestMatchers<jest.SpyInstance>
    ).toBeDefined() as void;
    const input = screen.getByRole<HTMLInputElement>("textbox", { name: /Estado do Dente 3/i }) as HTMLInputElement;
    (expect(input) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
    (expect(input) as jest.JestMatchers<jest.SpyInstance>).toHaveAttribute("list", "avElemD3") as void;
  }) as void;
  it("should call handleEventReq on input", (): void => {
    render(<InpAvDent qr='InfEsq' num={3} />) as RenderResult;
    const input = screen.getByRole<HTMLInputElement>("textbox", { name: /Estado do Dente 3/i }) as HTMLInputElement;
    fireEvent.input(input, { target: { value: "Careado" } }) as boolean;
    (expect(handleEventReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[HTMLInputElement]>(
      input
    ) as void;
  }) as void;
  it("should call resetAvDentValue and clearQuadrInps on click", (): void => {
    render(<InpAvDent qr='SupEsq' num={3} />) as RenderResult;
    const input = screen.getByRole<HTMLInputElement>("textbox", { name: /Estado do Dente 3/i }) as HTMLInputElement;
    fireEvent.click(input) as boolean;
    (expect(resetAvDentValue) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[HTMLInputElement]>(
      input
    ) as void;
    (expect(clearQuadrInps) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[HTMLInputElement]>(
      input
    ) as void;
  });
});
