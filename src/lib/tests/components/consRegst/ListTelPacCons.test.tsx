import { RenderResult, render, screen, waitFor } from "@testing-library/react";
import ListTelPacCons from "../../../../../components/consRegst/ListTelPacCons";
import { handleFetch } from "../../../../pages/api/ts/handlers";
import { createRoot } from "react-dom/client";
import { panelRoots } from "../../../../../components/panelForms/defs/client/SelectPanel";
jest.mock(
  "../../../../pages/api/ts/handlers",
  (): {
    handleFetch: jest.Mock<any, any, any>;
  } => ({
    handleFetch: jest.fn() as jest.Mock,
  })
) as typeof jest;
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
      render: jest.fn() as jest.Mock,
      unmount: jest.fn() as jest.Mock,
    })),
  })
) as typeof jest;
describe("<ListTelPacCons />", (): void => {
  const mockPacs = [
    { name: "John Doe", tel: "123-456-7890", email: "john@example.com" },
    { name: "Jane Smith", tel: "987-654-3210", email: "jane@example.com" },
  ];
  beforeEach((): void => {
    jest.clearAllMocks() as typeof jest;
  }) as void;
  test("renders datalist and fetches patient data", async (): Promise<void> => {
    (handleFetch as jest.Mock).mockResolvedValue(mockPacs) as jest.Mock;
    render(<ListTelPacCons />);
    (
      expect(screen.getByRole<HTMLElement>("listbox")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    await waitFor((): void =>
      mockPacs.forEach(
        (pac): void =>
          (
            expect(screen.getByDisplayValue<HTMLInputElement>(pac.tel.trim())) as jest.JestMatchers<jest.SpyInstance>
          ).toBeInTheDocument() as void
      )
    );
  }) as void;
  test("renders error fallback on error", async (): Promise<void> => {
    (handleFetch as jest.Mock).mockRejectedValue(new Error("Fetch Error"));
    render(<ListTelPacCons />);
    await waitFor(
      (): void =>
        (
          expect(screen.queryByRole<HTMLSelectElement>("listbox")) as jest.JestMatchers<jest.SpyInstance>
        ).not.toBeInTheDocument() as void
    );
    (expect(createRoot) as jest.JestMatchers<jest.SpyInstance>).not.toHaveBeenCalled() as void;
  }) as void;
  test("syncs aria states after fetch", async (): Promise<void> => {
    (handleFetch as jest.Mock).mockResolvedValue(mockPacs) as jest.Mock;
    render(<ListTelPacCons />) as RenderResult;
    await waitFor(
      () =>
        (
          expect(
            screen.getByDisplayValue<HTMLInputElement>(mockPacs[0].tel.trim())
          ) as jest.JestMatchers<jest.SpyInstance>
        ).toBeInTheDocument() as void
    );
    (await waitFor((): void => {
      screen.getAllByRole<HTMLOptionElement>("option").forEach((option): void => {
        expect(option).toHaveAttribute("aria-selected") as void;
      }) as void;
    })) as void;
  }) as void;
  test("renders options correctly in datalist", async (): Promise<void> => {
    (handleFetch as jest.Mock).mockResolvedValue(mockPacs) as jest.Mock;
    render(<ListTelPacCons />);
    await waitFor((): void =>
      mockPacs.forEach((pac): void => expect(screen.getByText<HTMLInputElement>(pac.name)).toBeInTheDocument() as void)
    );
  }) as void;
  test("unmounts panelRoot if it already exists", async (): Promise<void> => {
    (handleFetch as jest.Mock).mockResolvedValue(mockPacs) as jest.Mock;
    panelRoots["listTelPacCons"] = { unmount: jest.fn() as jest.Mock, render: jest.fn() as jest.Mock };
    render(<ListTelPacCons />);
    await waitFor((): void => expect(panelRoots["listTelPacCons"]?.unmount).toHaveBeenCalled() as void);
  }) as void;
}) as void;
