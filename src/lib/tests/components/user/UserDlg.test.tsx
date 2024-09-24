import { render, screen, fireEvent } from "@testing-library/react";
import UserDlg from "../../../../../components/user/UserDlg";
import { NextRouter } from "next/router";
describe("UserDlg", (): void => {
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
  const defaultProps = {
    user: { userClass: "coordenador", userArea: "nutrição", userEmail: "test@test.com", userTel: "123456789" },
    setDropdown: jest.fn(),
    setPropDlg: jest.fn(),
    setContact: jest.fn(),
    setUserDlg: jest.fn(),
    shouldShowDropdown: false,
    shouldDisplayPropDlg: false,
    shouldDisplayContact: false,
    shouldDisplayUserDlg: true,
    callLogout: jest.fn(),
    router: mockRouter as NextRouter,
  };
  it("renders user details", () => {
    render(<UserDlg {...defaultProps} />);
    expect(screen.getByText<HTMLElement>("Coordenador")).toBeInTheDocument();
    expect(screen.getByText<HTMLElement>("Nutrição")).toBeInTheDocument();
    expect(screen.getByText<HTMLElement>("test@test.com")).toBeInTheDocument();
    expect(screen.getByText<HTMLElement>("123456789")).toBeInTheDocument();
  });
  it("opens the user properties dialog on button click", () => {
    render(<UserDlg {...defaultProps} />);
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: /alteração/i }));
    expect(defaultProps.setPropDlg).toHaveBeenCalledWith<Parameters<typeof defaultProps.setPropDlg>>(true);
  });
  it("calls router push on logout", () => {
    render(<UserDlg {...defaultProps} />);
    const link = screen.getByRole<HTMLAnchorElement>("link", { name: /login/i });
    fireEvent.click(link);
    expect(defaultProps.router.push).toHaveBeenCalledWith("/login");
  });
});
