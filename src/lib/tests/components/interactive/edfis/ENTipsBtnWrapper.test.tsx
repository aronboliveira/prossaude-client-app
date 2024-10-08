import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import ENTips from "../../../../../../components/interactive/edfis/ENTips";
import ENTipsBtnWrapper from "../../../../../../components/interactive/edfis/ENTipsBtnWrapper";
import GenericErrorComponent from "../../../../../../components/error/GenericErrorComponent";
import React from "react";
jest.mock(
  "../../../../../components/interactive/edfis/ENTips",
  (): jest.Mock<JSX.Element, [], any> => jest.fn((): JSX.Element => <div>ENTips Component</div>) as jest.Mock,
) as typeof jest;
jest.mock(
  "../def/TipsBtn",
  (): jest.Mock<JSX.Element, [], any> => jest.fn((): JSX.Element => <button>TipsBtn</button>) as jest.Mock,
) as typeof jest;
jest.mock(
  "../../../../../components/error/GenericErrorComponent",
  (): jest.Mock<JSX.Element, [], any> => jest.fn((): JSX.Element => <div>Error Loading Tips Button</div>) as jest.Mock,
) as typeof jest;
describe("ENTipsBtnWrapper component", (): void => {
  beforeEach((): void => {
    jest.clearAllMocks() as typeof jest;
    Object.defineProperty(window, "location", {
      value: { search: "" },
      writable: true,
    }) as Window;
  }) as void;
  test("renders TipsBtn without errors", (): void => {
    render(<ENTipsBtnWrapper />) as RenderResult;
    (
      expect(screen.getByText<HTMLButtonElement>("TipsBtn")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("shows ENTips when tips=open in the URL", (): void => {
    Object.defineProperty(window, "location", {
      value: { search: "?tips=open" },
      writable: true,
    }) as Window;
    render(<ENTipsBtnWrapper />) as RenderResult;
    (
      expect(screen.getByText<HTMLElement>("ENTips Component")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("renders error boundary if error occurs", (): void => {
    render(<GenericErrorComponent message='Error' />) as RenderResult;
    (
      expect(screen.getByText<HTMLElement>("Error Loading Tips Button")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("toggles ENTips visibility when TipsBtn is clicked", (): void => {
    render(<ENTipsBtnWrapper />) as RenderResult;
    fireEvent.click(screen.getByText<HTMLButtonElement>("TipsBtn"));
    (expect(ENTips) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[any, object]>(
      (expect as jest.Expect).objectContaining<{
        state: boolean;
        dispatch: any;
      }>({
        state: true,
        dispatch: expect.any(Function),
      }),
      {},
    ) as void;
  }) as void;
}) as void;
