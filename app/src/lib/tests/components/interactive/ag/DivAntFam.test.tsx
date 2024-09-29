import { render, screen } from "@testing-library/react";
import DivAntFam from "../../../../../../components/interactive/ag/DivAntFam";
import { textTransformPascal } from "../../../../../lib/global/gModel";
jest.mock(
  "../../../../../lib/global/gModel",
  (): {
    textTransformPascal: jest.Mock<any, [str: any], any>;
  } => ({
    textTransformPascal: jest.fn(str => str.charAt(0).toUpperCase() + str.slice(1)),
  })
) as typeof jest;
describe("DivAntFam Component", (): void => {
  it("renders family members checkboxes with transformed names", (): void => {
    render(<DivAntFam name='family_test' fullName='Test Family' />);
    (
      expect(screen.getByLabelText<HTMLInputElement>("Mãe — Test Family")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByLabelText<HTMLInputElement>("Pai — Test Family")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("uses PascalCase for transformed name", (): void => {
    render(<DivAntFam name='family_test' />);
    (expect(textTransformPascal) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof textTransformPascal>
    >("family") as void;
  }) as void;
}) as void;
