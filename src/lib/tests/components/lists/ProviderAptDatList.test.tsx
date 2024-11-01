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
    default: (): JSX.Element => <div>AptDataList</div>,
  }),
) as typeof jest;
describe("ProviderAptDatList Component", (): void => {
  const defaultProps: {
    data: {
      cpf: string;
      date: string;
      name: string;
    };
    btnId: string;
    userClass: string;
  } = {
    data: { cpf: "12345678901", date: "2024-09-25", name: "John Doe" },
    btnId: "testBtnId",
    userClass: "estudante",
  };
  const renderComponent = (): RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > => render(<ProviderAptDatList {...defaultProps} />);
  test("renders AptDataList when shouldDisplayAptList is true", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    expect(screen.getByText<HTMLElement>("AptDataList")).toBeInTheDocument() as void;
  }) as void;
  test("does not render AptDataList when shouldDisplayAptList is false", (): void => {
    render(<ProviderAptDatList {...defaultProps} shouldDisplayAptList={false} />);
    expect(screen.queryByText<HTMLElement>("AptDataList")).not.toBeInTheDocument() as void;
  }) as void;
}) as void;
