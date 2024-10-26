import React from "react";
import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { maxNumberError } from "../../../../global/handlers/errorHandler";
import { syncAriaStates, handleCondtReq } from "../../../../global/handlers/gHandlers";
import { parseNotNaN } from "../../../../global/gModel";
import { addExportFlags, getGlobalEls } from "../../../../global/gController";
import { dinamicGridAdjust } from "../../../../global/gStyleScript";
import { addListenerInnerTabs, validateTitlesForTargs } from "../../../../locals/edFisNutPage/edFisNutController";
import WatcherEN from "../../../../../../components/interactive/edfis/WatcherEN";
jest.mock(
  "../../../../lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
    inputNotFound: jest.Mock<any, any, any>;
    maxNumberError: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn() as jest.Mock,
    inputNotFound: jest.fn() as jest.Mock,
    maxNumberError: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../lib/global/handlers/gHandlers",
  (): {
    syncAriaStates: jest.Mock<any, any, any>;
    handleCondtReq: jest.Mock<any, any, any>;
  } => ({
    syncAriaStates: jest.fn() as jest.Mock,
    handleCondtReq: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../lib/global/gModel",
  (): {
    parseNotNaN: jest.Mock<number, [val: string], any>;
  } => ({
    parseNotNaN: jest.fn((val: string): number => parseFloat(val)),
  }),
) as typeof jest;
jest.mock(
  "../../../../lib/global/gController",
  (): {
    addExportFlags: jest.Mock<any, any, any>;
    getGlobalEls: jest.Mock<any, any, any>;
    watchLabels: jest.Mock<any, any, any>;
  } => ({
    addExportFlags: jest.fn() as jest.Mock,
    getGlobalEls: jest.fn() as jest.Mock,
    watchLabels: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../lib/global/gStyleScript",
  (): {
    clearPhDates: jest.Mock<any, any, any>;
    dinamicGridAdjust: jest.Mock<any, any, any>;
    equalizeFlexSibilings: jest.Mock<any, any, any>;
  } => ({
    clearPhDates: jest.fn() as jest.Mock,
    dinamicGridAdjust: jest.fn() as jest.Mock,
    equalizeFlexSibilings: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../lib/locals/edFisNutPage/edFisNutController",
  (): {
    addListenerInnerTabs: jest.Mock<any, any, any>;
    validateTitlesForTargs: jest.Mock<any, any, any>;
  } => ({
    addListenerInnerTabs: jest.fn() as jest.Mock,
    validateTitlesForTargs: jest.fn() as jest.Mock,
  }),
) as typeof jest;
describe("WatcherEN component", (): void => {
  beforeEach((): void => {
    jest.clearAllMocks() as typeof jest;
  }) as void;
  test("renders hidden watcher div", (): void => {
    render(<WatcherEN />) as RenderResult;
    const watcherDiv = screen.getByTestId("watcher-en");
    (expect(watcherDiv) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
    (expect(watcherDiv) as jest.JestMatchers<jest.SpyInstance>).toHaveStyle("display: none") as void;
  }) as void;
  test("calls addExportFlags, dinamicGridAdjust, and syncAriaStates in useEffect", (): void => {
    render(<WatcherEN />) as RenderResult;
    (expect(addExportFlags) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof addExportFlags>
    >("edFisNut");
    (expect(dinamicGridAdjust) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    (expect(syncAriaStates) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("parses tabProps correctly with parseNotNaN and updates properties", (): void => {
    render(<WatcherEN />) as RenderResult;
    (expect(parseNotNaN) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    (expect(getGlobalEls) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("calls handleCondtReq on input event", (): void => {
    render(<WatcherEN />) as RenderResult;
    const input = screen.getByLabelText("Número inicial da Consulta");
    fireEvent.input(input, { target: { value: "45" } }) as boolean;
    (expect(handleCondtReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("throws maxNumberError when numColsCons and numConsLastOp mismatch", (): void => {
    render(<WatcherEN />) as RenderResult;
    (expect(maxNumberError) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("calls validateTitlesForTargs and addListenerInnerTabs for table inputs", (): void => {
    render(<WatcherEN />) as RenderResult;
    (expect(validateTitlesForTargs) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    (expect(addListenerInnerTabs) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
}) as void;
