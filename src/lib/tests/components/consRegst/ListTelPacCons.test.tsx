import { render, screen, waitFor } from "@testing-library/react";
import ListTelPacCons from "../../../../../components/consRegst/ListTelPacCons";
import { handleFetch } from "../../../../pages/api/ts/handlers";
import { createRoot } from "react-dom/client";
import { panelRoots } from "../../../../../components/panelForms/defs/client/SelectPanel";
jest.mock(
  "../../../../pages/api/ts/handlers",
  (): {
    handleFetch: jest.Mock<any, any, any>;
  } => ({
    handleFetch: jest.fn(),
  })
);
jest.mock(
  "react-dom/client",
  (): {
    createRoot: jest.Mock<
      {
        render: jest.Mock<any, any, any>;
        unmount: jest.Mock<any, any, any>;
      },
      [],
      any
    >;
  } => ({
    createRoot: jest.fn(() => ({
      render: jest.fn(),
      unmount: jest.fn(),
    })),
  })
);
describe("<ListTelPacCons />", (): void => {
  const mockPacs = [
    { name: "John Doe", tel: "123-456-7890", email: "john@example.com" },
    { name: "Jane Smith", tel: "987-654-3210", email: "jane@example.com" },
  ];
  beforeEach((): void => {
    jest.clearAllMocks();
  });
  test("renders datalist and fetches patient data", async (): Promise<void> => {
    (handleFetch as jest.Mock).mockResolvedValue(mockPacs);
    render(<ListTelPacCons />);
    expect(screen.getByRole<HTMLElement>("listbox")).toBeInTheDocument();
    await waitFor((): void =>
      mockPacs.forEach((pac): void =>
        expect(screen.getByDisplayValue<HTMLInputElement>(pac.tel.trim())).toBeInTheDocument()
      )
    );
  });
  test("renders error fallback on error", async (): Promise<void> => {
    (handleFetch as jest.Mock).mockRejectedValue(new Error("Fetch Error"));
    render(<ListTelPacCons />);
    await waitFor((): void => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
    expect(createRoot).not.toHaveBeenCalled();
  });
  test("syncs aria states after fetch", async () => {
    (handleFetch as jest.Mock).mockResolvedValue(mockPacs);
    render(<ListTelPacCons />);
    await waitFor(() => expect(screen.getByDisplayValue<HTMLInputElement>(mockPacs[0].tel.trim())).toBeInTheDocument());
    await waitFor(() => {
      screen.getAllByRole<HTMLOptionElement>("option").forEach(option => {
        expect(option).toHaveAttribute("aria-selected");
      });
    });
  });
  test("renders options correctly in datalist", async () => {
    (handleFetch as jest.Mock).mockResolvedValue(mockPacs);
    render(<ListTelPacCons />);
    await waitFor(() =>
      mockPacs.forEach((pac): void => expect(screen.getByText<HTMLInputElement>(pac.name)).toBeInTheDocument())
    );
  });
  test("unmounts panelRoot if it already exists", async () => {
    (handleFetch as jest.Mock).mockResolvedValue(mockPacs);
    panelRoots["listTelPacCons"] = { unmount: jest.fn(), render: jest.fn() };
    render(<ListTelPacCons />);
    await waitFor((): void => expect(panelRoots["listTelPacCons"]?.unmount).toHaveBeenCalled());
  });
});
