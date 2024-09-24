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
);
describe("DivAntFam Component", (): void => {
  it("renders family members checkboxes with transformed names", (): void => {
    render(<DivAntFam name='family_test' fullName='Test Family' />);
    expect(screen.getByLabelText<HTMLInputElement>("Mãe — Test Family")).toBeInTheDocument();
    expect(screen.getByLabelText<HTMLInputElement>("Pai — Test Family")).toBeInTheDocument();
  });
  it("uses PascalCase for transformed name", (): void => {
    render(<DivAntFam name='family_test' />);
    expect(textTransformPascal).toHaveBeenCalledWith<Parameters<typeof textTransformPascal>>("family");
  });
});
