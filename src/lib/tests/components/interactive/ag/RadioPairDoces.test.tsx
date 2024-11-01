import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { opRadioHandler } from "../../../../../lib/global/handlers/gHandlers";
import RadioPairDoces from "../../../../../../components/interactive/ag/RadioPairDoces";
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    opRadioHandler: jest.Mock<any, any, any>;
  } => ({
    opRadioHandler: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("RadioPairDoces", (): void => {
  it("renders two radio buttons for Yes and No", (): void => {
    render(<RadioPairDoces />);
    (
      expect(screen.getByLabelText<HTMLInputElement>("Sim")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByLabelText<HTMLInputElement>("Não")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("calls opRadioHandler on keydown for radio buttons", (): void => {
    render(<RadioPairDoces />);
    userEvent.type(screen.getByLabelText<HTMLInputElement>("Sim"), "{enter}");
    (expect(opRadioHandler) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
}) as void;
