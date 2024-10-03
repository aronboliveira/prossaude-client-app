import { render, fireEvent, RenderResult } from "@testing-library/react";
import { addExportFlags } from "@/lib/global/gController";
import { handleSubmit } from "@/pages/api/ts/handlers";
import ScheduleForm from "../../../../../../components/panelForms/schedule/ScheduleForm";
import { panelFormsVariables } from "../../../../../../components/panelForms/panelFormsData";
jest.mock(
  "@/lib/global/gController",
  (): {
    addExportFlags: jest.Mock<any, any, any>;
  } => ({
    addExportFlags: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "@/lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
    extLine: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn() as jest.Mock,
    extLine: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "@/lib/locals/panelPage/consController",
  (): {
    fillScheduleState: {
      acc: number;
    };
    fillSchedStateValues: jest.Mock<any, any, any>;
  } => ({
    fillScheduleState: { acc: 0 },
    fillSchedStateValues: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "@/pages/api/ts/handlers",
  (): {
    handleSubmit: jest.Mock<any, any, any>;
  } => ({
    handleSubmit: jest.fn() as jest.Mock,
  }),
) as typeof jest;
describe("ScheduleForm Component", (): void => {
  test("renders the schedule form with all elements", (): void => {
    const renderResult = render(
      <ScheduleForm mainRoot={undefined} userClass='coordenador' context={true} />,
    ) as RenderResult;
    (
      expect(renderResult.getByText(/Atendimento Diário/i) as HTMLButtonElement) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(renderResult.getByText(/Adicionar Consulta/i) as HTMLButtonElement) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(
        renderResult.getByTitle(/Gere um .xlsx com os dados preenchidos/i) as HTMLButtonElement,
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(renderResult.getByTitle(/Auto-ajuste de mês/i) as HTMLInputElement) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(renderResult.getByText(/Área de transferência/i) as HTMLSlotElement) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect((renderResult.getAllByRole("row") as HTMLTableRowElement[]).length) as jest.JestMatchers<jest.SpyInstance>
    ).toBeGreaterThan(0) as void;
  }) as void;
  test("handles toggleForm and add consultation", (): void => {
    const renderResult = render(
      <ScheduleForm mainRoot={undefined} userClass='coordenador' context={false} />,
    ) as RenderResult;
    (
      expect(
        fireEvent.click(renderResult.getByText(/Adicionar Consulta/i) as HTMLButtonElement) as boolean,
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBe<boolean>(true) as void;
    (
      expect(
        renderResult.queryByText(/Preencha um formulário para gerar a ficha de uma nova consulta/i) as HTMLElement,
      ) as jest.JestMatchers<jest.SpyInstance>
    ).not.toBeNull() as void;
  }) as void;
  test("should execute listeners for export button", (): void => {
    fireEvent.click(
      (render(<ScheduleForm mainRoot={undefined} context={true} userClass='coordenador' />) as RenderResult).getByTitle(
        /Gere um .xlsx com os dados preenchidos/i,
      ) as HTMLButtonElement,
    ) as boolean;
    (expect(addExportFlags) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof addExportFlags>
    >("Agenda", (expect as jest.Expect).anything(), (expect as jest.Expect).anything());
  }) as void;
  test("handles auto month fill and checkbox toggle", (): void => {
    fireEvent.change(
      (render(<ScheduleForm mainRoot={undefined} context={true} userClass='coordenador' />) as RenderResult).getByTitle(
        /Desative ou ative aqui o cálculo automático de datas/i,
      ) as HTMLInputElement,
    ) as boolean;
    (expect(panelFormsVariables.isAutoFillMonthOn) as jest.JestMatchers<jest.SpyInstance>).toBe<boolean>(true) as void;
  }) as void;
  test("submits schedule form automatically after interval", (): void => {
    jest.useFakeTimers() as typeof jest;
    jest.advanceTimersByTime(60000) as void;
    (expect(handleSubmit) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    jest.useRealTimers() as typeof jest;
  }) as void;
  test("renders columns and rows for the schedule table", (): void => {
    const renderResult = render(
      <ScheduleForm mainRoot={undefined} context={true} userClass='coordenador' />,
    ) as RenderResult;
    (expect(renderResult.getAllByRole("columnheader").length) as jest.JestMatchers<jest.SpyInstance>).toBe(10) as void;
    (expect(renderResult.getAllByRole("row").length) as jest.JestMatchers<jest.SpyInstance>).toBeGreaterThan(4) as void;
    (expect(renderResult.getByText(/18:00/i)) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
    (expect(renderResult.getByText(/19:00/i)) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
  }) as void;
}) as void;
