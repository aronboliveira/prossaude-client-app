import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { opRadioHandler } from "@/lib/global/handlers/gHandlers";
import RadioPair from "../../../../../../components/interactive/ag/RadioPair";
jest.mock(
  "@/lib/global/handlers/gHandlers",
  (): {
    opRadioHandler: jest.Mock<any, any, any>;
  } => ({
    opRadioHandler: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("RadioPair", (): void => {
  it("renders two radio buttons for Yes and No", (): void => {
    render(<RadioPair name='test_radio' />);
    (
      expect(screen.getByLabelText<HTMLInputElement>("Sim")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByLabelText<HTMLInputElement>("Não")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("calls opRadioHandler on keydown for radio buttons", (): void => {
    render(<RadioPair name='test_radio' />);
    userEvent.type(screen.getByLabelText<HTMLInputElement>("Sim"), "{enter}");
    (expect(opRadioHandler) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  it("shows textarea when Yes is selected and add prop is 'ta'", (): void => {
    render(<RadioPair name='test_radio' add='ta' />);
    userEvent.click(screen.getByLabelText<HTMLInputElement>("Sim"));
    expect(
      screen.getByPlaceholderText<HTMLTextAreaElement>("Escreva aqui os Test_radio específicos")
    ).toBeInTheDocument() as void;
  }) as void;
}) as void;
