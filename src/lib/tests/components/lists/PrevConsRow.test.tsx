import { RenderResult, render, screen } from "@testing-library/react";
import PrevConsRow from "../../../../../components/lists/PrevConsRow";
import "@testing-library/jest-dom/extend-expect";
describe("PrevConsRow Component", (): void => {
  const renderComponent = (): RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > =>
    render(
      <PrevConsRow
        {...{
          historic: { type: "avaliacao", day: "2024-09-22", prof: "Prof A", stud: "Stud A", notes: "Notes A" },
          nRow: 1,
          name: "John Doe",
        }}
      />,
    );
  test("renders historic row with correct data", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (
      expect(screen.getByText<HTMLTableCellElement>("John Doe")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByText<HTMLTableCellElement>("22/09/2024")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByText<HTMLTableCellElement>("Avaliação Antropométrica")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByText<HTMLTableCellElement>("Prof A")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByText<HTMLTableCellElement>("Stud A")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByText<HTMLTableCellElement>("Notes A")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("renders fallback for missing values", (): void => {
    render(
      <PrevConsRow
        {...{
          historic: { type: "avaliacao", day: "", prof: "", stud: "", notes: "" },
          nRow: 1,
          name: "Anonymous",
        }}
      />,
    );
    (
      expect(screen.getByText<HTMLTableCellElement>("Sem observações")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByText<HTMLTableCellElement>("Anônimo")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
}) as void;
