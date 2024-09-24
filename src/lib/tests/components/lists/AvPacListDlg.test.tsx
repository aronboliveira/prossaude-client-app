import { render, screen, fireEvent } from "@testing-library/react";
import AvPacListDlg from "../../../../../components/lists/AvPacListDlg";
import "@testing-library/jest-dom/extend-expect";
jest.mock(
  "../../../../../components/consRegst/ErrorFallbackDlg",
  (): (() => JSX.Element) => (): JSX.Element => <div>ErrorFallbackDlg</div>
);
jest.mock(
  "../../../../../components/consRegst/PacList",
  (): (() => JSX.Element) => (): JSX.Element => <div>PacList</div>
);
describe("AvPacListDlg Component", (): void => {
  const mockDispatch: jest.Mock<any, any, any> = jest.fn();
  const defaultProps = {
    dispatch: mockDispatch,
    state: true,
    shouldShowAlocBtn: true,
    userClass: "coordenador",
    mainDlgRef: { current: document.createElement("dialog") },
  };
  const renderComponent = () =>
    render(
      <AvPacListDlg
        {...{
          dispatch: mockDispatch,
          state: true,
          shouldShowAlocBtn: true,
          userClass: "coordenador",
          mainDlgRef: { current: document.createElement("dialog") },
        }}
      />
    );
  test("renders PacList component", async (): Promise<void> => {
    renderComponent();
    expect(screen.getByText<HTMLElement>(/PacList/i)).toBeInTheDocument();
  });
  test("calls dispatch when close button is clicked", async (): Promise<void> => {
    renderComponent();
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: "" }));
    expect(mockDispatch).toHaveBeenCalledWith<Parameters<typeof mockDispatch>>(!defaultProps.state);
  });
  test("renders the ErrorFallbackDlg when an error occurs", async (): Promise<void> => {
    renderComponent();
    expect(screen.getByText<HTMLDialogElement>(/ErrorFallbackDlg/i)).toBeInTheDocument();
  });
});
