import React from "react";
import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import DREFiller from "../../../../../components/consRegst/DREFiller";
import { FillerProps } from "../../..//lib/global/declarations/interfacesCons";
import { addListenerAvMembers } from "../../../../lib/locals/panelPage/handlers/consHandlerList";
import { providers } from "../../../../vars";
import { syncAriaStates } from "../../../../lib/global/handlers/gHandlers";
import "@testing-library/jest-dom/extend-expect";
import { MutableRefObject, useRef } from "react";
import { nlHtEl } from "../../../../lib/global/declarations/types";
jest.mock(
  "../../../../lib/locals/panelPage/handlers/consHandlerList",
  (): {
    addListenerAvMembers: jest.Mock<any, any, any>;
  } => ({
    addListenerAvMembers: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../lib/global/handlers/gHandlers",
  (): {
    handleCondtReq: jest.Mock<any, any, any>;
    syncAriaStates: jest.Mock<any, any, any>;
  } => ({
    handleCondtReq: jest.fn() as jest.Mock,
    syncAriaStates: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock("../../../../vars", () => ({
  providers: {
    globalDataProvider: {
      initPersist: jest.fn(),
    },
  },
})) as typeof jest;
describe("DREFiller Component", (): void => {
  const forwardedRef: MutableRefObject<nlHtEl> = useRef<nlHtEl>(null);
  const defaultProps: FillerProps = {
    forwardedRef,
    userClass: "estudante",
  };
  const renderComponent = (
    props = {},
  ): RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement> =>
    render(<DREFiller {...defaultProps} {...props} />);
  test("renders CPF input correctly", (): void =>
    (renderComponent() as RenderResult<
      typeof import("@testing-library/dom/types/queries"),
      HTMLElement,
      HTMLElement
    >) &&
    (expect(
      screen.getByPlaceholderText<HTMLElement>("Preencha com o CPF do Estudante Alocado"),
    ).toBeInTheDocument() as void));
  test("renders DRE input correctly", (): void =>
    (renderComponent() as RenderResult<
      typeof import("@testing-library/dom/types/queries"),
      HTMLElement,
      HTMLElement
    >) &&
    (expect(
      screen.getByPlaceholderText<HTMLElement>("Preencha com o DRE do Estudante Alocado"),
    ).toBeInTheDocument() as void));

  test("toggles student list display on button click", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    const btnShowList = screen.getByText<HTMLElement>("Consultar Lista de Estudantes");
    fireEvent.click(btnShowList) as boolean;
    (
      expect(screen.getByRole<HTMLDialogElement>("dialog")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    fireEvent.click(btnShowList) as boolean;
    (
      expect(screen.queryByRole<HTMLDialogElement>("dialog")).not as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("calls syncAriaStates and addListenerAvMembers on mount", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (expect(syncAriaStates) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    (expect(addListenerAvMembers) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("syncs aria states on mount", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (expect(syncAriaStates) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("sets initial display state based on location.search", (): void => {
    const original: Location = window.location;
    Object.defineProperty(window, "location", {
      value: {
        search: "?av-stud=open",
      },
      writable: true,
    });
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (
      expect(screen.queryByRole<HTMLDialogElement>("dialog")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    window.location = original;
  }) as void;
  test("calls initPersist from providers.globalDataProvider on mount", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (
      expect(providers.globalDataProvider?.initPersist) as jest.JestMatchers<jest.SpyInstance>
    ).toHaveBeenCalled() as void;
  }) as void;
}) as void;
