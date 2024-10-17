import React from "react";
import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { addRowAtivFis, removeRowAtivFis } from "../../../../locals/edFisNutPage/edFisNutHandler";
import { elementNotFound } from "../../../../global/handlers/errorHandler";
import TabAtFisRot from "../../../../../../components/interactive/edfis/TabAtFisRot";
import TbodyAtFisRot from "../../../../../../components/interactive/edfis/TbodyAtFisRot";
jest.mock(
  "../../../../lib/locals/edFisNutPage/edFisNutHandler",
  (): {
    addRowAtivFis: jest.Mock<any, any, any>;
    removeRowAtivFis: jest.Mock<any, any, any>;
  } => ({
    addRowAtivFis: jest.fn() as jest.Mock,
    removeRowAtivFis: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn(),
  }),
) as typeof jest;
describe("TabAtFisRot component", (): void => {
  beforeEach((): void => {
    jest.clearAllMocks() as typeof jest;
  }) as void;
  test("renders table with initial rows", (): void => {
    render(
      <TabAtFisRot>
        <TbodyAtFisRot />
      </TabAtFisRot>,
    ) as RenderResult;
    (expect(screen.getAllByRole<HTMLTableElement>("row")) as jest.JestMatchers<jest.SpyInstance>).toHaveLength(
      2,
    ) as void;
  }) as void;
  test("increments block count and adds row on add button click", (): void => {
    render(
      <TabAtFisRot>
        <TbodyAtFisRot />
      </TabAtFisRot>,
    ) as RenderResult;
    fireEvent.click(screen.getByText<HTMLButtonElement>("addAtFisRot")) as boolean;
    (expect(addRowAtivFis) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith(3) as void;
  }) as void;
  test("decrements block count and removes row on remove button click", (): void => {
    render(
      <TabAtFisRot>
        <TbodyAtFisRot />
      </TabAtFisRot>,
    ) as RenderResult;
    fireEvent.click(screen.getByText<HTMLButtonElement>("removeAtFisRot")) as boolean;
    (expect(removeRowAtivFis) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith(3) as void;
  }) as void;
  test("throws error if mainRef is not an HTMLElement", (): void => {
    render(
      <TabAtFisRot>
        <TbodyAtFisRot />
      </TabAtFisRot>,
    ) as RenderResult;
    (expect(elementNotFound) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
}) as void;
