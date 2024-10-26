import React from "react";
import { RenderResult, render, screen } from "@testing-library/react";
import { ErrorBoundary } from "react-error-boundary";
import DivRot from "../../../../../../components/interactive/edfis/DivRot";
import InpRot from "../../../../../../components/interactive/edfis/client/InpRot";
import GenericErrorComponent from "../../../../../../components/error/GenericErrorComponent";
//@ts-ignore
import { InpRotProps, RotProps } from "@/lib/global/declarations/interfaces";
jest.mock(
  "./client/InpRot",
  (): (() => JSX.Element) => jest.fn((): JSX.Element => <input />) as jest.Mock,
) as typeof jest;
jest.mock(
  "../../error/GenericErrorComponent",
  (): (() => JSX.Element) => jest.fn((): JSX.Element => <div>Error rendering Div for Routine</div>) as jest.Mock,
) as typeof jest;
describe("DivRot component", (): void => {
  const props = {
    quest: "Faz quantas refeições por dia",
    ctx: "RefDia",
    ur: { ctx: "Elim" },
    ev: { ctx: "Elim" },
    grp: "Alim",
  } as RotProps;
  test("renders without errors", (): void => {
    render(<DivRot {...props} />);
    (
      expect(
        screen.getByLabelText<HTMLInputElement>(`inp${props.ur?.ctx}${props.ctx}Min`),
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(
        screen.getByLabelText<HTMLInputElement>(`inp${props.ur?.ctx}${props.ctx}Max`),
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("renders error boundary on failure", (): void => {
    render(
      <ErrorBoundary
        FallbackComponent={(): JSX.Element => <GenericErrorComponent message='Error rendering Div for Routine' />}>
        <DivRot {...props} />
      </ErrorBoundary>,
    ) as RenderResult;
    (
      expect(
        screen.queryByText<HTMLDivElement>("Error rendering Div for Routine"),
      ) as jest.JestMatchers<jest.SpyInstance>
    ).not.toBeInTheDocument() as void;
  }) as void;
  test("InpRot is called with the correct props", (): void => {
    render(<DivRot {...props} />) as RenderResult;
    (expect(InpRot) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[InpRotProps, object]>(
      (expect as jest.Expect).objectContaining<[RotProps]>({
        quest: "Faz quantas refeições por dia",
        ctx: props.ctx,
        max: 96,
        maxLength: 4,
      } as any),
      {},
    ) as void;
  }) as void;
}) as void;
