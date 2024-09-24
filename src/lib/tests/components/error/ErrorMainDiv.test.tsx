import { render, screen, waitFor, RenderResult } from "@testing-library/react";
import ErrorMainDiv from "../../../../../components/error/ErrorMainDiv";
import { syncAriaStates } from "../../../../lib/global/handlers/gHandlers";
import { elementNotFound, extLine } from "../../../../lib/global/handlers/errorHandler";
import "@testing-library/jest-dom/extend-expect";
jest.mock(
  "../../../../../components/consRegst/GenericErrorComponent",
  (): (() => JSX.Element) => (): JSX.Element => <div>GenericErrorComponent</div>
);
jest.mock(
  "../../../../lib/global/handlers/gHandlers",
  (): {
    syncAriaStates: jest.Mock<any, any, any>;
  } => ({
    syncAriaStates: jest.fn(),
  })
);
jest.mock(
  "../../../../lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
    extLine: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn(),
    extLine: jest.fn(),
  })
);
describe("ErrorMainDiv Component", (): void => {
  const renderComponent = (): RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > => render(<ErrorMainDiv />);
  test("renders the component and error message", (): void => {
    renderComponent();
    expect(screen.getByRole<HTMLElement>("alert")).toBeInTheDocument();
    expect(screen.getByText<HTMLHeadingElement>(/Oops, algo deu errado!/i)).toBeInTheDocument();
  });
  test("syncs aria states after rendering", async (): Promise<void> => {
    renderComponent();
    await waitFor((): void => {
      expect(syncAriaStates).toHaveBeenCalledWith<Parameters<typeof syncAriaStates>>(expect.any(Array));
    });
  });
  test("handles error when mainRef is not valid", async (): Promise<void> => {
    renderComponent();
    expect(elementNotFound).toHaveBeenCalledWith<Parameters<typeof elementNotFound>>(
      expect.anything(),
      expect.any(String),
      extLine(expect.any(Error))
    );
  });
});
