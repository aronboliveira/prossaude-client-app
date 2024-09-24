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
      .mockImplementation(({ children }: { children: JSX.Element[] }): JSX.Element => <>{children}</>),
  })
);
jest.mock(
  "../../../../../components/icons/Spinner",
  (): {
    __esModule: true;
    default: () => JSX.Element;
  } => ({
    __esModule: true,
    default: (): JSX.Element => <div>Spinner</div>,
  })
);
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
);
jest.mock(
  "@/pages/api/ts/handlers",
  (): {
    handleFetch: jest.Mock<any, any, any>;
  } => ({
    handleFetch: jest.fn().mockResolvedValue([
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
);
describe("StudList Component", (): void => {
  const mockDispatch = jest.fn();
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
    jest.clearAllMocks();
  });
  test("renders the table with students data", async (): Promise<void> => {
    renderComponent();
    await waitFor((): void => {
      expect(screen.getByRole<HTMLTableElement>("table")).toBeInTheDocument();
      expect(screen.getAllByText<HTMLTableRowElement>(/StudRow/)).toHaveLength(2);
    });
  });
  test("displays the spinner while fetching data", async (): Promise<void> => {
    renderComponent();
    expect(screen.getByText<HTMLElement>("Spinner")).toBeInTheDocument();
    await waitFor((): void => {
      expect(screen.queryByText<HTMLElement>("Spinner")).not.toBeInTheDocument();
    });
  });
  test("handles close event and dispatches state toggle", async (): Promise<void> => {
    renderComponent();
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button"));
    expect(mockDispatch).toHaveBeenCalledWith<Parameters<typeof mockDispatch>>(!defaultProps.state);
  });
  test("handles error and renders error fallback component", async (): Promise<void> => {
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
    await waitFor((): void => {
      expect(screen.getByText<HTMLElement>("GenericErrorComponent")).toBeInTheDocument();
    });
  });

  test("fetches and renders student data", async (): Promise<void> => {
    renderComponent();
    await waitFor((): void => {
      expect(screen.getByText<HTMLElement>("Student A")).toBeInTheDocument();
      expect(screen.getByText<HTMLElement>("Student B")).toBeInTheDocument();
    });
  });
  test("handles errors in fetch and displays fallback", async (): Promise<void> => {
    jest.spyOn<Console, "error">(console, "error").mockImplementation((): void => {});
    jest.mock(
      "@/pages/api/ts/handlers",
      (): {
        handleFetch: jest.Mock<any, any, any>;
      } => ({
        handleFetch: jest.fn().mockRejectedValueOnce(new Error("Fetch error")),
      })
    );
    renderComponent();
    await waitFor((): void => {
      expect(screen.getByText<HTMLElement>("GenericErrorComponent")).toBeInTheDocument();
    });
  });
});
