import { render, screen, fireEvent } from "@testing-library/react";
import UserProfilePanel from "../../../../../components/user/UserProfilePanel";
import { NextRouter } from "next/router";
describe("UserProfilePanel", (): void => {
  const mockRouter: Partial<NextRouter> = {
    push: jest.fn() as jest.Mock,
    route: "/",
    pathname: "/",
    query: {},
    asPath: "/",
    basePath: "",
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    locale: undefined,
    locales: [],
    defaultLocale: undefined,
    events: {
      on: jest.fn() as jest.Mock,
      off: jest.fn() as jest.Mock,
      emit: jest.fn() as jest.Mock,
    },
    beforePopState: jest.fn() as jest.Mock,
    back: jest.fn() as jest.Mock,
    reload: jest.fn() as jest.Mock,
    prefetch: jest.fn() as jest.Mock,
  };
  it("renders the user profile panel", (): void => {
    render(<UserProfilePanel router={mockRouter as NextRouter} />);
    (
      expect(screen.getByRole<HTMLImageElement>("img", { name: /user img/i })) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("toggles the user profile dropdown on image click", (): void => {
    render(<UserProfilePanel router={mockRouter as NextRouter} />);
    fireEvent.click(screen.getByRole<HTMLImageElement>("img", { name: /user img/i })) as boolean;
    (
      expect(screen.getByText<HTMLElement>("Informações de Usuário")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
}) as void;
