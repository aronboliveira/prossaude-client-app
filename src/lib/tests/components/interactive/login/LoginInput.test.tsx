import React from "react";
import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import LoginInputs from "../../../../../../components/interactive/login/LoginInputs";
import { clearDefInvalidMsg, resetPhs } from "../../../../../lib/global/gStyleScript";
import { handleLogin } from "../../../../../lib/locals/panelPage/handlers/handlers";
import "@testing-library/jest-dom/extend-expect";
jest.mock(
  "../../../../../lib/global/gStyleScript",
  (): {
    clearDefInvalidMsg: jest.Mock<any, any, any>;
    resetPhs: jest.Mock<any, any, any>;
  } => ({
    clearDefInvalidMsg: jest.fn() as jest.Mock as jest.Mock,
    resetPhs: jest.fn() as jest.Mock as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../../lib/locals/loginPage/loginController",
  (): {
    callbackSubmitBtn: jest.Mock<any, any, any>;
  } => ({
    callbackSubmitBtn: jest.fn() as jest.Mock as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../../pages/api/ts/handlers",
  (): {
    handleLogin: jest.Mock<any, any, any>;
  } => ({
    handleLogin: jest.fn() as jest.Mock as jest.Mock,
  }),
) as typeof jest;
describe("LoginInputs Component", (): void => {
  it("should render input fields and submit button", (): void => {
    render(<LoginInputs />) as RenderResult;
    (
      expect(screen.getByPlaceholderText<HTMLInputElement>("Nome de Usuário")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByPlaceholderText<HTMLInputElement>("Senha")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByText<HTMLButtonElement>("Avançar")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("should invoke clearDefInvalidMsg and resetPhs on mount", (): void => {
    render(<LoginInputs />) as RenderResult;
    (expect(clearDefInvalidMsg) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    (expect(resetPhs) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  it("should handle login form submission", (): void => {
    render(<LoginInputs />) as RenderResult;
    fireEvent.click(screen.getByText<HTMLButtonElement>("Avançar").parentElement as HTMLButtonElement) as boolean;
    (expect(handleLogin) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
}) as void;
