import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { addDblQuotes } from "../../../../../lib/locals/aGPage/aGModel";
import QxPrinc from "../../../../../../components/interactive/ag/QxPrinc";
jest.mock(
  "../../../../../lib/locals/aGPage/aGModel",
  (): {
    addDblQuotes: jest.Mock<any, any, any>;
  } => ({
    addDblQuotes: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("QxPrinc", (): void => {
  it("renders the textarea input", (): void => {
    render(<QxPrinc />);
    (
      expect(
        screen.getByPlaceholderText<HTMLTextAreaElement>("Escreva aqui a(s) queixa(s)")
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("calls addDblQuotes on input and click events", (): void => {
    render(<QxPrinc />);
    const textarea = screen.getByPlaceholderText<HTMLTextAreaElement>("Escreva aqui a(s) queixa(s)");
    userEvent.type(textarea, "test");
    userEvent.click(textarea);
    (expect(addDblQuotes) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledTimes(2) as void;
    (expect(addDblQuotes) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<Parameters<typeof addDblQuotes>>(
      textarea
    ) as void;
  }) as void;
}) as void;
