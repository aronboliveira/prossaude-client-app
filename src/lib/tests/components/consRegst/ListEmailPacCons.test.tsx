import { render, screen, waitFor, RenderResult } from "@testing-library/react";
import ListEmailPacCons from "../../../../../components/consRegst/ListEmailPacCons";
import { handleFetch } from "../../../../pages/api/ts/handlers";
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
    createRoot: jest.fn().mockReturnValue({
      render: jest.fn(),
      unmount: jest.fn(),
    }),
  })
) as typeof jest;
jest.mock(
  "../../../../pages/api/ts/handlers",
  (): {
    handleFetch: jest.Mock<any, any, any>;
  } => ({
    handleFetch: jest.fn().mockResolvedValue([
      { name: "John Doe", email: "johndoe@example.com", tel: "111-1111" },
      { name: "Jane Doe", email: "janedoe@example.com", tel: "222-2222" },
    ]),
  })
) as typeof jest;
jest.mock(
  "../../../../lib/global/handlers/gHandlers",
  (): {
    syncAriaStates: jest.Mock<any, any, any>;
  } => ({
    syncAriaStates: jest.fn(),
  })
) as typeof jest;
jest.mock(
  "../../../../lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
    extLine: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn(),
    extLine: jest.fn(),
  })
) as typeof jest;
describe("ListEmailPacCons Component", (): void => {
  const renderComponent = (): RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > => render(<ListEmailPacCons />);
  test("renders the datalist component", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    expect(screen.getByRole<HTMLElement>("listbox")).toBeInTheDocument() as void;
  });
  test("fetches and populates options from handleFetch", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    await waitFor((): void => {
      expect(handleFetch).toHaveBeenCalledWith<Parameters<typeof handleFetch>>("patients", "_table", true) as void;
      const options = screen.getAllByRole<HTMLOptionElement>("option");
      expect(options).toHaveLength(2);
      expect(options[0]).toHaveValue("johndoe@example.com");
      expect(options[0]).toHaveTextContent("John Doe");
      expect(options[1]).toHaveValue("janedoe@example.com");
      expect(options[1]).toHaveTextContent("Jane Doe");
    });
  });
  test("throws error when dlRef is not a valid HTMLDataListElement", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (document.getElementById as jest.Mock).mockReturnValueOnce(null);
    expect(elementNotFound).toHaveBeenCalledWith<Parameters<typeof elementNotFound>>(
      null,
      expect.any(String),
      extLine(expect.any(Error) as any)
    );
  });
  test("handles rendering and re-rendering of the options", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    await waitFor((): void => expect(handleFetch).toHaveBeenCalled());
    expect(createRoot).toHaveBeenCalledWith<Parameters<typeof createRoot>>(
      screen.getByRole<HTMLElement>("listbox")
    ) as void;
    await waitFor((): void => {
      expect(screen.getAllByRole<HTMLOptionElement>("option")).toHaveLength(2);
    });
  });
  test("syncs aria states after fetching and rendering", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    await waitFor((): void => expect(handleFetch).toHaveBeenCalled());
    await waitFor((): void => {
      expect(syncAriaStates).toHaveBeenCalledTimes(2) as void;
      expect(syncAriaStates).toHaveBeenCalledWith<Parameters<typeof syncAriaStates>>(expect.any(Array)) as void;
    });
  });
  test("logs error if fetch fails", async (): Promise<void> => {
    (handleFetch as jest.Mock).mockRejectedValueOnce(new Error("Fetch failed"));
    const consoleErrorSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]], any> = jest
      .spyOn<Console, ConsoleMethod>(console, "error")
      .mockImplementation((): void => {}) as jest.SpyInstance;
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    await waitFor((): void => {
      expect(consoleErrorSpy).toHaveBeenCalledWith<[any]>(
        expect.stringContaining("Failed to fetch from Patients Table for filling First Name DL: Fetch failed")
      );
    });
    consoleErrorSpy.mockRestore() as void;
  });
});
