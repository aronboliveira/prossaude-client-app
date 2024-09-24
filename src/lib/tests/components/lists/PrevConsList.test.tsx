import { render, screen, fireEvent, waitFor, RenderResult } from "@testing-library/react";
import PrevConsList from "../../../../../components/lists/PrevConsList";
import "@testing-library/jest-dom/extend-expect";
jest.mock(
  "react-error-boundary",
  (): {
    ErrorBoundary: jest.Mock<any, any, any>;
  } => ({
    ErrorBoundary: jest
      .fn()
      .mockImplementation(({ children }: { children: JSX.Element[] }): JSX.Element => <>{children}</>),
  })
);
jest.mock(
  "../../../../../components/error/GenericErrorComponent",
  (): {
    __esModule: true;
    default: () => JSX.Element;
  } => ({
    __esModule: true,
    default: (): JSX.Element => <div>GenericErrorComponent</div>,
  })
);
jest.mock(
  "../../../../../components/prevCons/PrevConsRow",
  (): {
    __esModule: boolean;
    default: () => JSX.Element;
  } => ({
    __esModule: true,
    default: (): JSX.Element => (
      <tr>
        <td>PrevConsRow</td>
      </tr>
    ),
  })
);
describe("PrevConsList Component", (): void => {
  const mockDispatch = jest.fn();
  const defaultProps: {
    dispatch: jest.Mock<any, any, any>;
    state: boolean;
    name: string;
    historic: {
      type: string;
      day: string;
      prof: string;
      stud: string;
      notes: string;
    }[];
  } = {
    dispatch: mockDispatch,
    state: true,
    name: "John Doe",
    historic: [
      { type: "avaliacao", day: "2024-09-22", prof: "Prof A", stud: "Stud A", notes: "Notes A" },
      { type: "diagnostico", day: "2024-09-20", prof: "Prof B", stud: "Stud B", notes: "Notes B" },
    ],
  };
  const renderComponent = (): RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > =>
    render(
      <PrevConsList
        {...{
          dispatch: mockDispatch,
          state: true,
          name: "John Doe",
          historic: [
            { type: "avaliacao", day: "2024-09-22", prof: "Prof A", stud: "Stud A", notes: "Notes A" },
            { type: "diagnostico", day: "2024-09-20", prof: "Prof B", stud: "Stud B", notes: "Notes B" },
          ],
        }}
      />
    );
  beforeEach((): void => {
    jest.clearAllMocks();
  });
  test("renders the dialog and table with historic data", async (): Promise<void> => {
    renderComponent();
    await waitFor((): void => {
      expect(screen.getByRole<HTMLDialogElement>("dialog")).toBeInTheDocument();
      expect(screen.getAllByText<HTMLTableRowElement>(/PrevConsRow/)).toHaveLength(2);
    });
  });
  test("calls dispatch when close button is clicked", async (): Promise<void> => {
    renderComponent();
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button"));
    expect(mockDispatch).toHaveBeenCalledWith<Parameters<typeof mockDispatch>>(!defaultProps.state);
  });
  test("renders GenericErrorComponent on error", async (): Promise<void> => {
    jest.spyOn<Console, "error">(console, "error").mockImplementation((): void => {});
    jest.mock(
      "../../../../../components/error/GenericErrorComponent",
      (): {
        __esModule: true;
        default: () => JSX.Element;
      } => ({
        __esModule: true,
        default: (): JSX.Element => <div>GenericErrorComponent</div>,
      })
    );
    renderComponent();
    expect(screen.getByText<HTMLElement>("GenericErrorComponent")).toBeInTheDocument();
  });
});
