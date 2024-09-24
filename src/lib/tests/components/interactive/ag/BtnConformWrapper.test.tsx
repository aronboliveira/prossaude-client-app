import { render, screen, waitFor } from "@testing-library/react";
import BtnConformWrapper from "../../../../../../components/interactive/ag/BtnConformWrapper";
jest.mock("../../../../../components/interactive/ag/AGDeclaration", (): (() => JSX.Element) =>
  jest.fn((): JSX.Element => <div>AGDeclaration Component</div>)
);
jest.mock("../../../../../components/interactive/def/BtnConform", (): (() => JSX.Element) =>
  jest.fn((): JSX.Element => <div>BtnConform Component</div>)
);
describe("BtnConformWrapper", (): void => {
  it("renders BtnConform component", (): void => {
    render(<BtnConformWrapper />);
    expect(screen.getByText<HTMLButtonElement>("BtnConform Component")).toBeInTheDocument();
  });
  it("renders AGDeclaration component when the state is true", async (): Promise<void> => {
    render(<BtnConformWrapper />);
    window.history.pushState({}, "", "/?conform=open");
    await waitFor((): void => {
      expect(screen.getByText<HTMLElement>("AGDeclaration Component")).toBeInTheDocument();
    });
  });
  it("does not render AGDeclaration component when state is false", (): void => {
    render(<BtnConformWrapper />);
    expect(screen.queryByText<HTMLElement>("AGDeclaration Component")).not.toBeInTheDocument();
  });
});
