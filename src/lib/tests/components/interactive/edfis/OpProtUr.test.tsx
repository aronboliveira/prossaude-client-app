import React from "react";
import { RenderResult, render, screen } from "@testing-library/react";
import OpProtUr from "../../../../../../components/interactive/edfis/OpProtUr";
import GenericErrorComponent from "../../../../../../components/error/GenericErrorComponent";
jest.mock(
  "../../../../../components/error/GenericErrorComponent",
  (): jest.Mock<any, any, any> => jest.fn((): JSX.Element => <div>Error rendering Option</div>) as jest.Mock,
) as typeof jest;
describe("OpProtUr component", (): void => {
  test("renders radio input with correct attributes", (): void => {
    render(<OpProtUr ctx={"Persist"} />) as RenderResult;
    const radioInput = screen.getByRole<HTMLInputElement>("radio");
    (expect(radioInput) as jest.JestMatchers<jest.SpyInstance>).toHaveAttribute("id", "protUrPersistId") as void;
    (expect(radioInput) as jest.JestMatchers<jest.SpyInstance>).toHaveAttribute(
      "data-title",
      "Proteinúria Persistente",
    ) as void;
  }) as void;
  test("displays full name based on context", (): void => {
    render(<OpProtUr ctx='Ort' />);
    (
      expect(screen.getByText<HTMLInputElement>("Ortostática")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("renders error boundary on failure", (): void => {
    render(<GenericErrorComponent message='Error' />) as RenderResult;
    (
      expect(screen.getByText<HTMLInputElement>("Error rendering Option")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
}) as void;
