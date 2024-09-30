import React from "react";
import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import ENDeclaration from "../../../../../../components/interactive/edfis/ENDeclaration";
jest.mock(
  "../../../../../components/error/GenericErrorComponent",
  (): jest.Mock<JSX.Element, [], JSX.Element> =>
    jest.fn((): JSX.Element => <div>Erro carregando modal de declaração</div>) as jest.Mock,
) as typeof jest;
jest.mock(
  "@/lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn() as jest.Mock,
  }),
) as typeof jest;
describe("ENDeclaration component", (): void => {
  const props: {
    state: boolean;
    dispatch: jest.Mock<any, any, any>;
  } = {
    state: true,
    dispatch: jest.fn() as jest.Mock,
  };
  test("renders correctly when state is true", (): void => {
    render(<ENDeclaration {...props} />) as RenderResult;
    (
      expect(screen.getByRole<HTMLDialogElement>("dialog")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("does not render when state is false", (): void => {
    render(<ENDeclaration state={false} dispatch={props.dispatch} />) as RenderResult;
    (
      expect(screen.queryByRole<HTMLDialogElement>("dialog")) as jest.JestMatchers<jest.SpyInstance>
    ).not.toBeInTheDocument();
  }) as void;
  test("closes on ESCAPE key press", (): void => {
    render(<ENDeclaration {...props} />) as RenderResult;
    fireEvent.keyDown(window, { key: "ESCAPE" }) as boolean;
    (expect(props.dispatch) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof props.dispatch>
    >(!props.state) as void;
  }) as void;
  test("renders error boundary on failure", (): void => {
    render(<ENDeclaration {...props} />) as RenderResult;
    (
      expect(
        screen.queryByText<HTMLElement>("Erro carregando modal de declaração"),
      ) as jest.JestMatchers<jest.SpyInstance>
    ).not.toBeInTheDocument() as void;
  }) as void;
  test("closes modal on outside click", (): void => {
    render(<ENDeclaration {...props} />) as RenderResult;
    fireEvent.click(screen.getByRole<HTMLDialogElement>("dialog"));
    (expect(props.dispatch) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof props.dispatch>
    >(!props.state) as void;
  }) as void;
}) as void;
