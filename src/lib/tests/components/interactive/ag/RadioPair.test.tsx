import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { opRadioHandler } from "@/lib/global/handlers/gHandlers";
import RadioPair from "../../../../../../components/interactive/ag/RadioPair";
jest.mock(
  "@/lib/global/handlers/gHandlers",
  (): {
    opRadioHandler: jest.Mock<any, any, any>;
  } => ({
    opRadioHandler: jest.fn(),
  })
);
describe("RadioPair", (): void => {
  it("renders two radio buttons for Yes and No", (): void => {
    render(<RadioPair name='test_radio' />);
    expect(screen.getByLabelText<HTMLInputElement>("Sim")).toBeInTheDocument();
    expect(screen.getByLabelText<HTMLInputElement>("Não")).toBeInTheDocument();
  });
  it("calls opRadioHandler on keydown for radio buttons", (): void => {
    render(<RadioPair name='test_radio' />);
    userEvent.type(screen.getByLabelText<HTMLInputElement>("Sim"), "{enter}");
    expect(opRadioHandler).toHaveBeenCalled();
  });
  it("shows textarea when Yes is selected and add prop is 'ta'", (): void => {
    render(<RadioPair name='test_radio' add='ta' />);
    userEvent.click(screen.getByLabelText<HTMLInputElement>("Sim"));
    expect(
      screen.getByPlaceholderText<HTMLTextAreaElement>("Escreva aqui os Test_radio específicos")
    ).toBeInTheDocument();
  });
});
