import { RenderResult, render } from "@testing-library/react";
import TdBSchedTab from "../../../../../../components/panelForms/schedule/TdBSchedTab";
describe("TdBSchedTab Component", (): void => {
  test("renders the table cell with EraseAptBtn", (): void => {
    const renderResult = render(
      <TdBSchedTab nCol={1} nRow={1} nHr={18} last={false} userClass='coordenador' mainRoot={undefined} />
    ) as RenderResult;
    (
      expect(renderResult.getByPlaceholderText(/Horário Livre/i)) as jest.JestMatchers<HTMLElement>
    ).toBeInTheDocument() as void;
    (
      expect(renderResult.getByTitle(/Remova o agendamento relativo/i)) as jest.JestMatchers<HTMLElement>
    ).toBeInTheDocument() as void;
  }) as void;
}) as void;
