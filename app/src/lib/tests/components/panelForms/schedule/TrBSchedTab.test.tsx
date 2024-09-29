import { RenderResult, render } from "@testing-library/react";
import TrBSchedTab from "../../../../../../components/panelForms/schedule/TrBSchedTab";
describe("TrBSchedTab Component", (): void => {
  test("renders table row with schedule slots", (): void => {
    const renderResult = render(
      <TrBSchedTab userClass='coordenador' mainRoot={undefined} nHr={18} nRow={1} />
    ) as RenderResult;
    (expect(renderResult.getByText(/8:00/i)) as jest.JestMatchers<HTMLElement>).toBeInTheDocument() as void;
    (expect(renderResult.getAllByPlaceholderText(/Horário Livre/i).length) as jest.JestMatchers<HTMLElement>).toBe(
      9
    ) as void;
  }) as void;
}) as void;
