import { RenderResult, render, screen } from "@testing-library/react";
import { syncAriaStates } from "../../../../../../global/handlers/gHandlers";
import { elementNotFound } from "../../../../../../global/handlers/errorHandler";
import WatcherTab from "../../../../../../../../components/interactive/edfis/client/tabs/WatcherTab";
jest.mock(
  "../../../../../../lib/global/handlers/gHandlers",
  (): {
    syncAriaStates: jest.Mock<any, any, any>;
  } => ({
    syncAriaStates: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "../../../../../../lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("WatcherTab Component", (): void => {
  it("should render the WatcherTab component", (): void => {
    render(<WatcherTab tabName='divTabDobrCut' />) as RenderResult;
    (
      expect(screen.getByTestId<HTMLElement>("watcher-divTabDobrCut")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("should call syncAriaStates when tab is mounted", (): void => {
    render(<WatcherTab tabName='divTabDobrCut' />) as RenderResult;
    (expect(syncAriaStates) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof syncAriaStates>
    >(document.querySelectorAll("*") as NodeListOf<Element>) as void;
  }) as void;
  it("should throw elementNotFound if reference is not found", (): void => {
    render(<WatcherTab tabName={"nonexistentTab" as any} />) as RenderResult;
    (expect(elementNotFound) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
}) as void;
