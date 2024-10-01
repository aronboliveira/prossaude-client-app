import React from "react";
import { RenderResult, render } from "@testing-library/react";
import DefaultForm from "../../../../../components/panelForms/defs/DefaultForm";
describe("DefaultForm Component", (): void => {
  test("renders the construction page message", (): void => {
    (
      expect(
        (render(<DefaultForm />) as RenderResult).getByText(/PÁGINA EM CONSTRUÇÃO/i) as HTMLElement,
      ) as jest.JestMatchers<HTMLElement>
    ).toBeInTheDocument() as void;
  }) as void;
}) as void;
