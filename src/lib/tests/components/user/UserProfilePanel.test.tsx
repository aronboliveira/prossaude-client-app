import { render, screen, fireEvent } from "@testing-library/react";
import UserProfilePanel from "../../../../../components/user/UserProfilePanel";
import { NextRouter } from "next/router";
describe("UserProfilePanel", (): void => {
  const mockRouter: Partial<NextRouter> = {
    push: jest.fn(),
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
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    beforePopState: jest.fn(),
    back: jest.fn(),
    reload: jest.fn(),
    prefetch: jest.fn(),
  };
  it("renders the user profile panel", (): void => {
    render(<UserProfilePanel router={mockRouter as NextRouter} />);
    expect(screen.getByRole<HTMLImageElement>("img", { name: /user img/i })).toBeInTheDocument();
  });
  it("toggles the user profile dropdown on image click", (): void => {
    render(<UserProfilePanel router={mockRouter as NextRouter} />);
    fireEvent.click(screen.getByRole<HTMLImageElement>("img", { name: /user img/i }));
    expect(screen.getByText<HTMLElement>("Informações de Usuário")).toBeInTheDocument();
  });
});
