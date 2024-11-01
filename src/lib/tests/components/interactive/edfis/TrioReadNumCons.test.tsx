import React from "react";
import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { elementNotPopulated } from "../../../../global/handlers/errorHandler";
import { syncAriaStates } from "../../../../global/handlers/gHandlers";
import { highlightChange } from "../../../../global/gStyleScript";
import { parseNotNaN } from "../../../../global/gModel";
import { switchNumConsTitles } from "../../../../locals/edFisNutPage/edFisNutHandler";
import TrioReadNumCons from "../../../../../../components/interactive/edfis/TrioReadNumCons";
jest.mock(
  "../../../../lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
    elementNotPopulated: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn() as jest.Mock,
    elementNotPopulated: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../lib/global/handlers/gHandlers",
  (): {
    syncAriaStates: jest.Mock<any, any, any>;
  } => ({
    syncAriaStates: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../lib/global/gStyleScript",
  (): {
    highlightChange: jest.Mock<any, any, any>;
  } => ({
    highlightChange: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../lib/global/gModel",
  (): {
    parseNotNaN: jest.Mock<any, any, any>;
  } => ({
    parseNotNaN: jest.fn((val: string): number => parseFloat(val)) as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../lib/locals/edFisNutPage/edFisNutHandler",
  (): {
    switchNumConsTitles: jest.Mock<any, any, any>;
  } => ({
    switchNumConsTitles: jest.fn() as jest.Mock,
  }),
) as typeof jest;
describe("TrioReadNumCons component", (): void => {
  beforeEach((): void => {
    jest.clearAllMocks() as typeof jest;
  }) as void;
  test("renders label and input elements", (): void => {
    render(<TrioReadNumCons />) as RenderResult;
    (
      expect(
        screen.getByText<HTMLLabelElement>("Número inicial da Consulta em Leitura:"),
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(
        screen.getByLabelText<HTMLInputElement>("Número inicial da Consulta em Leitura:"),
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("calls syncAriaStates in useEffect", (): void => {
    render(<TrioReadNumCons />) as RenderResult;
    (expect(syncAriaStates) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("triggers switchNumConsTitles and highlightChange on input event", (): void => {
    render(<TrioReadNumCons />);
    const input = screen.getByLabelText<HTMLInputElement>("Número inicial da Consulta em Leitura:");
    fireEvent.input(input, { target: { value: "100" } }) as boolean;
    (expect(parseNotNaN) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<Parameters<typeof parseNotNaN>>(
      "100",
    ) as void;
    (expect(switchNumConsTitles) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    (expect(highlightChange) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("handles input constraints correctly", (): void => {
    render(<TrioReadNumCons />) as RenderResult;
    const input = screen.getByLabelText<HTMLInputElement>("Número inicial da Consulta em Leitura:");
    fireEvent.input(input, { target: { value: "99" } }) as boolean;
    (expect(input.value) as jest.JestMatchers<jest.SpyInstance>).toBe<string>("99") as void;
  }) as void;
  test("throws elementNotPopulated when numConsTextHeadCels is not populated", (): void => {
    render(<TrioReadNumCons />) as RenderResult;
    const input = screen.getByLabelText<HTMLInputElement>("Número inicial da Consulta em Leitura:");
    fireEvent.input(input, { target: { value: "50" } }) as boolean;
    (expect(elementNotPopulated) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
}) as void;
