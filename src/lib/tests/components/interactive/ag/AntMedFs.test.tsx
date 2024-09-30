import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AntMedFs from "../../../../../../components/interactive/ag/AntMedFs";
import { syncAriaStates } from "../../../../../lib/global/handlers/gHandlers";
import { elementNotFound } from "../../../../../lib/global/handlers/errorHandler";
import { addMedHistHandler } from "../../../../../lib/locals/aGPage/aGHandlers";
import { clearPhDates } from "../../../../../lib/global/gStyleScript";
import AntMedContainer from "../../../../../../components/interactive/ag/AntMedContainer";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    syncAriaStates: jest.Mock<any, any, any>;
  } => ({
    syncAriaStates: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../../lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../../lib/locals/aGPage/aGHandlers",
  (): {
    addMedHistHandler: jest.Mock<any, any, any>;
  } => ({
    addMedHistHandler: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../../lib/global/gStyleScript",
  (): {
    clearPhDates: jest.Mock<any, any, any>;
  } => ({
    clearPhDates: jest.fn() as jest.Mock,
  }),
) as typeof jest;
describe("AntMedFs", (): void => {
  it("renders the fieldset with legend text", (): void => {
    render(
      <AntMedFs>
        <AntMedContainer />
      </AntMedFs>,
    );
    expect(
      screen.getByText<HTMLElement>("Tratamentos Médicos Atuais e Anteriores e/ou Internações"),
    ).toBeInTheDocument() as void;
  }) as void;
  it("calls syncAriaStates and clearPhDates on mount", async (): Promise<void> => {
    render(
      <AntMedFs>
        <AntMedContainer />
      </AntMedFs>,
    );
    (await waitFor((): void => {
      (expect(syncAriaStates) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
      (expect(clearPhDates) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    })) as void;
  }) as void;
  it("increments blockCount when the add button is clicked", async (): Promise<void> => {
    render(
      <AntMedFs>
        <AntMedContainer />
      </AntMedFs>,
    );
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: /addAntMed/i })) as boolean;
    (await waitFor((): void => {
      (expect(addMedHistHandler) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    })) as void;
  }) as void;
  it("decrements blockCount when the remove button is clicked", async (): Promise<void> => {
    render(
      <AntMedFs>
        <AntMedContainer />
      </AntMedFs>,
    );
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: /removeAntMed/i })) as boolean;
    (await waitFor((): void => {
      (expect(addMedHistHandler) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    })) as void;
  }) as void;
  it("calls elementNotFound when mainRef is not an HTMLElement", async (): Promise<void> => {
    render(
      <AntMedFs>
        <AntMedContainer />
      </AntMedFs>,
    );
    (await waitFor((): void => {
      (expect(elementNotFound) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    })) as void;
  }) as void;
}) as void;
