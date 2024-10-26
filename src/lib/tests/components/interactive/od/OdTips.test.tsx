import { screen, render, fireEvent, RenderResult } from "@testing-library/react";
import OdTips from "../../../../../../components/interactive/od/OdTips";
describe("OdTips Component", (): void => {
  it("should open and close the dialog", (): void => {
    render(<OdTips state={true} dispatch={jest.fn() as jest.Mock} />) as RenderResult;
    expect(screen.getByText<HTMLElement>("Manual para controle de formulário")).toBeInTheDocument() as void;
  }) as void;
  it("should close when clicking outside the dialog", (): void => {
    const dispatchMock = jest.fn() as jest.Mock;
    render(<OdTips state={true} dispatch={dispatchMock} />) as RenderResult;
    fireEvent.click(screen.getByRole<HTMLDialogElement>("dialog")) as boolean;
    (expect(dispatchMock) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[boolean]>(false) as void;
  }) as void;
}) as void;
