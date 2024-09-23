import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import DREFiller from "../../../../../components/consRegst/DREFiller";
import { FillerProps } from "../../../../lib/locals/panelPage/declarations/interfacesCons";
import { addListenerAvMembers } from "../../../../lib/locals/panelPage/handlers/consHandlerList";
import { globalDataProvider } from "../../../../../components/panelForms/defs/client/SelectPanel";
import { syncAriaStates } from "../../../../lib/global/handlers/gHandlers";
import "@testing-library/jest-dom/extend-expect";
import { MutableRefObject, useRef } from "react";
import { nullishHtEl } from "../../../../lib/global/declarations/types";
jest.mock(
  "../../../../lib/locals/panelPage/handlers/consHandlerList",
  (): {
    addListenerAvMembers: jest.Mock<any, any, any>;
  } => ({
    addListenerAvMembers: jest.fn(),
  })
);
jest.mock(
  "../../../../lib/global/handlers/gHandlers",
  (): {
    handleCondtReq: jest.Mock<any, any, any>;
    syncAriaStates: jest.Mock<any, any, any>;
  } => ({
    handleCondtReq: jest.fn(),
    syncAriaStates: jest.fn(),
  })
);
jest.mock(
  "../../../../../components/panelForms/defs/client/SelectPanel",
  (): {
    globalDataProvider: {
      initPersist: jest.Mock<any, any, any>;
    };
  } => ({
    globalDataProvider: {
      initPersist: jest.fn(),
    },
  })
);
describe("DREFiller Component", (): void => {
  const forwardedRef: MutableRefObject<nullishHtEl> = useRef<nullishHtEl>(null);
  const defaultProps: FillerProps = {
    forwardedRef,
    userClass: "estudante",
  };
  const renderComponent = (
    props = {}
  ): RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement> =>
    render(<DREFiller {...defaultProps} {...props} />);
  test("renders CPF input correctly", (): void =>
    renderComponent() &&
    expect(screen.getByPlaceholderText<HTMLElement>("Preencha com o CPF do Estudante Alocado")).toBeInTheDocument());
  test("renders DRE input correctly", (): void =>
    renderComponent() &&
    expect(screen.getByPlaceholderText<HTMLElement>("Preencha com o DRE do Estudante Alocado")).toBeInTheDocument());

  test("toggles student list display on button click", (): void => {
    renderComponent();
    const btnShowList = screen.getByText<HTMLElement>("Consultar Lista de Estudantes");
    fireEvent.click(btnShowList);
    expect(screen.getByRole<HTMLDialogElement>("dialog")).toBeInTheDocument();
    fireEvent.click(btnShowList);
    expect(screen.queryByRole<HTMLDialogElement>("dialog")).not.toBeInTheDocument();
  });
  test("calls syncAriaStates and addListenerAvMembers on mount", (): void => {
    renderComponent();
    expect(syncAriaStates).toHaveBeenCalled();
    expect(addListenerAvMembers).toHaveBeenCalled();
  });
  test("syncs aria states on mount", (): void => {
    renderComponent();
    expect(syncAriaStates).toHaveBeenCalled();
  });
  test("sets initial display state based on location.search", (): void => {
    const original: Location = window.location;
    Object.defineProperty(window, "location", {
      value: {
        search: "?av-stud=open",
      },
      writable: true,
    });
    renderComponent();
    expect(screen.queryByRole<HTMLDialogElement>("dialog")).toBeInTheDocument();
    window.location = original;
  });
  test("calls initPersist from globalDataProvider on mount", (): void => {
    renderComponent();
    expect(globalDataProvider?.initPersist).toHaveBeenCalled();
  });
});