import { render, screen, fireEvent } from "@testing-library/react";
import UserDlg from "../../../../../components/user/UserDlg";
import { NextRouter } from "next/router";
describe("UserDlg", (): void => {
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
  const defaultProps = {
    user: { userClass: "coordenador", userArea: "nutrição", userEmail: "test@test.com", userTel: "123456789" },
    setDropdown: jest.fn() as jest.Mock,
    setPropDlg: jest.fn() as jest.Mock,
    setContact: jest.fn() as jest.Mock,
    setUserDlg: jest.fn() as jest.Mock,
    shouldShowDropdown: false,
    shouldDisplayPropDlg: false,
    shouldDisplayContact: false,
    shouldDisplayUserDlg: true,
    callLogout: jest.fn() as jest.Mock,
    router: mockRouter as NextRouter,
  };
  it("renders user details", (): void => {
    render(<UserDlg {...defaultProps} />);
    expect(screen.getByText<HTMLElement>("Coordenador")).toBeInTheDocument() as void;
    expect(screen.getByText<HTMLElement>("Nutrição")).toBeInTheDocument() as void;
    expect(screen.getByText<HTMLElement>("test@test.com")).toBeInTheDocument() as void;
    expect(screen.getByText<HTMLElement>("123456789")).toBeInTheDocument() as void;
  }) as void;
  it("opens the user properties dialog on button click", (): void => {
    render(<UserDlg {...defaultProps} />);
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: /alteração/i })) as boolean;
    expect(defaultProps.setPropDlg).toHaveBeenCalledWith<Parameters<typeof defaultProps.setPropDlg>>(true) as void;
  }) as void;
  it("calls router push on logout", (): void => {
    render(<UserDlg {...defaultProps} />);
    const link = screen.getByRole<HTMLAnchorElement>("link", { name: /login/i });
    fireEvent.click(link) as boolean;
    expect(defaultProps.router.push).toHaveBeenCalledWith<[string]>("/login") as void;
  }) as void;
}) as void;
