import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { handleEventReq } from "../../../../../global/handlers/gHandlers";
import { inputNotFound } from "../../../../../global/handlers/errorHandler";
import InpRot from "../../../../../../../components/interactive/edfis/client/InpRot";
import { InpRotProps } from "@/lib/global/declarations/interfaces";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleEventReq: jest.Mock<any, any, any>;
  } => ({
    handleEventReq: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "../../../../../lib/global/handlers/errorHandler",
  (): {
    inputNotFound: jest.Mock<any, any, any>;
  } => ({
    inputNotFound: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("InpRot component", (): void => {
  beforeEach((): void => {
    jest.clearAllMocks() as typeof jest;
  }) as void;
  test("renders input element with dynamic context", (): void => {
    render(
      <InpRot
        {...({
          ctx: "UrDia",
          isMax: true,
          quest: "Quantas micções por dia",
          maxLength: 999,
          max: 999,
        } as InpRotProps)}
      />
    ) as RenderResult;
    (
      expect(screen.getByLabelText<HTMLInputElement>("Micções, no máximo?")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("calls handleEventReq on input event", (): void => {
    render(
      <InpRot
        {...({
          ctx: "UrDia",
          isMax: true,
          quest: "Quantas micções por dia",
          maxLength: 999,
          max: 999,
        } as InpRotProps)}
      />
    ) as RenderResult;
    const input = screen.getByLabelText<HTMLInputElement>("Micções, no máximo?");
    fireEvent.input(input, { target: { value: "5" } }) as boolean;
    (expect(handleEventReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof handleEventReq>
    >(input) as void;
  }) as void;
  test("throws inputNotFound if input reference is invalid", (): void => {
    render(
      <InpRot
        {...({ ctx: "UrDia", isMax: true, quest: "Quantas micções por dia", maxLength: 999, max: 999 } as InpRotProps)}
      />
    ) as RenderResult;
    (expect(inputNotFound) as jest.JestMatchers<jest.SpyInstance>).not.toHaveBeenCalled() as void;
  }) as void;
}) as void;
