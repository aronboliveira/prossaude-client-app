import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import TipsBtnWrapper from "../../../../../../components/interactive/panel/TipsBtnWrapper";
import { syncAriaStates } from "../../../../global/handlers/gHandlers";
jest.mock(
  "../../../../lib/global/handlers/gHandlers",
  (): {
    syncAriaStates: jest.Mock<any, any, any>;
  } => ({
    syncAriaStates: jest.fn() as jest.Mock,
  })
);
jest.mock("../../../../components/tips/PanelTips", (): (() => React.JSX.Element) =>
  jest.fn((): JSX.Element => <div>PanelTips</div>)
) as typeof jest;
jest.mock("../../../../components/def/TipsBtn", (): (() => React.JSX.Element) =>
  jest.fn((): JSX.Element => <button>TipsBtn</button>)
) as typeof jest;
describe("TipsBtnWrapper Component", (): void => {
  beforeEach((): void => {
    jest.clearAllMocks();
  }) as void;
  it("should render TipsBtn component", (): void => {
    expect(render(<TipsBtnWrapper />) as RenderResult).toBeDefined() as void;
    expect(screen.getByText<HTMLButtonElement>("TipsBtn")).toBeInTheDocument() as void;
    expect(syncAriaStates).toHaveBeenCalledWith<Parameters<typeof syncAriaStates>>(
      document.querySelectorAll("*")
    ) as void;
  }) as void;
  it("should render PanelTips when URL contains tips=open", (): void => {
    Object.defineProperty(window, "location", {
      value: {
        search: "?tips=open",
      },
    }) as Window;
    expect(render(<TipsBtnWrapper />) as RenderResult).toBeDefined() as void;
    expect(screen.getByText<HTMLElement>("PanelTips")).toBeInTheDocument() as void;
  }) as void;
  it("should not render PanelTips when URL does not contain tips=open", (): void => {
    Object.defineProperty(window, "location", {
      value: {
        search: "",
      },
    }) as Window;
    expect(render(<TipsBtnWrapper />) as RenderResult).toBeDefined() as void;
    expect(screen.queryByText<HTMLElement>("PanelTips")).toBeUndefined() as void;
  }) as void;
  it("should toggle PanelTips visibility on button click", (): void => {
    fireEvent.click(screen.getByText("TipsBtn") as HTMLButtonElement) as boolean;
    expect(screen.queryByText<HTMLElement>("PanelTips")).toBeInTheDocument() as void;
  }) as void;
}) as void;
