import { render, fireEvent, RenderResult } from "@testing-library/react";
import { useRef, MutableRefObject } from "react";
import StudRow from "../../../../../../components/panelForms/studs/StudRow";
import AlterFieldList from "../../../../../../components/lists/AlterFieldList";
import React from "react";
import { nlTab } from "../../../../global/declarations/types";
jest.mock("../../../../../../components/lists/AlterFieldList", (): jest.Mock<any, any, any> => jest.fn() as jest.Mock);
describe("StudRow Component", (): void => {
  test("renders student row data", (): void => {
    const tabRef: MutableRefObject<nlTab> = useRef<nlTab>(null);
    const renderResult = render(
      <StudRow
        tabRef={tabRef}
        nRow={1}
        userClass='coordenador'
        stud={{
          name: "Student Name",
          email: "test@example.com",
          tel: "12345",
          area: "Educação Física",
          day: "2023-09-01",
          start_day: "2023-01-01",
          end_day: "2023-12-31",
        }}
      />,
    ) as RenderResult;
    (
      expect(renderResult.getByText(/Student Name/i) as HTMLOutputElement) as jest.JestMatchers<HTMLElement>
    ).toBeInTheDocument() as void;
    (
      expect(renderResult.getByText(/test@example.com/i) as HTMLOutputElement) as jest.JestMatchers<HTMLElement>
    ).toBeInTheDocument() as void;
  }) as void;
  test("toggles alteration dialog on button click", (): void => {
    const tabRef: MutableRefObject<nlTab> = useRef<nlTab>(null);
    (
      expect(
        fireEvent.click(
          (
            render(
              <StudRow
                tabRef={tabRef}
                nRow={1}
                userClass='coordenador'
                stud={{
                  name: "Student Name",
                  email: "test@example.com",
                  tel: "12345",
                  area: "Educação Física",
                  day: "2023-09-01",
                  start_day: "2023-01-01",
                  end_day: "2023-12-31",
                }}
              />,
            ) as RenderResult
          ).getByText(/Alterar/i) as HTMLButtonElement,
        ) as boolean,
      ) as jest.JestMatchers<HTMLElement>
    ).toBe<boolean>(true) as void;
    (expect(AlterFieldList) as jest.JestMatchers<HTMLElement>).toHaveBeenCalled() as void;
  }) as void;
}) as void;
