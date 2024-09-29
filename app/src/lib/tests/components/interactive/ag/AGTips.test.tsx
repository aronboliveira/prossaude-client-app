import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AGTips from "../../../../../../components/interactive/ag/AGTips";
import { elementNotFound } from "../../../../../lib/global/handlers/errorHandler";
jest.mock(
  "../../../../../lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("AGTips", (): void => {
  const defaultProps: {
    state: boolean;
    dispatch: jest.Mock<any, any, any>;
  } = {
    state: true,
    dispatch: jest.fn() as jest.Mock,
  };
  it("renders the modal when state is true", (): void => {
    render(<AGTips {...defaultProps} />);
    expect(screen.getByText<HTMLElement>("Manual para controle de formulário")).toBeInTheDocument() as void;
  }) as void;
  it("does not render when state is false", (): void => {
    render(<AGTips {...defaultProps} state={false} />);
    expect(screen.queryByText<HTMLElement>("Manual para controle de formulário")).not.toBeInTheDocument() as void;
  }) as void;
  it("closes the modal when ESC key is pressed", async (): Promise<void> => {
    render(<AGTips {...defaultProps} />);
    fireEvent.keyDown(window, { key: "ESCAPE" }) as boolean;
    (await waitFor((): void => {
      expect(defaultProps.dispatch).toHaveBeenCalledWith<Parameters<typeof defaultProps.dispatch>>(false) as void;
    })) as void;
  }) as void;
  it("calls elementNotFound when dlgRef is not an HTMLDialogElement", async (): Promise<void> => {
    render(<AGTips {...defaultProps} />);
    (await waitFor((): void => {
      expect(elementNotFound).toHaveBeenCalled() as void;
    })) as void;
  }) as void;
}) as void;
