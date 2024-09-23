import { RenderResult, render, screen } from "@testing-library/react";
import PrevConsRow from "../../../../../components/lists/PrevConsRow";
import "@testing-library/jest-dom/extend-expect";
describe("PrevConsRow Component", () => {
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
      />
    );
  test("renders historic row with correct data", async (): Promise<void> => {
    renderComponent();
    expect(screen.getByText<HTMLTableCellElement>("John Doe")).toBeInTheDocument();
    expect(screen.getByText<HTMLTableCellElement>("22/09/2024")).toBeInTheDocument();
    expect(screen.getByText<HTMLTableCellElement>("Avaliação Antropométrica")).toBeInTheDocument();
    expect(screen.getByText<HTMLTableCellElement>("Prof A")).toBeInTheDocument();
    expect(screen.getByText<HTMLTableCellElement>("Stud A")).toBeInTheDocument();
    expect(screen.getByText<HTMLTableCellElement>("Notes A")).toBeInTheDocument();
  });

  test("renders fallback for missing values", async () => {
    render(
      <PrevConsRow
        {...{
          historic: { type: "avaliacao", day: "", prof: "", stud: "", notes: "" },
          nRow: 1,
          name: "Anonymous",
        }}
      />
    );
    expect(screen.getByText<HTMLTableCellElement>("Sem observações")).toBeInTheDocument();
    expect(screen.getByText<HTMLTableCellElement>("Anônimo")).toBeInTheDocument();
  });
});
