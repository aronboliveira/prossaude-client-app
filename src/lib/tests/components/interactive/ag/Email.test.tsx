import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Email from "../../../../../../components/interactive/ag/Email";
import { addEmailExtension } from "../../../../../lib/global/gModel";
import { handleCondtReq } from "../../../../../lib/global/handlers/gHandlers";
jest.mock(
  "../../../../../lib/global/gModel",
  (): {
    addEmailExtension: jest.Mock<any, any, any>;
  } => ({
    addEmailExtension: jest.fn(),
  })
);
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleCondtReq: jest.Mock<any, any, any>;
  } => ({
    handleCondtReq: jest.fn(),
  })
);
describe("Email Component", (): void => {
  it("renders the email input field", (): void => {
    render(<Email />);
    expect(screen.getByLabelText<HTMLInputElement>("E-mail Primário")).toBeInTheDocument();
  });
  it("calls addEmailExtension and handleCondtReq on input", async (): Promise<void> => {
    render(<Email />);
    const input = screen.getByLabelText<HTMLInputElement>("E-mail Primário");
    fireEvent.input(input, { target: { value: "test@example.com" } });
    await waitFor((): void => {
      expect(addEmailExtension).toHaveBeenCalledWith<Parameters<typeof addEmailExtension>>(input);
      expect(handleCondtReq).toHaveBeenCalledWith<Parameters<typeof handleCondtReq>>(input, {
        min: 6,
        pattern: ["@", "g"],
      });
    });
  });
});
