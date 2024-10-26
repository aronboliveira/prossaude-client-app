import React from "react";
import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { elementNotFound } from "../../../../global/handlers/errorHandler";
import { switchRowComorb } from "../../../../locals/edFisNutPage/edFisNutHandler";
import { syncAriaStates } from "../../../../global/handlers/gHandlers";
import TabComorb from "../../../../../../components/interactive/edfis/TabComorb";
import TbodyComorb from "../../../../../../components/interactive/edfis/TbodyComorb";
jest.mock(
  "../../../../lib/locals/edFisNutPage/edFisNutHandler",
  (): {
    switchRowComorb: jest.Mock<any, any, any>;
  } => ({
    switchRowComorb: jest.fn(),
  }),
);
jest.mock(
  "../../../../lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn(),
  }),
);
jest.mock(
  "../../../../lib/global/handlers/gHandlers",
  (): {
    syncAriaStates: jest.Mock<any, any, any>;
  } => ({
    syncAriaStates: jest.fn(),
  }),
);
describe("TabComorb component", (): void => {
  beforeEach((): void => {
    jest.clearAllMocks() as typeof jest;
  }) as void;
  test("renders correctly when mounted", (): void => {
    render(
      <TabComorb>
        <TbodyComorb />
      </TabComorb>,
    ) as RenderResult;
    (
      expect(screen.getByText<HTMLLabelElement>("Comorbidades")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("increments block count and switches row on add button click", (): void => {
    render(
      <TabComorb>
        <TbodyComorb />
      </TabComorb>,
    ) as RenderResult;
    const addButton = screen.getByText<HTMLButtonElement>(/plus/i);
    fireEvent.click(addButton) as boolean;
    (expect(switchRowComorb) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof switchRowComorb>
    >(addButton, 3) as void;
  }) as void;
  test("decrements block count and switches row on remove button click", (): void => {
    render(
      <TabComorb>
        <TbodyComorb />
      </TabComorb>,
    ) as RenderResult;
    const removeButton = screen.getByText<HTMLButtonElement>(/dash/i);
    fireEvent.click(removeButton) as boolean;
    (expect(switchRowComorb) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof switchRowComorb>
    >(removeButton, 3) as void;
  }) as void;
  test("throws error when mainRef is not an HTMLElement", (): void => {
    render(
      <TabComorb>
        <TbodyComorb />
      </TabComorb>,
    ) as RenderResult;
    (expect(elementNotFound) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("syncAriaStates is called with mainRef and children", (): void => {
    render(
      <TabComorb>
        <TbodyComorb />
      </TabComorb>,
    ) as RenderResult;
    (expect(syncAriaStates) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
}) as void;
