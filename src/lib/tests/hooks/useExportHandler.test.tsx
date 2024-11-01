import { renderHook } from "@testing-library/react-hooks";
import useExportHandler from "../../hooks/useExportHandler";
import { exporters } from "../../../vars";
import { ExportHandler } from "../../global/declarations/classes";
import { addExportFlags } from "../../global/gController";
import { cleanStorageName } from "../../global/handlers/gHandlers";
jest.mock("../../hooks/useExportHandler");
jest.mock("../../global/gController");
jest.mock("../../global/handlers/gHandlers");
describe("useExportHandler Hook", () => {
  const mockRef = document.createElement("div");
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(global, "addEventListener");
    jest.spyOn(global, "removeEventListener");
  });
  test("should initialize ExportHandler and set the exporter in exporters", () => {
    renderHook(() => useExportHandler("someProperty", mockRef));
    expect(exporters.someProperty).toBeInstanceOf(ExportHandler);
  });
  test("should add event listeners for beforeunload and popstate", () => {
    renderHook(() => useExportHandler("someProperty", mockRef));
    expect(global.addEventListener).toHaveBeenCalledWith("beforeunload", expect.any(Function), { once: true });
    expect(global.addEventListener).toHaveBeenCalledWith("popstate", expect.any(Function));
  });
  test("should clean up event listeners and call cleanStorageName on unmount", () => {
    const { unmount } = renderHook(() => useExportHandler("someProperty", mockRef, true));
    unmount();
    expect(global.removeEventListener).toHaveBeenCalledWith("beforeunload", expect.any(Function));
    expect(global.removeEventListener).toHaveBeenCalledWith("popstate", expect.any(Function));
    expect(cleanStorageName).toHaveBeenCalled();
  });
  test("should call addExportFlags with the reference element", () => {
    renderHook(() => useExportHandler("someProperty", mockRef));
    expect(addExportFlags).toHaveBeenCalledWith(mockRef);
  });
});
