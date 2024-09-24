import { render, screen, waitFor, fireEvent, RenderResult } from "@testing-library/react";
import AvStudListDlg from "../../../../../components/lists/AvStudListDlg";
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
jest.mock(
  "../../../../../components/consRegst/StudList",
  (): (() => JSX.Element) => (): JSX.Element => <div>StudList</div>
);
describe("AvStudListDlg Component", (): void => {
  const mockDispatch = jest.fn();
  const defaultProps = {
    forwardedRef: { current: document.createElement("dialog") },
    dispatch: mockDispatch,
    state: true,
    userClass: "coordenador",
  };
  const renderComponent = (): RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > => render(<AvStudListDlg {...defaultProps} />);
  beforeEach((): void => {
    jest.clearAllMocks();
  });
  test("renders the dialog with StudList", async (): Promise<void> => {
    renderComponent();
    await waitFor((): void => {
      expect(screen.getByText<HTMLElement>(/Estudantes Cadastrados/i)).toBeInTheDocument();
      expect(screen.getByText<HTMLElement>(/StudList/i)).toBeInTheDocument();
    });
  });
  test("handles escape keydown event to close the dialog", async (): Promise<void> => {
    renderComponent();
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor((): void =>
      expect(mockDispatch).toHaveBeenCalledWith<Parameters<typeof mockDispatch>>(defaultProps.state)
    );
  });
  test("renders ErrorFallbackDlg on fetch failure", async (): Promise<void> => {
    (handleFetch as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));
    renderComponent();
    await waitFor((): void => expect(screen.getByText<HTMLDialogElement>(/ErrorFallbackDlg/i)).toBeInTheDocument());
  });
  test("dispatches on close button click", async (): Promise<void> => {
    renderComponent();
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: /close/i }));
    await waitFor((): void =>
      expect(mockDispatch).toHaveBeenCalledWith<Parameters<typeof mockDispatch>>(!defaultProps.state)
    );
  });
  test("validates dialog opening and aria states synchronization", async (): Promise<void> => {
    renderComponent();
    await waitFor((): void => {
      expect(screen.getByRole<HTMLDialogElement>("dialog")).toBeInTheDocument();
    });
  });
});
