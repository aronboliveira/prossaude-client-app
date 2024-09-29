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
    },
    setDropdown: jest.Mock<any, any, any> = jest.fn() as jest.Mock,
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
    (
      expect(screen.getByText<HTMLElement>("Coordenador")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByText<HTMLElement>("Nutrição")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByText<HTMLElement>("test@test.com")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByText<HTMLElement>("123456789")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("toggles the contact dialog on button click", (): void => {
    render(
      <UserProfileDropdown
        user={user}
        router={mockRouter as NextRouter}
        setDropdown={setDropdown}
        shouldShowDropdown={shouldShowDropdown}
      />
    );
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: /contato/i })) as boolean;
    (
      expect(screen.getByText<HTMLFormElement>("Formulário de Contato")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
}) as void;
