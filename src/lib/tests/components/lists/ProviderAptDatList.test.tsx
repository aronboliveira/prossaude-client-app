import { RenderResult, render, screen } from "@testing-library/react";
import ProviderAptDatList from "../../../../../components/lists/ProviderAptDatList";
import "@testing-library/jest-dom/extend-expect";
jest.mock(
  "../../../../../components/consRegst/AptDataList",
  (): {
    __esModule: boolean;
    default: () => JSX.Element;
  } => ({
    __esModule: true,
    default: () => <div>AptDataList</div>,
  })
);
describe("ProviderAptDatList Component", (): void => {
  const defaultProps = {
    data: { cpf: "12345678901", date: "2024-09-25", name: "John Doe" },
    btnId: "testBtnId",
    userClass: "estudante",
  };
  const renderComponent = (): RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > => render(<ProviderAptDatList {...defaultProps} />);
  test("renders AptDataList when shouldDisplayAptList is true", async (): Promise<void> => {
    renderComponent();
    expect(screen.getByText<HTMLElement>("AptDataList")).toBeInTheDocument();
  });
  test("does not render AptDataList when shouldDisplayAptList is false", async (): Promise<void> => {
    render(<ProviderAptDatList {...defaultProps} shouldDisplayAptList={false} />);
    expect(screen.queryByText<HTMLElement>("AptDataList")).not.toBeInTheDocument();
  });
});
