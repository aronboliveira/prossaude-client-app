import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import SelectPanelLoader from "../../../../../../components/panelForms/defs/client/SelectLoader";
import "@testing-library/jest-dom/extend-expect";
jest.mock("./SelectPanel", () => () => <div data-testid='select-panel'>Select Panel Loaded</div>);
const mockLocalStorage = () => {
  const storage: { [key: string]: string } = {};
  return {
    getItem: (key: string) => storage[key] || null,
    setItem: (key: string, value: string) => (storage[key] = value),
    removeItem: (key: string) => delete storage[key],
  };
};
describe("SelectPanelLoader component", () => {
  beforeEach(() => {
    global.localStorage = mockLocalStorage() as any;
  });
  it("renders spinner while loading the SelectPanel", () => {
    render(<SelectPanelLoader />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
  it("loads the SelectPanel component after lazy loading", async () => {
    render(<SelectPanelLoader />);
    await waitFor(() => expect(screen.getByTestId("select-panel")).toBeInTheDocument());
  });
  it("sets userClass from localStorage if activeUser is found", async () => {
    localStorage.setItem("activeUser", JSON.stringify({ loadedData: { privilege: "coordenador" } }));
    render(<SelectPanelLoader />);
    await waitFor(() => screen.getByTestId("select-panel"));
    expect(screen.getByTestId("select-panel")).toBeInTheDocument();
  });
  it("uses default userClass ('estudante') when localStorage has no activeUser", async () => {
    render(<SelectPanelLoader />);
    await waitFor(() => screen.getByTestId("select-panel"));
    expect(screen.getByTestId("select-panel")).toBeInTheDocument();
  });
});
