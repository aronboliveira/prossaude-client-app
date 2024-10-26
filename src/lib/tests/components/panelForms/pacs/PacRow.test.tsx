import React from "react";
import { render, fireEvent, RenderResult } from "@testing-library/react";
import PacRow from "../../../../../../components/panelForms/pacs/PacRow";
//@ts-ignore
import { nlTab } from "@/lib/global/declarations/types";
import { useRef, MutableRefObject } from "react";
//@ts-ignore
import { PacInfo } from "@/lib/global/declarations/interfacesCons";
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
  "@/lib/global/gModel",
  (): {
    dateISOtoBRL: jest.Mock<any, any, any>;
  } => ({
    dateISOtoBRL: jest.fn() as jest.Mock,
  }),
) as typeof jest;
describe("PacRow Component", (): void => {
  const defaultPac = {
    name: "Anônimo",
    email: "Não fornecido",
    tel: "Não fornecido",
    next_appointed_day: "Não definido",
    treatment_beg: "Não definido",
    treatment_end: "Não definido",
    current_status: "Não definido",
    idf: "Não fornecido",
    signature: new File([], "error"),
    historic: [
      {
        type: "Indefinido",
        day: "0000-00-00",
        prof: "Anônimo",
        stud: "Anônimo",
        notes: "",
      },
    ],
  };
  test("renders PacRow with default props", (): void => {
    const tabRef: MutableRefObject<nlTab> = useRef<nlTab>(null);
    (
      expect(
        (
          render(
            <PacRow
              tabRef={tabRef}
              pac={defaultPac as PacInfo}
              nRow={0}
              userClass='estudante'
              shouldShowAlocBtn={false}
            />,
          ) as RenderResult
        ).getByText(/Anônimo/i),
      ) as jest.JestMatchers<HTMLElement>
    ).toBeInTheDocument() as void;
  }) as void;
  test("click on 'Atendimentos Anteriores' button", (): void => {
    const tabRef: MutableRefObject<nlTab> = useRef<nlTab>(null);
    const renderResult = render(
      <PacRow tabRef={tabRef} pac={defaultPac as PacInfo} nRow={0} userClass='estudante' shouldShowAlocBtn={false} />,
    ) as RenderResult;
    expect(
      fireEvent.click(renderResult.getByText(/Atendimentos Anteriores/i) as HTMLButtonElement) as boolean,
    ).toBe<boolean>(true) as void;
  }) as void;
}) as void;
