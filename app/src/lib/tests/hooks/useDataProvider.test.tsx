import { renderHook } from "@testing-library/react-hooks";
import useDataProvider from "../../hooks/useDataProvider";
import { providers } from "../../../vars";
import { DataProvider } from "../../../lib/global/declarations/classesCons";
jest.mock("../../../lib/global/declarations/classesCons");
describe("useDataProvider Hook", () => {
  const mockElement = document.createElement("div");
  beforeEach(() => {
    jest.clearAllMocks();
    providers.globalDataProvider = null;
  });
  test("should initialize mounted state to true", () => {
    const { result } = renderHook(() => useDataProvider(mockElement));
    const [mounted] = result.current;
    expect(mounted).toBe(true);
  });
  test("should initialize DataProvider and call initPersist when element is valid", () => {
    renderHook(() => useDataProvider(mockElement, "coordinator"));
    expect(providers.globalDataProvider).toBeInstanceOf(DataProvider);
    expect(providers.globalDataProvider?.initPersist).toHaveBeenCalledWith(
      mockElement,
      providers.globalDataProvider,
      "coordinator",
    );
  });
  test("should throw error when element is not an instance of HTMLElement", () => {
    renderHook(() => useDataProvider({} as any));
    expect(jest.spyOn(console, "error").mockImplementation(() => {})).toHaveBeenCalledWith(
      expect.stringContaining("Error executing useDataProvider"),
    );
  });
});
