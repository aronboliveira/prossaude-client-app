import { render, screen, fireEvent } from "@testing-library/react";
import MainContainer, { experimentalUser } from "../../../../../../components/interactive/base/MainContainer";
import { AppRootContext } from "@/pages/_app";
import { User } from "@/lib/global/declarations/classes";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
jest.mock(
  "next/router",
  (): {
    useRouter: jest.Mock<any, any, any>;
  } => ({
    useRouter: jest.fn(),
  })
) as typeof jest;
jest.mock(
  "react-redux",
  (): {
    useDispatch: jest.Mock<any, any, any>;
  } => ({
    useDispatch: jest.fn(),
  })
) as typeof jest;
jest.mock(
  "../../../../../components/user/UserProfilePanel",
  (): (() => JSX.Element) => (): JSX.Element => <div>UserProfilePanel</div>
) as typeof jest;
describe("MainContainer Component", (): void => {
  const mockDispatch: jest.Mock<any, any, any> = jest.fn();
  const mockRouter = { push: jest.fn() };
  beforeEach((): void => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    localStorage.clear();
  });
  it("renders the cards and the work panel button", (): void => {
    render(
      <AppRootContext.Provider value={{ roots: { baseRootedUser: null } }}>
        <MainContainer />
      </AppRootContext.Provider>
    );
    expect(screen.getByText<HTMLElement>("Geral & Saúde Mental")).toBeInTheDocument() as void;
    expect(screen.getByText<HTMLElement>("Educação Física")).toBeInTheDocument() as void;
    expect(screen.getByText<HTMLElement>("Nutrição")).toBeInTheDocument() as void;
    expect(screen.getByText<HTMLElement>("Odontologia")).toBeInTheDocument() as void;
    expect(screen.getByRole<HTMLButtonElement>("button", { name: /Painel de Trabalho/i })).toBeInTheDocument() as void;
  });
  it("renders the UserProfilePanel and fetches user data from localStorage", (): void => {
    const mockUser: {
      loadedData: {
        name: string;
        privilege: string;
        area: string;
        email: string;
        telephone: string;
      };
    } = {
      loadedData: {
        name: "Test User",
        privilege: "coordenador",
        area: "nutrição",
        email: "test@test.com",
        telephone: "123456789",
      },
    };
    localStorage.setItem("activeUser", JSON.stringify(mockUser));
    render(
      <AppRootContext.Provider value={{ roots: { baseRootedUser: null } }}>
        <MainContainer />
      </AppRootContext.Provider>
    );
    expect(experimentalUser).toEqual<{
      loadedData: {
        name: string;
        privilege: string;
        area: string;
        email: string;
        telephone: string;
      };
    }>(mockUser);
    expect(mockDispatch).toHaveBeenCalledWith<Parameters<typeof mockDispatch>>(expect.any(User) as any) as void;
    expect(screen.getByText<HTMLElement>("UserProfilePanel")).toBeInTheDocument() as void;
  });
  it("calls router.push when a card button is clicked", (): void => {
    render(
      <AppRootContext.Provider value={{ roots: { baseRootedUser: null } }}>
        <MainContainer />
      </AppRootContext.Provider>
    );
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: /Geral & Saúde Mental/i }));
    expect(mockRouter.push).toHaveBeenCalledWith<Parameters<typeof mockRouter.push>>("/ag") as void;
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: /Educação Física/i }));
    expect(mockRouter.push).toHaveBeenCalledWith<Parameters<typeof mockRouter.push>>("/edfis") as void;
  });
  it("logs a warning when no user is found in localStorage", (): void => {
    const consoleSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]], any> = jest
      .spyOn<Console, "warn">(console, "warn")
      .mockImplementation((): void => {}) as jest.SpyInstance;
    render(
      <AppRootContext.Provider value={{ roots: { baseRootedUser: null } }}>
        <MainContainer />
      </AppRootContext.Provider>
    );
    expect(consoleSpy).toHaveBeenCalledWith<[string]>(
      "Failed to fetch user from local storage. Default user displayed."
    );
    consoleSpy.mockRestore() as void;
  });
  it("handles window resize events correctly", (): void => {
    render(
      <AppRootContext.Provider value={{ roots: { baseRootedUser: null } }}>
        <MainContainer />
      </AppRootContext.Provider>
    );
    fireEvent(window, new Event("resize"));
  });
});
