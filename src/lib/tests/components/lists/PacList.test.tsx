import { render, screen, waitFor, fireEvent, RenderResult } from "@testing-library/react";
import PacList from "../../../../../components/lists/PacList";
import "@testing-library/jest-dom/extend-expect";
import { handleFetch } from "../../../../pages/api/ts/handlers";
jest.mock("react-dom/client", (): { createRoot: jest.Mock<any, any, any> } => ({
  createRoot: jest.fn().mockReturnValue({
    render: jest.fn(),
    unmount: jest.fn(),
  }),
}));
jest.mock(
  "../../../../../pages/api/ts/handlers",
  (): {
    handleFetch: jest.Mock<any, any, any>;
  } => ({
    handleFetch: jest.fn(),
  })
);
jest.mock(
  "../../../../../components/consRegst/ErrorFallbackDlg",
  (): (() => JSX.Element) => (): JSX.Element => <div>ErrorFallbackDlg</div>
);
jest.mock("../../../../../components/icons/Spinner", (): (() => JSX.Element) => (): JSX.Element => <div>Spinner</div>);
jest.mock(
  "../../../../../components/consRegst/PacRow",
  (): (() => JSX.Element) => (): JSX.Element => <div>PacRow</div>
);
describe("PacList Component", (): void => {
  const mockDispatch = jest.fn();
  const mockSetDisplayRowData = jest.fn();
  const defaultProps = {
    shouldDisplayRowData: true,
    setDisplayRowData: mockSetDisplayRowData,
    dispatch: mockDispatch,
    shouldShowAlocBtn: true,
    state: true,
    userClass: "coordenador",
  };
  const renderComponent = (): RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > => render(<PacList {...defaultProps} />);
  beforeEach((): void => {
    (handleFetch as jest.Mock).mockResolvedValue([
      {
        name: "Pac1",
        tel: "1234",
        email: "pac1@example.com",
        next_appointed_day: "2024-09-25",
        treatment_beg: "2024-09-01",
        treatment_end: "2024-09-30",
        current_status: "Active",
        signature: "Signature1",
        historic: "History1",
        idf: "pac1",
      },
      {
        name: "Pac2",
        tel: "5678",
        email: "pac2@example.com",
        next_appointed_day: "2024-09-26",
        treatment_beg: "2024-09-02",
        treatment_end: "2024-09-29",
        current_status: "Inactive",
        signature: "Signature2",
        historic: "History2",
        idf: "pac2",
      },
    ]);
  });
  test("renders PacList table with fetched data", async (): Promise<void> => {
    renderComponent();
    await waitFor((): void =>
      expect(handleFetch).toHaveBeenCalledWith<Parameters<typeof handleFetch>>("patients", "_table", true)
    );
    expect(screen.getByText<HTMLElement>(/Pac1/i)).toBeInTheDocument();
    expect(screen.getByText<HTMLElement>(/Pac2/i)).toBeInTheDocument();
  });
  test("renders Spinner while fetching data", async (): Promise<void> => {
    renderComponent();
    expect(screen.getByText<HTMLElement>(/Loading Patients Table/i)).toBeInTheDocument();
  });
  test("renders ErrorFallbackDlg on fetch failure", async (): Promise<void> => {
    (handleFetch as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));
    renderComponent();
    await waitFor((): void => expect(screen.getByText<HTMLDialogElement>(/ErrorFallbackDlg/i)).toBeInTheDocument());
  });
  test("validates table rendering and column headers", async (): Promise<void> => {
    renderComponent();
    await waitFor((): void => {
      const table = screen.getByRole<HTMLTableElement>("table", { name: /Lista Recuperada/i });
      expect(table).toBeInTheDocument();
      expect(table.querySelectorAll<HTMLTableCellElement>("th")).toHaveLength(12);
    });
  });
  test("dispatches on Escape keydown event to close the dialog", async (): Promise<void> => {
    renderComponent();
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor((): void =>
      expect(mockSetDisplayRowData).toHaveBeenCalledWith<Parameters<typeof mockSetDisplayRowData>>(
        !defaultProps.shouldDisplayRowData
      )
    );
  });
});
