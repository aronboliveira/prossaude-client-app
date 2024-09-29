import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { showInspDialogs, showInspSpanSub } from "@/lib/locals/odPage/odHandler";
import { searchNextSiblings } from "@/lib/global/handlers/gHandlers";
import InspDlgElements from "../../../../../../components/interactive/od/InspDlgElements";
jest.mock(
  "@/lib/locals/odPage/odHandler",
  (): {
    showInspDialogs: jest.Mock<any, any, any>;
    showInspSpanSub: jest.Mock<any, any, any>;
  } => ({
    showInspDialogs: jest.fn((): boolean => true) as jest.Mock,
    showInspSpanSub: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "@/lib/global/handlers/gHandlers",
  (): {
    searchNextSiblings: jest.Mock<any, any, any>;
  } => ({
    searchNextSiblings: jest.fn(
      (): {
        setAttribute: jest.Mock<any, any, any>;
      } => ({
        setAttribute: jest.fn() as jest.Mock,
      })
    ) as jest.Mock,
  })
) as typeof jest;
describe("InspDlgElements Component", (): void => {
  it("should render the component", (): void => {
    (
      expect(
        render(<InspDlgElements count={1} ctx='lab' fullName='Full Name' />) as RenderResult
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBeDefined() as void;
    (
      expect(screen.getByText<HTMLInputElement>("Full Name")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("should call showInspSpanSub when clicking 'Sim' radio", (): void => {
    render(<InspDlgElements count={1} ctx='lab' fullName='Full Name' />) as RenderResult;
    fireEvent.click(screen.getByLabelText<HTMLInputElement>("Sim")) as boolean;
    (expect(showInspSpanSub) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[any]>(
      expect.anything() as jest.JestMatchers<jest.SpyInstance>
    ) as void;
  }) as void;
  it("should call searchNextSiblings on double click", (): void => {
    render(<InspDlgElements count={1} ctx='lab' fullName='Full Name' />) as RenderResult;
    const radioYes = screen.getByLabelText<HTMLInputElement>("Sim");
    fireEvent.doubleClick(radioYes) as boolean;
    (expect(searchNextSiblings) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof searchNextSiblings>
    >(radioYes, "inspSpanSub") as void;
  }) as void;
  it("should toggle InspDlg visibility when button clicked", (): void => {
    render(<InspDlgElements count={1} ctx='lab' fullName='Full Name' />) as RenderResult;
    fireEvent.click(screen.getByText("Mostrar Sugestões") as HTMLButtonElement) as boolean;
    (expect(showInspDialogs) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    (
      expect(screen.getByRole<HTMLDialogElement>("dialog")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
}) as void;
