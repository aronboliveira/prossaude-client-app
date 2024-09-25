import { render, screen, waitFor } from "@testing-library/react";
import AgTipsBtnWrapper from "../../../../../../components/interactive/ag/AgTipsBtnWrapper";
import { ErrorBoundary } from "react-error-boundary";
jest.mock(
  "../../../../../components/AGTips",
  (): (() => JSX.Element) => jest.fn((): JSX.Element => <div>AGTips Component</div>) as jest.Mock
) as typeof jest;
jest.mock(
  "../../../../../components/def/TipsBtn",
  (): (() => JSX.Element) => jest.fn((): JSX.Element => <div>TipsBtn Component</div>) as jest.Mock
) as typeof jest;
describe("AgTipsBtnWrapper", (): void => {
  it("renders TipsBtn component", (): void => {
    render(<AgTipsBtnWrapper />);
    (
      expect(screen.getByText<HTMLElement>("TipsBtn Component")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("renders AGTips component when the state is true", async (): Promise<void> => {
    render(<AgTipsBtnWrapper />);
    window.history.pushState({}, "", "/?tips=open");
    (await waitFor((): void => {
      (
        expect(screen.getByText<HTMLElement>("AGTips Component")) as jest.JestMatchers<jest.SpyInstance>
      ).toBeInTheDocument() as void;
    })) as void;
  }) as void;
  it("does not render AGTips component when state is false", (): void => {
    render(<AgTipsBtnWrapper />);
    (
      expect(screen.queryByText<HTMLElement>("AGTips Component")).not as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("renders the fallback error component if an error occurs", async (): Promise<void> => {
    jest.spyOn<ErrorBoundary, "render">(ErrorBoundary.prototype, "render").mockImplementation((): never => {
      throw new Error("Test Error");
    }) as jest.Mock;
    render(<AgTipsBtnWrapper />);
    (await waitFor((): void => {
      (
        expect(screen.getByText<HTMLElement>("Failed to render Tips Btn")) as jest.JestMatchers<jest.SpyInstance>
      ).toBeInTheDocument() as void;
    })) as void;
  }) as void;
}) as void;
