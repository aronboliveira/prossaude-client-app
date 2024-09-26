import { screen, render, fireEvent, RenderResult } from "@testing-library/react";
import OdDeclaration from "../../../../../../components/interactive/od/OdDeclaration";
describe("OdDeclaration Component", (): void => {
  it("should show modal when state is true", (): void => {
    render(<OdDeclaration state={true} dispatch={jest.fn() as jest.Mock} />) as RenderResult;
    (
      expect(screen.getByText<HTMLElement>("TERMOS DE CONCORDÂNCIA")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("should close the modal when clicking outside", (): void => {
    const dispatchMock = jest.fn() as jest.Mock;
    render(<OdDeclaration state={true} dispatch={dispatchMock} />) as RenderResult;
    fireEvent.click(screen.getByRole<HTMLDialogElement>("dialog")) as boolean;
    (expect(dispatchMock) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[boolean]>(false) as void;
  }) as void;
}) as void;
