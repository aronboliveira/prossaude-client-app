import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import AvPacListDlg from "../../../../../components/lists/AvPacListDlg";
import "@testing-library/jest-dom/extend-expect";
jest.mock(
  "../../../../../components/consRegst/ErrorFallbackDlg",
  (): (() => JSX.Element) => (): JSX.Element => <div>ErrorFallbackDlg</div>,
) as typeof jest;
jest.mock(
  "../../../../../components/consRegst/PacList",
  (): (() => JSX.Element) => (): JSX.Element => <div>PacList</div>,
) as typeof jest;
describe("AvPacListDlg Component", (): void => {
  const mockDispatch: jest.Mock<any, any, any> = jest.fn() as jest.Mock;
  const defaultProps: {
    dispatch: jest.Mock<any, any, any>;
    state: boolean;
    shouldShowAlocBtn: boolean;
    userClass: string;
    mainDlgRef: {
      current: HTMLDialogElement;
    };
  } = {
    dispatch: mockDispatch,
    state: true,
    shouldShowAlocBtn: true,
    userClass: "coordenador",
    mainDlgRef: { current: document.createElement("dialog") },
  };
  const renderComponent = (): RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > =>
    render(
      <AvPacListDlg
        {...{
          dispatch: mockDispatch,
          state: true,
          shouldShowAlocBtn: true,
          userClass: "coordenador",
          mainDlgRef: { current: document.createElement("dialog") },
        }}
      />,
    );
  test("renders PacList component", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    expect(screen.getByText<HTMLElement>(/PacList/i)).toBeInTheDocument() as void;
  }) as void;
  test("calls dispatch when close button is clicked", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: "" })) as boolean;
    expect(mockDispatch).toHaveBeenCalledWith<Parameters<typeof mockDispatch>>(!defaultProps.state) as void;
  }) as void;
  test("renders the ErrorFallbackDlg when an error occurs", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    expect(screen.getByText<HTMLDialogElement>(/ErrorFallbackDlg/i)).toBeInTheDocument() as void;
  }) as void;
}) as void;
