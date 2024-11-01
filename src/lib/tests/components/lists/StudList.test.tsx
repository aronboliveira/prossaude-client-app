import { render, screen, fireEvent, waitFor, RenderResult } from "@testing-library/react";
import StudList from "../../../../../components/lists/StudList";
import "@testing-library/jest-dom/extend-expect";
jest.mock(
  "react-error-boundary",
  (): {
    ErrorBoundary: jest.Mock<any, any, any>;
  } => ({
    ErrorBoundary: jest
      .fn()
      .mockImplementation(({ children }: { children: JSX.Element[] }): JSX.Element => <>{children}</>) as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "../../../../../components/icons/Spinner",
  (): {
    __esModule: true;
    default: () => JSX.Element;
  } => ({
    __esModule: true,
    default: (): JSX.Element => <div>Spinner</div>,
  })
) as typeof jest;
jest.mock(
  "../../../../../components/studs/StudRow",
  (): {
    __esModule: boolean;
    default: () => JSX.Element;
  } => ({
    __esModule: true,
    default: (): JSX.Element => (
      <tr>
        <td>StudRow</td>
      </tr>
    ),
  })
) as typeof jest;
jest.mock(
  "@/pages/api/ts/handlers",
  (): {
    handleFetch: jest.Mock<any, any, any>;
  } => ({
    handleFetch: (jest.fn() as jest.Mock).mockResolvedValue([
      {
        name: "Student A",
        tel: "123456789",
        email: "studenta@example.com",
        cpf: "12345678901",
        dre: "001",
        day: "Monday",
      },
      {
        name: "Student B",
        tel: "987654321",
        email: "studentb@example.com",
        cpf: "98765432101",
        dre: "002",
        day: "Tuesday",
      },
    ]),
  })
) as typeof jest;
describe("StudList Component", (): void => {
  const mockDispatch = jest.fn() as jest.Mock;
  const mockMainDlgRef = { current: document.createElement("dialog") };
  const defaultProps = {
    mainDlgRef: mockMainDlgRef,
    dispatch: mockDispatch,
    state: true,
    userClass: "coordenador",
  };
  const renderComponent = (): RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > => render(<StudList {...defaultProps} />);
  beforeEach((): void => {
    jest.clearAllMocks() as typeof jest;
  }) as void;
  test("renders the table with students data", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (await waitFor((): void => {
      expect(screen.getByRole<HTMLTableElement>("table")).toBeInTheDocument() as void;
      expect(screen.getAllByText<HTMLTableRowElement>(/StudRow/)).toHaveLength(2);
    })) as void;
  }) as void;
  test("displays the spinner while fetching data", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    expect(screen.getByText<HTMLElement>("Spinner")).toBeInTheDocument() as void;
    (await waitFor((): void => {
      expect(screen.queryByText<HTMLElement>("Spinner")).not.toBeInTheDocument() as void;
    })) as void;
  }) as void;
  test("handles close event and dispatches state toggle", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button")) as boolean;
    expect(mockDispatch).toHaveBeenCalledWith<Parameters<typeof mockDispatch>>(!defaultProps.state) as void;
  }) as void;
  test("handles error and renders error fallback component", async (): Promise<void> => {
    jest.spyOn<Console, "error">(console, "error").mockImplementation((): void => {}) as jest.SpyInstance;
    jest.mock(
      "../../../../../components/error/GenericErrorComponent",
      (): {
        __esModule: true;
        default: () => JSX.Element;
      } => ({
        __esModule: true,
        default: (): JSX.Element => <div>GenericErrorComponent</div>,
      })
    ) as typeof jest;
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (await waitFor((): void => {
      expect(screen.getByText<HTMLElement>("GenericErrorComponent")).toBeInTheDocument() as void;
    })) as void;
  }) as void;

  test("fetches and renders student data", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (await waitFor((): void => {
      expect(screen.getByText<HTMLElement>("Student A")).toBeInTheDocument() as void;
      expect(screen.getByText<HTMLElement>("Student B")).toBeInTheDocument() as void;
    })) as void;
  }) as void;
  test("handles errors in fetch and displays fallback", async (): Promise<void> => {
    jest.spyOn<Console, "error">(console, "error").mockImplementation((): void => {}) as jest.SpyInstance;
    jest.mock(
      "@/pages/api/ts/handlers",
      (): {
        handleFetch: jest.Mock<any, any, any>;
      } => ({
        handleFetch: (jest.fn() as jest.Mock).mockRejectedValueOnce(new Error("Fetch error")),
      })
    ) as typeof jest;
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (await waitFor((): void => {
      expect(screen.getByText<HTMLElement>("GenericErrorComponent")).toBeInTheDocument() as void;
    })) as void;
  }) as void;
}) as void;
