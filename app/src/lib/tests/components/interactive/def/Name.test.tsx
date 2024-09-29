import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { handleEventReq, handleCondtReq } from "@/lib/global/handlers/gHandlers";
import Name from "../../../../../../components/interactive/def/Name";
jest.mock(
  "@/lib/global/handlers/gHandlers",
  (): {
    handleEventReq: jest.Mock<any, any, any>;
    handleCondtReq: jest.Mock<any, any, any>;
  } => ({
    handleEventReq: jest.fn() as jest.Mock,
    handleCondtReq: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("Name Component", (): void => {
  test("renders all input fields and calls handleEventReq on first and last name", (): void => {
    render(<Name />) as RenderResult;
    const firstNameInput = screen.getByLabelText(/Primeiro Nome/i) as HTMLInputElement;
    const lastNameInput = screen.getByLabelText(/Último Sobrenome/i) as HTMLInputElement;
    const middleNameInput = screen.getByLabelText(/Sobrenome\(s\)/i) as HTMLInputElement;
    fireEvent.input(firstNameInput, { target: { value: "John" } }) as boolean;
    fireEvent.input(lastNameInput, { target: { value: "Doe" } }) as boolean;
    fireEvent.input(middleNameInput, { target: { value: "Michael" } }) as boolean;
    (
      expect(handleEventReq) as jest.JestMatchers<jest.SpyInstance> as jest.JestMatchers<jest.SpyInstance>
    ).toHaveBeenCalledWith<[HTMLInputElement]>(firstNameInput) as void;
    (
      expect(handleEventReq) as jest.JestMatchers<jest.SpyInstance> as jest.JestMatchers<jest.SpyInstance>
    ).toHaveBeenCalledWith<[HTMLInputElement]>(lastNameInput) as void;
    (
      expect(handleCondtReq) as jest.JestMatchers<jest.SpyInstance> as jest.JestMatchers<jest.SpyInstance>
    ).toHaveBeenCalledWith<[HTMLInputElement, { min: number; max: number; pattern: string[] }]>(middleNameInput, {
      min: 3,
      max: 99,
      pattern: ["[^0-9]", "gi"],
    }) as void;
  }) as void;
  test("renders required attributes for the last name input", (): void => {
    render(<Name />) as RenderResult;
    const lastNameInput = screen.getByLabelText(/Último Sobrenome/i) as HTMLInputElement;
    (
      expect(lastNameInput) as jest.JestMatchers<jest.SpyInstance> as jest.JestMatchers<jest.SpyInstance>
    ).toBeRequired() as void;
    (
      expect(lastNameInput.minLength) as jest.JestMatchers<jest.SpyInstance> as jest.JestMatchers<jest.SpyInstance>
    ).toBe<number>(3) as void;
    (
      expect(lastNameInput.maxLength) as jest.JestMatchers<jest.SpyInstance> as jest.JestMatchers<jest.SpyInstance>
    ).toBe<number>(99) as void;
  }) as void;
}) as void;
