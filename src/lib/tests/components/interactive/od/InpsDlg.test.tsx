import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { addTextToObs } from "../../../../locals/odPage/odHandler";
import InspDlg from "../../../../../../components/interactive/od/InspDlg";
jest.mock(
  "../../../../lib/locals/odPage/odHandler",
  (): {
    addTextToObs: jest.Mock<any, any, any>;
  } => ({
    addTextToObs: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "../../../../lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
    extLine: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn() as jest.Mock,
    extLine: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("InspDlg Component", (): void => {
  it("should render dialog when state is true", (): void => {
    (
      expect(
        render(<InspDlg count={1} ctx='lab' state={true} dispatch={jest.fn() as jest.Mock} />) as RenderResult
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBeDefined() as void;
    (
      expect(screen.getByRole<HTMLDialogElement>("dialog")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("should not render dialog when state is false", (): void => {
    (
      expect(
        render(<InspDlg count={1} ctx='lab' state={false} dispatch={jest.fn() as jest.Mock} />) as RenderResult
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBeDefined() as void;
    (
      expect(screen.queryByRole<HTMLDialogElement>("dialog")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeUndefined() as void;
  }) as void;
  it("should call addTextToObs on button click", (): void => {
    render(<InspDlg count={1} ctx='lab' state={true} dispatch={jest.fn() as jest.Mock} />) as RenderResult;
    fireEvent.click(screen.getByText("Adicionar") as HTMLButtonElement) as boolean;
    (expect(addTextToObs) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  it("should call dispatch on close button click", (): void => {
    const dispatchMock = jest.fn() as jest.Mock;
    render(<InspDlg count={1} ctx='lab' state={true} dispatch={dispatchMock} />) as RenderResult;
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: "" })) as boolean;
    (expect(dispatchMock) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[boolean]>(false) as void;
  }) as void;
}) as void;
