import { render, screen, waitFor, RenderResult } from "@testing-library/react";
import ListCPFPacCons from "../../../../../components/consRegst/ListCPFPacCons";
import { handleFetch } from "../../../locals/panelPage/handlers/handlers";
import { syncAriaStates } from "../../../../lib/global/handlers/gHandlers";
import { createRoot } from "react-dom/client";
import { elementNotFound, extLine } from "../../../../lib/global/handlers/errorHandler";
import "@testing-library/jest-dom/extend-expect";
import { ConsoleMethod } from "../../testVars";
jest.mock(
  "react-dom/client",
  (): {
    createRoot: jest.Mock<any, any, any>;
  } => ({
    createRoot: (jest.fn() as jest.Mock).mockReturnValue({
      render: jest.fn() as jest.Mock,
      unmount: jest.fn() as jest.Mock,
    }),
  }),
) as typeof jest;
jest.mock(
  "../../../../pages/api/ts/handlers",
  (): {
    handleFetch: jest.Mock<any, any, any>;
  } => ({
    handleFetch: (jest.fn() as jest.Mock).mockResolvedValue([
      { name: "John Doe", idf: "123", tel: "111-1111", email: "johndoe@example.com" },
      { name: "Jane Doe", idf: "456", tel: "222-2222", email: "janedoe@example.com" },
    ]),
  }),
) as typeof jest;
jest.mock(
  "../../../../lib/global/handlers/gHandlers",
  (): {
    syncAriaStates: jest.Mock<any, any, any>;
  } => ({
    syncAriaStates: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
    extLine: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn() as jest.Mock,
    extLine: jest.fn() as jest.Mock,
  }),
) as typeof jest;
describe("ListCPFPacCons Component", (): void => {
  const renderComponent = (): RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > => render(<ListCPFPacCons />);
  test("renders the datalist component", (): void =>
    (renderComponent() as RenderResult<
      typeof import("@testing-library/dom/types/queries"),
      HTMLElement,
      HTMLElement
    >) && (expect(screen.getByRole<HTMLElement>("listbox")).toBeInTheDocument() as void));
  test("fetches and populates options from handleFetch", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (await waitFor((): void => {
      (expect(handleFetch) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<Parameters<typeof handleFetch>>(
        "patients",
        "_table",
        true,
      ) as void;
      const options = screen.getAllByRole<HTMLOptionElement>("option");
      (expect(options) as jest.JestMatchers<jest.SpyInstance>).toHaveLength(2) as void;
      (expect(options[0]) as jest.JestMatchers<jest.SpyInstance>).toHaveValue("123") as void;
      (expect(options[0]) as jest.JestMatchers<jest.SpyInstance>).toHaveTextContent("John Doe") as void;
      (expect(options[1]) as jest.JestMatchers<jest.SpyInstance>).toHaveValue("456") as void;
      (expect(options[1]) as jest.JestMatchers<jest.SpyInstance>).toHaveTextContent("Jane Doe") as void;
    })) as void;
  }) as void;
  test("throws error when dlRef is not a valid HTMLDataListElement", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (document.getElementById as jest.Mock).mockReturnValueOnce(null) as jest.Mock;
    (expect(elementNotFound) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof elementNotFound>
    >(null, expect.any(String), extLine(expect.any(Error) as any));
  }) as void;
  test("handles rendering and re-rendering of the options", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    await waitFor((): void => (expect(handleFetch) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void);
    (expect(createRoot) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<Parameters<typeof createRoot>>(
      screen.getByRole<HTMLElement>("listbox"),
    ) as void;
    (await waitFor((): void => {
      (expect(screen.getAllByRole<HTMLOptionElement>("option")) as jest.JestMatchers<jest.SpyInstance>).toHaveLength(
        2,
      ) as void;
    })) as void;
  }) as void;

  test("syncs aria states after fetching and rendering", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    await waitFor((): void => (expect(handleFetch) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void);
    (await waitFor((): void => {
      (expect(syncAriaStates) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledTimes(2) as void;
      (expect(syncAriaStates) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
        Parameters<typeof syncAriaStates>
      >(expect.any(Array)) as void;
    })) as void;
  }) as void;
  test("logs error if fetch fails", async (): Promise<void> => {
    (handleFetch as jest.Mock).mockRejectedValueOnce(new Error("Fetch failed"));
    const consoleErrorSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]], any> = jest
      .spyOn<Console, ConsoleMethod>(console, "error")
      .mockImplementation((): void => {}) as jest.SpyInstance;
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (await waitFor((): void => {
      (expect(consoleErrorSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<any[]>(
        expect.stringContaining("Failed to fetch from Patients Table for filling First Name DL: Fetch failed"),
      );
    })) as void;
    consoleErrorSpy.mockRestore() as void;
  }) as void;
}) as void;
