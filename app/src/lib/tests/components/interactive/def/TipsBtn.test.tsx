import { screen, render, fireEvent, RenderResult } from "@testing-library/react";
import TipsBtn from "../../../../../../components/interactive/def/TipsBtn";
describe("TipsBtn Component", (): void => {
  const dispatchMock = jest.fn() as jest.Mock as jest.Mock;
  test("toggles state when clicked", (): void => {
    render(<TipsBtn dispatch={dispatchMock} state={false} />) as RenderResult;
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button")) as boolean;
    (
      expect(dispatchMock) as jest.JestMatchers<jest.SpyInstance> as jest.JestMatchers<jest.SpyInstance>
    ).toHaveBeenCalledWith<[boolean]>(true);
  }) as void;
}) as void;
