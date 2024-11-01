import React from "react";
import { RenderResult, render } from "@testing-library/react";
import Col from "../../../../../../../components/interactive/edfis/tabs/Col";
describe("Col Component", (): void => {
  it("should render the Col element with correct props", (): void => {
    const { container } = render(<Col nCol={1} ctx='IndPerc' />) as RenderResult;
    const col = container.querySelector<HTMLTableColElement>("col");
    (expect(col) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
    (expect(col?.getAttribute("class")) as jest.JestMatchers<jest.SpyInstance>).toBe<string>(
      "tabColProg tabColIndPerc",
    ) as void;
    (expect(col?.getAttribute("id")) as jest.JestMatchers<jest.SpyInstance>).toBe<string>("tabColIndPerc1") as void;
  }) as void;
}) as void;
