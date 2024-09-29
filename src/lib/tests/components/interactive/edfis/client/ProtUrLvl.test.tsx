import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { handleCondtReq } from "@/lib/global/handlers/gHandlers";
import ProtUrLvl from "../../../../../../../components/interactive/edfis/client/ProtUrLvl";
jest.mock(
  "@/lib/global/handlers/gHandlers",
  (): {
    handleCondtReq: jest.Mock<any, any, any>;
  } => ({
    handleCondtReq: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("ProtUrLvl Component", (): void => {
  it("should render the ProtUrLvl input", (): void => {
    render(<ProtUrLvl />) as RenderResult;
    (
      expect(screen.getByTitle<HTMLInputElement>("Proteinuria (mg/dL)")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("should call handleCondtReq on input change", (): void => {
    render(<ProtUrLvl />) as RenderResult;
    const input = screen.getByTitle<HTMLInputElement>("Proteinuria (mg/dL)");
    fireEvent.input(input, { target: { value: "123" } }) as boolean;
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
        minNum: 0,
        maxNum: 9999,
        min: 1,
        max: 6,
        pattern: ["^d+$", ""],
      }) as any
    ) as void;
  }) as void;
}) as void;
