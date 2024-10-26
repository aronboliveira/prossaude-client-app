import { render, fireEvent, screen, RenderResult } from "@testing-library/react";
import { handleCondtReq } from "@/lib/global/handlers/gHandlers";
import SocialName from "../../../../../../components/interactive/def/SocialName";
jest.mock(
  "@/lib/global/handlers/gHandlers",
  (): {
    handleCondtReq: jest.Mock<any, any, any>;
  } => ({
    handleCondtReq: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("SocialName Component", (): void => {
  test("renders the social name input field and calls handleCondtReq on input", (): void => {
    render(<SocialName />) as RenderResult;
    const socialNameInput = screen.getByLabelText(/Nome Social/i) as HTMLInputElement;
    fireEvent.input(socialNameInput, { target: { value: "Preferred Name" } }) as boolean;
    (
      expect(handleCondtReq) as jest.JestMatchers<jest.SpyInstance> as jest.JestMatchers<jest.SpyInstance>
    ).toHaveBeenCalledWith<[HTMLInputElement, { min: number; max: number; pattern: string[] }]>(socialNameInput, {
      min: 3,
      max: 99,
      pattern: ["[^0-9]", "gi"],
    }) as void;
  }) as void;
}) as void;
