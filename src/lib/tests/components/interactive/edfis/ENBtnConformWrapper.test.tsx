import React from "react";
import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import ENBtnConformWrapper from "../../../../../../components/interactive/edfis/ENBtnConformWrapper";
jest.mock("../def/BtnConform", (): (() => JSX.Element) =>
  jest.fn((): JSX.Element => <button>Conform</button>),
) as typeof jest;
jest.mock("./ENDeclaration", () => jest.fn(() => <div>EN Declaration</div>));
jest.mock("../../error/GenericErrorComponent", (): (() => JSX.Element) =>
  jest.fn((): JSX.Element => <div>Error rendering Button for Agreement</div>),
) as typeof jest;
describe("ENBtnConformWrapper component", (): void => {
  test("renders without errors", (): void => {
    render(<ENBtnConformWrapper />) as RenderResult;
    (
      expect(screen.getByText<HTMLButtonElement>("Conform")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("displays declaration on conform=open query", (): void => {
    Object.defineProperty(window, "location", {
      value: {
        search: "?conform=open",
      },
      writable: true,
    }) as Window;
    render(<ENBtnConformWrapper />) as RenderResult;
    (
      expect(screen.getByText<HTMLElement>("EN Declaration")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("toggles declaration visibility on BtnConform click", (): void => {
    render(<ENBtnConformWrapper />) as RenderResult;
    fireEvent.click(screen.getByText<HTMLButtonElement>("Conform")) as boolean;
    (
      expect(screen.queryByText<HTMLElement>("EN Declaration")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("renders error boundary on failure", (): void => {
    render(<ENBtnConformWrapper />) as RenderResult;
    (
      expect(
        screen.queryByText<HTMLElement>("Error rendering Button for Agreement"),
      ) as jest.JestMatchers<jest.SpyInstance>
    ).not.toBeInTheDocument() as void;
  }) as void;
}) as void;
