import { render, screen, waitFor, RenderResult } from "@testing-library/react";
import OptGrpUsers from "../../../../../components/consRegst/OptGrpUsers";
import { handleFetch } from "../../../../pages/api/ts/handlers";
import { syncAriaStates } from "../../../../lib/global/handlers/gHandlers";
import { createRoot } from "react-dom/client";
import { elementNotFound, extLine } from "../../../../lib/global/handlers/errorHandler";
import "@testing-library/jest-dom/extend-expect";
import { formCases, validAreas } from "../../../../lib/global/declarations/types";
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
      { name: "John Doe", area: "Odontologia", tel: "111-1111", email: "johndoe@example.com" },
      { name: "Jane Doe", area: "Educação Física", tel: "222-2222", email: "janedoe@example.com" },
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
describe("OptGrpUsers Component", (): void => {
  const renderComponent = (
    grp: string,
    area: string,
  ): RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement> =>
    render(<OptGrpUsers grp={grp as formCases} area={area as validAreas} />);
  test("renders the optgroup component", (): void => {
    renderComponent("profs", "Odontologia") as RenderResult;
    expect(screen.getByRole<HTMLOptGroupElement>("group")).toBeInTheDocument() as void;
  }) as void;
  test("fetches and populates options for a specific group and area from handleFetch", async (): Promise<void> => {
    renderComponent("profs", "Odontologia") as RenderResult;
    (await waitFor((): void => {
      expect(handleFetch).toHaveBeenCalledWith<Parameters<typeof handleFetch>>("profs", "_table", true) as void;
      const options = screen.getAllByRole<HTMLOptionElement>("option");
      expect(options).toHaveLength(1);
      expect(options[0]).toHaveValue("John Doe") as void;
      expect(options[0]).toHaveTextContent("Odontologia") as void;
    })) as void;
  }) as void;
  test("throws error when optGrpRef is not a valid HTMLOptGroupElement", (): void => {
    renderComponent("profs", "Odontologia") as RenderResult;
    (document.getElementById as jest.Mock).mockReturnValueOnce(null) as jest.Mock;
    expect(elementNotFound).toHaveBeenCalledWith<Parameters<typeof elementNotFound>>(
      null,
      expect.any(String),
      extLine(expect.any(Error) as any),
    );
  }) as void;
  test("handles rendering and re-rendering of the options", async (): Promise<void> => {
    renderComponent("profs", "Odontologia") as RenderResult;
    await waitFor((): void => expect(handleFetch).toHaveBeenCalled() as void);
    expect(createRoot).toHaveBeenCalledWith<Parameters<typeof createRoot>>(
      screen.getByRole<HTMLOptGroupElement>("group"),
    );
    (await waitFor((): void => {
      expect(screen.getAllByRole<HTMLOptionElement>("option")).toHaveLength(1);
    })) as void;
  }) as void;
  test("syncs aria states after fetching and rendering", async (): Promise<void> => {
    renderComponent("profs", "Odontologia") as RenderResult;
    await waitFor((): void => expect(handleFetch).toHaveBeenCalled() as void);
    (await waitFor((): void => {
      expect(syncAriaStates).toHaveBeenCalledTimes(2) as void;
      expect(syncAriaStates).toHaveBeenCalledWith<Parameters<typeof syncAriaStates>>(expect.any(Array)) as void;
    })) as void;
  }) as void;
  test("logs error if fetch fails", async (): Promise<void> => {
    (handleFetch as jest.Mock).mockRejectedValueOnce(new Error("Fetch failed"));
    const consoleErrorSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]], any> = jest
      .spyOn<Console, ConsoleMethod>(console, "error")
      .mockImplementation((): void => {}) as jest.SpyInstance;
    renderComponent("profs", "Odontologia") as RenderResult;
    (await waitFor((): void => {
      expect(consoleErrorSpy).toHaveBeenCalledWith<[any]>(
        expect.stringContaining("Failed to fetch from Patients Table for filling First Name DL: Fetch failed"),
      );
    })) as void;
    consoleErrorSpy.mockRestore() as void;
  }) as void;
}) as void;
