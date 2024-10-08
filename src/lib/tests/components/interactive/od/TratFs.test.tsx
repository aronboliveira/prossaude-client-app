import { screen, RenderResult, render, fireEvent } from "@testing-library/react";
import TratFs from "../../../../../../components/interactive/od/TratFs";
describe("TratFs Component", (): void => {
  it("should add and remove treatment blocks", (): void => {
    const { container } = render(<TratFs />) as RenderResult;
    const addButton = container.querySelector<HTMLElement>("#addTratId1");
    addButton && (fireEvent.click(addButton) as boolean);
    expect(screen.getAllByText<HTMLElement>("1)").length).toBeGreaterThan(1) as void;
  }) as void;
}) as void;
