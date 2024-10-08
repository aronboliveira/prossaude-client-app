import React from "react";
import { render, screen } from "@testing-library/react";
import MainFormPanel from "../../../../../components/mainPanel/MainFormPanel";
import { ErrorBoundary } from "react-error-boundary";
import SelectPanel from "../../../../../components/panelForms/defs/client/SelectPanel";
import { mainPanelVariables, resetErrorBoundary } from "../../../../../components/mainPanel/mainPanelVariables";
jest.mock(
  "react-error-boundary",
  (): {
    ErrorBoundary: jest.Mock<JSX.Element, [any], any>;
  } => ({
    ErrorBoundary: jest.fn(({ children }: { children: JSX.Element[] }): JSX.Element => <>{children}</>),
  }),
) as typeof jest;
jest.mock("../../../../../components/panelForms/defs/client/SelectPanel") as typeof jest;
describe("MainFormPanel", (): void => {
  it("renders SelectPanel with the correct default option", (): void => {
    render(<MainFormPanel />);
    (expect(SelectPanel) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[any, any]>(
      expect.objectContaining<{
        defOp: string;
      }>({ defOp: "agenda" }),
      expect.anything() as any,
    );
  }) as void;
  it("renders the ErrorBoundary component with the correct fallback", (): void => {
    render(<MainFormPanel />);
    (expect(ErrorBoundary) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[any, any]>(
      expect.objectContaining<{
        FallbackComponent: any;
      }>({
        FallbackComponent: expect.any(Function),
      }),
      expect.anything() as any,
    );
  }) as void;
  it("displays the fallback message when an error occurs", async (): Promise<void> => {
    (ErrorBoundary as unknown as jest.Mock).mockImplementation(
      ({ FallbackComponent }: { FallbackComponent: any }): { FallbackComponent: any } =>
        FallbackComponent({ error: new Error("Test error") }),
    ) as jest.Mock;
    render(<MainFormPanel />);
    (
      expect(
        await screen.findByText<HTMLElement>("Error rendering shell for Panel"),
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
}) as void;
describe("resetErrorBoundary", (): void => {
  const ResetComponent = jest.fn(({ props }: any): JSX.Element => <div {...props} />);
  const props = { mainRoot: { render: jest.fn() as jest.Mock } };
  beforeEach((): void => {
    mainPanelVariables.tryAcc = 0;
  }) as void;
  it("renders the ResetComponent when tryAcc is less than 2", (): void => {
    resetErrorBoundary(ResetComponent, props);
    (expect(props.mainRoot.render) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[any]>(
      <ResetComponent props={props} />,
    ) as void;
    (expect(mainPanelVariables.tryAcc) as jest.JestMatchers<jest.SpyInstance>).toBe<number>(1) as void;
  }) as void;
  it("reloads the page when tryAcc is 2 or more", (): void => {
    mainPanelVariables.tryAcc = 2;
    resetErrorBoundary(ResetComponent, props);
    expect(
      jest.spyOn<Location, "reload">(window.location, "reload").mockImplementation((): void => {}) as jest.SpyInstance,
    ).toHaveBeenCalled() as void;
    (expect(mainPanelVariables.tryAcc) as jest.JestMatchers<jest.SpyInstance>).toBe<number>(0) as void;
  }) as void;
}) as void;
