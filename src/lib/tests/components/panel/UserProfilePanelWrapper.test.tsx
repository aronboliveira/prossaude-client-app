import { RenderResult, render, screen, waitFor } from "@testing-library/react";
import UserProfilePanelWrapper from "../../../../../components/interactive/panel/UserProfilePanelWrapper";
import { createRoot } from "react-dom/client";
import { elementNotFound } from "../../../../lib/global/handlers/errorHandler";
import { AppRootContext } from "../../../../pages/_app";
const mockUserRoot = { render: jest.fn() };
jest.mock(
  "react-dom/client",
  (): {
    createRoot: jest.Mock;
  } => ({
    createRoot: jest.fn(() => mockUserRoot),
  })
) as typeof jest;
jest.mock(
  "../../../../lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
    extLine: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn() as jest.Mock,
    extLine: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock("../../../../components/user/UserProfilePanel", (): (() => React.JSX.Element) =>
  jest.fn((): JSX.Element => <div>UserProfilePanel</div>)
) as typeof jest;
jest.mock("../../../../components/error/GenericErrorComponent", (): (() => React.JSX.Element) =>
  jest.fn((): JSX.Element => <div>GenericErrorComponent</div>)
) as typeof jest;
jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({})),
})) as typeof jest;
describe("UserProfilePanelWrapper Component", (): void => {
  const mockContext: {
    roots: {
      userRoot: null;
    };
  } = {
    roots: {
      userRoot: null,
    },
  };
  beforeEach((): void => {
    jest.clearAllMocks();
  }) as void;
  it("should render UserProfilePanel component", (): void => {
    expect(
      render(
        <AppRootContext.Provider value={mockContext}>
          <UserProfilePanelWrapper />
        </AppRootContext.Provider>
      ) as RenderResult
    ).toBeDefined() as void;
    expect(screen.getByText<HTMLElement>("UserProfilePanel")).toBeInTheDocument() as void;
  }) as void;
  it("should create root and render UserProfilePanel", (): void => {
    document.body.innerHTML = '<div id="rootUserInfo"></div>';
    render(
      <AppRootContext.Provider value={mockContext}>
        <UserProfilePanelWrapper />
      </AppRootContext.Provider>
    ) as RenderResult;
    expect(createRoot).toHaveBeenCalledWith<Parameters<typeof createRoot>>(
      document.getElementById("rootUserInfo") as HTMLElement
    ) as void;
    expect(mockUserRoot.render as jest.Mock).toHaveBeenCalledWith<[any]>(expect.anything()) as void;
  });
  it("should render GenericErrorComponent if img not found in 2 seconds", async (): Promise<void> => {
    document.body.innerHTML = '<div id="rootUserInfo"></div>';
    render(
      <AppRootContext.Provider value={mockContext}>
        <UserProfilePanelWrapper />
      </AppRootContext.Provider>
    ) as RenderResult;
    (await waitFor(
      (): void => expect(mockUserRoot.render as jest.Mock).toHaveBeenCalledWith<[any]>(expect.anything()) as void,
      {
        timeout: 2000,
      }
    )) as void;
    expect(screen.getByText<HTMLElement>("GenericErrorComponent")).toBeInTheDocument() as void;
  });
  it("should call elementNotFound if profileSpan is not HTMLElement", async (): Promise<void> => {
    render(
      <AppRootContext.Provider value={mockContext}>
        <UserProfilePanelWrapper />
      </AppRootContext.Provider>
    ) as RenderResult;
    (await waitFor(
      (): void =>
        expect(elementNotFound).toHaveBeenCalledWith<Parameters<typeof elementNotFound>>(
          null,
          "profileSpan during DOM initialization",
          expect.anything()
        ) as void,
      { timeout: 2000 }
    )) as void;
  }) as void;
}) as void;
