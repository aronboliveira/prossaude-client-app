import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { addDblQuotes } from "../../../../../lib/locals/aGPage/aGModel";
import QxPrinc from "../../../../../../components/interactive/ag/QxPrinc";
jest.mock(
  "../../../../../lib/locals/aGPage/aGModel",
  (): {
    addDblQuotes: jest.Mock<any, any, any>;
  } => ({
    addDblQuotes: jest.fn(),
  })
);
describe("QxPrinc", (): void => {
  it("renders the textarea input", (): void => {
    render(<QxPrinc />);
    expect(screen.getByPlaceholderText<HTMLTextAreaElement>("Escreva aqui a(s) queixa(s)")).toBeInTheDocument();
  });
  it("calls addDblQuotes on input and click events", (): void => {
    render(<QxPrinc />);
    const textarea = screen.getByPlaceholderText<HTMLTextAreaElement>("Escreva aqui a(s) queixa(s)");
    userEvent.type(textarea, "test");
    userEvent.click(textarea);
    expect(addDblQuotes).toHaveBeenCalledTimes(2);
    expect(addDblQuotes).toHaveBeenCalledWith<Parameters<typeof addDblQuotes>>(textarea);
  });
});
