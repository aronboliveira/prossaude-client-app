import { render, screen, fireEvent } from "@testing-library/react";
import UserProfileDropdown from "../../../../../components/user/UserProfileDropdown";
import { NextRouter } from "next/router";
describe("UserProfileDropdown", (): void => {
  const user = {
      loadedData: {
        name: "John Doe",
        privilege: "coordenador",
        area: "nutrição",
        email: "test@test.com",
        telephone: "123456789",
      },
    },
    mockRouter: Partial<NextRouter> = {
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
    },
    setDropdown: jest.Mock<any, any, any> = jest.fn(),
    shouldShowDropdown = true;
  it("renders user profile details", (): void => {
    render(
      <UserProfileDropdown
        user={user}
        router={mockRouter as NextRouter}
        setDropdown={setDropdown}
        shouldShowDropdown={shouldShowDropdown}
      />
    );
    expect(screen.getByText<HTMLElement>("Coordenador")).toBeInTheDocument();
    expect(screen.getByText<HTMLElement>("Nutrição")).toBeInTheDocument();
    expect(screen.getByText<HTMLElement>("test@test.com")).toBeInTheDocument();
    expect(screen.getByText<HTMLElement>("123456789")).toBeInTheDocument();
  });
  it("toggles the contact dialog on button click", (): void => {
    render(
      <UserProfileDropdown
        user={user}
        router={mockRouter as NextRouter}
        setDropdown={setDropdown}
        shouldShowDropdown={shouldShowDropdown}
      />
    );
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: /contato/i }));
    expect(screen.getByText<HTMLFormElement>("Formulário de Contato")).toBeInTheDocument();
  });
});
