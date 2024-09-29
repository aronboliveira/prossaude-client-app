import { RenderResult, render } from "@testing-library/react";
import ThDate from "../../../../../../components/panelForms/schedule/ThDate";
describe("ThDate Component", (): void => {
  test("renders date input based on column number", (): void => {
    const input = (render(<ThDate nCol={3} last={false} />) as RenderResult).getByLabelText(
      /dia do mês/i
    ) as HTMLInputElement;
    (expect(input) as jest.JestMatchers<HTMLElement>).toBeInTheDocument() as void;
    (expect(input.dataset.title) as jest.JestMatchers<HTMLElement>).toContain<string>("Terceiro dia") as void;
  }) as void;
  test("renders last column with additional class", (): void => {
    (
      expect(
        ((render(<ThDate nCol={10} last={true} />) as RenderResult).getByRole("columnheader") as HTMLTableCellElement)
          .className
      ) as jest.JestMatchers<HTMLElement>
    ).toContain<string>("lastConsDayCont") as void;
  }) as void;
}) as void;
