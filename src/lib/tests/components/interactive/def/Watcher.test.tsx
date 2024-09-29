import { RenderResult, render, screen } from "@testing-library/react";
import { modelScripts } from "../../../../../lib/global/gModel";
import Watcher from "../../../../../../components/interactive/def/Watcher";
jest.mock(
  "../../../../../lib/global/gModel",
  (): {
    modelScripts: jest.Mock<any, any, any>;
  } => ({
    modelScripts: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("Watcher Component", (): void => {
  test("initially hides the watcher element", (): void => {
    render(<Watcher routeCase='login' />) as RenderResult;
    (
      expect(
        screen.getByRole<HTMLElement>("group")
      ) as jest.JestMatchers<jest.SpyInstance> as jest.JestMatchers<jest.SpyInstance>
    ).toHaveStyle("display: none") as void;
  }) as void;
  test("calls modelScripts when handled", (): void => {
    render(<Watcher routeCase='login' />) as RenderResult;
    (
      expect(modelScripts) as jest.JestMatchers<jest.SpyInstance> as jest.JestMatchers<jest.SpyInstance>
    ).toHaveBeenCalled() as void;
  }) as void;
}) as void;
