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
      .mockImplementation(({ children }: { children: JSX.Element[] }): JSX.Element => <>{children}</>) as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../../components/error/GenericErrorComponent",
  (): {
    __esModule: true;
    default: () => JSX.Element;
  } => ({
    __esModule: true,
    default: (): JSX.Element => <div>GenericErrorComponent</div>,
  }),
) as typeof jest;
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
  }),
) as typeof jest;
describe("PrevConsList Component", (): void => {
  const mockDispatch = jest.fn() as jest.Mock;
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
      />,
    );
  beforeEach((): void => {
    jest.clearAllMocks() as typeof jest;
  }) as void;
  test("renders the dialog and table with historic data", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (await waitFor((): void => {
      expect(screen.getByRole<HTMLDialogElement>("dialog")).toBeInTheDocument() as void;
      expect(screen.getAllByText<HTMLTableRowElement>(/PrevConsRow/)).toHaveLength(2);
    })) as void;
  }) as void;
  test("calls dispatch when close button is clicked", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button")) as boolean;
    expect(mockDispatch).toHaveBeenCalledWith<Parameters<typeof mockDispatch>>(!defaultProps.state) as void;
  }) as void;
  test("renders GenericErrorComponent on error", (): void => {
    jest.spyOn<Console, "error">(console, "error").mockImplementation((): void => {}) as jest.SpyInstance;
    jest.mock(
      "../../../../../components/error/GenericErrorComponent",
      (): {
        __esModule: true;
        default: () => JSX.Element;
      } => ({
        __esModule: true,
        default: (): JSX.Element => <div>GenericErrorComponent</div>,
      }),
    ) as typeof jest;
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    expect(screen.getByText<HTMLElement>("GenericErrorComponent")).toBeInTheDocument() as void;
  }) as void;
}) as void;
