import { render, fireEvent, RenderResult } from "@testing-library/react";
import { useRef, MutableRefObject } from "react";
import ProfRow from "../../../../../../components/panelForms/profs/ProfRow";
import { nlTab } from "@/lib/global/declarations/types";
jest.mock(
  "@/lib/global/gModel",
  (): {
    dateISOtoBRL: jest.Mock<string, [date: string], any>;
  } => ({
    dateISOtoBRL: jest.fn((date: string) => date) as jest.Mock,
  }),
) as typeof jest;
describe("ProfRow Component", (): void => {
  test("renders ProfRow with default props", (): void => {
    const tabRef: MutableRefObject<nlTab> = useRef<nlTab>(null);
    (
      expect(
        (
          render(
            <ProfRow
              tabRef={tabRef}
              nRow={1}
              prof={{
                name: "John Doe",
                email: "john@example.com",
                tel: "123456789",
                area: "Educação Física",
                day: "2023-09-01",
                start_day: "2023-01-01",
                end_day: "2023-12-31",
                idf: "12345678900",
                external: false,
              }}
              userClass={"coordenador"}
            />,
          ) as RenderResult
        ).getByText(/John Doe/i),
      ) as jest.JestMatchers<HTMLElement>
    ).toBeInTheDocument() as void;
  }) as void;
  test("calls toggle dialog for altering row data", (): void => {
    const tabRef: MutableRefObject<nlTab> = useRef<nlTab>(null);
    (
      expect(
        fireEvent.click(
          (
            render(
              <ProfRow
                tabRef={tabRef}
                nRow={1}
                userClass='coordenador'
                prof={{
                  name: "John Doe",
                  email: "john@example.com",
                  tel: "123456789",
                  area: "Educação Física",
                  day: "2023-09-01",
                  start_day: "2023-01-01",
                  end_day: "2023-12-31",
                  idf: "12345678900",
                  external: false,
                }}
              />,
            ) as RenderResult
          ).getByText(/Alterar/i) as HTMLButtonElement,
        ) as boolean,
      ) as jest.JestMatchers<HTMLElement>
    ).toBe<boolean>(true) as void;
  }) as void;
}) as void;
