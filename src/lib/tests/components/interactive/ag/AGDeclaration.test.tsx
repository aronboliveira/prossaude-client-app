import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AGDeclaration from "../../../../../../components/interactive/ag/AGDeclaration";
import { syncAriaStates } from "../../../../../lib/global/handlers/gHandlers";
import { elementNotFound } from "../../../../../lib/global/handlers/errorHandler";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    syncAriaStates: jest.Mock<any, any, any>;
  } => ({
    syncAriaStates: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "../../../../../lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("AGDeclaration", (): void => {
  const defaultProps = {
    state: true,
    dispatch: jest.fn() as jest.Mock,
  };
  it("renders the modal when state is true", (): void => {
    render(<AGDeclaration {...defaultProps} />);
    expect(screen.getByText<HTMLElement>("TERMOS DE CONCORDÂNCIA")).toBeInTheDocument() as void;
  }) as void;
  it("does not render when state is false", (): void => {
    render(<AGDeclaration {...defaultProps} state={false} />);
    expect(screen.queryByText<HTMLElement>("TERMOS DE CONCORDÂNCIA")).not.toBeInTheDocument() as void;
  }) as void;
  it("calls syncAriaStates on mount", async (): Promise<void> => {
    render(<AGDeclaration {...defaultProps} />);
    (await waitFor((): void => {
      expect(syncAriaStates).toHaveBeenCalled() as void;
    })) as void;
  }) as void;
  it("closes the modal when ESC key is pressed", async (): Promise<void> => {
    render(<AGDeclaration {...defaultProps} />);
    fireEvent.keyDown(window, { key: "ESCAPE" }) as boolean;
    (await waitFor((): void => {
      expect(defaultProps.dispatch).toHaveBeenCalledWith<Parameters<typeof defaultProps.dispatch>>(false) as void;
    })) as void;
  }) as void;
  it("calls elementNotFound when mainRef is not an HTMLElement", async (): Promise<void> => {
    render(<AGDeclaration {...defaultProps} />);
    (await waitFor((): void => {
      expect(elementNotFound).toHaveBeenCalled() as void;
    })) as void;
  }) as void;
}) as void;
