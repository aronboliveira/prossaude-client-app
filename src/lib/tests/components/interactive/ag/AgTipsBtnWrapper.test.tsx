import { render, screen, waitFor } from "@testing-library/react";
import AgTipsBtnWrapper from "../../../../../../components/interactive/ag/AgTipsBtnWrapper";
import { ErrorBoundary } from "react-error-boundary";
jest.mock("../../../../../components/AGTips", (): (() => JSX.Element) =>
  jest.fn((): JSX.Element => <div>AGTips Component</div>)
);
jest.mock("../../../../../components/def/TipsBtn", (): (() => JSX.Element) =>
  jest.fn((): JSX.Element => <div>TipsBtn Component</div>)
);
describe("AgTipsBtnWrapper", (): void => {
  it("renders TipsBtn component", (): void => {
    render(<AgTipsBtnWrapper />);
    expect(screen.getByText<HTMLElement>("TipsBtn Component")).toBeInTheDocument();
  });
  it("renders AGTips component when the state is true", async (): Promise<void> => {
    render(<AgTipsBtnWrapper />);
    window.history.pushState({}, "", "/?tips=open");
    await waitFor((): void => {
      expect(screen.getByText<HTMLElement>("AGTips Component")).toBeInTheDocument();
    });
  });
  it("does not render AGTips component when state is false", (): void => {
    render(<AgTipsBtnWrapper />);
    expect(screen.queryByText<HTMLElement>("AGTips Component")).not.toBeInTheDocument();
  });
  it("renders the fallback error component if an error occurs", async (): Promise<void> => {
    jest.spyOn<ErrorBoundary, "render">(ErrorBoundary.prototype, "render").mockImplementation((): never => {
      throw new Error("Test Error");
    });
    render(<AgTipsBtnWrapper />);
    await waitFor((): void => {
      expect(screen.getByText<HTMLElement>("Failed to render Tips Btn")).toBeInTheDocument();
    });
  });
});
