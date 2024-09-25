import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Email from "../../../../../../components/interactive/ag/Email";
import { addEmailExtension } from "../../../../../lib/global/gModel";
import { handleCondtReq } from "../../../../../lib/global/handlers/gHandlers";
jest.mock(
  "../../../../../lib/global/gModel",
  (): {
    addEmailExtension: jest.Mock<any, any, any>;
  } => ({
    addEmailExtension: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleCondtReq: jest.Mock<any, any, any>;
  } => ({
    handleCondtReq: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("Email Component", (): void => {
  it("renders the email input field", (): void => {
    render(<Email />);
    (
      expect(screen.getByLabelText<HTMLInputElement>("E-mail Primário")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("calls addEmailExtension and handleCondtReq on input", async (): Promise<void> => {
    render(<Email />);
    const input = screen.getByLabelText<HTMLInputElement>("E-mail Primário");
    fireEvent.input(input, { target: { value: "test@example.com" } }) as boolean;
    (await waitFor((): void => {
      (expect(addEmailExtension) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
        Parameters<typeof addEmailExtension>
      >(input) as void;
      (expect(handleCondtReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
        Parameters<typeof handleCondtReq>
      >(input, {
        min: 6,
        pattern: ["@", "g"],
      }) as void;
    })) as void;
  }) as void;
}) as void;
