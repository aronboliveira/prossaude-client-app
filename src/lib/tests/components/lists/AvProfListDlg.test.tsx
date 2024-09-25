import { RenderResult, render, screen, waitFor } from "@testing-library/react";
import AvProfListDlg from "../../../../../components/lists/AvProfListDlg";
import { handleFetch } from "../../../../pages/api/ts/handlers";
import { panelRoots } from "../../../../../components/panelForms/defs/client/SelectPanel";
import { createRoot } from "react-dom/client";
import { MutableRefObject } from "react";
import { fireEvent } from "@testing-library/react";
import { nullishDlg } from "@/lib/global/declarations/types";
import "@testing-library/jest-dom/extend-expect";
jest.mock("react-dom/client", (): { createRoot: jest.Mock<any, any, any> } => ({
  createRoot: jest.fn().mockReturnValue({
    render: jest.fn(),
    unmount: jest.fn(),
  }),
})) as typeof jest;
jest.mock("../../../../../pages/api/ts/handlers", (): { handleFetch: jest.Mock<any, any, any> } => ({
  handleFetch: jest.fn(),
})) as typeof jest;
jest.mock(
  "../../../../../components/consRegst/ErrorFallbackDlg",
  (): (() => JSX.Element) => (): JSX.Element => <div>ErrorFallbackDlg</div>
) as typeof jest;
jest.mock(
  "../../../../../components/icons/Spinner",
  (): (() => JSX.Element) => (): JSX.Element => <div>Spinner</div>
) as typeof jest;
describe("AvProfListDlg useEffect tests", (): void => {
  const mockDispatch = jest.fn();
  const defaultProps = {
    dispatch: mockDispatch,
    state: true,
    btnProf: document.createElement("button") as HTMLButtonElement,
    userClass: "coordenador",
    mainDlgRef: {
      current: document.createElement("dialog"),
    } as MutableRefObject<nullishDlg>,
  };
  const renderComponent = (): RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > => render(<AvProfListDlg {...defaultProps} />);
  beforeEach((): void => {
    (handleFetch as jest.Mock).mockResolvedValue([
      {
        name: "Pac1",
        tel: "1234",
        email: "pac1@example.com",
        area: "Dentistry",
        start_day: "2024-09-22",
        end_day: "2024-10-01",
        day: "Monday",
        idf: "pac1",
        external: false,
      },
      {
        name: "Pac2",
        tel: "5678",
        email: "pac2@example.com",
        area: "Physiotherapy",
        start_day: "2024-09-22",
        end_day: "2024-10-01",
        day: "Tuesday",
        idf: "pac2",
        external: true,
      },
    ]);
  });
  test("handles rendering of internal and external professionals", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    await waitFor((): void =>
      expect(handleFetch).toHaveBeenCalledWith<Parameters<typeof handleFetch>>("profs", "_table", true)
    );
    expect(screen.getByText<HTMLElement>(/Prof1/i)).toBeInTheDocument() as void;
    expect(screen.getByText<HTMLElement>(/Prof2/i)).toBeInTheDocument() as void;
  });
  test("handles table rendering and element validation", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    await waitFor((): void => {
      expect(handleFetch).toHaveBeenCalled() as void;
      expect(screen.getByRole<HTMLTableElement>("table", { name: /Membros Internos/i })).toBeInTheDocument() as void;
      expect(screen.getByRole<HTMLTableElement>("table", { name: /Membros Externos/i })).toBeInTheDocument() as void;
    });
  });
  test("handles panelRoots and creates roots for tables", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    await waitFor((): void => expect(handleFetch).toHaveBeenCalled());
    expect(createRoot).toHaveBeenCalledTimes(2) as void;
    expect(panelRoots["profsIntTbody"]).toBeDefined();
    expect(panelRoots["profsExtTbody"]).toBeDefined();
  });
  test("renders Spinner component while fetching data", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    expect(screen.getByText<HTMLElement>(/Loading Internal Professionals Table/i)).toBeInTheDocument() as void;
    expect(screen.getByText<HTMLElement>(/Loading External Professionals Table/i)).toBeInTheDocument() as void;
  });

  test("renders ErrorFallbackDlg on fetch failure", async (): Promise<void> => {
    (handleFetch as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    await waitFor(
      (): void => expect(screen.getByText<HTMLDialogElement>(/ErrorFallbackDlg/i)).toBeInTheDocument() as void
    );
  });
  test("validates table elements and triggers table adjustments", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    await waitFor((): void => {
      expect(
        screen.getByRole<HTMLTableElement>("table", { name: /Membros Internos/i }).querySelectorAll("th").length
      ).toBeGreaterThan(0);
      expect(
        screen.getByRole<HTMLTableElement>("table", { name: /Membros Externos/i }).querySelectorAll("th").length
      ).toBeGreaterThan(0);
    });
  });
  test("handles Escape keydown to close the dialog", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor((): void =>
      expect(mockDispatch).toHaveBeenCalledWith<Parameters<typeof mockDispatch>>(!defaultProps.state)
    );
  });
});
