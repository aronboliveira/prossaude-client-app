import React from "react";
import { render, fireEvent, screen, RenderResult } from "@testing-library/react";
import { addCanvasListeners } from "../../../../../lib/global/gController";
import { elementNotFound } from "../../../../../lib/global/handlers/errorHandler";
import SectConfirmBtns from "../../../../../../components/interactive/def/SectConfirmBtns";
jest.mock(
  "../../../../../lib/global/gController",
  (): {
    addCanvasListeners: jest.Mock<any, any, any>;
  } => ({
    addCanvasListeners: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../../lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
    extLine: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn() as jest.Mock,
    extLine: jest.fn() as jest.Mock,
  }),
) as typeof jest;
describe("SectConfirmBtns Component", (): void => {
  test("calls addCanvasListeners when reset button is clicked", (): void => {
    render(<SectConfirmBtns />) as RenderResult;
    const parentDiv = document.createElement("div") as HTMLDivElement;
    parentDiv.className = "divConfirm";
    const canvas = document.createElement("canvas") as HTMLCanvasElement;
    canvas.id = "inpAstConfirmId";
    parentDiv.appendChild(canvas) as HTMLCanvasElement;
    document.body.appendChild(parentDiv) as HTMLDivElement;
    fireEvent.click(screen.getByText<HTMLButtonElement>("Resetar")) as boolean;
    (
      expect(addCanvasListeners) as jest.JestMatchers<jest.SpyInstance> as jest.JestMatchers<jest.SpyInstance>
    ).toHaveBeenCalled() as void;
  }) as void;
  test("throws error when element is not found", (): void => {
    render(<SectConfirmBtns />) as RenderResult;
    fireEvent.click(screen.getByText<HTMLButtonElement>("Resetar")) as boolean;
    (
      expect(elementNotFound) as jest.JestMatchers<jest.SpyInstance> as jest.JestMatchers<jest.SpyInstance>
    ).toHaveBeenCalled() as void;
  }) as void;
}) as void;
