import { render, screen, waitFor, fireEvent, RenderResult } from "@testing-library/react";
import AvStudListDlg from "../../../../../components/lists/AvStudListDlg";
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
  })
) as typeof jest;
jest.mock(
  "../../../../../components/consRegst/ErrorFallbackDlg",
  (): (() => JSX.Element) => (): JSX.Element => <div>ErrorFallbackDlg</div>
) as typeof jest;
jest.mock(
  "../../../../../components/consRegst/StudList",
  (): (() => JSX.Element) => (): JSX.Element => <div>StudList</div>
) as typeof jest;
describe("AvStudListDlg Component", (): void => {
  const mockDispatch = jest.fn() as jest.Mock;
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
    jest.clearAllMocks() as typeof jest;
  }) as void;
  test("renders the dialog with StudList", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (await waitFor((): void => {
      expect(screen.getByText<HTMLElement>(/Estudantes Cadastrados/i)).toBeInTheDocument() as void;
      expect(screen.getByText<HTMLElement>(/StudList/i)).toBeInTheDocument() as void;
    })) as void;
  }) as void;
  test("handles escape keydown event to close the dialog", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.keyDown(document, { key: "Escape" }) as boolean;
    await waitFor((): void =>
      expect(mockDispatch).toHaveBeenCalledWith<Parameters<typeof mockDispatch>>(defaultProps.state)
    );
  }) as void;
  test("renders ErrorFallbackDlg on fetch failure", async (): Promise<void> => {
    (handleFetch as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    await waitFor(
      (): void => expect(screen.getByText<HTMLDialogElement>(/ErrorFallbackDlg/i)).toBeInTheDocument() as void
    );
  }) as void;
  test("dispatches on close button click", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: /close/i })) as boolean;
    await waitFor((): void =>
      expect(mockDispatch).toHaveBeenCalledWith<Parameters<typeof mockDispatch>>(!defaultProps.state)
    );
  }) as void;
  test("validates dialog opening and aria states synchronization", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (await waitFor((): void => {
      expect(screen.getByRole<HTMLDialogElement>("dialog")).toBeInTheDocument() as void;
    })) as void;
  }) as void;
}) as void;
