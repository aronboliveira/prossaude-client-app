import { render, screen, waitFor, fireEvent, RenderResult } from "@testing-library/react";
import PacList from "../../../../../components/lists/PacList";
import "@testing-library/jest-dom/extend-expect";
import { handleFetch } from "../../../../pages/api/ts/handlers";
jest.mock("react-dom/client", (): { createRoot: jest.Mock<any, any, any> } => ({
  createRoot: (jest.fn() as jest.Mock).mockReturnValue({
    render: jest.fn() as jest.Mock,
    unmount: jest.fn() as jest.Mock,
  }),
})) as typeof jest;
jest.mock(
  "../../../../../pages/api/ts/handlers",
  (): {
    handleFetch: jest.Mock<any, any, any>;
  } => ({
    handleFetch: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../../components/consRegst/ErrorFallbackDlg",
  (): (() => JSX.Element) => (): JSX.Element => <div>ErrorFallbackDlg</div>,
) as typeof jest;
jest.mock(
  "../../../../../components/icons/Spinner",
  (): (() => JSX.Element) => (): JSX.Element => <div>Spinner</div>,
) as typeof jest;
jest.mock(
  "../../../../../components/consRegst/PacRow",
  (): (() => JSX.Element) => (): JSX.Element => <div>PacRow</div>,
) as typeof jest;
describe("PacList Component", (): void => {
  const mockDispatch = jest.fn() as jest.Mock;
  const mockSetDisplayRowData = jest.fn() as jest.Mock;
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
  }) as void;
  test("renders PacList table with fetched data", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    await waitFor((): void =>
      expect(handleFetch).toHaveBeenCalledWith<Parameters<typeof handleFetch>>("patients", "_table", true),
    );
    expect(screen.getByText<HTMLElement>(/Pac1/i)).toBeInTheDocument() as void;
    expect(screen.getByText<HTMLElement>(/Pac2/i)).toBeInTheDocument() as void;
  }) as void;
  test("renders Spinner while fetching data", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    expect(screen.getByText<HTMLElement>(/Loading Patients Table/i)).toBeInTheDocument() as void;
  }) as void;
  test("renders ErrorFallbackDlg on fetch failure", async (): Promise<void> => {
    (handleFetch as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    await waitFor(
      (): void => expect(screen.getByText<HTMLDialogElement>(/ErrorFallbackDlg/i)).toBeInTheDocument() as void,
    );
  }) as void;
  test("validates table rendering and column headers", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (await waitFor((): void => {
      const table = screen.getByRole<HTMLTableElement>("table", { name: /Lista Recuperada/i });
      expect(table).toBeInTheDocument() as void;
      expect(table.querySelectorAll<HTMLTableCellElement>("th")).toHaveLength(12);
    })) as void;
  });
  test("dispatches on Escape keydown event to close the dialog", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.keyDown(document, { key: "Escape" }) as boolean;
    await waitFor((): void =>
      expect(mockSetDisplayRowData).toHaveBeenCalledWith<Parameters<typeof mockSetDisplayRowData>>(
        !defaultProps.shouldDisplayRowData,
      ),
    );
  });
});
